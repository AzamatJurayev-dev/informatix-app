import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import methods from "@/data/methods.json";
import { BulletList } from "@/components/bullet-list";
import { DetailSectionCard } from "@/components/detail-section-card";
import { IconButton } from "@/components/icon-button";
import { InfoCard } from "@/components/info-card";
import { useAppState } from "@/context/app-context";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function MethodDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const method = methods.find((item) => item.id === id);
  const colors = useThemeColors();
  const { isFavorite, toggleFavorite } = useAppState();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const topBarStyle = useAnimatedStyle(() => ({
    shadowOpacity: interpolate(scrollY.value, [0, 80], [0.04, 0.12]),
  }));

  if (!method) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-center text-base" style={{ color: colors.text }}>
            Metod topilmadi.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const favorite = isFavorite("method", method.id);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Animated.View
        className="absolute left-0 right-0 top-0 z-20 px-5 pb-4 pt-2"
        style={[
          topBarStyle,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <View className="w-full self-center" style={{ maxWidth: 430 }}>
          <View className="flex-row items-center justify-between rounded-[24px] border px-3 py-3" style={{ backgroundColor: `${colors.surface}F2`, borderColor: `${colors.cardBorder}CC`, shadowColor: "#0f172a", shadowOpacity: 0.08, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, elevation: 8 }}>
            <View className="mr-4 flex-1 flex-row items-center">
              <IconButton icon="arrow-back" onPress={() => router.back()} variant="soft" />
              <View className="ml-3 flex-1">
                <Text className="text-[11px] font-bold uppercase tracking-[2.5px]" style={{ color: colors.accent }}>
                  Metod
                </Text>
                <Text numberOfLines={1} className="mt-1 text-lg font-black" style={{ color: colors.text }}>
                  {method.name}
                </Text>
              </View>
            </View>
            <IconButton icon={favorite ? "heart" : "heart-outline"} onPress={() => toggleFavorite({ type: "method", id: method.id })} variant="soft" />
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 96, paddingBottom: 40 }}
      >
        <View className="w-full self-center px-5" style={{ maxWidth: 430 }}>
          <InfoCard className="mb-5">
            <View className="flex-row items-start justify-between">
              <View className="flex-1 pr-3">
                <View className="flex-row flex-wrap gap-2">
                  <View className="self-start rounded-full px-4 py-2" style={{ backgroundColor: colors.accentSoft }}>
                    <Text className="text-xs font-bold uppercase tracking-[2px]" style={{ color: colors.accent }}>Interaktiv metod</Text>
                  </View>
                  <View className="self-start rounded-full px-4 py-2" style={{ backgroundColor: colors.mutedSurface }}>
                    <Text className="text-xs font-bold uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>{method.focusArea}</Text>
                  </View>
                </View>

                <Text className="mt-5 text-[32px] font-black leading-[40px]" style={{ color: colors.text }}>{method.name}</Text>
                <Text className="mt-4 text-[15px] leading-7" style={{ color: colors.secondaryText }}>{method.summary}</Text>
              </View>

              <View className="h-16 w-16 items-center justify-center rounded-[22px]" style={{ backgroundColor: colors.mutedSurface }}>
                <Text className="text-lg font-black" style={{ color: colors.accent }}>MT</Text>
              </View>
            </View>

            <View className="mt-6 flex-row gap-3">
              <View className="flex-1 rounded-[22px] px-4 py-4" style={{ backgroundColor: colors.mutedSurface }}>
                <Text className="text-[11px] font-bold uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>
                  Kategoriya
                </Text>
                <Text className="mt-2 text-sm font-semibold leading-6" style={{ color: colors.text }}>
                  {method.groupTitle}
                </Text>
              </View>
              <View className="flex-1 rounded-[22px] px-4 py-4" style={{ backgroundColor: colors.mutedSurface }}>
                <Text className="text-[11px] font-bold uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>
                  Format
                </Text>
                <Text className="mt-2 text-sm font-semibold leading-6" style={{ color: colors.text }}>
                  {method.level} / {method.focusArea}
                </Text>
              </View>
            </View>

            <View className="mt-4 rounded-[22px] px-4 py-4" style={{ backgroundColor: colors.accentSoft }}>
              <Text className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: colors.accent }}>
                Metod vazifasi
              </Text>
              <Text className="mt-2 text-sm leading-6" style={{ color: colors.text }}>
                Talabani faol fikrlashga jalb qilish, muammoni ko'rish va dars jarayonida hamkorlikni kuchaytirish.
              </Text>
            </View>

            <View className="mt-4 flex-row items-center justify-between rounded-[22px] px-4 py-4" style={{ backgroundColor: colors.mutedSurface }}>
              <View className="flex-1 pr-3">
                <Text className="text-sm font-semibold" style={{ color: colors.text }}>Qo'llash yo'nalishi</Text>
                <Text className="mt-1 text-xs" style={{ color: colors.secondaryText }}>
                  Nazariya, muhokama va amaliy topshiriqlar bilan birga ishlatiladi
                </Text>
              </View>
              <View className="rounded-full px-4 py-2" style={{ backgroundColor: colors.accentSoft }}>
                <Text className="text-xs font-bold" style={{ color: colors.accent }}>Amaliy qo'llash</Text>
              </View>
            </View>
          </InfoCard>

          <View className="gap-4">
            <DetailSectionCard
              title="Tavsif"
              icon="reader-outline"
              description="Metodning mazmuni va darsdagi vazifasi"
            >
              <BulletList items={method.description} />
            </DetailSectionCard>

            <DetailSectionCard
              title="Afzalliklari"
              icon="thumbs-up-outline"
              description="Metoddan foydalanishning ijobiy tomonlari"
            >
              <BulletList items={method.advantages} />
            </DetailSectionCard>

            <DetailSectionCard
              title="Kamchiliklari"
              icon="alert-circle-outline"
              description="E'tibor talab qiladigan cheklovlar"
            >
              <BulletList items={method.disadvantages} />
            </DetailSectionCard>

            <DetailSectionCard
              title="Informatika darsidagi misol"
              icon="code-slash-outline"
              description="Fan bo'yicha real qo'llash holatlari"
            >
              <BulletList items={method.useCase} />
            </DetailSectionCard>

            <DetailSectionCard
              title="Qachon qo'llanadi"
              icon="timer-outline"
              description="Qaysi vaziyat va bosqichlarda samaraliroq"
            >
              <BulletList items={method.whenToUse} />
            </DetailSectionCard>

            <DetailSectionCard
              className="mb-2"
              title="Ta'limiy qiymati"
              icon="ribbon-outline"
              description="Talaba rivojlanishiga qo'shadigan hissasi"
            >
              <BulletList items={method.educationalValue} />
            </DetailSectionCard>
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
