import { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "@/hooks/useThemeColors";

type ScreenShellProps = {
  children: ReactNode;
  scroll?: boolean;
  withGradient?: boolean;
};

export function ScreenShell({ children, scroll = true, withGradient = false }: ScreenShellProps) {
  const colors = useThemeColors();

  const content = (
    <View className="min-h-full w-full px-5 pt-3" style={{ maxWidth: 430, alignSelf: "center" }}>
      <View className="absolute -right-24 top-16 h-56 w-56 rounded-full" style={{ backgroundColor: `${colors.accent}10` }} />
      <View className="absolute -left-28 top-80 h-72 w-72 rounded-full" style={{ backgroundColor: `${colors.success}0A` }} />
      <View className="absolute right-4 bottom-24 h-36 w-36 rounded-full" style={{ backgroundColor: `${colors.warning}08` }} />
      <View className="w-full">{children}</View>
    </View>
  );

  return (
    <SafeAreaView edges={["top"]} className="flex-1" style={{ backgroundColor: colors.background }}>
      {withGradient ? (
        <LinearGradient colors={colors.gradient} className="flex-1">
          {scroll ? (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 154 }}>
              {content}
            </ScrollView>
          ) : (
            content
          )}
        </LinearGradient>
      ) : (
        <View className="flex-1" style={{ backgroundColor: colors.background }}>
          {scroll ? (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 154 }}>
              {content}
            </ScrollView>
          ) : (
            content
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
