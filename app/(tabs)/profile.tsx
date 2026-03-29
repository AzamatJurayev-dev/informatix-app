import { router } from "expo-router";
import { Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { AppHeader } from "@/components/app-header";
import { ActionTile } from "@/components/action-tile";
import { InfoCard } from "@/components/info-card";
import { MetricCard } from "@/components/metric-card";
import { ProgressBar } from "@/components/progress-bar";
import { ScreenShell } from "@/components/screen-shell";
import { SectionTitle } from "@/components/section-title";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAppState } from "@/context/app-context";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function ProfileScreen() {
  const { colors, theme, toggleTheme, favorites, quizAttempts, overallProgress, completedLessons } = useAppState();
  const palette = useThemeColors();

  async function handleThemeChange(nextTheme: "light" | "dark") {
    if (nextTheme !== theme) {
      await toggleTheme();
    }
  }

  return (
    <ScreenShell>
      <AppHeader
        title="Profil va boshqaruv"
        subtitle="Saqlangan materiallar, progress nazorati va ilova ko'rinishini bir joydan boshqaring"
        showBack={false}
        eyebrow="Shaxsiy panel"
        actions={[
          { icon: "stats-chart-outline", onPress: () => router.push("/statistics") },
          { icon: "information-circle-outline", onPress: () => router.push("/about") },
        ]}
      />

      <Animated.View entering={FadeInDown.duration(450)}>
        <View
          className="overflow-hidden rounded-[34px] border bg-white p-6"
          style={{
            borderColor: colors.cardBorder,
            shadowColor: "#0f172a",
            shadowOpacity: 0.07,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 12 },
            elevation: 5,
          }}
        >
          <View className="absolute -right-8 top-8 h-36 w-36 rounded-full" style={{ backgroundColor: `${colors.accent}12` }} />
          <View className="absolute -left-10 bottom-0 h-28 w-28 rounded-full" style={{ backgroundColor: `${colors.success}14` }} />
          <View className="flex-row items-start justify-between">
            <View className="h-16 w-16 items-center justify-center rounded-[22px] bg-[#161c2f]">
              <Text className="text-2xl font-black text-white">P</Text>
            </View>
            <View className="rounded-full px-4 py-2" style={{ backgroundColor: colors.accentSoft }}>
              <Text className="text-xs font-bold uppercase tracking-[2px]" style={{ color: colors.accent }}>
                O'quv paneli
              </Text>
            </View>
          </View>

          <Text className="mt-5 text-3xl font-black" style={{ color: colors.text }}>
            Profil va boshqaruv
          </Text>
          <Text className="mt-3 text-sm leading-6" style={{ color: colors.secondaryText }}>
            Saqlangan materiallar, progress nazorati va ilova ko'rinishini boshqarish uchun markaziy bo'lim.
          </Text>

          <View className="mt-6 flex-row gap-3">
            <View className="flex-1 rounded-[24px] p-4" style={{ backgroundColor: colors.mutedSurface }}>
              <Text className="text-xs uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>
                Progress
              </Text>
              <Text className="mt-2 text-2xl font-black" style={{ color: colors.text }}>
                {overallProgress}%
              </Text>
            </View>
            <View className="flex-1 rounded-[24px] p-4" style={{ backgroundColor: colors.mutedSurface }}>
              <Text className="text-xs uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>
                Darslar
              </Text>
              <Text className="mt-2 text-2xl font-black" style={{ color: colors.text }}>
                {completedLessons.length}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(100).duration(450)} className="mt-6 flex-row gap-3">
        <MetricCard label="Saralanganlar" value={`${favorites.length}`} accent={palette.accent} />
        <MetricCard label="Test urinishlari" value={`${quizAttempts.length}`} accent={palette.success} />
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(160).duration(450)}>
        <InfoCard className="mt-2">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-lg font-bold" style={{ color: colors.text }}>
                Umumiy progress
              </Text>
              <Text className="mt-2 text-sm leading-6" style={{ color: colors.secondaryText }}>
                Darslar, testlar, flashcardlar va mini o'yinlar bo'yicha o'sish holati.
              </Text>
            </View>
            <View className="rounded-full px-3 py-2" style={{ backgroundColor: colors.accentSoft }}>
              <Text className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: colors.accent }}>
                {overallProgress}%
              </Text>
            </View>
          </View>
          <View className="mt-4">
            <ProgressBar value={overallProgress} />
          </View>
        </InfoCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(220).duration(450)}>
        <InfoCard className="mt-4">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-lg font-bold" style={{ color: colors.text }}>
                Mavzu rejimi
              </Text>
              <Text className="mt-2 text-sm leading-6" style={{ color: colors.secondaryText }}>
                Ilova ko'rinishini yorug yoki qorong'i rejimga o'tkazing.
              </Text>
            </View>
            <View className="rounded-full px-3 py-2" style={{ backgroundColor: colors.mutedSurface }}>
              <Text className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>
                Ko'rinish
              </Text>
            </View>
          </View>
          <View className="mt-4 items-center">
            <ThemeToggle value={theme} onChange={handleThemeChange} />
          </View>
        </InfoCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(280).duration(450)} className="mt-8">
        <SectionTitle title="Qo'shimcha bo'limlar" subtitle="Saqlangan materiallar va tahliliy sahifalar" />
        <View className="gap-3">
          <ActionTile
            title="Saralanganlar"
            subtitle="Saqlangan dars va metodlar"
            icon="heart-outline"
            onPress={() => router.push("/favorites")}
            fullWidth
          />
          <ActionTile
            title="Statistika"
            subtitle="Ball va progress tahlili"
            icon="stats-chart-outline"
            onPress={() => router.push("/statistics")}
            fullWidth
          />
          <ActionTile
            title="Qidiruv"
            subtitle="Dars va metod izlash"
            icon="search-outline"
            onPress={() => router.push("/search")}
            fullWidth
          />
          <ActionTile
            title="Loyiha haqida"
            subtitle="Maqsad va xulosa"
            icon="information-circle-outline"
            onPress={() => router.push("/about")}
            fullWidth
          />
        </View>
      </Animated.View>
    </ScreenShell>
  );
}
