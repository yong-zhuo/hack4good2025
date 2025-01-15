"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
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
  const { toast } = useToast();

  useEffect(() => {
    const fetchVoucherBalance = async () => {
      try {
        if (!user || !user.uid) {
          throw new Error("User ID is missing.");
        }

        console.log("Fetching balance for User ID:", user.uid); // Debug log
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setBalance(userData.balance || 0); // Default to 0 if no balance
        } else {
          throw new Error("User document not found in Firestore.");
        }
      } catch (err) {
        console.error("Error fetching voucher balance:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchVoucherBalance();
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
    } catch (err) {
      console.error("Error submitting voucher request:", err);
      setRequestStatus("Failed to submit the request. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-6xl font-bold text-left mb-8 mt-4 text-pri">My Vouchers</h1>
        <div className="bg-white p-6 rounded shadow-md">
          <p className="text-lg mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  // for debugging
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
      <div className="bg-white p-6 rounded-lg shadow-md">
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
    </div>
  );
};

export default Vouchers;