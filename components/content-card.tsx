import { Ionicons } from "@expo/vector-icons";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { BaseCard } from "@/components/base-card";
import { useThemeColors } from "@/hooks/useThemeColors";

type ContentCardProps = {
  title: string;
  description: string;
  meta: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  trailingLabel?: string;
  style?: StyleProp<ViewStyle>;
};
export function ContentCard({
  title,
  description,
  meta,
  icon,
  onPress,
  trailingLabel,
  style,
}: ContentCardProps) {
  const colors = useThemeColors();
  const actionBackground = colors.text;
  const actionIconColor = colors.surface;

  return (
    <BaseCard onPress={onPress} animated marginBottom={16} style={style as ViewStyle}>
        <View className="flex-row items-start justify-between">
          <View className="flex-row items-center">
            <View
              className="items-center justify-center"
              style={{ width: 56, height: 56, borderRadius: 20, backgroundColor: colors.mutedSurface }}
            >
              <Ionicons name={icon} size={22} color={colors.accent} />
            </View>
            <View className="ml-3 self-start rounded-full px-3 py-2" style={{ backgroundColor: colors.accentSoft }}>
              <Text className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: colors.accent }}>
                O'quv kartasi
              </Text>
            </View>
          </View>
          {trailingLabel ? (
            <View className="ml-3 rounded-full px-3 py-2" style={{ backgroundColor: colors.mutedSurface }}>
              <Text className="text-[11px] font-bold uppercase tracking-[2px]" style={{ color: colors.accent }}>
                {trailingLabel}
              </Text>
            </View>
          ) : null}
        </View>

        <View className="mt-5">
          <Text className="text-[22px] font-black leading-[30px]" style={{ color: colors.text }}>
            {title}
          </Text>
          <Text className="mt-3 text-[15px] leading-7" style={{ color: colors.secondaryText }}>
            {description}
          </Text>
        </View>

        <View className="mt-5 flex-row items-center justify-between rounded-[24px] px-4 py-4" style={{ backgroundColor: colors.mutedSurface }}>
          <View className="mr-4 flex-1">
            <Text className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>
              Kontekst
            </Text>
            <Text numberOfLines={1} className="mt-1 text-[12px] font-semibold uppercase tracking-[1.4px]" style={{ color: colors.text }}>
              {meta}
            </Text>
          </View>
          <View className="h-11 w-11 items-center justify-center rounded-full" style={{ backgroundColor: actionBackground }}>
            <Ionicons name="arrow-forward" size={16} color={actionIconColor} />
          </View>
        </View>
    </BaseCard>
  );
}
