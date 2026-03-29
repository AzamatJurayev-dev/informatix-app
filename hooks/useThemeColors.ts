import { useAppState } from "@/context/app-context";

export function useThemeColors() {
  const { colors } = useAppState();
  return colors;
}
