import { useRef } from "react";
import { ActivityIndicator, Animated, Pressable, Text, View, StyleProp, ViewStyle } from "react-native";

type Variant = "primary" | "dark" | "outline";
type Size = "default" | "sm";

interface BrutalButtonProps {
    label: string;
    onPress?: () => void;
    variant?: Variant;
    size?: Size;
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    fullWidth?: boolean;
    style?: StyleProp<ViewStyle>;
    className?: string;
}

const VARIANT_BG: Record<Variant, string> = {
    primary: "bg-orange",
    dark: "bg-ink",
    outline: "bg-paper",
};

const VARIANT_TEXT: Record<Variant, string> = {
    primary: "text-ink",
    dark: "text-cream",
    outline: "text-ink",
};

export function BrutalButton({
    label,
    onPress,
    variant = "primary",
    size = "default",
    disabled = false,
    loading = false,
    icon,
    fullWidth = true,
    style,
    className,
}: BrutalButtonProps) {
    const offset = size === "sm" ? 4 : 6;
    const translate = useRef(new Animated.Value(0)).current; // animated → must stay in `style`

    const pressIn = () =>
        Animated.timing(translate, { toValue: offset, duration: 80, useNativeDriver: true }).start();
    const pressOut = () =>
        Animated.timing(translate, { toValue: 0, duration: 80, useNativeDriver: true }).start();

    return (
        <View className={`relative ${fullWidth ? "w-full" : ""} ${className ?? ""}`} style={style}>
            {/* Shadow layer */}
            <View
                className="absolute bg-ink rounded-brutal-sm"
                style={{
                    top: offset,
                    left: offset,
                    width: "100%",
                    height: "100%",
                }}
            />
            <Animated.View style={{ transform: [{ translateX: translate }, { translateY: translate }] }}>
                <Pressable
                    onPress={onPress}
                    onPressIn={pressIn}
                    onPressOut={pressOut}
                    disabled={disabled || loading}
                    className={`${VARIANT_BG[variant]} border-[3px] border-ink rounded-brutal-sm
            ${size === "sm" ? "py-2.5 px-4" : "py-4 px-6"}
            flex-row items-center justify-center gap-2
            ${disabled ? "opacity-45" : ""}`}
                >
                    {loading ? (
                        <ActivityIndicator color={variant === "dark" ? "#F5EFDD" : "#15130F"} />
                    ) : (
                        <>
                            <Text className={`font-sans-bold ${VARIANT_TEXT[variant]} ${size === "sm" ? "text-sm" : "text-base"}`}>
                                {label}
                            </Text>
                            {icon}
                        </>
                    )}
                </Pressable>
            </Animated.View>
        </View>
    );
}