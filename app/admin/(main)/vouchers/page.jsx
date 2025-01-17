"use client";

import React, { useEffect, useState } from "react";
import {
  fetchVoucherRequests,
  updateVoucherRequest,
  updateUserVoucherBalance,
} from "@/firebase/firestore/fetchVoucherRequests";
import { doc, getDoc, collection, getDocs, updateDoc, addDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export const dynamic = 'force-dynamic';

const AdminVoucherRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for segregated lists
  const [pendingRequests, setPendingRequests] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);


  // States for Reward Vouchers Feature
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [rewardAmount, setRewardAmount] = useState(0);
  const [rewardJustification, setRewardJustification] = useState("");

  const { toast } = useToast();
  const router = useRouter();


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch voucher requests
        const data = await fetchVoucherRequests();
        setRequests(data);
    
        // Segregate requests into pending, approved, and rejected
        const pending = data.filter((req) => req.status === "pending");
        const approved = data.filter((req) => req.status === "approved");
        const rejected = data.filter((req) => req.status === "rejected");
    
        setPendingRequests(pending);
        setApprovedRequests(approved);
        setRejectedRequests(rejected);
    
        // Fetch users for the dropdown
        const usersRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersRef);
        const usersList = usersSnapshot.docs.map((doc) => ({
          userId: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched Users:", usersList); // Debugging
        setUsers(usersList);
      } catch (err) {
        console.error("Error fetching data:", err);
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

      toast({
        variant: "success",
        title: "Voucher Request Approved",
        description: `Voucher request has been approved. ${voucherAmount} vouchers awarded to user.`,
      });
      router.refresh();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error approving voucher request",
      });
      router.refresh();
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

      toast({
        variant: "success",
        title: "Voucher Request Rejected",
        description: `Voucher request has been rejected.`,
      });
      router.refresh();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error rejecting voucher request",
      });
      router.refresh();
    }
  };

  const handleRewardVouchers = async () => {
    try {
      if (!selectedUserId || rewardAmount <= 0 || !rewardJustification.trim()) {
        alert("Please fill in all fields with valid values.");
        return;
      }
  
      // Fetch the user's current balance
      const userRef = doc(db, "users", selectedUserId);
      const userDoc = await getDoc(userRef);
      const currentBalance = userDoc.exists() ? userDoc.data().balance || 0 : 0;
  
      // Update the user's balance
      const newBalance = currentBalance + rewardAmount;
      await updateDoc(userRef, { balance: newBalance });
  
      // Log the reward in the `voucher_requests` collection
      const requestRef = collection(db, "voucher_requests");
      await addDoc(requestRef, {
        userId: selectedUserId,
        justification: rewardJustification,
        vouchersAwarded: rewardAmount,
        status: "approved", // Automatically approved as it's a reward
        timestamp: new Date(),
      });
  
      alert(`Successfully rewarded ${rewardAmount} vouchers to User ID: ${selectedUserId}`);
      setRewardAmount(0); // Reset form fields
      setRewardJustification("");
      setSelectedUserId("");
  
      // Refresh requests state to include the new reward
      const data = await fetchVoucherRequests();
      setRequests(data);
  
      // Update segregated lists
      const pending = data.filter((req) => req.status === "pending");
      const approved = data.filter((req) => req.status === "approved");
      const rejected = data.filter((req) => req.status === "rejected");
  
      setPendingRequests(pending);
      setApprovedRequests(approved);
      setRejectedRequests(rejected);
    } catch (err) {
      console.error("Error rewarding vouchers:", err);
      alert("Failed to reward vouchers. Please try again.");
    }
  };

  if (loading) return <p className="flex flex-row justify-center items-center"><Loader2 className="text-pri h-2 w-12"/></p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-left mb-8 mt-4 text-pri">
        Voucher Requests
      </h1>

      {/* Reward Vouchers Section */}
      <section className="bg-white p-6 rounded shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Reward Vouchers to a User</h2>
        <div className="flex flex-col gap-4">
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select a User</option>
            {users.map((user) => (
              <option key={user.userId} value={user.userId}>
                {user.name} ({user.userId})
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Voucher Amount"
            className="border p-2 rounded mr-2"
            value={rewardAmount === 0 ? "" : rewardAmount}
            onChange={(e) => setRewardAmount(Number(e.target.value))}
            onInput={(e) => {
              e.target.value = e.target.value < 0 ? 0 : e.target.value;
            }}
          />

          <textarea
            value={rewardJustification}
            onChange={(e) => setRewardJustification(e.target.value)}
            placeholder="Justification"
            className="border p-2 rounded"
            rows="4"
          ></textarea>

          <div className="flex justify-end">
            <button
              onClick={handleRewardVouchers}
              className="shadow-md bg-green-400 text-white px-4 py-2 rounded hover:bg-green-600 w-64"
            >
              Reward Vouchers
            </button>
          </div>
        </div>
      </section>

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