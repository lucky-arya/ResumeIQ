// app/index.tsx
import { useAuthStore } from "@/store/authStore";
import { Redirect } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user, initializing } = useAuthStore();

  if (initializing) {
    return (
      <SafeAreaView className="bg-cream  felx-1 h-full items-center justify-center">
        <ActivityIndicator color="#15130F" size="large" />
      </SafeAreaView>
    )
  }
  return (

    <Redirect href={user ? "/home" : "/login" as any} />
  );
}
