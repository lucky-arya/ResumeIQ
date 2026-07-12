// app/(tabs)/home.tsx
import { Text, View } from "react-native";

export default function Home() {
    return (
        <View className="flex-1 items-center justify-center bg-cream px-6">
            <Text className="font-display text-2xl text-ink">Home</Text>
            <Text className="font-sans text-ink-soft mt-2">Dashboard goes here</Text>
        </View>
    );
}