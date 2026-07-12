import { BrutalButton } from '@/components/ui/BrutalButton';
import { BrutalCard } from '@/components/ui/BrutalCard';
import { useAnalysesHistory, useUserProfile } from '@/hooks/useAnalysis';
import { Analysis } from '@/lib/firestore';
import { useRouter } from 'expo-router';
import { ChevronRight, Sparkle } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
    const router = useRouter();

    const { data: profile, isLoading: profileLoading } = useUserProfile();
    const { data: analyses, isLoading: analysesLoading } = useAnalysesHistory();

    const firstName = profile?.name?.split(" ")[0] ?? "there";
    const latest = analyses?.[0] ?? null;
    const recent = analyses?.slice(0, 5) ?? [];

    const getAverageScore = (scoreObj: Analysis['overallScore']) => {
        if (!scoreObj) return 0;
        const content = scoreObj.conetnt ?? 0;
        const ats = scoreObj.ats ?? 0;
        const keywords = scoreObj.keywords ?? 0;
        const formatting = scoreObj.formatting ?? 0;
        return Math.round((content + ats + keywords + formatting) / 4);
    };

    return (
        <SafeAreaView className="flex-1 bg-cream" edges={['top']}>
            <FlatList
                className="flex-1 bg-cream"
                data={recent}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 24 }}
                ListHeaderComponent={
                    <>
                        {/* Header */}
                        <View className="flex-row items-center justify-between px-6 pb-4">
                            <View>
                                <Text className="font-mono text-xs text-ink-soft font-bold uppercase tracking-wide">
                                    Good to see you
                                </Text>
                                <Text className="font-display text-2xl text-ink mt-0.5">
                                    {profileLoading ? "Loading..." : firstName}
                                </Text>
                            </View>
                            <View className="w-12 h-12 rounded-full bg-blue border-[3px] border-ink flex items-center justify-center">
                                <Text className="font-display font-bold text-sm text-ink">
                                    {profile?.name ? profile.name.charAt(0).toUpperCase() : "?"}
                                </Text>
                            </View>
                        </View>

                        {/* Score Card */}
                        <View className="px-6">
                            {analysesLoading ? (
                                <BrutalCard className="items-center py-10">
                                    <ActivityIndicator size="large" color="#15130F" />
                                </BrutalCard>
                            ) : latest ? (
                                <BrutalCard bg="#15130F" className="relative">
                                    <View className="absolute top-4 right-4">
                                        <Sparkle size={24} strokeWidth={3} color="#F5841F" />
                                    </View>
                                    <Text className="font-mono text-xs uppercase tracking-widest text-orange font-bold">
                                        Latest Resume Score
                                    </Text>
                                    <View className="flex-row items-end gap-2 mt-2">
                                        <Text className="text-6xl font-mono font-bold leading-none text-cream pt-1">
                                            {getAverageScore(latest.overallScore)}
                                        </Text>
                                        <Text className="font-mono text-xl mb-1 text-cream/60">/100</Text>
                                    </View>

                                    <Text className="mt-2 text-cream/70 text-sm font-sans" numberOfLines={1}>
                                        {latest.fileName}
                                    </Text>
                                    <View className="mt-4">
                                        <BrutalButton
                                            label="View Full Report"
                                            variant="primary"
                                            size="sm"
                                            onPress={() => router.push(`/results/${latest.id}` as any)}
                                        />
                                    </View>
                                </BrutalCard>
                            ) : (
                                <BrutalCard className="items-center py-8 gap-3">
                                    <Text className="font-display text-lg text-ink text-center">No Analysis Yet</Text>
                                    <Text className="font-sans text-ink-soft text-center text-sm">
                                        Upload your resume to get your first instant score.
                                    </Text>
                                    <BrutalButton label="Analyze Resume" onPress={() => router.push("/analyze")} />

                                </BrutalCard>
                            )}
                        </View>

                        {/* Quick actions */}
                        <View className="px-6 mt-7">
                            <Text className="font-display text-lg text-ink">Quick Actions</Text>
                            <View className="flex-row gap-4 mt-3">
                                <BrutalCard
                                    variant="flat"
                                    bg="#F5841F"
                                    className="flex-1 gap-6"
                                    onTouchEnd={() => router.push("/analyze")}
                                >
                                    <Text className="font-sans font-bold text-ink">New Analysis</Text>
                                </BrutalCard>
                                <BrutalCard
                                    variant="flat"
                                    bg="#A9B8F2"
                                    className="flex-1 gap-6"
                                    onTouchEnd={() => router.push("/history")}
                                >
                                    <Text className="font-sans font-bold text-ink">Past Reports</Text>
                                </BrutalCard>
                            </View>
                        </View>

                        {/* Recent activity heading — only show if there's something to head */}
                        {recent.length > 0 && (
                            <View className="flex-row items-center justify-between px-6 mt-7 mb-3">
                                <Text className="font-display text-lg text-ink">Recent Activity</Text>
                                <Text
                                    className="font-mono text-xs font-bold underline text-ink"
                                    onPress={() => router.push("/history")}
                                >
                                    SEE ALL
                                </Text>
                            </View>
                        )}
                    </>
                }
                renderItem={({ item }: { item: Analysis }) => (
                    <View className="px-6 mb-3">
                        <BrutalCard
                            variant="flat"
                            className="flex-row items-center gap-4"
                            onTouchEnd={() => router.push(`/results/${item.id}` as any)}
                        >
                            <View className="w-12 h-12 rounded-brutal-sm border-[3px] border-ink bg-orange items-center justify-center">
                                <Text className="font-mono font-bold text-sm text-ink">
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
                    </View>
                )}
            />
        </SafeAreaView >
    );
};

export default Home;