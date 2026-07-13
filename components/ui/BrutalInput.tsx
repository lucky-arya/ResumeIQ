import { useRef } from "react";
import { Animated, StyleSheet, Text, TextInput, TextInputProps, View, StyleProp, ViewStyle, TextStyle } from "react-native";

interface BrutalInputProps extends TextInputProps {
    label?: string;
    error?: string;
}

function splitInputStyles(style: StyleProp<TextStyle>) {
    const containerStyle: ViewStyle = {};
    const inputStyle: TextStyle = {};

    if (!style) return { containerStyle, inputStyle };

    const flatStyle = StyleSheet.flatten(style);
    const containerKeys = new Set([
        'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight',
        'marginHorizontal', 'marginVertical', 'marginStart', 'marginEnd',
        'position', 'top', 'left', 'right', 'bottom', 'start', 'end',
        'flex', 'flexGrow', 'flexShrink', 'flexBasis',
        'alignSelf', 'zIndex', 'opacity', 'transform',
        'width', 'minWidth', 'maxWidth',
    ]);

    for (const key in flatStyle) {
        if (containerKeys.has(key)) {
            (containerStyle as any)[key] = (flatStyle as any)[key];
        } else {
            (inputStyle as any)[key] = (flatStyle as any)[key];
        }
    }

    return { containerStyle, inputStyle };
}

export function BrutalInput({ label, error, className, style, ...rest }: BrutalInputProps) {
    const lift = useRef(new Animated.Value(0)).current;

    const offset = 4;
    const handleFocus = () => Animated.timing(lift, { toValue: offset, duration: 100, useNativeDriver: true }).start();
    const handleBlur = () => Animated.timing(lift, { toValue: 0, duration: 100, useNativeDriver: true }).start();
    const translate = lift.interpolate({ inputRange: [0, offset], outputRange: [0, -offset] });

    const borderColor = error ? "border-red" : "border-ink";
    const shadowColor = error ? "bg-red" : "bg-ink";

    const { containerStyle, inputStyle } = splitInputStyles(style);

    return (
        <View className="w-full" style={containerStyle}>
            {label && <Text className="font-mono font-bold text-xs tracking-wide uppercase mb-2 text-ink">{label}</Text>}

            <View className="relative">
                {/* Shadow layer (stays static) */}
                <View
                    className={`absolute ${shadowColor} rounded-brutal-sm`}
                    style={{
                        position: "absolute",
                        top: offset,
                        left: offset,
                        right: -offset,
                        bottom: -offset,
                    }}
                />

                {/* Input layer (lifts up on focus) */}
                <Animated.View style={{ transform: [{ translateX: translate }, { translateY: translate }] }}>
                    <TextInput
                        {...rest}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholderTextColor="rgba(66,62,54,0.5)"
                        style={inputStyle}
                        className={`bg-paper border-[3px] ${borderColor} rounded-brutal-sm py-3.5 px-4 font-sans text-base text-ink ${className ?? ""}`}
                    />
                </Animated.View>
            </View>

            {error && <Text className="text-red text-xs font-sans mt-1.5">{error}</Text>}
        </View>
    );
}