import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

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