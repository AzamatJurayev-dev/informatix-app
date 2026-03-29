import { ReactNode } from "react";
import { Pressable, View, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useThemeColors } from "@/hooks/useThemeColors";

type BaseCardProps = {
  children: ReactNode;
  onPress?: () => void;
  className?: string;
  contentClassName?: string;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  radius?: number;
  padding?: number;
  marginBottom?: number;
  minHeight?: number;
  animated?: boolean;
};

export function BaseCard({
  children,
  onPress,
  className = "",
  contentClassName = "",
  style,
  contentStyle,
  radius = 32,
  padding = 20,
  marginBottom = 0,
  minHeight,
  animated = false,
}: BaseCardProps) {
  const colors = useThemeColors();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const shell = (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      onPressIn={() => {
        if (animated && onPress) {
          scale.value = withSpring(0.985);
        }
      }}
      onPressOut={() => {
        if (animated && onPress) {
          scale.value = withSpring(1);
        }
      }}
      className={`overflow-hidden border bg-white ${contentClassName}`}
      style={[
        {
          borderRadius: radius,
          paddingHorizontal: padding,
          paddingVertical: padding,
          backgroundColor: colors.surface,
          borderColor: colors.cardBorder,
          borderWidth: 1,
          minHeight,
        },
        contentStyle,
      ]}
    >
      {children}
    </Pressable>
  );

  if (!animated) {
    return (
      <View
        className={className}
        style={[
          {
            marginBottom,
            shadowColor: "#0f172a",
            shadowOpacity: 0.06,
            shadowRadius: 18,
            shadowOffset: { width: 0, height: 10 },
            elevation: 5,
          },
          style,
        ]}
      >
        {shell}
      </View>
    );
  }

  return (
    <Animated.View
      className={className}
      style={[
        animatedStyle,
        {
          marginBottom,
          shadowColor: "#0f172a",
          shadowOpacity: 0.06,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 10 },
          elevation: 5,
        },
        style,
      ]}
    >
      {shell}
    </Animated.View>
  );
}
