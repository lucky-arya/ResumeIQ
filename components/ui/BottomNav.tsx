// components/ui/BottomNav.tsx
import { usePathname, useRouter } from "expo-router";
import { FileSearch, History, Home, User } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

const TABS = [
    { href: "/home", label: "Home", icon: Home },
    { href: "/analyze", label: "Analyze", icon: FileSearch },
    { href: "/history", label: "History", icon: History },
    { href: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <View className="bg-cream border-t-[3px] border-ink flex-row px-3 py-3 gap-2 z-50">
            {TABS.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                    <Pressable
                        key={href}
                        onPress={() => router.push(href as any)}
                        className={`flex-1 items-center gap-1 py-2 rounded-brutal-sm ${active ? "bg-orange border-[3px] border-ink" : ""
                            }`}
                    >
                        <Icon size={20} color="#15130F" strokeWidth={2} />
                        <Text className="font-sans font-bold text-xs text-ink">{label}</Text>
                    </Pressable>
                );
            })}
        </View>
    );
}