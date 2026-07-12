import { useRef } from "react";
import { Animated, Text, TextInput, TextInputProps, View } from "react-native";

interface BrutalInputProps extends TextInputProps {
    label?: string;
    error?: string;
}

export function BrutalInput({ label, error, className, ...rest }: BrutalInputProps) {
    const lift = useRef(new Animated.Value(0)).current;

    const handleFocus = () => Animated.timing(lift, { toValue: 1, duration: 100, useNativeDriver: true }).start();
    const handleBlur = () => Animated.timing(lift, { toValue: 0, duration: 100, useNativeDriver: true }).start();
    const translate = lift.interpolate({ inputRange: [0, 1], outputRange: [0, -1] });

    const borderColor = error ? "border-red" : "border-ink";
    const shadowColor = error ? "bg-red" : "bg-ink";

    return (
        <View className="w-full">
            {label && <Text className="font-mono font-bold text-xs tracking-wide uppercase mb-2 text-ink">{label}</Text>}

            <Animated.View style={{ transform: [{ translateX: translate }, { translateY: translate }] }}>
                <View className="relative">
                    <View className={`absolute top-1 left-1 right-0 bottom-0 ${shadowColor} rounded-brutal-sm`} />
                    <TextInput
                        {...rest}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholderTextColor="rgba(66,62,54,0.5)"
                        className={`bg-paper border-[3px] ${borderColor} rounded-brutal-sm py-3.5 px-4 font-sans text-base text-ink ${className ?? ""}`}
                    />
                </View>
            </Animated.View>

            {error && <Text className="text-red text-xs font-sans mt-1.5">{error}</Text>}
        </View>
    );
}