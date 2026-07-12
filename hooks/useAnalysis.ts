// hooks/useAnalysis.ts
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { getLatestAnalysis, getRecentAnalyses, getUserProfile } from "../lib/firestore";

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
