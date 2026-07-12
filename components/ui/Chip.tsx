// components/ui/Chip.tsx
import { Pressable, Text } from "react-native";

interface ChipProps {
    label: string;
    active?: boolean;
    onPress?: () => void;
    variant?: "default" | "solid"; // solid = filled badge like "Pro Member", default = filter pill
    bg?: string; // tailwind bg class override
}

export function Chip({ label, active = false, onPress, variant = "default", bg }: ChipProps) {
    const background = bg ?? (active ? "bg-orange" : "bg-paper");

    if (variant === "solid") {
        return (
            <Text className={`${bg ?? "bg-orange"} font-mono text-[10px] font-bold uppercase px-2 py-1 border-[2px] border-ink rounded-full self-start`}>
                {label}
            </Text>
        );
    }

    return (
        <Pressable
            onPress={onPress}
            className={`${background} border-[3px] border-ink rounded-full px-4 py-2 ${active ? "shadow-none" : ""}`}
        >
            <Text className="font-mono text-xs font-bold uppercase text-ink">{label}</Text>
        </Pressable>
    );
}