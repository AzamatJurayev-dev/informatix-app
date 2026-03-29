import { Text, View } from "react-native";
import flashcards from "@/data/flashcards.json";
import games from "@/data/games.json";
import lessons from "@/data/lessons.json";
import quizzes from "@/data/quizzes.json";
import { AppHeader } from "@/components/app-header";
import { InfoCard } from "@/components/info-card";
import { MetricCard } from "@/components/metric-card";
import { ProgressBar } from "@/components/progress-bar";
import { ScreenShell } from "@/components/screen-shell";
import { useAppState } from "@/context/app-context";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function StatisticsScreen() {
  const colors = useThemeColors();
  const {
    completedLessons,
    quizAttempts,
    trueFalseAttempts,
    viewedFlashcards,
    highestQuizScore,
    overallProgress,
    matchBestScore,
  } = useAppState();

  const totalQuizCorrect = quizAttempts.reduce((sum, attempt) => sum + attempt.score, 0);
  const totalTrueFalseCorrect = trueFalseAttempts.reduce((sum, attempt) => sum + attempt.score, 0);

  return (
    <ScreenShell>
      <AppHeader title="Statistika" subtitle="Progress va natijalar bo'yicha umumiy tahlil" eyebrow="Tahlil" />
      <View
        className="mb-5 overflow-hidden rounded-[34px] border bg-white p-6"
        style={{
          borderColor: colors.cardBorder,
          shadowColor: "#0f172a",
          shadowOpacity: 0.07,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 12 },
          elevation: 5,
        }}
      >
        <View className="absolute -right-10 top-4 h-32 w-32 rounded-full" style={{ backgroundColor: `${colors.accent}12` }} />
        <View className="self-start rounded-full px-3 py-2" style={{ backgroundColor: colors.mutedSurface }}>
          <Text className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: colors.accent }}>
            Hisobot
          </Text>
        </View>
        <Text className="mt-4 text-[28px] font-black leading-9" style={{ color: colors.text }}>
          O'qish natijalari va faoliyat ko'rsatkichlari
        </Text>
        <Text className="mt-2 text-[15px] leading-7" style={{ color: colors.secondaryText }}>
          Darslar, testlar, flashcardlar va mini o'yinlardagi faoliyatingiz shu yerda jamlangan.
        </Text>
        <View className="mt-5 flex-row gap-3">
          <View className="flex-1 rounded-[24px] p-4" style={{ backgroundColor: colors.mutedSurface }}>
            <Text className="text-[11px] font-bold uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>
              Umumiy progress
            </Text>
            <Text className="mt-2 text-2xl font-black" style={{ color: colors.text }}>
              {overallProgress}%
            </Text>
          </View>
          <View className="flex-1 rounded-[24px] p-4" style={{ backgroundColor: colors.mutedSurface }}>
            <Text className="text-[11px] font-bold uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>
              Test jami
            </Text>
            <Text className="mt-2 text-2xl font-black" style={{ color: colors.text }}>
              {totalQuizCorrect}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex-row gap-3">
        <MetricCard label="Tugallangan darslar" value={`${completedLessons.length}/${lessons.length}`} accent={colors.accent} />
        <MetricCard label="Test urinishlari" value={`${quizAttempts.length}`} accent={colors.success} />
      </View>
      <View className="flex-row gap-3">
        <MetricCard label="Ko'rilgan kartalar" value={`${viewedFlashcards.length}/${flashcards.length}`} accent={colors.warning} />
        <MetricCard label="Eng yaxshi match" value={`${matchBestScore}/${games.matchingPairs.length}`} accent={colors.text} />
      </View>
      <View className="flex-row gap-3">
        <MetricCard label="Eng yaxshi test" value={`${highestQuizScore}/${quizzes.length}`} accent={colors.accent} />
        <MetricCard label="T/F to'g'ri javoblar" value={`${totalTrueFalseCorrect}`} accent={colors.success} />
      </View>

      <InfoCard className="mt-2">
        <Text className="text-lg font-bold" style={{ color: colors.text }}>
          Umumiy tugallanish
        </Text>
        <Text className="mt-2 text-sm leading-6" style={{ color: colors.secondaryText }}>
          Progress darslar, flashcardlar, testlar, to'g'ri/noto'g'ri natijalari va matching o'yini bo'yicha hisoblanadi.
        </Text>
        <View className="mt-4">
          <ProgressBar value={overallProgress} />
        </View>
        <Text className="mt-3 text-right text-sm font-semibold" style={{ color: colors.accent }}>
          {overallProgress}%
        </Text>
      </InfoCard>

      <InfoCard className="mt-4">
        <Text className="text-lg font-bold" style={{ color: colors.text }}>
          To'g'ri javoblar xulosasi
        </Text>
        <Text className="mt-3 text-sm leading-6" style={{ color: colors.secondaryText }}>
          Barcha test urinishlaridagi to'g'ri javoblar soni: {totalQuizCorrect}
        </Text>
        <Text className="mt-2 text-sm leading-6" style={{ color: colors.secondaryText }}>
          Barcha to'g'ri/noto'g'ri urinishlaridagi to'g'ri javoblar soni: {totalTrueFalseCorrect}
        </Text>
      </InfoCard>
    </ScreenShell>
  );
}
