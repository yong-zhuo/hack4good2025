import { getAuth, signOut } from "firebase/auth";
import firebase_app from "../firebaseConfig";

const auth = getAuth(firebase_app);

export async function logOut() {
    let result = null,
        error = null;
    try {
        await signOut(auth).then(() => { result = { response: "ok" } });
    } catch (e) {
        error = e;
    }
    return { result, error };
}

export default logOut;

