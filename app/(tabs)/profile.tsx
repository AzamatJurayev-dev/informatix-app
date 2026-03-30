import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Text, useWindowDimensions, View } from "react-native";
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
import { getGridColumns } from "@/utils/layout";

export default function ProfileScreen() {
  const { colors, theme, toggleTheme, favorites, quizAttempts, overallProgress, completedLessons } = useAppState();
  const palette = useThemeColors();
  const { width } = useWindowDimensions();
  const statColumns = getGridColumns(width, 220, 2);
  const actionColumns = getGridColumns(width, 280, 2);
  const statCardWidth = statColumns === 2 ? "48%" : "100%";
  const actionTileWidth = actionColumns === 2 ? "48%" : "100%";
  const heroBadgeGradient = theme === "dark" ? (["#0f172a", "#1e293b", colors.accent] as const) : (["#161c2f", "#27324b", colors.accent] as const);
  const heroPanelBackground = theme === "dark" ? colors.mutedSurface : "#161c2f";
  const heroPanelText = theme === "dark" ? colors.text : "#ffffff";
  const heroPanelSubtleText = theme === "dark" ? colors.secondaryText : "rgba(255,255,255,0.6)";
  const heroPanelChipBackground = theme === "dark" ? colors.accentSoft : "rgba(255,255,255,0.1)";

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
          className="overflow-hidden rounded-[36px] border p-6"
          style={{
            backgroundColor: theme === "dark" ? `${colors.surface}F4` : colors.surface,
            borderColor: colors.cardBorder,
            shadowColor: "#0f172a",
            shadowOpacity: 0.1,
            shadowRadius: 24,
            shadowOffset: { width: 0, height: 14 },
            elevation: 7,
          }}
        >
          <LinearGradient
            colors={[`${colors.accent}18`, `${colors.success}10`, "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="absolute inset-0"
          />
          <View className="absolute -right-10 top-6 h-40 w-40 rounded-full" style={{ backgroundColor: `${colors.accent}12` }} />
          <View className="absolute right-16 top-24 h-24 w-24 rounded-full" style={{ backgroundColor: `${colors.success}10` }} />
          <View className="absolute -left-10 bottom-0 h-28 w-28 rounded-full" style={{ backgroundColor: `${colors.success}14` }} />

          <View className="flex-row items-start justify-between">
            <LinearGradient
              colors={heroBadgeGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="h-16 w-16 items-center justify-center rounded-[24px]"
            >
              <Text className="text-2xl font-black text-white">P</Text>
            </LinearGradient>
            <View className="rounded-full border px-4 py-2" style={{ backgroundColor: `${colors.surface}CC`, borderColor: colors.cardBorder }}>
              <Text className="text-xs font-bold uppercase tracking-[2px]" style={{ color: colors.accent }}>
                Dashboard
              </Text>
            </View>
          </View>

          <Text className="mt-6 text-[34px] font-black leading-10" style={{ color: colors.text }}>
            Profil va boshqaruv
          </Text>
          <Text className="mt-3 max-w-[620px] text-sm leading-6" style={{ color: colors.secondaryText }}>
            Saqlangan materiallar, progress nazorati va ilova ko'rinishini boshqarish uchun markaziy bo'lim.
          </Text>

          <View className="mt-5 self-start rounded-full px-4 py-2" style={{ backgroundColor: colors.accentSoft }}>
            <Text className="text-[11px] font-bold uppercase tracking-[2px]" style={{ color: colors.accent }}>
              Shaxsiy panel
            </Text>
          </View>

          <View className="mt-6 flex-row flex-wrap justify-between">
            <View className="mb-3 rounded-[26px] p-4" style={{ backgroundColor: `${colors.surface}E6`, borderWidth: 1, borderColor: colors.cardBorder, width: statCardWidth }}>
              <Text className="text-[11px] font-bold uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>
                Progress
              </Text>
              <Text className="mt-2 text-[30px] font-black" style={{ color: colors.text }}>
                {overallProgress}%
              </Text>
              <Text className="mt-1 text-xs leading-5" style={{ color: colors.secondaryText }}>
                Umumiy o'zlashtirish holati
              </Text>
            </View>
            <View className="mb-3 rounded-[26px] p-4" style={{ backgroundColor: `${colors.surface}E6`, borderWidth: 1, borderColor: colors.cardBorder, width: statCardWidth }}>
              <Text className="text-[11px] font-bold uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>
                Darslar
              </Text>
              <Text className="mt-2 text-[30px] font-black" style={{ color: colors.text }}>
                {completedLessons.length}
              </Text>
              <Text className="mt-1 text-xs leading-5" style={{ color: colors.secondaryText }}>
                Tugallangan mavzular soni
              </Text>
            </View>
          </View>

          <View className="rounded-[26px] px-4 py-4" style={{ backgroundColor: heroPanelBackground }}>
            <View className="flex-row items-center justify-between">
              <View className="flex-1 pr-4">
                <Text className="text-[11px] font-bold uppercase tracking-[2px]" style={{ color: heroPanelSubtleText }}>
                  Faollik
                </Text>
                <Text className="mt-2 text-lg font-bold" style={{ color: heroPanelText }}>
                  Saqlanganlar va test natijalari shu yerda boshqariladi
                </Text>
              </View>
              <View className="rounded-full px-3 py-2" style={{ backgroundColor: heroPanelChipBackground }}>
                <Text className="text-xs font-bold" style={{ color: heroPanelText }}>
                  {favorites.length + quizAttempts.length} aktiv
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(100).duration(450)} className="mt-6">
        <View className="flex-row flex-wrap justify-between">
          <MetricCard label="Saralanganlar" value={`${favorites.length}`} accent={palette.accent} style={{ width: statCardWidth }} />
          <MetricCard label="Test urinishlari" value={`${quizAttempts.length}`} accent={palette.success} style={{ width: statCardWidth }} />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(160).duration(450)}>
        <InfoCard className="mt-2">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-xl font-black" style={{ color: colors.text }}>
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
          <View className="mt-5 flex-row items-center justify-between rounded-[22px] px-4 py-4" style={{ backgroundColor: colors.mutedSurface }}>
            <View className="flex-1 pr-3">
              <Text className="text-sm font-semibold" style={{ color: colors.text }}>
                Hozirgi yo'nalish
              </Text>
              <Text className="mt-1 text-xs leading-5" style={{ color: colors.secondaryText }}>
                Progress ko'rsatkichlari dars, test va faol mashqlarga qarab yangilanadi.
              </Text>
            </View>
            <View className="rounded-full px-3 py-2" style={{ backgroundColor: colors.accentSoft }}>
              <Text className="text-xs font-bold" style={{ color: colors.accent }}>
                {overallProgress >= 70 ? "Yaxshi" : "Jarayonda"}
              </Text>
            </View>
          </View>
        </InfoCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(220).duration(450)}>
        <InfoCard className="mt-4">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-xl font-black" style={{ color: colors.text }}>
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
          <View className="mt-5 rounded-[22px] px-4 py-4" style={{ backgroundColor: colors.mutedSurface }}>
            <Text className="text-[11px] font-bold uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>
              Faol tema
            </Text>
            <Text className="mt-2 text-sm font-semibold" style={{ color: colors.text }}>
              {theme === "light" ? "Yorug ko'rinish faol" : "Qorong'i ko'rinish faol"}
            </Text>
          </View>
        </InfoCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(280).duration(450)} className="mt-8">
        <SectionTitle title="Qo'shimcha bo'limlar" subtitle="Saqlangan materiallar va tahliliy sahifalar" />
        <View className="flex-row flex-wrap justify-between">
          <ActionTile
            title="Saralanganlar"
            subtitle="Saqlangan dars va metodlar"
            icon="heart-outline"
            onPress={() => router.push("/favorites")}
            fullWidth={actionColumns === 1}
            style={{ width: actionTileWidth }}
          />
          <ActionTile
            title="Statistika"
            subtitle="Ball va progress tahlili"
            icon="stats-chart-outline"
            onPress={() => router.push("/statistics")}
            fullWidth={actionColumns === 1}
            style={{ width: actionTileWidth }}
          />
          <ActionTile
            title="Qidiruv"
            subtitle="Dars va metod izlash"
            icon="search-outline"
            onPress={() => router.push("/search")}
            fullWidth={actionColumns === 1}
            style={{ width: actionTileWidth }}
          />
          <ActionTile
            title="Loyiha haqida"
            subtitle="Maqsad va xulosa"
            icon="information-circle-outline"
            onPress={() => router.push("/about")}
            fullWidth={actionColumns === 1}
            style={{ width: actionTileWidth }}
          />
        </View>
      </Animated.View>
    </ScreenShell>
  );
}
