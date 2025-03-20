import { colors } from "@/constants";
import { Feather } from "@expo/vector-icons";
import Foundation from "@expo/vector-icons/Foundation";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";
export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.BLACK,
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerBackButtonDisplayMode: "minimal",
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Feather name="arrow-left" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
