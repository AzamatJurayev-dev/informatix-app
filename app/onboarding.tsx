import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { AnimatedButton } from "@/components/animated-button";
import { useAppState } from "@/context/app-context";
import { getContentMaxWidth, getScreenPadding } from "@/utils/layout";

const slides = [
  {
    title: "Zamonaviy usulda o'rganing",
    description:
      "Informatikani o'qitish bo'yicha innovatsion va interaktiv yondashuvlarni darslar, metodlar va mashqlar orqali bosqichma-bosqich o'rganing.",
    tag: "Nazariya va interaktivlik",
  },
  {
    title: "Faqat o'qish emas, amaliyot ham",
    description:
      "Test, flashcard, moslashtirish va to'g'ri-noto'g'ri mashqlari nazariy materialni faol tajribaga aylantiradi.",
    tag: "Faol ta'lim",
  },
  {
    title: "Internet bo'lmasa ham ishlaydi",
    description:
      "Darslar, natijalar va progress qurilmaning o'zida saqlanadi. Ilova taqdimot va himoya uchun tayyor holatda ishlaydi.",
    tag: "Barqaror foydalanish",
  },
];

export default function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const { setOnboardingComplete, theme, colors } = useAppState();
  const { width } = useWindowDimensions();
  const contentMaxWidth = getContentMaxWidth(width);
  const horizontalPadding = getScreenPadding(width);
  const panelBackground = theme === "dark" ? `${colors.surface}F2` : colors.surface;
  const accentBadgeBackground = theme === "dark" ? colors.mutedSurface : "#f3f6fb";
  const badgeGradient = theme === "dark" ? (["#0f172a", "#1e293b", colors.accent] as const) : (["#161c2f", "#27324b", colors.accent] as const);
  const progressTrack = theme === "dark" ? colors.mutedSurface : "#d7dde7";

  const current = useMemo(() => slides[index], [index]);

  async function handleNext() {
    if (index < slides.length - 1) {
      setIndex((prev) => prev + 1);
      return;
    }

    await setOnboardingComplete();
    router.replace("/(tabs)");
  }

  return (
    <View className="flex-1 overflow-hidden px-5 pb-10 pt-16" style={{ backgroundColor: colors.background }}>
      <Animated.View entering={FadeInUp.duration(700)} className="absolute -right-20 top-24 h-64 w-64 rounded-full" style={{ backgroundColor: `${colors.accent}18` }} />
      <Animated.View entering={FadeInUp.delay(100).duration(800)} className="absolute -left-24 bottom-8 h-72 w-72 rounded-full" style={{ backgroundColor: `${colors.success}14` }} />

      <View className="mb-8 w-full self-center flex-row gap-2" style={{ maxWidth: contentMaxWidth, paddingHorizontal: horizontalPadding }}>
        {slides.map((slide, slideIndex) => (
          <View
            key={slide.title}
            className="h-2 flex-1 rounded-full"
            style={{ backgroundColor: slideIndex <= index ? colors.accent : progressTrack }}
          />
        ))}
      </View>

      <Animated.View
        key={current.title}
        entering={FadeInDown.duration(500)}
        className="flex-1 w-full self-center justify-between"
        style={{ maxWidth: contentMaxWidth, paddingHorizontal: horizontalPadding }}
      >
        <View
          className="rounded-[36px] border px-5 py-6"
          style={{
            backgroundColor: panelBackground,
            borderColor: colors.cardBorder,
            shadowColor: "#0f172a",
            shadowOpacity: 0.08,
            shadowRadius: 22,
            shadowOffset: { width: 0, height: 12 },
            elevation: 6,
          }}
        >
          <View className="flex-row items-center justify-between">
            <View className="self-start rounded-full px-4 py-2" style={{ backgroundColor: accentBadgeBackground }}>
              <Text className="text-xs font-bold uppercase tracking-[2px]" style={{ color: colors.accent }}>
                Qadam {index + 1} / {slides.length}
              </Text>
            </View>
            <View className="rounded-full px-3 py-2" style={{ backgroundColor: theme === "dark" ? colors.mutedSurface : "#161c2f" }}>
              <Text className="text-xs font-semibold text-white">Informatix</Text>
            </View>
          </View>

          <LinearGradient colors={badgeGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="mt-5 h-20 w-20 items-center justify-center rounded-[26px]">
            <Text className="text-3xl font-black text-white">{index + 1}</Text>
          </LinearGradient>

          <View className="mt-6 self-start rounded-full px-4 py-2" style={{ backgroundColor: accentBadgeBackground }}>
            <Text className="text-xs font-bold uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>{current.tag}</Text>
          </View>

          <Text className="mt-6 text-[32px] font-black leading-[38px] tracking-tight" style={{ color: colors.text }}>{current.title}</Text>
          <Text className="mt-3 text-[14px] font-semibold uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>
            Informatika ta'limi uchun mobil tajriba
          </Text>
          <Text className="mt-5 text-[15px] leading-7" style={{ color: colors.secondaryText }}>{current.description}</Text>
        </View>

        <View
          className="mt-6 rounded-[30px] border px-5 py-5"
          style={{
            backgroundColor: panelBackground,
            borderColor: colors.cardBorder,
            shadowColor: "#0f172a",
            shadowOpacity: 0.05,
            shadowRadius: 18,
            shadowOffset: { width: 0, height: 10 },
            elevation: 4,
          }}
        >
          <Text className="text-sm leading-6" style={{ color: colors.secondaryText }}>
            {index === slides.length - 1 ? "Ilovani boshlashga tayyor." : "Keyingi sahifada platformaning yana bir imkoniyati ko'rsatiladi."}
          </Text>
          <AnimatedButton
            label={index === slides.length - 1 ? "Boshlash" : "Davom etish"}
            onPress={handleNext}
            icon={index === slides.length - 1 ? "rocket-outline" : "arrow-forward-outline"}
            className="mt-5"
          />
        </View>
      </Animated.View>
    </View>
  );
}
