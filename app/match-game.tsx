import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import games from "@/data/games.json";
import { AnimatedButton } from "@/components/animated-button";
import { AppHeader } from "@/components/app-header";
import { InfoCard } from "@/components/info-card";
import { ScreenShell } from "@/components/screen-shell";
import { SectionTitle } from "@/components/section-title";
import { useAppState } from "@/context/app-context";
import { useThemeColors } from "@/hooks/useThemeColors";

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export default function MatchGameScreen() {
  const colors = useThemeColors();
  const { saveMatchScore, matchBestScore } = useAppState();
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(null);
  const [solvedIds, setSolvedIds] = useState<string[]>([]);
  const [message, setMessage] = useState("Bitta termin va bitta tarifni tanlang.");
  const terms = useMemo(() => shuffle(games.matchingPairs), []);
  const definitions = useMemo(
    () => shuffle(games.matchingPairs.map((pair) => ({ id: pair.id, definition: pair.definition }))),
    []
  );

  async function submitPair() {
    if (!selectedTerm || !selectedDefinition) return;
    if (selectedTerm === selectedDefinition) {
      const nextSolved = [...solvedIds, selectedTerm];
      setSolvedIds(nextSolved);
      setMessage("To'g'ri moslashtirildi.");
      await saveMatchScore(nextSolved.length);
    } else {
      setMessage("Mos kelmadi. Yana urinib ko'ring.");
    }
    setSelectedTerm(null);
    setSelectedDefinition(null);
  }

  function resetGame() {
    setSelectedTerm(null);
    setSelectedDefinition(null);
    setSolvedIds([]);
    setMessage("O'yin qayta boshlandi.");
  }

  return (
    <ScreenShell>
      <AppHeader title="Moslashtirish o'yini" subtitle="Terminlarni tariflar bilan to'g'ri juftlikka ajrating" eyebrow="Mini o'yin" />

      <InfoCard className="mb-5">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-3">
            <View className="self-start rounded-full px-3 py-2" style={{ backgroundColor: colors.accentSoft }}>
              <Text className="text-xs font-bold uppercase tracking-[2px]" style={{ color: colors.accent }}>
                Joriy holat
              </Text>
            </View>
            <Text className="mt-4 text-[28px] font-black leading-9" style={{ color: colors.text }}>
              Juftliklarni toping
            </Text>
            <Text className="mt-2 text-[15px] leading-7" style={{ color: colors.secondaryText }}>
              Har bir termin uchun mos tarifni tanlang. Ball va eng yaxshi natija avtomatik saqlanadi.
            </Text>
          </View>
          <View className="h-16 w-16 items-center justify-center rounded-[22px]" style={{ backgroundColor: colors.mutedSurface }}>
            <Text className="text-lg font-black" style={{ color: colors.accent }}>MG</Text>
          </View>
        </View>
        <View className="mt-5 flex-row gap-3">
          <View className="flex-1 rounded-[22px] p-4" style={{ backgroundColor: colors.mutedSurface }}>
            <Text className="text-xs uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>Joriy ball</Text>
            <Text className="mt-2 text-2xl font-black" style={{ color: colors.text }}>{solvedIds.length}/{games.matchingPairs.length}</Text>
          </View>
          <View className="flex-1 rounded-[22px] p-4" style={{ backgroundColor: colors.mutedSurface }}>
            <Text className="text-xs uppercase tracking-[2px]" style={{ color: colors.secondaryText }}>Eng yaxshi</Text>
            <Text className="mt-2 text-2xl font-black" style={{ color: colors.text }}>{matchBestScore}/{games.matchingPairs.length}</Text>
          </View>
        </View>
        <View className="mt-4 rounded-[20px] px-4 py-3" style={{ backgroundColor: colors.accentSoft }}>
          <Text className="text-sm leading-6" style={{ color: colors.text }}>
            {message}
          </Text>
        </View>
      </InfoCard>

      <SectionTitle title="Terminlar" subtitle="Avval terminni tanlang" />
      {terms.map((item) => (
        <Pressable
          key={item.id}
          disabled={solvedIds.includes(item.id)}
          onPress={() => setSelectedTerm(item.id)}
          className="mb-3 rounded-[26px] border px-4 py-4"
          style={{
            backgroundColor: solvedIds.includes(item.id)
              ? "#dcfce7"
              : selectedTerm === item.id
                ? colors.accentSoft
                : colors.surface,
            borderColor: colors.cardBorder,
          }}
        >
          <Text className="text-base font-semibold" style={{ color: colors.text }}>{item.term}</Text>
        </Pressable>
      ))}

      <View className="mt-3">
        <SectionTitle title="Tariflar" subtitle="Keyin mos ta'rifni tanlang" />
      </View>
      {definitions.map((item) => (
        <Pressable
          key={item.id}
          disabled={solvedIds.includes(item.id)}
          onPress={() => setSelectedDefinition(item.id)}
          className="mb-3 rounded-[26px] border px-4 py-4"
          style={{
            backgroundColor: solvedIds.includes(item.id)
              ? "#dcfce7"
              : selectedDefinition === item.id
                ? colors.accentSoft
                : colors.surface,
            borderColor: colors.cardBorder,
          }}
        >
          <Text className="text-sm leading-6" style={{ color: colors.text }}>{item.definition}</Text>
        </Pressable>
      ))}

      <View className="mt-4 flex-row gap-3">
        <View className="flex-1">
          <AnimatedButton label="Qayta boshlash" variant="secondary" onPress={resetGame} />
        </View>
        <View className="flex-1">
          <AnimatedButton label="Tekshirish" onPress={submitPair} disabled={!selectedTerm || !selectedDefinition} />
        </View>
      </View>
    </ScreenShell>
  );
}
