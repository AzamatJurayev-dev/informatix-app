import { ReactNode } from "react";
import { Text, View } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export function SectionTitle({ title, subtitle, action }: SectionTitleProps) {
  const colors = useThemeColors();

  return (
    <View className="mb-5 flex-row items-end justify-between">
      <View className="flex-1 pr-3">
        <View className="self-start rounded-full px-3 py-1.5" style={{ backgroundColor: colors.accentSoft }}>
          <Text className="text-[10px] font-bold uppercase tracking-[2.5px]" style={{ color: colors.accent }}>
            Bo'lim
          </Text>
        </View>
        <Text className="mt-3 text-[26px] font-black leading-8 tracking-[-0.4px]" style={{ color: colors.text }}>
          {title}
        </Text>
        {subtitle ? (
          <Text className="mt-2 max-w-[720px] text-[14px] leading-6" style={{ color: colors.secondaryText }}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {action}
    </View>
  );
}
