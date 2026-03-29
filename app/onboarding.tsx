import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { AnimatedButton } from "@/components/animated-button";
import { useAppState } from "@/context/app-context";

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
  const { setOnboardingComplete } = useAppState();

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
    <View className="flex-1 overflow-hidden bg-[#eef1f5] px-5 pb-10 pt-16">
      <Animated.View entering={FadeInUp.duration(700)} className="absolute -right-20 top-24 h-64 w-64 rounded-full bg-[#dce8ff]" />
      <Animated.View entering={FadeInUp.delay(100).duration(800)} className="absolute -left-24 bottom-8 h-72 w-72 rounded-full bg-[#d8f5ef]" />

      <View className="mb-8 w-full self-center max-w-[420px] flex-row gap-2">
        {slides.map((slide, slideIndex) => (
          <View
            key={slide.title}
            className="h-2 flex-1 rounded-full"
            style={{ backgroundColor: slideIndex <= index ? "#161c2f" : "#d7dde7" }}
          />
        ))}
      </View>

      <Animated.View key={current.title} entering={FadeInDown.duration(500)} className="flex-1 w-full self-center max-w-[420px] justify-between">
        <View
          className="rounded-[36px] border border-[#dbe2ed] bg-white px-5 py-6"
          style={{
            shadowColor: "#0f172a",
            shadowOpacity: 0.08,
            shadowRadius: 22,
            shadowOffset: { width: 0, height: 12 },
            elevation: 6,
          }}
        >
          <View className="flex-row items-center justify-between">
            <View className="self-start rounded-full bg-[#f3f6fb] px-4 py-2">
              <Text className="text-xs font-bold uppercase tracking-[2px] text-[#1f6fff]">
                Qadam {index + 1} / {slides.length}
              </Text>
            </View>
            <View className="rounded-full bg-[#161c2f] px-3 py-2">
              <Text className="text-xs font-semibold text-white">Informatix</Text>
            </View>
          </View>

          <View className="mt-5 h-20 w-20 items-center justify-center rounded-[26px] bg-[#161c2f]">
            <Text className="text-3xl font-black text-white">{index + 1}</Text>
          </View>

          <View className="mt-6 self-start rounded-full bg-[#f3f6fb] px-4 py-2">
            <Text className="text-xs font-bold uppercase tracking-[2px] text-[#516079]">{current.tag}</Text>
          </View>

          <Text className="mt-6 text-[32px] font-black leading-[38px] tracking-tight text-[#161c2f]">{current.title}</Text>
          <Text className="mt-3 text-[14px] font-semibold uppercase tracking-[2px] text-[#7b8798]">
            Informatika ta'limi uchun mobil tajriba
          </Text>
          <Text className="mt-5 text-[15px] leading-7 text-[#66748b]">{current.description}</Text>
        </View>

        <View
          className="mt-6 rounded-[30px] border border-[#dbe2ed] bg-white px-5 py-5"
          style={{
            shadowColor: "#0f172a",
            shadowOpacity: 0.05,
            shadowRadius: 18,
            shadowOffset: { width: 0, height: 10 },
            elevation: 4,
          }}
        >
          <Text className="text-sm leading-6 text-[#66748b]">
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
