import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';

/**
 * Add a product to the user's cart (subcollection under users)
 * @param {string} userId - The ID of the user
 * @param {object} product - The product object (contains name, price, image, etc.)
 */
export const addToCart = async (userId, product) => {
  try {
    // Reference to the user's cart subcollection
    const cartCollectionRef = collection(db, 'users', userId, 'cart');
    const productRef = doc(cartCollectionRef, product.productId);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      // If the product doesn't exist in the cart, add it
      await setDoc(productRef, {
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        selectedQuantity: product.quantity,
      });
    } else {
      // If the product exists, update the quantity
      const currentData = productSnap.data();
      const newQuantity = currentData.selectedQuantity + (product.quantity);
      await updateDoc(productRef, { selectedQuantity: newQuantity });
    }

    console.log('Product added to cart successfully!');
    return { success: true };
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return { success: false, error };
  }
};