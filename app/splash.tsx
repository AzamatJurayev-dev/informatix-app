import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInUp, ZoomIn } from "react-native-reanimated";
import { useAppState } from "@/context/app-context";

export default function SplashScreen() {
  const { hydrated, onboardingComplete } = useAppState();

  useEffect(() => {
    if (!hydrated) return;

    const timeout = setTimeout(() => {
      router.replace(onboardingComplete ? "/(tabs)" : "/onboarding");
    }, 2200);

    return () => clearTimeout(timeout);
  }, [hydrated, onboardingComplete]);

  return (
    <View className="flex-1 overflow-hidden bg-[#eef1f5] px-6 pb-12 pt-8">
      <Animated.View entering={FadeIn.duration(700)} className="absolute -right-20 top-10 h-52 w-52 rounded-full bg-[#dce8ff]" />
      <Animated.View entering={FadeIn.delay(120).duration(750)} className="absolute -left-16 bottom-20 h-64 w-64 rounded-full bg-[#d8f5ef]" />

      <View className="flex-1 w-full self-center max-w-[420px] justify-center">
        <Animated.View entering={FadeInUp.duration(700)} className="self-center rounded-full bg-white px-4 py-2">
          <Text className="text-[11px] font-bold uppercase tracking-[2.6px] text-[#1f6fff]">Ta'lim platformasi</Text>
        </Animated.View>

        <Animated.View
          entering={ZoomIn.duration(650)}
          className="mt-5 overflow-hidden rounded-[36px] border border-[#dbe2ed] bg-white px-6 py-7"
          style={{
            shadowColor: "#0f172a",
            shadowOpacity: 0.08,
            shadowRadius: 22,
            shadowOffset: { width: 0, height: 14 },
            elevation: 6,
          }}
        >
          <View className="flex-row items-start justify-between">
            <View className="h-16 w-16 items-center justify-center rounded-[22px] bg-[#161c2f]">
              <Text className="text-2xl font-black text-white">IT</Text>
            </View>
            <View className="rounded-full bg-[#f3f6fb] px-3 py-2">
              <Text className="text-[10px] font-bold uppercase tracking-[2px] text-[#516079]">Offline</Text>
            </View>
          </View>

          <Text className="mt-6 text-[42px] font-black tracking-[-1px] text-[#161c2f]">Informatix</Text>
          <Text className="mt-3 text-[20px] font-bold leading-8 text-[#161c2f]">
            Innovatsion va interaktiv o'qitish yondashuvlari
          </Text>
          <Text className="mt-4 text-[15px] leading-7 text-[#66748b]">
            Informatika fanini o'qitish uchun tayyorlangan zamonaviy, mobil va taqdimotga mos o'quv platformasi.
          </Text>

          <View className="mt-6 flex-row gap-2">
            <View className="rounded-full bg-[#f3f6fb] px-3 py-2">
              <Text className="text-xs font-semibold text-[#161c2f]">Darslar</Text>
            </View>
            <View className="rounded-full bg-[#f3f6fb] px-3 py-2">
              <Text className="text-xs font-semibold text-[#161c2f]">Metodlar</Text>
            </View>
            <View className="rounded-full bg-[#f3f6fb] px-3 py-2">
              <Text className="text-xs font-semibold text-[#161c2f]">Mashqlar</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).duration(700)} className="mt-5 flex-row gap-3">
          <View className="flex-1 rounded-[26px] bg-[#161c2f] px-4 py-4">
            <Text className="text-[11px] font-bold uppercase tracking-[2px] text-white/70">Yo'nalish</Text>
            <Text className="mt-2 text-base font-bold text-white">Pedagogika / texnologiya</Text>
          </View>
          <View className="flex-1 rounded-[26px] bg-white px-4 py-4">
            <Text className="text-[11px] font-bold uppercase tracking-[2px] text-[#7b8798]">Tajriba</Text>
            <Text className="mt-2 text-base font-bold text-[#161c2f]">Quiz / flashcard / o'yin</Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}
