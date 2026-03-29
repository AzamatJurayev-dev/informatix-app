import { router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import games from "@/data/games.json";
import { AnimatedButton } from "@/components/animated-button";
import { AppHeader } from "@/components/app-header";
import { InfoCard } from "@/components/info-card";
import { ProgressBar } from "@/components/progress-bar";
import { ScreenShell } from "@/components/screen-shell";
import { useAppState } from "@/context/app-context";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function TrueFalseScreen() {
  const colors = useThemeColors();
  const { saveTrueFalseResult } = useAppState();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const current = games.trueFalseStatements[index];

  async function handleAnswer(answer: boolean) {
    if (locked) {
      if (index === games.trueFalseStatements.length - 1) {
        await saveTrueFalseResult(score, games.trueFalseStatements.length);
        router.replace({
          pathname: "/result",
          params: { score: `${score}`, total: `${games.trueFalseStatements.length}`, type: "truefalse" },
        });
        return;
      }

      setIndex((prev) => prev + 1);
      setFeedback(null);
      setLocked(false);
      return;
    }

    const correct = current.answer === answer;
    if (correct) {
      setScore((prev) => prev + 1);
    }
    setFeedback(`${correct ? "To'g'ri." : "Noto'g'ri."} ${current.explanation}`);
    setLocked(true);
  }

  return (
    <ScreenShell>
      <AppHeader title="To'g'ri / Noto'g'ri" subtitle="Tezkor tekshiruv va darhol fikr bildirish" eyebrow="Mini o'yin" />

      <InfoCard>
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-semibold" style={{ color: colors.secondaryText }}>
            Bayonot {index + 1} / {games.trueFalseStatements.length}
          </Text>
          <View className="rounded-full px-3 py-2" style={{ backgroundColor: colors.accentSoft }}>
            <Text className="text-xs font-bold uppercase tracking-[2px]" style={{ color: colors.accent }}>
              Ball {score}
            </Text>
          </View>
        </View>

        <View className="mt-4">
          <ProgressBar value={((index + 1) / games.trueFalseStatements.length) * 100} />
        </View>

        <View className="mt-5 self-start rounded-full px-3 py-2" style={{ backgroundColor: colors.mutedSurface }}>
          <Text className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: colors.accent }}>
            Tezkor mulohaza
          </Text>
        </View>
        <Text className="mt-6 text-[28px] font-black leading-9" style={{ color: colors.text }}>
          {current.statement}
        </Text>

        {feedback ? (
          <View className="mt-5 rounded-[20px] px-4 py-4" style={{ backgroundColor: colors.mutedSurface }}>
            <Text className="text-sm leading-6" style={{ color: colors.secondaryText }}>
              {feedback}
            </Text>
          </View>
        ) : null}

        {locked ? (
          <View className="mt-6">
            <AnimatedButton
              label={index === games.trueFalseStatements.length - 1 ? "Natijani ko'rish" : "Keyingi bayonot"}
              onPress={() => handleAnswer(current.answer)}
              icon="arrow-forward-outline"
            />
          </View>
        ) : (
          <View className="mt-6 flex-row gap-3">
            <View className="flex-1">
              <AnimatedButton label="Noto'g'ri" variant="danger" icon="close-outline" onPress={() => handleAnswer(false)} />
            </View>
            <View className="flex-1">
              <AnimatedButton label="To'g'ri" variant="success" icon="checkmark-outline" onPress={() => handleAnswer(true)} />
            </View>
          </View>
        )}
      </InfoCard>
    </ScreenShell>
  );
}
