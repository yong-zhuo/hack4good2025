import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import firebase_app from "../firebaseConfig";

const auth = getAuth(firebase_app);

export default async function signUp(email, password) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        console.log(e.message)
        error = e;
    }

    return { result, error };
}

