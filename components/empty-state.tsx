import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

export function EmptyState({ title, message }: { title: string; message: string }) {
  const colors = useThemeColors();

  return (
    <View
      className="overflow-hidden rounded-[32px] border px-6 py-8"
      style={{
        borderColor: colors.cardBorder,
        backgroundColor: colors.surface,
        shadowColor: "#0f172a",
        shadowOpacity: 0.06,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 10 },
        elevation: 4,
      }}
    >
      <View className="items-center">
        <View className="mb-4 rounded-full p-4" style={{ backgroundColor: colors.mutedSurface }}>
          <Ionicons name="sparkles-outline" size={24} color={colors.accent} />
        </View>
        <View className="mb-4 rounded-full px-3 py-2" style={{ backgroundColor: colors.accentSoft }}>
          <Text className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: colors.accent }}>
            Hozircha bo'sh
          </Text>
        </View>
        <Text className="text-lg font-bold" style={{ color: colors.text }}>
          {title}
        </Text>
        <Text className="mt-2 text-center text-sm leading-6" style={{ color: colors.secondaryText }}>
          {message}
        </Text>
      </View>
    </View>
  );
}
