import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export async function getOrders() {
  const orders = [];
  const ordersCollection = collection(db, 'orders');
  const ordersSnapshot = await getDocs(ordersCollection);
  ordersSnapshot.forEach(doc => {
    orders.push(doc.data());
  });
  return orders;
}

export async function getUsers() {
    const users = [];
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    usersSnapshot.forEach(doc => {
        users.push(doc.data());
    });
    return users;
}

export async function setNewProductQuantity(productId, newQuantity) {
  const productRef = doc(db, 'products', productId);
  await updateDoc(productRef, {
    stockQuantity: newQuantity
  });
}

export async function deleteProduct(productId) {
  const productRef = doc(db, 'products', productId);
  await deleteDoc(productRef);
}

export async function deleteUserAccount(userId) {
  try {
    // Delete user document from Firestore
    const userDocRef = doc(db, 'users', userId);
    await deleteDoc(userDocRef);

    // Delete user authentication record from Firebase Authentication
    const user = await auth.getUser
    await deleteUser(user);

    console.log(`User ${userId} deleted successfully!`);
    return { success: true };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, error };
  }
}