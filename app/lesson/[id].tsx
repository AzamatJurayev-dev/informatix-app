import { router, useLocalSearchParams } from "expo-router";
import { Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import lessons from "@/data/lessons.json";
import { AnimatedButton } from "@/components/animated-button";
import { BulletList } from "@/components/bullet-list";
import { DetailSectionCard } from "@/components/detail-section-card";
import { IconButton } from "@/components/icon-button";
import { InfoCard } from "@/components/info-card";
import { useAppState } from "@/context/app-context";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Lesson } from "@/types/content";
import { getContentMaxWidth, getGridColumns, getScreenPadding } from "@/utils/layout";

export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = (lessons as Lesson[]).find((item) => item.id === id);
  const colors = useThemeColors();
  const { markLessonComplete, toggleFavorite, isFavorite, completedLessons } = useAppState();
  const scrollY = useSharedValue(0);
  const { width } = useWindowDimensions();
  const contentMaxWidth = getContentMaxWidth(width);
  const horizontalPadding = getScreenPadding(width);
  const statColumns = getGridColumns(width, 240, 2);
  const statCardWidth = statColumns === 2 ? "48.5%" : "100%";

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const topBarStyle = useAnimatedStyle(() => ({
    shadowOpacity: interpolate(scrollY.value, [0, 80], [0.04, 0.12]),
  }));

  if (!lesson) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-center text-base" style={{ color: colors.text }}>
            Dars topilmadi.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const favorite = isFavorite("lesson", lesson.id);
  const completed = completedLessons.includes(lesson.id);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Animated.View
        className="absolute left-0 right-0 top-0 z-20 pb-4 pt-2"
        style={[
          topBarStyle,
          {
            backgroundColor: colors.background,
            paddingHorizontal: horizontalPadding,
          },
        ]}
      >
        <View className="w-full self-center" style={{ maxWidth: contentMaxWidth }}>
          <View className="flex-row items-center justify-between rounded-[24px] border px-3 py-3" style={{ backgroundColor: `${colors.surface}F2`, borderColor: `${colors.cardBorder}CC`, shadowColor: "#0f172a", shadowOpacity: 0.08, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, elevation: 8 }}>
            <View className="mr-4 flex-1 flex-row items-center">
              <IconButton icon="arrow-back" onPress={() => router.back()} variant="soft" />
              <View className="ml-3 flex-1">
                <Text className="text-[11px] font-bold uppercase tracking-[2.5px]" style={{ color: colors.accent }}>
                  Dars
                </Text>
                <Text numberOfLines={1} className="mt-1 text-lg font-black" style={{ color: colors.text }}>
                  {lesson.title}
                </Text>
              </View>
            </View>
            <IconButton icon={favorite ? "heart" : "heart-outline"} onPress={() => toggleFavorite({ type: "lesson", id: lesson.id })} variant="soft" />
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 96, paddingBottom: 40 }}
      >
        <View className="w-full self-center" style={{ maxWidth: contentMaxWidth, paddingHorizontal: horizontalPadding }}>
          <InfoCard className="mb-5">
            <View className="flex-row items-start justify-between">
              <View className="flex-1 pr-3">
                <View className="flex-row flex-wrap gap-2">
                  <View className="self-start rounded-full px-4 py-2" style={{ backgroundColor: colors.accentSoft }}>
                    <Text className="text-xs font-bold uppercase tracking-[2px]" style={{ color: colors.accent }}>{lesson.category}</Text>
                  </View>
                  <View className="self-start rounded-full px-4 py-2" style={{ backgroundColor: colors.mutedSurface }}>
                    <Text className="text-xs font-bold uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>{lesson.focusArea}</Text>
                  </View>
                </View>

                <Text className="mt-5 text-[32px] font-black leading-[40px]" style={{ color: colors.text }}>{lesson.title}</Text>
                <Text className="mt-4 text-[15px] leading-7" style={{ color: colors.secondaryText }}>{lesson.description}</Text>
              </View>

              <View className="h-16 w-16 items-center justify-center rounded-[22px]" style={{ backgroundColor: colors.mutedSurface }}>
                <Text className="text-lg font-black" style={{ color: colors.accent }}>DL</Text>
              </View>
            </View>

            <View className="mt-6 flex-row flex-wrap justify-between">
              <View className="rounded-[22px] px-4 py-4" style={{ backgroundColor: colors.mutedSurface, width: statCardWidth }}>
                <Text className="text-[11px] font-bold uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>
                  Modul
                </Text>
                <Text className="mt-2 text-sm font-semibold leading-6" style={{ color: colors.text }}>
                  {lesson.moduleTitle}
                </Text>
              </View>
              <View className="rounded-[22px] px-4 py-4" style={{ backgroundColor: colors.mutedSurface, width: statCardWidth }}>
                <Text className="text-[11px] font-bold uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>
                  Format
                </Text>
                <Text className="mt-2 text-sm font-semibold leading-6" style={{ color: colors.text }}>
                  {lesson.duration} / {lesson.level}
                </Text>
              </View>
            </View>

            <View className="mt-4 rounded-[22px] px-4 py-4" style={{ backgroundColor: colors.accentSoft }}>
              <Text className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: colors.accent }}>
                Dars maqsadi
              </Text>
              <Text className="mt-2 text-sm leading-6" style={{ color: colors.text }}>
                Mavzuning asosiy g'oyalarini tushunish, amaliy qo'llashni ko'rish va dars jarayoniga mos metod tanlash.
              </Text>
            </View>

            <View className="mt-4 flex-row items-center justify-between rounded-[22px] px-4 py-4" style={{ backgroundColor: colors.mutedSurface }}>
              <View className="flex-1 pr-3">
                <Text className="text-sm font-semibold" style={{ color: colors.text }}>O'zlashtirish holati</Text>
                <Text className="mt-1 text-xs" style={{ color: colors.secondaryText }}>
                  Darsni tugatgach progress avtomatik yangilanadi
                </Text>
              </View>
              <View className="rounded-full px-4 py-2" style={{ backgroundColor: completed ? `${colors.success}20` : colors.accentSoft }}>
                <Text className="text-xs font-bold" style={{ color: completed ? colors.success : colors.accent }}>{completed ? "Tugallangan" : "Jarayonda"}</Text>
              </View>
            </View>
          </InfoCard>

          <View className="gap-4">
            <DetailSectionCard
              title="Asosiy mazmun"
              icon="document-text-outline"
              description="Mavzuning nazariy mazmuni va asosiy tushunchalari"
            >
              <View className="gap-4">
                {lesson.content.map((paragraph) => (
                  <Text key={paragraph} className="text-[15px] leading-7" style={{ color: colors.secondaryText }}>
                    {paragraph}
                  </Text>
                ))}
              </View>
            </DetailSectionCard>

            <DetailSectionCard
              title="Afzalliklari"
              icon="sparkles-outline"
              description="Mazkur yondashuvning foydali tomonlari"
            >
              <BulletList items={lesson.advantages} />
            </DetailSectionCard>

            <DetailSectionCard
              title="Darsda qo'llash"
              icon="school-outline"
              description="Sinfdagi real qo'llash shakllari"
            >
              <BulletList items={lesson.classroomApplication} />
            </DetailSectionCard>

            <DetailSectionCard
              title="Amaliy misollar"
              icon="flask-outline"
              description="Informatika faniga mos amaliy vaziyatlar"
            >
              <BulletList items={lesson.practicalExamples} />
            </DetailSectionCard>

            <DetailSectionCard
              className="mb-2"
              title="Kalit teglar"
              icon="pricetags-outline"
              description="Mavzuni eslab qolish uchun muhim kalit so'zlar"
            >
              <View className="flex-row flex-wrap gap-2">
                {lesson.tags.map((tag) => (
                  <View key={tag} className="rounded-full px-3 py-2" style={{ backgroundColor: colors.accentSoft }}>
                    <Text className="text-xs font-semibold" style={{ color: colors.accent }}>
                      #{tag}
                    </Text>
                  </View>
                ))}
              </View>
            </DetailSectionCard>
          </View>

          <AnimatedButton
            label={completed ? "Dars tugallangan" : "Tugallangan deb belgilash"}
            onPress={() => markLessonComplete(lesson.id)}
            disabled={completed}
            icon={completed ? "checkmark-done-outline" : "bookmark-outline"}
            variant={completed ? "success" : "primary"}
          />
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
