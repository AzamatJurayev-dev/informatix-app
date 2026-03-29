import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import flashcards from "@/data/flashcards.json";
import { AnimatedButton } from "@/components/animated-button";
import { AppHeader } from "@/components/app-header";
import { InfoCard } from "@/components/info-card";
import { ScreenShell } from "@/components/screen-shell";
import { useAppState } from "@/context/app-context";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function FlashcardsScreen() {
  const colors = useThemeColors();
  const { markFlashcardViewed, viewedFlashcards } = useAppState();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const rotate = useSharedValue(0);
  const current = flashcards[index];

  useEffect(() => {
    markFlashcardViewed(current.id);
  }, [current.id, markFlashcardViewed]);

  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${interpolate(rotate.value, [0, 1], [0, 180])}deg` }],
    backfaceVisibility: "hidden",
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${interpolate(rotate.value, [0, 1], [180, 360])}deg` }],
    backfaceVisibility: "hidden",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }));

  function toggleFlip() {
    setFlipped((prev) => !prev);
    rotate.value = withTiming(flipped ? 0 : 1, { duration: 450 });
  }

  function move(direction: "next" | "prev") {
    const nextIndex =
      direction === "next"
        ? (index + 1) % flashcards.length
        : (index - 1 + flashcards.length) % flashcards.length;
    setIndex(nextIndex);
    setFlipped(false);
    rotate.value = withTiming(0, { duration: 250 });
  }

  return (
    <ScreenShell>
      <AppHeader title="Flashcardlar" subtitle={`Ko'rilgan kartalar: ${viewedFlashcards.length}/${flashcards.length}`} eyebrow="Takrorlash" />

      <InfoCard className="mb-5">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-3">
            <View className="self-start rounded-full px-3 py-2" style={{ backgroundColor: colors.accentSoft }}>
              <Text className="text-xs font-bold uppercase tracking-[2px]" style={{ color: colors.accent }}>
                Tez yodlash
              </Text>
            </View>
            <Text className="mt-4 text-[28px] font-black leading-9" style={{ color: colors.text }}>
              Termin va ta'riflarni kartalar orqali takrorlang
            </Text>
          </View>
          <View className="h-16 w-16 items-center justify-center rounded-[22px]" style={{ backgroundColor: colors.mutedSurface }}>
            <Text className="text-lg font-black" style={{ color: colors.accent }}>FC</Text>
          </View>
        </View>
        <View className="mt-5 flex-row gap-3">
          <View className="flex-1 rounded-[22px] p-4" style={{ backgroundColor: colors.mutedSurface }}>
            <Text className="text-xs uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>Joriy karta</Text>
            <Text className="mt-2 text-2xl font-black" style={{ color: colors.text }}>{index + 1}</Text>
          </View>
          <View className="flex-1 rounded-[22px] p-4" style={{ backgroundColor: colors.mutedSurface }}>
            <Text className="text-xs uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>Ko'rilgan</Text>
            <Text className="mt-2 text-2xl font-black" style={{ color: colors.text }}>{viewedFlashcards.length}</Text>
          </View>
        </View>
      </InfoCard>

      <Pressable onPress={toggleFlip}>
        <View className="h-80">
          <Animated.View style={frontStyle}>
            <LinearGradient colors={["#161c2f", "#26324a", "#1f6fff"]} className="h-80 overflow-hidden rounded-[34px] p-6">
              <View className="absolute -right-8 top-4 h-36 w-36 rounded-full bg-white/10" />
              <View className="absolute -left-8 bottom-0 h-28 w-28 rounded-full bg-cyan-300/10" />
              <View className="self-start rounded-full bg-white/15 px-4 py-2">
                <Text className="text-xs font-bold uppercase tracking-[2px] text-white">Old tomoni</Text>
              </View>
              <View className="mt-8 flex-row items-start justify-between">
                <View className="rounded-[24px] border border-white/15 bg-white/10 px-4 py-4">
                  <Text className="text-3xl font-black text-white">IT</Text>
                </View>
                <View className="rounded-full bg-white/10 px-3 py-2">
                  <Text className="text-[11px] font-bold uppercase tracking-[2px] text-white/80">
                    {index + 1}/{flashcards.length}
                  </Text>
                </View>
              </View>
              <Text className="mt-14 text-center text-3xl font-black text-white">
                {current.term}
              </Text>
              <Text className="mt-5 text-center text-sm leading-6 text-slate-100">
                Izohni ko'rish uchun kartani bosing.
              </Text>
            </LinearGradient>
          </Animated.View>
          <Animated.View style={backStyle}>
            <InfoCard className="h-80 justify-center">
              <View className="self-start rounded-full px-3 py-2" style={{ backgroundColor: colors.accentSoft }}>
                <Text className="text-sm font-semibold uppercase tracking-[3px]" style={{ color: colors.accent }}>
                Orqa tomoni
                </Text>
              </View>
              <Text className="mt-4 text-base leading-7" style={{ color: colors.text }}>
                {current.definition}
              </Text>
              <View className="mt-5 rounded-[20px] p-4" style={{ backgroundColor: colors.mutedSurface }}>
                <Text className="text-sm leading-6" style={{ color: colors.secondaryText }}>
                  Misol: {current.example}
                </Text>
              </View>
            </InfoCard>
          </Animated.View>
        </View>
      </Pressable>
      <View className="mt-6 flex-row gap-3">
        <View className="flex-1">
          <AnimatedButton label="Oldingi" variant="secondary" onPress={() => move("prev")} />
        </View>
        <View className="flex-1">
          <AnimatedButton label="Keyingi" onPress={() => move("next")} />
        </View>
      </View>
    </ScreenShell>
  );
}
