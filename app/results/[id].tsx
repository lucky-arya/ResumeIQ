// app/results/[id].tsx
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Sparkles, Lightbulb, Key, CheckCircle2 } from "lucide-react-native";
import { BrutalCard } from "../../components/ui/BrutalCard";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { BrutalButton } from "../../components/ui/BrutalButton";
import { useAnalysis } from "../../hooks/useAnalysis";
import { SafeAreaView } from "react-native-safe-area-context";

function getTipIcon(iconName: string) {
    const iconColor = "#15130F";
    const iconSize = 18;

    switch (iconName) {
        case "bulb":
        case "💡":
            return <Lightbulb size={iconSize} color={iconColor} />;
        case "key":
        case "🔑":
            return <Key size={iconSize} color={iconColor} />;
        case "check":
        case "✅":
            return <CheckCircle2 size={iconSize} color={iconColor} />;
        default:
            return <Text className="text-base font-bold">{iconName}</Text>;
    }
}

export default function Results() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { data: analysis, isLoading } = useAnalysis(id);

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-cream">
                <ActivityIndicator color="#15130F" size="large" />
            </View>
        );
    }

    if (!analysis) {
        return (
            <View className="flex-1 items-center justify-center bg-cream px-6">
                <Text className="font-display text-lg text-ink text-center">Report Not Found</Text>
                <BrutalButton label="Back to Home" size="sm" onPress={() => router.replace("/home")} />
            </View>
        );
    }

    const { overallScore, tips, fileName } = analysis;
    const averageScore = Math.round(
        (overallScore.conetnt + overallScore.ats + overallScore.keywords + overallScore.formatting) / 4
    );

    return (
        <SafeAreaView className="flex-1 bg-cream" edges={["top"]}>
            <ScrollView className="flex-1 bg-cream" contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Header */}
                <View className="flex-row items-center justify-between px-6 pt-6">
                    <BrutalCard variant="flat" className="w-10 h-10 items-center justify-center p-0" onPress={() => router.back()}>
                        <ArrowLeft size={18} color="#15130F" />
                    </BrutalCard>
                    <Text className="font-mono text-xs font-bold uppercase tracking-widest text-ink">
                        Analysis Report
                    </Text>
                    <View className="w-10" />
                </View>

                {/* Score hero */}
                <View className="px-6 mt-6">
                    <BrutalCard bg="#15130F" className="items-center relative">
                        <View className="absolute -top-3 -left-3 w-12 h-12 bg-green border-[3px] border-ink rounded-brutal-sm rotate-[-10deg] items-center justify-center">
                            <Sparkles size={18} color="#15130F" />
                        </View>
                        <Text className="font-mono text-xs uppercase tracking-widest text-orange font-bold">
                            Overall Score
                        </Text>
                        <Text className="font-mono font-bold text-7xl text-cream mt-3 leading-none">
                            {averageScore}
                        </Text>
                        <Text className="text-cream/70 text-sm font-sans mt-2 text-center" numberOfLines={1}>
                            {fileName}
                        </Text>
                        <View className="w-full mt-4">
                            <ProgressBar value={averageScore} fillColor="bg-orange" trackColor="bg-paper/20" height={12} />
                        </View>
                    </BrutalCard>
                </View>

                {/* Breakdown */}
                <View className="px-6 mt-7">
                    <Text className="font-display text-lg text-ink">Breakdown</Text>
                    <View className="gap-3 mt-3">
                        <BrutalCard variant="flat">
                            <ProgressBar value={overallScore.conetnt} label="Content Quality" showValue fillColor="bg-green" />
                        </BrutalCard>
                        <BrutalCard variant="flat">
                            <ProgressBar value={overallScore.ats} label="ATS Compatibility" showValue fillColor="bg-green" />
                        </BrutalCard>
                        <BrutalCard variant="flat">
                            <ProgressBar value={overallScore.keywords} label="Keyword Match" showValue fillColor="bg-orange" />
                        </BrutalCard>
                        <BrutalCard variant="flat">
                            <ProgressBar value={overallScore.formatting} label="Formatting" showValue fillColor="bg-green" />
                        </BrutalCard>
                    </View>
                </View>

                {/* Tips */}
                <View className="px-6 mt-7">
                    <Text className="font-display text-lg text-ink">Smart Tips</Text>
                    <View className="gap-3 mt-3">
                        {tips.map((tip, i) => (
                            <BrutalCard key={i} variant="flat" bg={i % 2 === 0 ? "#C9AEF5" : "#A9B8F2"} className="flex-row items-center gap-3">
                                <View className="w-9 h-9 rounded-full bg-paper border-2 border-ink items-center justify-center">
                                    {getTipIcon(tip.icon)}
                                </View>
                                <Text className="flex-1 text-sm font-sans text-ink">{tip.text}</Text>
                            </BrutalCard>
                        ))}
                    </View>
                </View>

                <View className="px-6 mt-7">
                    <BrutalButton label="Back to Home" variant="dark" onPress={() => router.replace("/home")} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}