import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Text, View } from "react-native";
import { InfoCard } from "@/components/info-card";
import { useThemeColors } from "@/hooks/useThemeColors";

type DetailSectionCardProps = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function DetailSectionCard({
  title,
  icon,
  description,
  children,
  className = "",
}: DetailSectionCardProps) {
  const colors = useThemeColors();

  return (
    <InfoCard className={className}>
      <View className="mb-4 flex-row items-start">
        <View className="mr-3 h-12 w-12 items-center justify-center rounded-[18px]" style={{ backgroundColor: colors.mutedSurface }}>
          <Ionicons name={icon} size={20} color={colors.accent} />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-black" style={{ color: colors.text }}>
            {title}
          </Text>
          {description ? (
            <Text className="mt-1 text-sm leading-6" style={{ color: colors.secondaryText }}>
              {description}
            </Text>
          ) : null}
        </View>
      </View>
      {children}
    </InfoCard>
  );
}
