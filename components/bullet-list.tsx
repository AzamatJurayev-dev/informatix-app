import { Text, View } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

export function BulletList({ items }: { items: string[] }) {
  const colors = useThemeColors();

  return (
    <View className="gap-3">
      {items.map((item) => (
        <View className="flex-row" key={item}>
          <View className="mr-3 mt-[10px] h-2 w-2 rounded-full" style={{ backgroundColor: colors.accent }} />
          <Text className="flex-1 text-sm leading-6" style={{ color: colors.secondaryText }}>
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
}
