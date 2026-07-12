// components/ui/BrutalCard.tsx
import { View, ViewProps } from "react-native";
import { BrutalShadow } from "./BrutalShadow";

interface BrutalCardProps extends ViewProps {
    variant?: "elevated" | "flat"; // elevated = has shadow, flat = border only (for nested items)
    bg?: string;
    padding?: number;
    children: React.ReactNode;
}

export function BrutalCard({
    variant = "elevated",
    bg = "#FFFDF7",
    padding = 16,
    style,
    children,
    ...rest
}: BrutalCardProps) {
    if (variant === "flat") {
        return (
            <View
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
                {...rest}
            >
                {children}
            </View>
        );
    }

    return (
        <BrutalShadow bg={bg} style={[{ padding }, style]} {...rest}>
            {children}
        </BrutalShadow>
    );
}