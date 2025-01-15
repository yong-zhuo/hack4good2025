"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig"; // Ensure your Firebase config is correctly imported
import {
  fetchVoucherRequests,
  updateVoucherRequest,
  updateUserVoucherBalance,
} from "@/firebase/firestore/fetchVoucherRequests";

const AdminVoucherRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchVoucherRequests();
        setRequests(data);
      } catch (err) {
        console.error("Error fetching voucher requests:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (requestId, userId, voucherAmount) => {
    try {
      // Ensure voucherAmount is a valid number
      if (!voucherAmount || isNaN(voucherAmount) || voucherAmount <= 0) {
        alert("Please enter a valid voucher amount greater than 0.");
        return;
      }
  
      // Find the request to get the user's current balance
      const request = requests.find((req) => req.id === requestId);
      if (!request) {
        alert("Request not found!");
        return;
      }
  
      // Fetch the user's current balance from Firestore (optional for safety)
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
      const currentBalance = userDoc.exists() ? userDoc.data().balance || 0 : 0;
  
      // Calculate the new balance
      const newBalance = currentBalance + voucherAmount;
  
      // Update the voucher request to 'approved'
      await updateVoucherRequest(requestId, {
        status: "approved",
        vouchersAwarded: voucherAmount,
      });
  
      // Update the user's balance in Firestore
      await updateUserVoucherBalance(userId, newBalance);
  
      // Refresh the requests list
      setRequests((prev) =>
        prev.map((req) =>
          req.id === requestId
            ? { ...req, status: "approved", vouchersAwarded: voucherAmount }
            : req
        )
      );
  
      alert(`Voucher request approved! User's new balance: ${newBalance}`);
    } catch (err) {
      console.error("Error approving voucher request:", err);
    }
  };

  const handleReject = async (requestId, rejectionReason) => {
    try {
      // Update the voucher request to 'rejected'
      await updateVoucherRequest(requestId, {
        status: "rejected",
        rejectionReason,
      });

      // Refresh the requests list
      setRequests((prev) =>
        prev.map((req) =>
          req.id === requestId
            ? { ...req, status: "rejected", rejectionReason }
            : req
        )
      );
    } catch (err) {
      console.error("Error rejecting voucher request:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-left mb-8 mt-4 text-pri">Voucher Requests</h1>
      {requests.map((request) => (
        <div
          key={request.id}
          className="border p-4 rounded mb-4 shadow-md bg-white"
        >
          <p>
            <strong>Name:</strong> {request.userName}
          </p>
          <p>
            <strong>Justification:</strong> {request.justification}
          </p>
          <p>
            <strong>Status:</strong> {request.status}
          </p>
          {request.status === "pending" && (
            <div className="mt-4">
              {/* Approve Button */}
              <input
                type="number"
                placeholder="Voucher Amount"
                className="border p-2 rounded mr-2"
                id={`approve-${request.id}`}
                onInput={(e) => {
                    e.target.value = e.target.value < 0 ? 0 : e.target.value; // Prevent negative input
                  }}
              />
              <button
                onClick={() =>
                  handleApprove(
                    request.id,
                    request.userId,
                    Number(
                      document.getElementById(`approve-${request.id}`).value
                    )
                  )
                }
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Approve
              </button>

              {/* Reject Button */}
              <input
                type="text"
                placeholder="Rejection Reason"
                className="border p-2 rounded mr-2 mt-2"
                id={`reject-${request.id}`}
              />
              <button
                onClick={() =>
                  handleReject(
                    request.id,
                    document.getElementById(`reject-${request.id}`).value
                  )
                }
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminVoucherRequests;