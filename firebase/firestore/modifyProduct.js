import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc, query } from "firebase/firestore";
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

export async function sendRequest(userId, cartItems) {
    try {
        const orderPromises = cartItems.map((item) => addItemToOrder(item, userId));
        await Promise.all(orderPromises);
        await deleteCart(userId);
        return { success: true };
    } catch (error) {
        console.error('Error sending request:', error);
        throw new Error('Error sending request', error);
    }
}

async function addItemToOrder(product, userId) {
    try {
        const orderRef = collection(db, 'orders');
        var today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const time = hours + ':' + minutes
        today = mm + '/' + dd + '/' + yyyy + ' ' + time;

        const userRef = await getDocs(query(collection(db, 'users')));
        const userData = userRef.docs.find((doc) => doc.id === userId);
        const userName = userData.data().name;
        const item =
        {
            name: product.name,
            userRef: userName,
            price: product.price,
            image: product.image,
            productid: product.id,
            description: product.description,
            date: today,
            quantity: product.selectedQuantity,
            status: 'Pending',
            userid: userId
        };
        await addDoc(orderRef, item);
        console.log('Product added to order successfully!');
        return { success: true };
    } catch (error) {
        console.error('Error adding product to order', error);
        return { success: false, error };
    }
}

async function deleteCart(userId) {
    try {
        const cartCollectionRef = collection(db, 'users', userId, 'cart');
        const cartSnapshot = await getDocs(cartCollectionRef);

        const deletePromises = cartSnapshot.docs.map((doc) => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
        console.log('Cart deleted successfully!');
        return { success: true };
    } catch (error) {
        throw new Error('Error deleting cart from user', error);
    }
}
