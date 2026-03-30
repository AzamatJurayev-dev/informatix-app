import { Tabs } from "expo-router";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabIcon } from "@/components/tab-icon";
import { useAppState } from "@/context/app-context";
import { getTabBarWidth } from "@/utils/layout";

export default function TabsLayout() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { theme, colors } = useAppState();
  const tabBarWidth = getTabBarWidth(width);
  const tabBarBackground = theme === "dark" ? `${colors.surface}F2` : "#ffffff";
  const tabBarBorder = theme === "dark" ? colors.cardBorder : "#edf1f7";
  const inactiveTint = theme === "dark" ? colors.secondaryText : "#b6becb";
  const tabBarBottom = Math.max(insets.bottom, 12);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: inactiveTint,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          flex: 1,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarStyle: {
          position: "absolute",
          bottom: tabBarBottom,
          width: tabBarWidth,
          left: "50%",
          transform: [{ translateX: -tabBarWidth / 2 }],
          backgroundColor: tabBarBackground,
          borderTopColor: "transparent",
          height: 62,
          paddingTop: 8,
          paddingBottom: 8,
          paddingHorizontal: 12,
          borderRadius: 26,
          shadowColor: "#0f172a",
          shadowOpacity: 0.1,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 10 },
          elevation: 10,
          borderWidth: 1,
          borderColor: tabBarBorder,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Bosh sahifa",
          tabBarIcon: ({ color, size, focused }) => <TabIcon icon="home-outline" size={size} color={color} focused={focused} label="Bosh" />,
        }}
      />
      <Tabs.Screen
        name="lessons"
        options={{
          title: "Darslar",
          tabBarIcon: ({ color, size, focused }) => <TabIcon icon="book-outline" size={size} color={color} focused={focused} label="Darslar" />,
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: "Test",
          tabBarIcon: ({ color, size, focused }) => <TabIcon icon="help-circle-outline" size={size} color={color} focused={focused} label="Test" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size, focused }) => <TabIcon icon="person-outline" size={size} color={color} focused={focused} label="Profil" />,
        }}
      />
    </Tabs>
  );
}
