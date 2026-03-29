import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useThemeColors } from "@/hooks/useThemeColors";

type AnimatedButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "success" | "danger";
  disabled?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  className?: string;
  contentClassName?: string;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function AnimatedButton({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  icon,
  className = "",
  contentClassName = "",
}: AnimatedButtonProps) {
  const colors = useThemeColors();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const textColor = variant === "primary" || variant === "success" || variant === "danger" ? "#ffffff" : colors.text;

  const gradientColors: Record<NonNullable<AnimatedButtonProps["variant"]>, readonly [string, string]> = {
    primary: [colors.accent, colors.success],
    secondary: [colors.surface, colors.surface],
    success: [colors.success, "#34d399"],
    danger: ["#ef4444", "#f97316"],
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => {
        scale.value = withSpring(0.98);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      style={[
        animatedStyle,
        {
          opacity: disabled ? 0.45 : 1,
          shadowColor: "#0f172a",
          shadowOpacity: variant === "secondary" ? 0.04 : 0.12,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 8 },
          elevation: variant === "secondary" ? 2 : 5,
        },
      ]}
      className={`overflow-hidden rounded-full ${className}`}
    >
      <LinearGradient
        colors={gradientColors[variant]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-full"
      >
        <View
          className={`flex-row items-center justify-center rounded-full px-6 py-[15px] ${contentClassName}`}
          style={{
            backgroundColor: variant === "secondary" ? colors.surface : "transparent",
            borderWidth: variant === "secondary" ? 1 : 0,
            borderColor: variant === "secondary" ? colors.cardBorder : "transparent",
          }}
        >
          {icon ? (
            <Ionicons name={icon} size={18} color={textColor} style={{ marginRight: 8 }} />
          ) : null}
          <Text className="text-base font-bold tracking-wide" style={{ color: textColor }}>
            {label}
          </Text>
        </View>
      </LinearGradient>
    </AnimatedPressable>
  );
}
