// app/(tabs)/history.tsx
import { Text, View } from "react-native";

export default function History() {
    return (
        <View className="flex-1 items-center justify-center bg-cream px-6">
            <Text className="font-display text-2xl text-ink">History</Text>
            <Text className="font-sans text-ink-soft mt-2">Past reports go here</Text>
        </View>
    );
}