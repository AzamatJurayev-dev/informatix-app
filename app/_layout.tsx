import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppStateProvider, useAppState } from "@/context/app-context";

function AppNavigator() {
  const { theme, colors } = useAppState();

  return (
    <>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <View
          style={{
            flex: 1,
            width: "100%",
            maxWidth: 430,
            alignSelf: "center",
            overflow: "hidden",
            backgroundColor: colors.background,
          }}
        >
          <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="splash" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="methods" />
            <Stack.Screen name="flashcards" />
            <Stack.Screen name="match-game" />
            <Stack.Screen name="true-false" />
            <Stack.Screen name="search" />
            <Stack.Screen name="favorites" />
            <Stack.Screen name="statistics" />
            <Stack.Screen name="about" />
            <Stack.Screen name="result" />
            <Stack.Screen name="lesson/[id]" />
            <Stack.Screen name="method/[id]" />
          </Stack>
        </View>
      </View>
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppStateProvider>
        <AppNavigator />
      </AppStateProvider>
    </GestureHandlerRootView>
  );
}
