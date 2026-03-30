import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Text, TextInput, View } from "react-native";
import lessons from "@/data/lessons.json";
import methods from "@/data/methods.json";
import { AppHeader } from "@/components/app-header";
import { ContentCard } from "@/components/content-card";
import { EmptyState } from "@/components/empty-state";
import { ScreenShell } from "@/components/screen-shell";
import { SectionTitle } from "@/components/section-title";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Lesson, Method } from "@/types/content";

export default function SearchScreen() {
  const colors = useThemeColors();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return {
        lessons: (lessons as Lesson[]).slice(0, 4),
        methods: (methods as Method[]).slice(0, 4),
      };
    }

    return {
      lessons: (lessons as Lesson[]).filter(
        (lesson) =>
          lesson.title.toLowerCase().includes(normalized) ||
          lesson.description.toLowerCase().includes(normalized) ||
          lesson.moduleTitle.toLowerCase().includes(normalized) ||
          lesson.focusArea.toLowerCase().includes(normalized) ||
          lesson.tags.some((tag) => tag.toLowerCase().includes(normalized))
      ),
      methods: (methods as Method[]).filter(
        (method) =>
          method.name.toLowerCase().includes(normalized) ||
          method.summary.toLowerCase().includes(normalized) ||
          method.groupTitle.toLowerCase().includes(normalized) ||
          method.focusArea.toLowerCase().includes(normalized) ||
          method.tags.some((tag) => tag.toLowerCase().includes(normalized))
      ),
    };
  }, [query]);

  return (
    <ScreenShell>
      <AppHeader
        title="Qidiruv"
        subtitle="Dars, modul, metod yoki kalit so'z bo'yicha kerakli mavzuni tez toping"
        eyebrow="Qidiruv"
        actions={[{ icon: "heart-outline", onPress: () => router.push("/favorites") }]}
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
            Aqlli filtrlash
          </Text>
        </View>
        <Text className="mt-4 text-[28px] font-black leading-9" style={{ color: colors.text }}>
          Kerakli mavzuni tez toping
        </Text>
        <Text className="mt-2 text-[15px] leading-7" style={{ color: colors.secondaryText }}>
          Modul nomi, metod turi yoki kalit so'z orqali qidiruvni amalga oshiring.
        </Text>

        <View
          className="mt-5 flex-row items-center rounded-[24px] border px-4 py-3"
          style={{ backgroundColor: colors.mutedSurface, borderColor: colors.cardBorder }}
        >
          <View className="h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: colors.surface }}>
            <Ionicons name="search-outline" size={18} color={colors.accent} />
          </View>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Masalan: algoritm, gamifikatsiya"
            placeholderTextColor={colors.secondaryText}
            className="ml-3 flex-1 text-sm"
            style={{ color: colors.text }}
          />
        </View>
      </View>

      <View className="mt-6">
        <SectionTitle title="Darslar" subtitle="Modul va fokus yo'nalishi bilan topilgan darslar" />
      </View>
      {results.lessons.length === 0 ? (
        <EmptyState title="Dars topilmadi" message="Modul nomi, metodika yoki fan bo'limiga oid boshqa so'zlarni sinab ko'ring." />
      ) : (
        results.lessons.map((lesson) => (
          <ContentCard
            key={lesson.id}
            title={lesson.title}
            description={lesson.description}
            meta={`${lesson.moduleTitle} / ${lesson.focusArea}`}
            icon="book-outline"
            onPress={() => router.push(`/lesson/${lesson.id}` as never)}
          />
        ))
      )}

      <View className="mt-2">
        <SectionTitle title="Metodlar" subtitle="Kategoriya va amaliy qo'llash bo'yicha topilgan metodlar" />
      </View>
      {results.methods.length === 0 ? (
        <EmptyState
          title="Metod topilmadi"
          message="Aqliy hujum, hamkorlik, gamifikatsiya yoki loyiha asosida o'qitish kabi so'zlarni kiriting."
        />
      ) : (
        results.methods.map((method) => (
          <ContentCard
            key={method.id}
            title={method.name}
            description={method.summary}
            meta={`${method.groupTitle} / ${method.focusArea}`}
            icon="grid-outline"
            onPress={() => router.push(`/method/${method.id}` as never)}
          />
        ))
      )}
    </ScreenShell>
  );
}
