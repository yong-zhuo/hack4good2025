import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

export const fetchVoucherRequests = async () => {
    try {
      const requestsRef = collection(db, "voucher_requests");
      const querySnapshot = await getDocs(requestsRef);
  
      const requests = await Promise.all(
        querySnapshot.docs.map(async (docSnap) => {
          const requestData = docSnap.data();
          try {
            const userRef = doc(db, "users", requestData.userId);
            const userDoc = await getDoc(userRef);
            const userName = userDoc.exists() ? userDoc.data().name : "Unknown User";
            console.log("Fetched User Name:", userName);
  
            return {
              id: docSnap.id,
              ...requestData,
              userName, // Add user's name to the request object
            };
          } catch (err) {
            console.error(`Error fetching user data for ${requestData.userId}:`, err);
            return {
              id: docSnap.id,
              ...requestData,
              userName: "Error Fetching User", // Fallback if user data can't be fetched
            };
          }
        })
      );
  
      return requests;
    } catch (err) {
      console.error("Error fetching voucher requests:", err);
      throw new Error("Failed to fetch voucher requests");
    }
  };

export const updateVoucherRequest = async (requestId, updatedData) => {
    try {
      const requestRef = doc(db, "voucher_requests", requestId);
      await updateDoc(requestRef, updatedData);
    } catch (err) {
      console.error(`Error updating voucher request ${requestId}:`, err);
      throw new Error(`Failed to update voucher request ${requestId}`);
    }
  };

export const updateUserVoucherBalance = async (userId, balance) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { balance });
    } catch (err) {
      console.error(`Error updating user balance for ${userId}:`, err);
      throw new Error(`Failed to update user balance for ${userId}`);
    }
  };