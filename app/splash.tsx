import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Text, useWindowDimensions, View } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInUp, ZoomIn } from "react-native-reanimated";
import { AnimatedButton } from "@/components/animated-button";
import { useAppState } from "@/context/app-context";
import { getContentMaxWidth, getScreenPadding } from "@/utils/layout";

export default function SplashScreen() {
  const { hydrated, onboardingComplete, theme, colors } = useAppState();
  const { width } = useWindowDimensions();
  const contentMaxWidth = getContentMaxWidth(width);
  const horizontalPadding = getScreenPadding(width);
  const panelBackground = theme === "dark" ? `${colors.surface}F2` : colors.surface;
  const badgeBackground = theme === "dark" ? colors.mutedSurface : colors.surface;
  const heroBadgeGradient = theme === "dark" ? (["#0f172a", "#1e293b", colors.accent] as const) : (["#161c2f", "#27324b", colors.accent] as const);
  const chipBackground = theme === "dark" ? colors.mutedSurface : "#f3f6fb";
  const chipText = theme === "dark" ? colors.text : "#161c2f";
  const darkPanelBackground = theme === "dark" ? colors.mutedSurface : "#161c2f";
  const darkPanelLabel = theme === "dark" ? colors.secondaryText : "rgba(255,255,255,0.7)";
  const darkPanelText = theme === "dark" ? colors.text : "#ffffff";

  function handleContinue() {
    if (!hydrated) return;
    router.replace(onboardingComplete ? "/(tabs)" : "/onboarding");
  }

  return (
    <View className="flex-1 overflow-hidden px-6 pb-12 pt-8" style={{ backgroundColor: colors.background }}>
      <Animated.View entering={FadeIn.duration(700)} className="absolute -right-20 top-10 h-52 w-52 rounded-full" style={{ backgroundColor: `${colors.accent}18` }} />
      <Animated.View entering={FadeIn.delay(120).duration(750)} className="absolute -left-16 bottom-20 h-64 w-64 rounded-full" style={{ backgroundColor: `${colors.success}14` }} />

      <View className="flex-1 w-full self-center justify-center" style={{ maxWidth: contentMaxWidth, paddingHorizontal: horizontalPadding }}>
        <Animated.View entering={FadeInUp.duration(700)} className="self-center rounded-full px-4 py-2" style={{ backgroundColor: badgeBackground }}>
          <Text className="text-[11px] font-bold uppercase tracking-[2.6px]" style={{ color: colors.accent }}>Ta'lim platformasi</Text>
        </Animated.View>

        <Animated.View
          entering={ZoomIn.duration(650)}
          className="mt-5 overflow-hidden rounded-[36px] border px-6 py-7"
          style={{
            backgroundColor: panelBackground,
            borderColor: colors.cardBorder,
            shadowColor: "#0f172a",
            shadowOpacity: 0.08,
            shadowRadius: 22,
            shadowOffset: { width: 0, height: 14 },
            elevation: 6,
          }}
        >
          <View className="flex-row items-start justify-between">
            <View className="h-16 w-16" />
            <View className="rounded-full px-3 py-2" style={{ backgroundColor: chipBackground }}>
              <Text className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>Offline</Text>
            </View>
          </View>

          <View className="absolute left-6 top-7 overflow-hidden rounded-[22px]">
            <LinearGradient colors={heroBadgeGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="h-16 w-16 items-center justify-center rounded-[22px]">
              <Text className="text-2xl font-black text-white">IT</Text>
            </LinearGradient>
          </View>

          <Text className="mt-6 text-[42px] font-black tracking-[-1px]" style={{ color: colors.text }}>Informatix</Text>
          <Text className="mt-3 text-[20px] font-bold leading-8" style={{ color: colors.text }}>
            Innovatsion va interaktiv o'qitish yondashuvlari
          </Text>
          <Text className="mt-4 text-[15px] leading-7" style={{ color: colors.secondaryText }}>
            Informatika fanini o'qitish uchun tayyorlangan zamonaviy, mobil va taqdimotga mos o'quv platformasi.
          </Text>

          <View className="mt-6 flex-row gap-2">
            <View className="rounded-full px-3 py-2" style={{ backgroundColor: chipBackground }}>
              <Text className="text-xs font-semibold" style={{ color: chipText }}>Darslar</Text>
            </View>
            <View className="rounded-full px-3 py-2" style={{ backgroundColor: chipBackground }}>
              <Text className="text-xs font-semibold" style={{ color: chipText }}>Metodlar</Text>
            </View>
            <View className="rounded-full px-3 py-2" style={{ backgroundColor: chipBackground }}>
              <Text className="text-xs font-semibold" style={{ color: chipText }}>Mashqlar</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).duration(700)} className="mt-5 flex-row gap-3">
          <View className="flex-1 rounded-[26px] px-4 py-4" style={{ backgroundColor: darkPanelBackground }}>
            <Text className="text-[11px] font-bold uppercase tracking-[2px]" style={{ color: darkPanelLabel }}>Yo'nalish</Text>
            <Text className="mt-2 text-base font-bold" style={{ color: darkPanelText }}>Pedagogika / texnologiya</Text>
          </View>
          <View className="flex-1 rounded-[26px] px-4 py-4" style={{ backgroundColor: panelBackground }}>
            <Text className="text-[11px] font-bold uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>Tajriba</Text>
            <Text className="mt-2 text-base font-bold" style={{ color: colors.text }}>Quiz / flashcard / o'yin</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(260).duration(700)} className="mt-6">
          <AnimatedButton
            label={hydrated ? "Davom etish" : "Yuklanmoqda..."}
            onPress={handleContinue}
            disabled={!hydrated}
            icon={hydrated ? "arrow-forward-outline" : "hourglass-outline"}
          />
        </Animated.View>
      </View>
    </View>
  );
}
