import { Ionicons } from "@expo/vector-icons";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { BaseCard } from "@/components/base-card";
import { useThemeColors } from "@/hooks/useThemeColors";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};
export function FeatureCard({ title, description, icon, onPress, style }: FeatureCardProps) {
  const colors = useThemeColors();

  return (
    <BaseCard onPress={onPress} animated radius={36} padding={24} minHeight={204} style={style as ViewStyle}>
        <View className="mb-6 flex-row items-start justify-between">
          <View className="flex-row items-center">
            <View
              className="items-center justify-center"
              style={{ width: 60, height: 60, borderRadius: 22, backgroundColor: colors.mutedSurface }}
            >
              <Ionicons name={icon} size={24} color={colors.accent} />
            </View>
            <View className="ml-3 rounded-full px-3 py-[10px]" style={{ backgroundColor: colors.accentSoft }}>
              <Text className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: colors.accent }}>
                Interaktiv
              </Text>
            </View>
          </View>
          <View className="h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: "#161c2f" }}>
            <Ionicons name="arrow-forward" size={16} color="#ffffff" />
          </View>
        </View>

        <Text className="text-[22px] font-black leading-[30px]" style={{ color: colors.text }}>
          {title}
        </Text>
        <Text className="mt-4 text-[15px] leading-7" style={{ color: colors.secondaryText }}>
          {description}
        </Text>

        <View className="mt-7 rounded-[26px] px-4 py-4" style={{ backgroundColor: colors.mutedSurface }}>
          <Text className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>
            Tezkor kirish
          </Text>
          <Text className="mt-1 text-sm font-semibold" style={{ color: colors.text }}>
            Ochish va mashqni davom ettirish
          </Text>
        </View>
    </BaseCard>
  );
}
