import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import {firebase_app, db} from "../utils/firebase";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(firebase_app);


export const signUp = async(email: string, password: string) => {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);

        const userDoc = {
            email: result.user.email,
            isAdmin: 'false'
        }

        const usersCollection = collection(db, 'users'); // Assuming you have initialized the Firestore 'db' instance
    const userDocRef = doc(usersCollection, result.user.uid); // Use UID as document ID
    await setDoc(userDocRef, userDoc);

    } catch (e: any) {
        error = e.message;
    }

    return { result, error };
}


export const signIn = async (email: string, password: string) => {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
        error = e.message;
    }

    return { result, error };
}

export const logout = () => {
    auth.signOut()
    window.location.pathname = '/'
    
}