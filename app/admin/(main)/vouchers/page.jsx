"use client";

import React, { useEffect, useState } from "react";
import {
  fetchVoucherRequests,
  updateVoucherRequest,
  updateUserVoucherBalance,
} from "@/firebase/firestore/fetchVoucherRequests";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { Loader2 } from "lucide-react";

const AdminVoucherRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for segregated lists
  const [pendingRequests, setPendingRequests] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchVoucherRequests();
        setRequests(data);

        // Segregate requests into pending, approved, and rejected
        const pending = data.filter((req) => req.status === "pending");
        const approved = data.filter((req) => req.status === "approved");
        const rejected = data.filter((req) => req.status === "rejected");

        setPendingRequests(pending);
        setApprovedRequests(approved);
        setRejectedRequests(rejected);
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
      if (!voucherAmount || isNaN(voucherAmount) || voucherAmount <= 0) {
        alert("Please enter a valid voucher amount greater than 0.");
        return;
      }

      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
      const currentBalance = userDoc.exists() ? userDoc.data().balance || 0 : 0;

      const newBalance = currentBalance + voucherAmount;

      await updateVoucherRequest(requestId, {
        status: "approved",
        vouchersAwarded: voucherAmount,
      });

      await updateUserVoucherBalance(userId, newBalance);

      setRequests((prev) =>
        prev.map((req) =>
          req.id === requestId
            ? { ...req, status: "approved", vouchersAwarded: voucherAmount }
            : req
        )
      );

      // Update segregated lists
      setPendingRequests((prev) =>
        prev.filter((req) => req.id !== requestId)
      );
      setApprovedRequests((prev) => [
        ...prev,
        { id: requestId, status: "approved", vouchersAwarded: voucherAmount },
      ]);

      alert(`Voucher request approved! User's new balance: ${newBalance}`);
    } catch (err) {
      console.error("Error approving voucher request:", err);
    }
  };

  const handleReject = async (requestId, rejectionReason) => {
    try {
      if (!rejectionReason || rejectionReason.trim() === "") {
        alert("Please provide a justification for rejection.");
        return;
      }

      await updateVoucherRequest(requestId, {
        status: "rejected",
        rejectionReason,
      });

      setRequests((prev) =>
        prev.map((req) =>
          req.id === requestId
            ? { ...req, status: "rejected", rejectionReason }
            : req
        )
      );

      // Update segregated lists
      setPendingRequests((prev) =>
        prev.filter((req) => req.id !== requestId)
      );
      setRejectedRequests((prev) => [
        ...prev,
        { id: requestId, status: "rejected", rejectionReason },
      ]);
    } catch (err) {
      console.error("Error rejecting voucher request:", err);
    }
  };

  if (loading) return <p className="flex flex-row justify-center items-center"><Loader2 className="text-pri h-2 w-12"/></p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-left mb-8 mt-4 text-pri">
        Voucher Requests
      </h1>

      {/* Pending Requests */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Pending Requests</h2>
        {pendingRequests.map((request) => (
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
            <div className="mt-4 flex flex-row justify-between items-center">
              <div>
                <input
                  type="number"
                  placeholder="Voucher Amount"
                  className="border p-2 rounded mr-2"
                  id={`approve-${request.id}`}
                  onInput={(e) => {
                    e.target.value = e.target.value < 0 ? 0 : e.target.value;
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
                  className="shadow-md bg-green-400 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Approve
                </button>
              </div>
              <div>
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
                  className="shadow-md bg-red-400 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Approved Requests */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Approved Requests</h2>
        {approvedRequests.map((request) => (
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
              <strong>Vouchers Awarded:</strong> {request.vouchersAwarded}
            </p>
          </div>
        ))}
      </section>

      {/* Rejected Requests */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Rejected Requests</h2>
        {rejectedRequests.map((request) => (
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
              <strong>Rejection Reason:</strong> {request.rejectionReason}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AdminVoucherRequests;