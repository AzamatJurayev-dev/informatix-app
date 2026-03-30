import { StyleProp, Text, View, ViewStyle } from "react-native";
import { BaseCard } from "@/components/base-card";
import { useThemeColors } from "@/hooks/useThemeColors";

export function MetricCard({
  label,
  value,
  accent,
  style,
}: {
  label: string;
  value: string;
  accent?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const colors = useThemeColors();

  return (
    <BaseCard className="mb-3" radius={28} padding={20} style={style as ViewStyle}>
      <View className="self-start rounded-full px-3 py-1.5" style={{ backgroundColor: colors.mutedSurface }}>
        <Text className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: accent ?? colors.accent }}>
          Ko'rsatkich
        </Text>
      </View>
      <Text className="mt-4 text-[13px] font-medium leading-5" style={{ color: colors.secondaryText }}>
        {label}
      </Text>
      <Text className="mt-3 text-[30px] font-black" style={{ color: accent ?? colors.text }}>
        {value}
      </Text>
    </BaseCard>
  );
}
