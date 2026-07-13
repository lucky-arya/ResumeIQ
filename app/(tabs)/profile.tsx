// app/(tabs)/profile.tsx
import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { User, CreditCard, ShieldCheck, LogOut, ChevronRight, Settings } from "lucide-react-native";
import { BrutalCard } from "../../components/ui/BrutalCard";
import { BrutalButton } from "../../components/ui/BrutalButton";
import { EditNameSheet } from "../../components/features/EditNameSheet";
import { useUserProfile, useProfileStats } from "../../hooks/useAnalysis";
import { logOut } from "../../lib/auth";

export default function Profile() {
    const { data: profile, isLoading: profileLoading } = useUserProfile();
    const { stats } = useProfileStats();
    const [editVisible, setEditVisible] = useState(false);

    const initial = profile?.name ? profile.name.charAt(0).toUpperCase() : "?";

    return (
        <ScrollView className="flex-1 bg-cream" contentContainerStyle={{ paddingBottom: 40 }}>
            <View className="flex-row items-center justify-between px-6 pt-6">
                <Text className="font-display text-3xl text-ink leading-none">Profile</Text>
            </View>

            {/* Identity card */}
            <View className="px-6 mt-4">
                <BrutalCard variant="flat" className="flex-row items-center gap-4">
                    <View className="w-16 h-16 rounded-full bg-blue border-[3px] border-ink items-center justify-center">
                        <Text className="font-display text-lg text-ink">{initial}</Text>
                    </View>
                    <View className="flex-1">
                        <Text className="font-display text-lg text-ink" numberOfLines={1}>
                            {profileLoading ? "..." : profile?.name}
                        </Text>
                        <Text className="text-sm text-ink-soft font-sans" numberOfLines={1}>
                            {profile?.email}
                        </Text>
                        <Text className="mt-2 font-mono text-[10px] font-bold uppercase self-start px-2 py-1 bg-orange border-[2px] border-ink rounded-full">
                            {profile?.plan === "free" ? "Free Plan" : profile?.plan}
                        </Text>
                    </View>
                </BrutalCard>
            </View>

            {/* Stats */}
            <View className="px-6 mt-5 flex-row gap-3">
                <BrutalCard variant="flat" className="flex-1 items-center">
                    <Text className="font-mono font-bold text-xl text-ink">{stats.totalScans}</Text>
                    <Text className="text-[11px] text-ink-soft font-sans font-bold mt-1">Total Scans</Text>
                </BrutalCard>
                <BrutalCard variant="flat" bg="bg-green-light" className="flex-1 items-center">
                    <Text className="font-mono font-bold text-xl text-ink">{stats.bestScore}</Text>
                    <Text className="text-[11px] text-ink-soft font-sans font-bold mt-1">Best Score</Text>
                </BrutalCard>
                <BrutalCard variant="flat" className="flex-1 items-center">
                    <Text className="font-mono font-bold text-xl text-ink">{stats.uniqueResumes}</Text>
                    <Text className="text-[11px] text-ink-soft font-sans font-bold mt-1">Resumes</Text>
                </BrutalCard>
            </View>

            {/* Account */}
            <View className="px-6 mt-7">
                <Text className="font-mono text-xs font-bold uppercase tracking-widest text-ink-soft">Account</Text>
                <BrutalCard variant="flat" className="mt-3 p-0 overflow-hidden">
                    <TouchableOpacity activeOpacity={0.7} className="flex-row items-center gap-3 px-4 py-4 border-b-[3px] border-ink" onPress={() => setEditVisible(true)}>
                        <User size={20} color="#15130F" />
                        <Text className="flex-1 font-sans font-bold text-sm text-ink">Edit Profile</Text>
                        <ChevronRight size={16} color="#15130F" />
                    </TouchableOpacity>
                    <View className="flex-row items-center gap-3 px-4 py-4 border-b-[3px] border-ink">
                        <CreditCard size={20} color="#15130F" />
                        <Text className="flex-1 font-sans font-bold text-sm text-ink">Subscription & Billing</Text>
                        <ChevronRight size={16} color="#15130F" />
                    </View>
                    <View className="flex-row items-center gap-3 px-4 py-4">
                        <ShieldCheck size={20} color="#15130F" />
                        <Text className="flex-1 font-sans font-bold text-sm text-ink">Privacy & Security</Text>
                        <ChevronRight size={16} color="#15130F" />
                    </View>
                </BrutalCard>
            </View>

            <View className="px-6 mt-7">
                <BrutalButton
                    label="Log Out"
                    variant="outline"
                    onPress={() => logOut()}
                    icon={<LogOut size={18} color="#E5484D" />}
                />
            </View>

            <EditNameSheet
                visible={editVisible}
                currentName={profile?.name ?? ""}
                onClose={() => setEditVisible(false)}
            />
        </ScrollView>
    );
}