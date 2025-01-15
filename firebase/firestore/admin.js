export async function getOrders() {
  const orders = [];
  const ordersCollection = collection(db, 'orders');
  const ordersSnapshot = await getDocs(ordersCollection);
  ordersSnapshot.forEach(doc => {
    orders.push(doc.data());
  });
  return orders;
}