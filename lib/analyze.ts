// lib/analyze.ts
import { auth } from "./firebase";
import { uploadResumeToCloudinary, removeFromCloudinary } from "./cloudinary";
import { saveAnalysis } from "./firestore";

const ANALYZE_ENDPOINT = process.env.EXPO_PUBLIC_ANALYZE_API_URL!;

export interface AnalyzeResumeParams {
    file: { uri: string; name: string; mimeType?: string };
    jobDescription?: string;
}

export async function analyzeResume({ file, jobDescription }: AnalyzeResumeParams) {
    const uploadResult = await uploadResumeToCloudinary(file);

    try {
        const currentUser = auth.currentUser;
        if (!currentUser) throw new Error("Not authenticated");

        const idToken = await currentUser.getIdToken();

        const response = await fetch(ANALYZE_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
            body: JSON.stringify({ fileUrl: uploadResult.secure_url, fileName: file.name, jobDescription }),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Analysis failed: ${errorBody}`);
        }

        const result = await response.json();

        const analysisId = await saveAnalysis({
            uid: currentUser.uid,
            fileName: result.fileName,
            overallScore: {
                conetnt: result.breakdown.content,
                ats: result.breakdown.ats,
                keywords: result.breakdown.keywords,
                formatting: result.breakdown.formatting,
            },
            tips: result.tips,
        });

        return analysisId;
    } finally {
        if (uploadResult.delete_token) {
            try {
                await removeFromCloudinary(uploadResult.delete_token);
            } catch (err) {
                console.error("Failed to remove temporary file from Cloudinary:", err);
            }
        }
    }
}