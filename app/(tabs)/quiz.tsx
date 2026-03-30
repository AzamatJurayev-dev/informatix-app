import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import quizzes from "@/data/quizzes.json";
import { AppHeader } from "@/components/app-header";
import { AnimatedButton } from "@/components/animated-button";
import { InfoCard } from "@/components/info-card";
import { ProgressBar } from "@/components/progress-bar";
import { ScreenShell } from "@/components/screen-shell";
import { useAppState } from "@/context/app-context";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function QuizScreen() {
  const colors = useThemeColors();
  const { saveQuizResult, theme } = useAppState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [locked, setLocked] = useState(false);
  const correctGradient = theme === "dark" ? ([`${colors.success}55`, `${colors.success}22`] as const) : (["#dcfce7", "#bbf7d0"] as const);
  const wrongGradient = theme === "dark" ? (["#7f1d1d", "#3f1d1d"] as const) : (["#fee2e2", "#fecaca"] as const);
  const correctSurface = theme === "dark" ? `${colors.success}18` : "#f0fdf4";
  const wrongSurface = theme === "dark" ? "rgba(127,29,29,0.22)" : "#fff7f7";

  const question = useMemo(() => quizzes[currentIndex], [currentIndex]);
  const progressValue = ((currentIndex + 1) / quizzes.length) * 100;

  async function handleNext() {
    if (selectedOption === null) return;

    if (!locked) {
      const isCorrect = selectedOption === question.correctAnswer;
      setLocked(true);
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }
      return;
    }

    if (currentIndex === quizzes.length - 1) {
      await saveQuizResult(score, quizzes.length);
      router.replace({
        pathname: "/result",
        params: { score: `${score}`, total: `${quizzes.length}`, type: "quiz" },
      });
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedOption(null);
    setLocked(false);
  }

  return (
    <ScreenShell>
      <AppHeader
        title="Test bo'limi"
        subtitle="Bilimni bosqichma-bosqich tekshiring va natijalarni qurilmada saqlang"
        showBack={false}
        eyebrow="Nazorat"
        actions={[
          { icon: "stats-chart-outline", onPress: () => router.push("/statistics") },
          { icon: "refresh-outline", onPress: () => router.replace("/(tabs)/quiz") },
        ]}
      />

      <Animated.View entering={FadeInDown.duration(400)}>
        <View
          className="overflow-hidden rounded-[34px] border p-6"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.cardBorder,
            shadowColor: "#0f172a",
            shadowOpacity: 0.07,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 12 },
            elevation: 5,
          }}
        >
          <View className="absolute -right-10 top-4 h-28 w-28 rounded-full" style={{ backgroundColor: `${colors.accent}12` }} />
          <View className="self-start rounded-full px-3 py-2" style={{ backgroundColor: colors.accentSoft }}>
            <Text className="text-xs font-bold uppercase tracking-[2px]" style={{ color: colors.accent }}>
              Bilim nazorati
            </Text>
          </View>
          <Text className="mt-3 text-[28px] font-black leading-9" style={{ color: colors.text }}>
            Mavzuga oid savollar
          </Text>
          <Text className="mt-2 text-[15px] leading-7" style={{ color: colors.secondaryText }}>
            Har bir savol bo'yicha javob tanlang, izohni o'qing va natijani yakunda ko'ring.
          </Text>
          <View className="mt-5 gap-3">
            <View className="flex-1 rounded-[22px] p-4" style={{ backgroundColor: colors.mutedSurface }}>
              <Text className="text-xs uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>
                Joriy natija
              </Text>
              <Text className="mt-2 text-2xl font-black" style={{ color: colors.text }}>
                {score} ball
              </Text>
            </View>
            <View className="flex-1 rounded-[22px] p-4" style={{ backgroundColor: colors.mutedSurface }}>
              <Text className="text-xs uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>
                Savol
              </Text>
              <Text className="mt-2 text-2xl font-black" style={{ color: colors.text }}>
                {currentIndex + 1}/{quizzes.length}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(100).duration(400)}>
        <InfoCard className="mt-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-semibold" style={{ color: colors.secondaryText }}>
              Savol {currentIndex + 1} / {quizzes.length}
            </Text>
            <View className="rounded-full px-3 py-1" style={{ backgroundColor: colors.accentSoft }}>
              <Text className="text-sm font-bold" style={{ color: colors.accent }}>
                Ball {score}
              </Text>
            </View>
          </View>
          <View className="mt-3">
            <ProgressBar value={progressValue} />
          </View>
          <Text className="mt-6 text-[26px] font-black leading-9" style={{ color: colors.text }}>
            {question.question}
          </Text>
          <View className="mt-6 gap-3">
            {question.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrect = question.correctAnswer === index;
              const isWrongSelected = locked && isSelected && !isCorrect;
              const optionGradient: readonly [string, string] =
                isCorrect && locked
                  ? correctGradient
                  : isWrongSelected
                    ? wrongGradient
                    : isSelected
                      ? [colors.accent, colors.success]
                      : [`${colors.surface}FA`, colors.mutedSurface];

              return (
                <Pressable key={option} onPress={() => !locked && setSelectedOption(index)} className="overflow-hidden rounded-[26px]">
                  <LinearGradient colors={optionGradient} className="rounded-[30px] p-[1px]">
                    <View
                      className="rounded-[25px] px-4 py-4"
                      style={{
                        backgroundColor:
                          isSelected && !locked
                            ? `${colors.accent}14`
                            : isCorrect && locked
                              ? correctSurface
                              : isWrongSelected
                                ? wrongSurface
                                : colors.surface,
                      }}
                    >
                      <View className="flex-row items-center">
                        <LinearGradient
                          colors={isSelected || (locked && isCorrect) ? [colors.accent, colors.success] : [colors.accentSoft, `${colors.accentSoft}DD`]}
                          className="mr-3 h-10 w-10 items-center justify-center rounded-[16px]"
                        >
                          <Text className="font-black" style={{ color: isSelected || (locked && isCorrect) ? "#fff" : colors.accent }}>
                            {String.fromCharCode(65 + index)}
                          </Text>
                        </LinearGradient>
                        <View className="flex-1">
                          <Text
                            className="text-base font-medium leading-6"
                            style={{ color: isSelected && !locked ? colors.accent : colors.text }}
                          >
                            {option}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </LinearGradient>
                </Pressable>
              );
            })}
          </View>
          {locked ? (
            <View className="mt-5 rounded-[22px] px-4 py-3" style={{ backgroundColor: colors.mutedSurface }}>
              <Text className="text-sm leading-6" style={{ color: colors.secondaryText }}>
                {question.explanation}
              </Text>
            </View>
          ) : null}
          <View className="mt-6">
            <AnimatedButton
              label={locked ? (currentIndex === quizzes.length - 1 ? "Natijani ko'rish" : "Keyingi savol") : "Javobni tekshirish"}
              onPress={handleNext}
              disabled={selectedOption === null}
            />
          </View>
        </InfoCard>
      </Animated.View>
    </ScreenShell>
  );
}
