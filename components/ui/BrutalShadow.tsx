import { StyleProp, StyleSheet, View, ViewProps, ViewStyle, TouchableOpacity } from "react-native";

interface BrutalShadowProps extends ViewProps {
    offset?: number;      // shadow distance, default 6
    radius?: number;      // border radius of both layers
    shadowColor?: string; // defaults to ink black
    bg?: string;          // background of the front layer
    children: React.ReactNode;
    onPress?: () => void;
    activeOpacity?: number;
}

// Helper to split styles into container (layout-related) and inner (styling-related) styles
function splitStyles(style: StyleProp<ViewStyle>) {
    const containerStyle: ViewStyle = {};
    const innerStyle: ViewStyle = {};

    if (!style) return { containerStyle, innerStyle };

    const flatStyle = StyleSheet.flatten(style);

    const containerKeys = new Set([
        'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
        'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight',
        'marginHorizontal', 'marginVertical', 'marginStart', 'marginEnd',
        'position', 'top', 'left', 'right', 'bottom', 'start', 'end',
        'flex', 'flexGrow', 'flexShrink', 'flexBasis',
        'alignSelf', 'zIndex', 'opacity', 'transform',
    ]);

    for (const key in flatStyle) {
        if (containerKeys.has(key)) {
            (containerStyle as any)[key] = (flatStyle as any)[key];
        } else {
            (innerStyle as any)[key] = (flatStyle as any)[key];
        }
    }

    return { containerStyle, innerStyle };
}

export function BrutalShadow({
    offset = 6,
    radius = 20,
    shadowColor = "#15130F",
    bg = "#FFFDF7",
    style,
    children,
    onPress,
    activeOpacity,
    ...rest
}: BrutalShadowProps) {
    const { containerStyle, innerStyle } = splitStyles(style);
    const ContainerComponent = onPress ? TouchableOpacity : View;

    return (
        <ContainerComponent 
            onPress={onPress}
            activeOpacity={activeOpacity ?? 0.7}
            style={[{ position: "relative" }, containerStyle]}
        >
            {/* Back layer — the "shadow" */}
            <View
                style={{
                    position: "absolute",
                    top: offset,
                    left: offset,
                    right: -offset,
                    bottom: -offset,
                    backgroundColor: shadowColor,
                    borderRadius: radius,
                }}
            />
            {/* Front layer — the real content, offset by border */}
            <View
                style={[
                    {
                        backgroundColor: bg,
                        borderRadius: radius,
                        borderWidth: 3,
                        borderColor: shadowColor,
                    },
                    innerStyle,
                ]}
                {...rest}
            >
                {children}
            </View>
        </ContainerComponent>
    );
}