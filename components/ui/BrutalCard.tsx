import { View, ViewProps, TouchableOpacity } from "react-native";
import { BrutalShadow } from "./BrutalShadow";

interface BrutalCardProps extends ViewProps {
    variant?: "elevated" | "flat"; // elevated = has shadow, flat = border only (for nested items)
    bg?: string;
    padding?: number;
    children: React.ReactNode;
    onPress?: () => void;
    activeOpacity?: number;
}

export function BrutalCard({
    variant = "elevated",
    bg = "#FFFDF7",
    padding = 16,
    style,
    children,
    onPress,
    activeOpacity,
    ...rest
}: BrutalCardProps) {
    if (variant === "flat") {
        const CardComponent = onPress ? TouchableOpacity : View;
        return (
            <CardComponent
                onPress={onPress}
                activeOpacity={activeOpacity ?? 0.7}
                style={[
                    {
                        backgroundColor: bg,
                        borderWidth: 3,
                        borderColor: "#15130F",
                        borderRadius: 14,
                        padding,
                    },
                    style,
                ]}
                {...(rest as any)}
            >
                {children}
            </CardComponent>
        );
    }

    return (
        <BrutalShadow 
            bg={bg} 
            style={[{ padding }, style]} 
            onPress={onPress}
            activeOpacity={activeOpacity}
            {...rest}
        >
            {children}
        </BrutalShadow>
    );
}