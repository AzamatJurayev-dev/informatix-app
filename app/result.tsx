import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { AnimatedButton } from "@/components/animated-button";
import { AppHeader } from "@/components/app-header";
import { InfoCard } from "@/components/info-card";
import { ScreenShell } from "@/components/screen-shell";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function ResultScreen() {
  const colors = useThemeColors();
  const params = useLocalSearchParams<{ score?: string; total?: string; type?: string }>();
  const score = Number(params.score ?? 0);
  const total = Number(params.total ?? 0);
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const resultTone =
    percentage >= 80
      ? { bg: `${colors.success}18`, border: `${colors.success}40`, label: "A'lo", color: colors.success }
      : percentage >= 50
        ? { bg: `${colors.accent}18`, border: `${colors.accent}40`, label: "Yaxshi", color: colors.accent }
        : { bg: `${colors.warning}18`, border: `${colors.warning}40`, label: "Davom eting", color: colors.warning };

  return (
    <ScreenShell scroll={false}>
      <AppHeader title="Natija" subtitle="Yakuniy ko'rsatkichlar" eyebrow="Hisobot" />
      <View className="flex-1 justify-center">
        <View
          className="overflow-hidden rounded-[36px] border p-6"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.cardBorder,
            shadowColor: "#0f172a",
            shadowOpacity: 0.08,
            shadowRadius: 22,
            shadowOffset: { width: 0, height: 12 },
            elevation: 5,
          }}
        >
          <View className="absolute -right-10 top-4 h-36 w-36 rounded-full" style={{ backgroundColor: `${colors.accent}12` }} />
          <View className="self-center rounded-full px-3 py-2" style={{ backgroundColor: colors.accentSoft }}>
            <Text className="text-center text-sm font-semibold uppercase tracking-[3px]" style={{ color: colors.accent }}>
            {params.type === "truefalse" ? "To'g'ri / Noto'g'ri natijasi" : "Test natijasi"}
            </Text>
          </View>
          <Text className="mt-5 text-center text-6xl font-black" style={{ color: colors.text }}>
            {score}/{total}
          </Text>
          <Text className="mt-4 text-center text-base" style={{ color: colors.secondaryText }}>
            Aniqlik: {percentage}%
          </Text>
          <View className="mt-6 flex-row gap-3">
            <View className="flex-1 rounded-[24px] p-4" style={{ backgroundColor: colors.mutedSurface }}>
              <Text className="text-xs uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>
                Ball
              </Text>
              <Text className="mt-2 text-2xl font-black" style={{ color: colors.text }}>
                {score}
              </Text>
            </View>
            <View className="flex-1 rounded-[24px] p-4" style={{ backgroundColor: colors.mutedSurface }}>
              <Text className="text-xs uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>
                Foiz
              </Text>
              <Text className="mt-2 text-2xl font-black" style={{ color: colors.text }}>
                {percentage}%
              </Text>
            </View>
          </View>
        </View>

        <InfoCard className="mt-4">
          <View className="rounded-[24px] border px-4 py-4" style={{ backgroundColor: resultTone.bg, borderColor: resultTone.border }}>
            <Text className="text-[11px] font-bold uppercase tracking-[2px]" style={{ color: resultTone.color }}>
              Natija holati
            </Text>
            <Text className="mt-2 text-lg font-black" style={{ color: colors.text }}>
              {resultTone.label}
            </Text>
            <Text className="mt-2 text-sm leading-6" style={{ color: colors.secondaryText }}>
              Natijangiz saqlandi va statistika bo'limiga qo'shildi.
            </Text>
          </View>
          <Text className="mt-5 text-center text-sm leading-6" style={{ color: colors.secondaryText }}>
            Natijangiz saqlandi va statistika bo'limiga qo'shildi.
          </Text>
          <View className="mt-8 gap-3">
            <AnimatedButton
              label={params.type === "truefalse" ? "Qayta oynash" : "Testni qayta boshlash"}
              onPress={() => router.replace(params.type === "truefalse" ? "/true-false" : "/(tabs)/quiz")}
              icon="refresh-outline"
            />
            <AnimatedButton label="Bosh sahifa" variant="secondary" icon="home-outline" onPress={() => router.replace("/(tabs)")} />
          </View>
        </InfoCard>
      </View>
    </ScreenShell>
  );
}
