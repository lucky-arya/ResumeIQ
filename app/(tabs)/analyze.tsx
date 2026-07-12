// app/(tabs)/analyze.tsx
import { Text, View } from "react-native";

export default function Analyze() {
    return (
        <View className="flex-1 items-center justify-center bg-cream px-6">
            <Text className="font-display text-2xl text-ink">Analyze</Text>
            <Text className="font-sans text-ink-soft mt-2">Upload flow goes here</Text>
        </View>
    );
}