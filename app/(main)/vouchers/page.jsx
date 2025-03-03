"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Vouchers = () => {
  const { user } = useAuthContext();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [justification, setJustification] = useState(""); // For the textbox
  const [requestStatus, setRequestStatus] = useState(null); // To show success/error messages
  const [requestsHistory, setRequestsHistory] = useState([]); // State to hold the user's request history
  const { toast } = useToast();

  useEffect(() => {
    const fetchVoucherData = async () => {
      try {
        if (!user || !user.uid) {
          throw new Error("User ID is missing.");
        }

        console.log("Fetching data for User ID:", user.uid);

        // Fetch balance
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setBalance(userData.balance || 0); // Default to 0 if no balance
        } else {
          throw new Error("User document not found in Firestore.");
        }

        // Fetch voucher requests history
        const requestsRef = collection(db, "voucher_requests");
        const q = query(requestsRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const history = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequestsHistory(history);
      } catch (err) {
        console.error("Error fetching voucher data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchVoucherData();
    }
  }, [user]);

  const handleRequestVoucher = async () => {
    try {
      if (!justification.trim()) {
        setRequestStatus("Please provide a justification for your request.");
        return;
      }

      if (!user || !user.uid) {
        throw new Error("User ID is missing.");
      }

      // Add the voucher request to the Firestore `voucher_requests` collection
      const requestRef = collection(db, "voucher_requests");
      await addDoc(requestRef, {
        userId: user.uid,
        justification,
        status: "pending", // Default status
        timestamp: new Date(), // Request time
      });

      setRequestStatus("Your request has been submitted successfully!");
      setJustification(""); // Clear the textbox
      // Refresh history after submitting the request
      const fetchHistory = async () => {
        const requestsRef = collection(db, "voucher_requests");
        const q = query(requestsRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const history = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequestsHistory(history);
      };
      await fetchHistory();
    } catch (err) {
      console.error("Error submitting voucher request:", err);
      setRequestStatus("Failed to submit the request. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-left mb-8 mt-4 text-pri">My Vouchers</h1>
        <div className="bg-white p-6 rounded shadow-md">
          <p className="text-lg mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="">
        <h1 className="text-6xl font-bold text-left mb-8 mt-4 text-pri">My Vouchers</h1>
        <div className="bg-white p-6 rounded shadow-md">
          <p className="text-lg mt-2 text-red-500">
            Error: {error}. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="text-6xl font-bold text-left mb-8 mt-4 text-pri">My Vouchers</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-pri">Voucher Balance</h2>
        <p className="text-lg mt-2">{balance} Vouchers</p>
      </div>

      {/* Request Voucher Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-pri">Request Additional Vouchers</h2>
        <div className="flex flex-col justify-end items-end">
          <textarea
            className="w-full p-2 border rounded mb-4"
            rows="4"
            placeholder="Provide your justification for requesting additional vouchers..."
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
          ></textarea>
          <Button
            onClick={handleRequestVoucher}
            className="bg-pri text-white rounded-lg hover:bg-slate-500 shadow-md"
          >
            Submit Request
          </Button>
        </div>
        {requestStatus && (
          <p className="mt-4 text-sm text-gray-600">{requestStatus}</p>
        )}
      </div>

      {/* Request History Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-pri">Request History</h2>
        {requestsHistory.length === 0 ? (
          <p className="text-gray-600">No voucher requests found.</p>
        ) : (
          <ul>
            {requestsHistory.map((request) => (
              <li key={request.id} className="border p-4 rounded mb-4 shadow-sm">
                <p>
                  <strong>Justification:</strong> {request.justification}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </p>
                {request.status === "approved" && (
                  <p>
                    <strong>Vouchers Awarded:</strong> {request.vouchersAwarded || "N/A"}
                  </p>
                )}
                {request.status === "rejected" && (
                  <p>
                    <strong>Rejection Reason:</strong> {request.rejectionReason || "N/A"}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Vouchers;