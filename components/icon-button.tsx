import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useThemeColors } from "@/hooks/useThemeColors";

type IconButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  variant?: "soft" | "ghost";
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function IconButton({ icon, onPress, variant = "soft" }: IconButtonProps) {
  const colors = useThemeColors();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const isGhost = variant === "ghost";

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.94);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      style={[
        animatedStyle,
        {
          backgroundColor: isGhost ? colors.mutedSurface : colors.accentSoft,
          borderWidth: 1,
          borderColor: isGhost ? colors.cardBorder : `${colors.accent}15`,
        },
      ]}
      className="h-11 w-11 items-center justify-center rounded-full"
    >
      <Ionicons name={icon} size={20} color={colors.accent} />
    </AnimatedPressable>
  );
}
