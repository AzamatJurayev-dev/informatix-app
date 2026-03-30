import { router } from "expo-router";
import { Text, useWindowDimensions, View } from "react-native";
import lessons from "@/data/lessons.json";
import methods from "@/data/methods.json";
import { AppHeader } from "@/components/app-header";
import { ContentCard } from "@/components/content-card";
import { EmptyState } from "@/components/empty-state";
import { MetricCard } from "@/components/metric-card";
import { ScreenShell } from "@/components/screen-shell";
import { SectionTitle } from "@/components/section-title";
import { useAppState } from "@/context/app-context";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Lesson, Method } from "@/types/content";
import { getGridColumns } from "@/utils/layout";

export default function FavoritesScreen() {
  const { favorites } = useAppState();
  const colors = useThemeColors();
  const { width } = useWindowDimensions();
  const statColumns = getGridColumns(width, 220, 2);
  const contentColumns = getGridColumns(width, 320, 2);
  const statCardWidth = statColumns === 2 ? "48%" : "100%";
  const contentCardWidth = contentColumns === 2 ? "48.5%" : "100%";
  const favoriteLessons = (lessons as Lesson[]).filter((lesson) => favorites.some((item) => item.type === "lesson" && item.id === lesson.id));
  const favoriteMethods = (methods as Method[]).filter((method) => favorites.some((item) => item.type === "method" && item.id === method.id));

  return (
    <ScreenShell>
      <AppHeader
        title="Saralanganlar"
        subtitle="Saqlab qo'yilgan dars va metodlarni modul hamda kategoriya bo'yicha ko'rib chiqing"
        eyebrow="Saqlanganlar"
        actions={[{ icon: "search-outline", onPress: () => router.push("/search") }]}
      />

      <View
        className="rounded-[34px] border p-6"
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
        <View className="absolute -right-8 top-4 h-32 w-32 rounded-full" style={{ backgroundColor: `${colors.accent}12` }} />
        <View className="self-start rounded-full px-3 py-2" style={{ backgroundColor: colors.accentSoft }}>
          <Text className="text-xs font-bold uppercase tracking-[2px]" style={{ color: colors.accent }}>
            Tanlangan kontent
          </Text>
        </View>
        <Text className="mt-4 text-[28px] font-black leading-9" style={{ color: colors.text }}>
          Qayta ko'rish uchun saqlangan materiallar
        </Text>
        <Text className="mt-2 text-[15px] leading-7" style={{ color: colors.secondaryText }}>
          Keyinroq qaytib o'qish yoki taqdimot uchun belgilangan darslar va metodlar shu yerda jamlanadi.
        </Text>

        <View className="mt-5 flex-row flex-wrap justify-between">
          <View className="rounded-[24px] p-4" style={{ backgroundColor: colors.mutedSurface, width: statCardWidth }}>
            <Text className="text-xs uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>Darslar</Text>
            <Text className="mt-2 text-2xl font-black" style={{ color: colors.text }}>{favoriteLessons.length}</Text>
          </View>
          <View className="rounded-[24px] p-4" style={{ backgroundColor: colors.mutedSurface, width: statCardWidth }}>
            <Text className="text-xs uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>Metodlar</Text>
            <Text className="mt-2 text-2xl font-black" style={{ color: colors.text }}>{favoriteMethods.length}</Text>
          </View>
        </View>
      </View>

      <View className="mt-6 flex-row flex-wrap justify-between">
        <MetricCard label="Saqlangan darslar" value={`${favoriteLessons.length}`} accent={colors.accent} style={{ width: statCardWidth }} />
        <MetricCard label="Saqlangan metodlar" value={`${favoriteMethods.length}`} accent={colors.success} style={{ width: statCardWidth }} />
      </View>

      <View className="mt-4">
        {favoriteLessons.length === 0 && favoriteMethods.length === 0 ? (
          <EmptyState title="Hali saralanganlar yo'q" message="Dars yoki metoddagi yurak tugmasini bosib, uni shu yerga saqlang." />
        ) : null}
      </View>

      {favoriteLessons.length > 0 ? (
        <View className="mt-2">
          <SectionTitle title="Saqlangan darslar" subtitle="Modul va yo'nalish bo'yicha belgilangan darslar" />
          <View className="flex-row flex-wrap justify-between">
            {favoriteLessons.map((lesson) => (
              <ContentCard
                key={lesson.id}
                title={lesson.title}
                description={lesson.description}
                meta={`${lesson.moduleTitle} / ${lesson.focusArea}`}
                icon="book-outline"
                onPress={() => router.push(`/lesson/${lesson.id}` as never)}
                style={{ width: contentCardWidth }}
              />
            ))}
          </View>
        </View>
      ) : null}

      {favoriteMethods.length > 0 ? (
        <View className="mt-2">
          <SectionTitle title="Saqlangan metodlar" subtitle="Kategoriya va amaliy fokus bo'yicha belgilangan metodlar" />
          <View className="flex-row flex-wrap justify-between">
            {favoriteMethods.map((method) => (
              <ContentCard
                key={method.id}
                title={method.name}
                description={method.summary}
                meta={`${method.groupTitle} / ${method.focusArea}`}
                icon="grid-outline"
                onPress={() => router.push(`/method/${method.id}` as never)}
                style={{ width: contentCardWidth }}
              />
            ))}
          </View>
        </View>
      ) : null}
    </ScreenShell>
  );
}
