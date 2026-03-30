import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import lessons from "@/data/lessons.json";
import methods from "@/data/methods.json";
import { AppHeader } from "@/components/app-header";
import { AnimatedButton } from "@/components/animated-button";
import { FeatureCard } from "@/components/feature-card";
import { IconButton } from "@/components/icon-button";
import { InfoCard } from "@/components/info-card";
import { MetricCard } from "@/components/metric-card";
import { ProgressBar } from "@/components/progress-bar";
import { ScreenShell } from "@/components/screen-shell";
import { SectionTitle } from "@/components/section-title";
import { useAppState } from "@/context/app-context";
import { useThemeColors } from "@/hooks/useThemeColors";
import { getGridColumns } from "@/utils/layout";

export default function HomeScreen() {
  const { completedLessons, highestQuizScore, overallProgress, viewedFlashcards, favorites, theme, toggleTheme } = useAppState();
  const colors = useThemeColors();
  const { width } = useWindowDimensions();
  const statsColumns = getGridColumns(width, 220, 2);
  const featureColumns = getGridColumns(width, 280, 2);
  const statCardWidth = statsColumns === 2 ? "48%" : "100%";
  const featureCardWidth = featureColumns === 2 ? "48%" : "100%";
  const featuredCardBackground = theme === "dark" ? `${colors.surface}F2` : colors.surface;
  const featuredHeroChipBackground = theme === "dark" ? colors.mutedSurface : "#161c2f";
  const featuredHeroChipText = theme === "dark" ? colors.text : "#ffffff";
  const featuredActionBackground = theme === "dark" ? colors.mutedSurface : "#161c2f";
  const featuredActionText = theme === "dark" ? colors.text : "#ffffff";
  const featuredActionSubtle = theme === "dark" ? colors.secondaryText : "rgba(255,255,255,0.6)";
  const featuredActionButtonBackground = theme === "dark" ? colors.accentSoft : "#ffffff";
  const featuredActionButtonColor = theme === "dark" ? colors.accent : "#161c2f";
  const activeChipBackground = theme === "dark" ? colors.text : "#161c2f";
  const activeChipText = theme === "dark" ? colors.background : "#ffffff";
  const featuredMethod = methods[new Date().getDate() % methods.length];
  const featuredLesson = lessons[(new Date().getDate() + 2) % lessons.length];

  return (
    <ScreenShell>
      <AppHeader
        title="Bugungi o'qish"
        subtitle="Dars, metod va mashqlarni bir joydan boshqaring"
        showBack={false}
        eyebrow="Asosiy panel"
        actions={[]}
      />

      <Animated.View entering={FadeInDown.duration(420)}>
        <View
          className="flex-row items-center gap-3 rounded-[26px] border px-4 py-3"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.cardBorder,
            shadowColor: "#0f172a",
            shadowOpacity: 0.05,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 8 },
            elevation: 3,
          }}
        >
          <View className="h-11 w-11 items-center justify-center rounded-full" style={{ backgroundColor: colors.mutedSurface }}>
            <Ionicons name="search-outline" size={18} color={colors.accent} />
          </View>
          <Pressable className="flex-1" onPress={() => router.push("/search")}>
            <Text className="text-[11px] font-bold uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>
              Aqlli qidiruv
            </Text>
            <Text className="mt-1 text-sm" style={{ color: colors.text }}>
              Dars, metod yoki termin izlang
            </Text>
          </Pressable>
          <IconButton icon={theme === "light" ? "moon-outline" : "sunny-outline"} onPress={toggleTheme} variant="ghost" />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(40).duration(420)} className="mt-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingRight: 8 }}>
          {["Darslar", "Metodlar", "Quiz"].map((chip, index) => (
            <View
              key={chip}
              className="rounded-full border px-4 py-2"
              style={{ backgroundColor: index === 0 ? activeChipBackground : colors.surface, borderColor: index === 0 ? activeChipBackground : colors.cardBorder }}
            >
              <Text className="text-xs font-semibold" style={{ color: index === 0 ? activeChipText : colors.secondaryText }}>
                {chip}
              </Text>
            </View>
          ))}
        </ScrollView>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(80).duration(450)}>
        <View
          className="mt-5 overflow-hidden rounded-[36px] border p-5"
          style={{
            backgroundColor: featuredCardBackground,
            borderColor: colors.cardBorder,
            shadowColor: "#0f172a",
            shadowOpacity: 0.08,
            shadowRadius: 22,
            shadowOffset: { width: 0, height: 12 },
            elevation: 5,
          }}
        >
          <View className="absolute -right-10 top-3 h-36 w-36 rounded-full" style={{ backgroundColor: `${colors.accent}12` }} />
          <View className="absolute right-5 top-20 h-24 w-24 rounded-full" style={{ backgroundColor: `${colors.success}12` }} />

          <View className="flex-row items-start justify-between">
            <View className="rounded-full px-3 py-2" style={{ backgroundColor: colors.mutedSurface }}>
              <Text className="text-[11px] font-bold uppercase tracking-[2px]" style={{ color: colors.accent }}>Tanlangan dars</Text>
            </View>
            <View className="rounded-full px-3 py-2" style={{ backgroundColor: featuredHeroChipBackground }}>
              <Text className="text-[11px] font-bold uppercase tracking-[2px]" style={{ color: featuredHeroChipText }}>Bugun</Text>
            </View>
          </View>

          <View className="mt-5">
            <View className="pr-0">
              <Text className="text-xs font-semibold" style={{ color: colors.secondaryText }}>{featuredLesson.moduleTitle}</Text>
              <Text className="mt-2 text-[26px] font-black leading-8" style={{ color: colors.text }}>{featuredLesson.title}</Text>
              <Text className="mt-3 text-sm" style={{ color: colors.secondaryText }}>{featuredLesson.level} / {featuredLesson.focusArea}</Text>
            </View>
            <View className="mt-4 self-start rounded-[24px] p-3" style={{ backgroundColor: colors.mutedSurface }}>
              <Image source={require("../../assets/icon.png")} style={{ width: 52, height: 52, borderRadius: 18 }} />
            </View>
          </View>

          <View className="mt-5 rounded-[24px] p-4" style={{ backgroundColor: colors.mutedSurface }}>
            <Text className="text-sm leading-6" style={{ color: colors.secondaryText }}>
              {featuredLesson.description}
            </Text>
          </View>

          <View className="mt-5 flex-row items-center justify-between rounded-[24px] px-4 py-4" style={{ backgroundColor: featuredActionBackground }}>
            <View className="flex-1 pr-4">
              <Text className="text-[11px] font-bold uppercase tracking-[2px]" style={{ color: featuredActionSubtle }}>Davom etish</Text>
              <Text className="mt-1 text-sm" style={{ color: featuredActionText }}>Dars mazmuni va amaliy qismini oching</Text>
            </View>
            <Pressable
              onPress={() => router.push(`/lesson/${featuredLesson.id}` as never)}
              className="h-11 w-11 items-center justify-center rounded-full"
              style={{ backgroundColor: featuredActionButtonBackground }}
            >
              <Ionicons name="arrow-forward" size={18} color={featuredActionButtonColor} />
            </Pressable>
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(100).duration(450)} className="mt-6">
        <View className="flex-row flex-wrap justify-between">
          <MetricCard label="Tugallangan darslar" value={`${completedLessons.length}/${lessons.length}`} accent={colors.accent} style={{ width: statCardWidth }} />
          <MetricCard label="Eng yaxshi test" value={`${highestQuizScore}/12`} accent={colors.success} style={{ width: statCardWidth }} />
        </View>
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(140).duration(450)}>
        <View className="flex-row flex-wrap justify-between">
          <MetricCard label="Ko'rilgan kartalar" value={`${viewedFlashcards.length}/8`} accent={colors.warning} style={{ width: statCardWidth }} />
          <MetricCard label="Saralanganlar" value={`${favorites.length}`} accent={colors.text} style={{ width: statCardWidth }} />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(180).duration(450)} className="mt-2">
        <InfoCard>
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-xl font-black" style={{ color: colors.text }}>
                Progress xulosasi
              </Text>
              <Text className="mt-2 text-sm leading-6" style={{ color: colors.secondaryText }}>
                Darslar, quiz, flashcard va mini o'yinlar bo'yicha umumiy o'sish holati.
              </Text>
            </View>
            <View className="rounded-full px-3 py-2" style={{ backgroundColor: colors.accentSoft }}>
              <Text className="text-xs font-bold uppercase tracking-[2px]" style={{ color: colors.accent }}>
                {overallProgress}%
              </Text>
            </View>
          </View>
          <View className="mt-4">
            <ProgressBar value={overallProgress} />
          </View>
        </InfoCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(220).duration(450)} className="mt-3">
        <InfoCard>
          <LinearGradient colors={[colors.accent, colors.success]} className="self-start rounded-full px-3 py-1.5">
            <Text className="text-[11px] font-bold uppercase tracking-[2px] text-white">Kun savoli</Text>
          </LinearGradient>
          <Text className="mt-4 text-[22px] font-black leading-8" style={{ color: colors.text }}>
            Qaysi interaktiv metod talabani eng tez faollashtiradi va nega?
          </Text>
          <Text className="mt-3 text-sm leading-6" style={{ color: colors.secondaryText }}>
            Dars boshida qisqa muhokama uchun foydalaning yoki guruh bilan 2 xil metodni taqqoslang.
          </Text>
          <View className="mt-4 self-start rounded-full px-3 py-2" style={{ backgroundColor: colors.accentSoft }}>
            <Text className="text-[11px] font-semibold uppercase tracking-[2px]" style={{ color: colors.accent }}>
              Muhokama uchun
            </Text>
          </View>
        </InfoCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(260).duration(450)} className="mt-8">
        <SectionTitle title="Tezkor bo'limlar" subtitle="Mashq va takrorlash uchun interaktiv sahifalar" />
        <View className="flex-row flex-wrap justify-between">
          <FeatureCard
            title="Metodlar katalogi"
            description="Informatika darslari uchun interaktiv metodlarni ko'ring."
            icon="grid-outline"
            onPress={() => router.push("/methods")}
            style={{ width: featureCardWidth, marginBottom: 12 }}
          />
          <FeatureCard
            title="Flashcardlar"
            description="Asosiy terminlarni takrorlang va ko'rilganlarini belgilang."
            icon="albums-outline"
            onPress={() => router.push("/flashcards")}
            style={{ width: featureCardWidth, marginBottom: 12 }}
          />
          <FeatureCard
            title="Moslashtirish o'yini"
            description="Termin va tariflarni to'g'ri juftliklarga ajrating."
            icon="extension-puzzle-outline"
            onPress={() => router.push("/match-game")}
            style={{ width: featureCardWidth, marginBottom: 12 }}
          />
          <FeatureCard
            title="To'g'ri / Noto'g'ri"
            description="Tezkor savollar orqali asosiy g'oyalarni mustahkamlang."
            icon="checkmark-done-outline"
            onPress={() => router.push("/true-false")}
            style={{ width: featureCardWidth, marginBottom: 12 }}
          />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).duration(450)} className="mt-6">
        <SectionTitle title="Tavsiya etilgan metod" subtitle="Metodlar katalogidan kunlik tanlov" />
        <InfoCard>
          <Text className="text-xs font-semibold uppercase tracking-[2px]" style={{ color: colors.accent }}>
            Kun tavsiyasi
          </Text>
          <Text className="mt-3 text-2xl font-bold" style={{ color: colors.text }}>
            {featuredMethod.name}
          </Text>
          <Text className="mt-3 text-sm leading-6" style={{ color: colors.secondaryText }}>
            {featuredMethod.summary}
          </Text>
          <View className="mt-5">
            <AnimatedButton label="Metodni ochish" onPress={() => router.push(`/method/${featuredMethod.id}` as never)} />
          </View>
        </InfoCard>
      </Animated.View>
    </ScreenShell>
  );
}
