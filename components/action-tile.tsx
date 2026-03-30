import { Ionicons } from "@expo/vector-icons";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { BaseCard } from "@/components/base-card";
import { useThemeColors } from "@/hooks/useThemeColors";

type ActionTileProps = {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function ActionTile({ title, subtitle, icon, onPress, fullWidth = false, style }: ActionTileProps) {
  const colors = useThemeColors();

  return (
    <BaseCard onPress={onPress} animated className={`mb-3 ${fullWidth ? "w-full" : ""}`} radius={30} padding={16} style={style as ViewStyle}>
        <View className="px-4 py-4" style={{ minHeight: 170 }}>
          <View className="flex-row items-start justify-between">
            <View className="h-12 w-12 items-center justify-center rounded-[18px]" style={{ backgroundColor: colors.mutedSurface }}>
              <Ionicons name={icon} size={21} color={colors.accent} />
            </View>
            <View className="rounded-full px-3 py-2" style={{ backgroundColor: colors.accentSoft }}>
              <Text className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: colors.accent }}>
                Panel
              </Text>
            </View>
          </View>
          <Text className="mt-4 text-base font-bold" style={{ color: colors.text }}>
            {title}
          </Text>
          <Text className="mt-1 text-xs leading-5" style={{ color: colors.secondaryText }}>
            {subtitle}
          </Text>
          <View className="mt-5 rounded-[20px] px-3 py-3" style={{ backgroundColor: colors.mutedSurface }}>
            <Text className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>
              Ochish
            </Text>
            <Text className="mt-1 text-sm font-semibold" style={{ color: colors.text }}>
              Bo'limga o'tish
            </Text>
          </View>
        </View>
    </BaseCard>
  );
}
