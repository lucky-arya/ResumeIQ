// app/(tabs)/history.tsx
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { BrutalCard } from "../../components/ui/BrutalCard";
import { useAnalysesHistory } from "../../hooks/useAnalysis";
import { Analysis } from "../../lib/firestore";

export default function History() {
    const router = useRouter();
    const { data: analyses, isLoading } = useAnalysesHistory();

    const getAverageScore = (scoreObj: Analysis['overallScore']) => {
        if (!scoreObj) return 0;
        const content = scoreObj.conetnt ?? 0;
        const ats = scoreObj.ats ?? 0;
        const keywords = scoreObj.keywords ?? 0;
        const formatting = scoreObj.formatting ?? 0;
        return Math.round((content + ats + keywords + formatting) / 4);
    };

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-cream">
                <ActivityIndicator color="#15130F" />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-cream">
            <View className="px-6 pt-6 pb-2">
                <Text className="font-display text-3xl text-ink leading-none">Past Reports</Text>
                <Text className="mt-2 text-ink-soft font-sans">
                    Every resume you've analyzed, all in one place.
                </Text>
            </View>

            <FlatList
                data={analyses}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 24, gap: 16 }}
                ListEmptyComponent={
                    <BrutalCard className="items-center py-10 gap-2">
                        <Text className="font-display text-lg text-ink">Nothing Here Yet</Text>
                        <Text className="font-sans text-ink-soft text-center text-sm">
                            Your analyzed resumes will show up here.
                        </Text>
                    </BrutalCard>
                }
                renderItem={({ item }: { item: Analysis }) => (
                    <BrutalCard
                        variant="flat"
                        className="flex-row items-center gap-4"
                        onPress={() => router.push(`/results/${item.id}` as any)}
                    >
                        <View className="w-14 h-14 rounded-brutal-sm border-[3px] border-ink bg-orange items-center justify-center">
                            <Text className="font-mono font-bold text-lg text-ink">
                                {getAverageScore(item.overallScore)}
                            </Text>
                        </View>
                        <View className="flex-1">
                            <Text className="font-sans font-bold text-ink" numberOfLines={1}>
                                {item.fileName}
                            </Text>
                            <Text className="text-xs text-ink-soft font-sans mt-0.5">
                                {item.createdAt?.toDate?.().toLocaleDateString() ?? "Just now"}
                            </Text>
                        </View>
                        <ChevronRight size={18} color="#15130F" />
                    </BrutalCard>
                )}
            />
        </View>
    );
}