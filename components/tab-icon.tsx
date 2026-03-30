import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

type TabIconProps = {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
  focused: boolean;
  label: string;
};

export function TabIcon({ icon, color, size, focused, label }: TabIconProps) {
  const colors = useThemeColors();

  return (
    <View
      className="items-center justify-center rounded-full"
      style={{
        width: focused ? 42 : 36,
        height: focused ? 42 : 36,
        backgroundColor: focused ? colors.accent : "transparent",
      }}
    >
      <Ionicons name={icon} size={focused ? size - 1 : size - 2} color={focused ? "#ffffff" : color} />
    </View>
  );
}
