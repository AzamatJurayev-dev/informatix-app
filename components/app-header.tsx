import { router } from "expo-router";
import { ComponentProps, ReactNode } from "react";
import { Text, View } from "react-native";
import { IconButton } from "@/components/icon-button";
import { useThemeColors } from "@/hooks/useThemeColors";

type HeaderAction = {
  icon: ComponentProps<typeof IconButton>["icon"];
  onPress: () => void;
};

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  right?: ReactNode;
  eyebrow?: string;
  actions?: HeaderAction[];
};

export function AppHeader({
  title,
  subtitle,
  showBack = true,
  right,
  eyebrow = "Navigatsiya",
  actions = [],
}: AppHeaderProps) {
  const colors = useThemeColors();

  return (
    <View className="mb-5">
      <View
        className="overflow-hidden rounded-[34px] border px-5 pb-5 pt-4"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.cardBorder,
          shadowColor: "#0f172a",
          shadowOpacity: 0.08,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 12 },
          elevation: 4,
        }}
      >
        <View className="flex-row items-center justify-between">
          <View className="mr-4 flex-1 flex-row items-center">
            {showBack ? (
              <View className="mr-3">
                <IconButton icon="arrow-back" onPress={() => router.back()} variant="soft" />
              </View>
            ) : null}
            <View
              className="self-start rounded-full border px-3 py-1.5"
              style={{ backgroundColor: colors.mutedSurface, borderColor: colors.cardBorder }}
            >
              <Text className="text-[10px] font-bold uppercase tracking-[2.5px]" style={{ color: colors.accent }}>
                {eyebrow}
              </Text>
            </View>
          </View>

          {actions.length || right ? (
            <View
              className="flex-row items-center gap-2 rounded-full border px-2 py-2"
              style={{ backgroundColor: colors.mutedSurface, borderColor: colors.cardBorder }}
            >
              {actions.map((action, index) => (
                <IconButton key={`${action.icon}_${index}`} icon={action.icon} onPress={action.onPress} variant="ghost" />
              ))}
              {right ? <View>{right}</View> : null}
            </View>
          ) : null}
        </View>

        <View className="mt-5">
          <Text className="text-[30px] font-black leading-9 tracking-[-0.6px]" style={{ color: colors.text }}>
          {title}
          </Text>
          {subtitle ? (
            <Text className="mt-2 max-w-[680px] text-[14px] leading-6" style={{ color: colors.secondaryText }}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}
