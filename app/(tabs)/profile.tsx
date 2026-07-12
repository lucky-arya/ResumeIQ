// app/(tabs)/profile.tsx
import { Text, View } from "react-native";
import { BrutalButton } from "../../components/ui/BrutalButton";
import { logOut } from "../../lib/auth";

export default function Profile() {
    return (
        <View className="flex-1 items-center justify-center bg-cream px-6 gap-4">
            <Text className="font-display text-2xl text-ink">Profile</Text>
            <BrutalButton label="Log Out" variant="outline" onPress={() => logOut()} />
        </View>
    );
}