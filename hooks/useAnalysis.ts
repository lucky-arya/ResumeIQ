// hooks/useAnalysis.ts
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { getLatestAnalysis, getRecentAnalyses, getUserProfile, getAnalysisById, Analysis } from "../lib/firestore";
export const useLatestAnalysis = () => {
    const uid = useAuthStore((s) => s.user?.uid);
    return useQuery({
        queryKey: ["latestAnalysis", uid],
        queryFn: () => uid ? getLatestAnalysis(uid) : null,
        enabled: !!uid,
    })
}



export const useAnalysesHistory = () => {
    const uid = useAuthStore((s) => s.user?.uid);
    return useQuery({
        queryKey: ["analysesHistory", uid],
        queryFn: () => uid ? getRecentAnalyses(uid!, 3) : [],
        enabled: !!uid,
    })
}

export const useUserProfile = () => {
    const uid = useAuthStore((s) => s.user?.uid);
    return useQuery({
        queryKey: ["userProfile", uid],
        queryFn: () => uid ? getUserProfile(uid!) : null,
        enabled: !!uid,
    })
}


export function useAnalysis(id: string | undefined) {
    return useQuery({
        queryKey: ["analysis", id],
        queryFn: () => getAnalysisById(id!),
        enabled: !!id,
    });
}



// Option A: Accept the full overallScore object type
export const getAverageScore = (scoreObj: Analysis['overallScore']) => {
    if (!scoreObj) return 0;
    return Math.round(
        ((scoreObj.conetnt ?? 0) +
            (scoreObj.ats ?? 0) +
            (scoreObj.keywords ?? 0) +
            (scoreObj.formatting ?? 0)) / 4
    );
};

export function useProfileStats() {
    const { data: analyses, isLoading } = useAnalysesHistory();

    const stats = {
        totalScans: analyses?.length ?? 0,
        bestScore: analyses?.length ? Math.max(...analyses.map((a) => getAverageScore(a.overallScore))) : 0,
        uniqueResumes: analyses ? new Set(analyses.map((a) => a.fileName)).size : 0,
    };

    return { stats, isLoading };
}

