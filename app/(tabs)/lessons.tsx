import { router } from "expo-router";
import { Text, View } from "react-native";
import lessons from "@/data/lessons.json";
import { AppHeader } from "@/components/app-header";
import { ContentCard } from "@/components/content-card";
import { MetricCard } from "@/components/metric-card";
import { ScreenShell } from "@/components/screen-shell";
import { SectionTitle } from "@/components/section-title";
import { useAppState } from "@/context/app-context";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Lesson } from "@/types/content";

type LessonGroup = {
  module: string;
  title: string;
  description: string;
  items: Lesson[];
};

export default function LessonsScreen() {
  const colors = useThemeColors();
  const { completedLessons } = useAppState();

  const groupedLessons = (lessons as Lesson[]).reduce<LessonGroup[]>((groups, lesson) => {
    const existing = groups.find((group) => group.module === lesson.module);
    if (existing) {
      existing.items.push(lesson);
      return groups;
    }

    groups.push({
      module: lesson.module,
      title: lesson.moduleTitle,
      description: lesson.moduleDescription,
      items: [lesson],
    });

    return groups;
  }, []);

  return (
    <ScreenShell>
      <AppHeader
        title="Darslar modullari"
        subtitle="Mavzular yirik bo'limlarga ajratilgan, har bir bo'lim ichida esa alohida darslar ketma-ket joylashgan."
        showBack={false}
        eyebrow="Darslar"
        actions={[
          { icon: "search-outline", onPress: () => router.push("/search") },
          { icon: "heart-outline", onPress: () => router.push("/favorites") },
        ]}
      />

      <View
        className="overflow-hidden rounded-[34px] border bg-white p-6"
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
            Darslar katalogi
          </Text>
        </View>
        <Text className="mt-4 text-[28px] font-black leading-9" style={{ color: colors.text }}>
          Informatika darslari modullar bo'yicha
        </Text>
        <Text className="mt-2 text-[15px] leading-7" style={{ color: colors.secondaryText }}>
          Pedagogik asoslar, dasturlash, veb texnologiyalar hamda tarmoq va xavfsizlik bo'yicha darslar bir joyda.
        </Text>

        <View className="mt-5 self-start rounded-[22px] px-4 py-4" style={{ backgroundColor: colors.mutedSurface }}>
          <Text className="text-[11px] font-bold uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>
            Yo'nalish
          </Text>
          <Text className="mt-2 text-base font-black" style={{ color: colors.accent }}>
            DL / modulli tuzilma
          </Text>
        </View>

        <View className="mt-5 flex-row gap-3">
          <View className="flex-1 rounded-[24px] p-4" style={{ backgroundColor: colors.mutedSurface }}>
            <Text className="text-xs uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>Modullar</Text>
            <Text className="mt-2 text-2xl font-black" style={{ color: colors.text }}>{groupedLessons.length}</Text>
          </View>
          <View className="flex-1 rounded-[24px] p-4" style={{ backgroundColor: colors.mutedSurface }}>
            <Text className="text-xs uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>Darslar</Text>
            <Text className="mt-2 text-2xl font-black" style={{ color: colors.text }}>{lessons.length}</Text>
          </View>
        </View>
      </View>

      <View className="mt-6 gap-3">
        <MetricCard label="Jami darslar" value={`${lessons.length}`} accent={colors.accent} />
        <MetricCard label="Tugallanganlar" value={`${completedLessons.length}`} accent={colors.success} />
      </View>

      <View className="mt-5">
        <SectionTitle
          title="Modullar bo'yicha darslar"
          subtitle="Har bir katta mavzu ichida kichik darslar tartibli va bosqichma-bosqich joylashtirilgan."
        />
      </View>

      {groupedLessons.map((group, index) => (
        <View key={group.module} className="mb-7">
          <View className="mb-4 overflow-hidden rounded-[30px] border px-5 py-5" style={{ backgroundColor: colors.surface, borderColor: colors.cardBorder }}>
            <View className="self-start rounded-full px-3 py-2" style={{ backgroundColor: colors.accentSoft }}>
              <Text className="text-[11px] font-bold uppercase tracking-[2px]" style={{ color: colors.accent }}>
                {group.items.length} ta dars
              </Text>
            </View>
            <Text className="mt-4 text-[28px] font-black leading-9" style={{ color: colors.text }}>
              {group.title}
            </Text>
            <Text className="mt-2 text-[15px] leading-7" style={{ color: colors.secondaryText }}>
              {group.description}
            </Text>
          </View>

          {group.items.map((lesson) => (
            <ContentCard
              key={lesson.id}
              title={lesson.title}
              description={lesson.description}
              meta={`${lesson.category} / ${lesson.focusArea}`}
              icon="book-outline"
              trailingLabel={completedLessons.includes(lesson.id) ? "Tayyor" : lesson.level}
              onPress={() => router.push(`/lesson/${lesson.id}` as never)}
            />
          ))}
        </View>
      ))}
    </ScreenShell>
  );
}
