import { router } from "expo-router";
import { Text, View } from "react-native";
import { AnimatedButton } from "@/components/animated-button";
import { ScreenShell } from "@/components/screen-shell";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function NotFoundScreen() {
  const colors = useThemeColors();

  return (
    <ScreenShell scroll={false}>
      <View className="flex-1 items-center justify-center">
        <Text className="text-3xl font-bold" style={{ color: colors.text }}>
          Sahifa topilmadi
        </Text>
        <Text className="mt-3 text-center text-sm leading-6" style={{ color: colors.secondaryText }}>
          So‘ralgan sahifa ushbu offline versiyada mavjud emas.
        </Text>
        <View className="mt-6 w-full">
          <AnimatedButton label="Bosh sahifaga qaytish" onPress={() => router.replace("/(tabs)")} />
        </View>
      </View>
    </ScreenShell>
  );
}
