import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { AppTheme } from "@/constants/theme";
import { useThemeColors } from "@/hooks/useThemeColors";

type ThemeToggleProps = {
  value: AppTheme;
  onChange: (theme: AppTheme) => void;
};

export function ThemeToggle({ value, onChange }: ThemeToggleProps) {
  const colors = useThemeColors();
  const offset = useSharedValue(value === "light" ? 0 : 1);

  useEffect(() => {
    offset.value = withTiming(value === "light" ? 0 : 1, { duration: 220 });
  }, [offset, value]);

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value * 118 }],
  }));

  return (
    <View
      className="relative w-full max-w-[248px] overflow-hidden rounded-full border p-1.5"
      style={{
        backgroundColor: colors.mutedSurface,
        borderColor: colors.cardBorder,
        shadowColor: "#0f172a",
        shadowOpacity: 0.04,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 8 },
        elevation: 2,
      }}
    >
      <Animated.View className="absolute left-1.5 top-1.5 h-[50px] w-[118px] overflow-hidden rounded-full" style={sliderStyle}>
        <LinearGradient colors={["#161c2f", "#2d3650"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="h-full w-full" />
      </Animated.View>
      <View className="flex-row">
        <Pressable className="z-10 w-[118px] flex-row items-center justify-center rounded-full py-4" onPress={() => onChange("light")}>
          <Ionicons name="sunny-outline" size={18} color={value === "light" ? "#ffffff" : colors.text} />
          <Text className="ml-2 font-bold tracking-wide" style={{ color: value === "light" ? "#ffffff" : colors.text }}>
            Yorug
          </Text>
        </Pressable>
        <Pressable className="z-10 w-[118px] flex-row items-center justify-center rounded-full py-4" onPress={() => onChange("dark")}>
          <Ionicons name="moon-outline" size={18} color={value === "dark" ? "#ffffff" : colors.text} />
          <Text className="ml-2 font-bold tracking-wide" style={{ color: value === "dark" ? "#ffffff" : colors.text }}>
            Qorong'i
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
