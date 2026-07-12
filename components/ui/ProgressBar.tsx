// components/ui/ProgressBar.tsx
import { Text, View } from "react-native";

interface ProgressBarProps {
    value: number; // 0–100
    label?: string;
    showValue?: boolean;
    fillColor?: string; // tailwind class, e.g. "bg-green" or "bg-orange"
    trackColor?: string;
    height?: number;
}

export function ProgressBar({
    value,
    label,
    showValue = false,
    fillColor = "bg-green",
    trackColor = "bg-paper",
    height = 10,
}: ProgressBarProps) {
    const clamped = Math.max(0, Math.min(100, value));

    return (
        <View className="w-full">
            {(label || showValue) && (
                <View className="flex-row justify-between items-center mb-2">
                    {label && <Text className="font-sans font-bold text-sm text-ink">{label}</Text>}
                    {showValue && <Text className="font-mono font-bold text-sm text-ink">{clamped}/100</Text>}
                </View>
            )}
            <View
                className={`${trackColor} border-[2px] border-ink rounded-full overflow-hidden`}
                style={{ height }}
            >
                <View className={`${fillColor} h-full`} style={{ width: `${clamped}%` }} />
            </View>
        </View>
    );
}