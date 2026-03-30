import { router } from "expo-router";
import { Text, useWindowDimensions, View } from "react-native";
import methods from "@/data/methods.json";
import { AppHeader } from "@/components/app-header";
import { ContentCard } from "@/components/content-card";
import { MetricCard } from "@/components/metric-card";
import { ScreenShell } from "@/components/screen-shell";
import { SectionTitle } from "@/components/section-title";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Method } from "@/types/content";
import { getGridColumns } from "@/utils/layout";

type MethodGroup = {
  group: string;
  title: string;
  description: string;
  items: Method[];
};

export default function MethodsScreen() {
  const colors = useThemeColors();
  const { width } = useWindowDimensions();
  const statColumns = getGridColumns(width, 220, 2);
  const contentColumns = getGridColumns(width, 320, 2);
  const statCardWidth = statColumns === 2 ? "48%" : "100%";
  const contentCardWidth = contentColumns === 2 ? "48.5%" : "100%";

  const groupedMethods = (methods as Method[]).reduce<MethodGroup[]>((groups, method) => {
    const existing = groups.find((group) => group.group === method.group);
    if (existing) {
      existing.items.push(method);
      return groups;
    }

    groups.push({
      group: method.group,
      title: method.groupTitle,
      description: method.groupDescription,
      items: [method],
    });

    return groups;
  }, []);

  return (
    <ScreenShell>
      <AppHeader
        title="Metodlar katalogi"
        subtitle="Interaktiv metodlar kategoriyalar bo'yicha jamlangan va har biri informatika darsiga mos misollar bilan berilgan."
        eyebrow="Metodlar"
        actions={[
          { icon: "search-outline", onPress: () => router.push("/search") },
          { icon: "heart-outline", onPress: () => router.push("/favorites") },
        ]}
      />

      <View
        className="overflow-hidden rounded-[34px] border p-6"
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
            Metodlar katalogi
          </Text>
        </View>
        <Text className="mt-4 text-[28px] font-black leading-9" style={{ color: colors.text }}>
          Interaktiv metodlar kategoriyalar bo'yicha
        </Text>
        <Text className="mt-2 text-[15px] leading-7" style={{ color: colors.secondaryText }}>
          G'oya yaratish, muammo yechish va hamkorlikka yo'naltirilgan metodlar informatika darslariga moslashtirilgan.
        </Text>

        <View className="mt-5 self-start rounded-[22px] px-4 py-4" style={{ backgroundColor: colors.mutedSurface }}>
          <Text className="text-[11px] font-bold uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>
            Yo'nalish
          </Text>
          <Text className="mt-2 text-base font-black" style={{ color: colors.accent }}>
            MT / kategoriya tizimi
          </Text>
        </View>

        <View className="mt-5 flex-row flex-wrap justify-between">
          <View className="rounded-[24px] p-4" style={{ backgroundColor: colors.mutedSurface, width: statCardWidth }}>
            <Text className="text-xs uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>Kategoriyalar</Text>
            <Text className="mt-2 text-2xl font-black" style={{ color: colors.text }}>{groupedMethods.length}</Text>
          </View>
          <View className="rounded-[24px] p-4" style={{ backgroundColor: colors.mutedSurface, width: statCardWidth }}>
            <Text className="text-xs uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>Metodlar</Text>
            <Text className="mt-2 text-2xl font-black" style={{ color: colors.text }}>{methods.length}</Text>
          </View>
        </View>
      </View>

      <View className="mt-6 flex-row flex-wrap justify-between">
        <MetricCard label="Jami metodlar" value={`${methods.length}`} accent={colors.accent} style={{ width: statCardWidth }} />
        <MetricCard label="Kategoriya soni" value={`${groupedMethods.length}`} accent={colors.success} style={{ width: statCardWidth }} />
      </View>

      <View className="mt-5">
        <SectionTitle
          title="Kategoriyalar bo'yicha metodlar"
          subtitle="Har bir metodning darsdagi vazifasi, afzalligi va qo'llash misoli alohida ko'rsatilgan."
        />
      </View>

      {groupedMethods.map((group, index) => (
        <View key={group.group} className="mb-7">
          <View className="mb-4 overflow-hidden rounded-[30px] border px-5 py-5" style={{ backgroundColor: colors.surface, borderColor: colors.cardBorder }}>
            <View className="self-start rounded-full px-3 py-2" style={{ backgroundColor: colors.accentSoft }}>
              <Text className="text-[11px] font-bold uppercase tracking-[2px]" style={{ color: colors.accent }}>
                {group.items.length} ta metod
              </Text>
            </View>
            <Text className="mt-4 text-[28px] font-black leading-9" style={{ color: colors.text }}>
              {group.title}
            </Text>
            <Text className="mt-2 text-[15px] leading-7" style={{ color: colors.secondaryText }}>
              {group.description}
            </Text>
          </View>

          <View className="flex-row flex-wrap justify-between">
            {group.items.map((method) => (
              <ContentCard
                key={method.id}
                title={method.name}
                description={method.summary}
                meta={`${method.focusArea} / ${method.level}`}
                icon="grid-outline"
                trailingLabel={method.level}
                onPress={() => router.push(`/method/${method.id}` as never)}
                style={{ width: contentCardWidth }}
              />
            ))}
          </View>
        </View>
      ))}
    </ScreenShell>
  );
}
