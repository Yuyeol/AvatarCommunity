import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "탐색",
        }}
      />
      <Tabs.Screen
        name="my"
        options={{
          title: "내 정보",
        }}
      />
    </Tabs>
  );
}
