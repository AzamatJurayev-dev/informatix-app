import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { useAppState } from "@/context/app-context";
import { useThemeColors } from "@/hooks/useThemeColors";

export function ProgressBar({ value }: { value: number }) {
  const colors = useThemeColors();
  const { theme } = useAppState();
  const gradient = theme === "dark"
    ? ([colors.accent, colors.success, "#38bdf8"] as const)
    : ([colors.accent, "#7c3aed", "#38bdf8"] as const);

  return (
    <View className="h-3 overflow-hidden rounded-full" style={{ backgroundColor: colors.accentSoft }}>
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="h-3 rounded-full"
        style={{ width: `${Math.max(0, Math.min(value, 100))}%` }}
      />
    </View>
  );
}
