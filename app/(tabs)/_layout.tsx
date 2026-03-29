import { Tabs } from "expo-router";
import { useWindowDimensions } from "react-native";
import { TabIcon } from "@/components/tab-icon";

export default function TabsLayout() {
  const { width } = useWindowDimensions();
  const tabBarWidth = Math.min(width - 24, 360);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#b6becb",
        tabBarShowLabel: false,
        tabBarItemStyle: {
          flex: 1,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarStyle: {
          position: "absolute",
          bottom: 16,
          width: tabBarWidth,
          left: (width - tabBarWidth) / 2,
          backgroundColor: "#ffffff",
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
          borderColor: "#edf1f7",
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
