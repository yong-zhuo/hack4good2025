import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import firebase_app, { db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const auth = getAuth(firebase_app);

export default async function signUp(email, password) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User created");
    } catch (e) {
        console.log(e.message)
        error = e;
    }

    return { result, error };
}

