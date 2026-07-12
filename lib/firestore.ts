import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "./firebase";



export interface UserProfile {
    name: string;
    email: string;
    photoUrl: string | null;
    paln: string;
    createdAt: any;
}

export interface Analysis {
    id: string;
    uid: string;
    resumeId: string;
    fileName: string;
    overallScore: { conetnt: number; ats: number; keywords: number; formatting: number };
    tips: { icon: string; text: string }[];
    createdAt: any;

}

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as UserProfile;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error getting user profile:", error);
        return null;
    }
}


export const getRecentAnalyses = async (uid: string, limitCount = 3): Promise<Analysis[]> => {
    try {
        const userRef = doc(db, "users", uid);
        const q = query(collection(db, "analyses"), where("userRef", "==", userRef), orderBy("createdAt", "desc"), limit(limitCount));
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Analysis));
    } catch (error) {
        console.error("Error getting recent analyses:", error);
        return [];
    }
}

export const getLatestAnalysis = async (uid: string): Promise<Analysis | null> => {
    try {
        const result = await getRecentAnalyses(uid, 1);
        return result[0] ?? null;
    } catch (error) {
        console.error("Error getting latest analysis:", error);
        return null;
    }
}