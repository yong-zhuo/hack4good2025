import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function getProductStockQuantity(productId) {
    const productRef = doc(db, 'products', productId);
    const productDoc = await getDoc(productRef);
    return productDoc.data().stockQuantity;
}

export async function removeFromCart(userId, productId) {
    try {
        const cartItemRef = doc(db, 'users', userId, 'cart', productId);
        await deleteDoc(cartItemRef);
        console.log('Product removed from cart successfully!');
        return { success: true };
    } catch (error) {
        console.error('Error removing product from cart:', error);
        return { success: false, error };
    }
}

export async function setProductQuantity(userId, productId, quantity) {
    try {
        const cartItemRef = doc(db, 'users', userId, 'cart', productId);
        await updateDoc(cartItemRef, { selectedQuantity: quantity });
        console.log('Product quantity updated successfully!');
        return { success: true };
    } catch (error) {
        console.error('Error updating product quantity:', error);
        return { success: false, error };
    }
}

export async function sendRequest(userId, cartItems, cartId) {
    try {
        const cartItemRef = doc(db, 'users', userId, 'cart', productId);
        await updateDoc(cartItemRef, { requested: true });
        return { success: true };
    } catch (error) {
        console.error('Error sending request:', error);
        throw new Error('Error sending request', error);
    }
}

async function addItemToOrder(product) {
    try {
        const orderRef = collection(db, 'orders');
        var today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        const product = 
        {   name: product.name, 
            price: product.price, 
            image: product.image, 
            description: product.description,
            date: today,
            quantity: product.selectedQuantity,
            status: 'pending'
        };
        await addDoc(orderRef, product);
        console.log('Product added to order successfully!');
        return { success: true };
    } catch (error) {
        console.error('Error adding product to order', error);
        return { success: false, error };
    }
}

async function deleteCart(userId, cartId) {
    try {
        const cartRef = doc(db, 'users', userId, 'cart', cartId);
        await deleteDoc(cartRef);
        console.log('Cart deleted successfully!');
        return { success: true };
    } catch (error) {
        throw new Error('Error deleting cart from user', error);
    }
}