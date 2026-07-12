import { BottomNav } from "@/components/ui/BottomNav";
import { useAuthStore } from "@/store/authStore";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TabsLayout = () => {

    const { user, initializing } = useAuthStore();

    if (initializing) {
        return (
            <SafeAreaView className="bg-cream  felx-1 h-full items-center justify-center">
                <ActivityIndicator color="#15130F" size="large" />
            </SafeAreaView>
        )
    }

    if (!user) {
        return <Redirect href="/login" />
    }

    return (
        <SafeAreaView className="flex-1 bg-cream" edges={["top"]}>
            <View className="flex-1">
                <Slot />
            </View>
            <BottomNav />
        </SafeAreaView>
    );
}

export default TabsLayout