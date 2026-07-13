// lib/auth.ts
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export async function signUp(name: string, email: string, password: string) {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: name });

    // First real Firestore write — this is where users/{uid} gets created
    await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        photoUrl: null,
        plan: "free",
        createdAt: serverTimestamp(),
    });

    return user;
}

export async function logIn(email: string, password: string) {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
}

export async function logOut() {
    await signOut(auth);
}

export async function updateUserName(newName: string) {
    const user = auth.currentUser;
    if (!user) throw new Error("Not authenticated");

    await updateProfile(user, { displayName: newName });
    await updateDoc(doc(db, "users", user.uid), { name: newName });
}