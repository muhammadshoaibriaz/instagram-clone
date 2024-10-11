import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Details from "../screens/Details";
import Home from "../screens/Home";
import Notifications from "../screens/Notifications";
import BookMark from "../screens/BookMark";
import Search from "../screens/Search";
import Explore from "../screens/Explore";
import Topics from "../screens/Topics";
import Writers from "../Writers";
import TopWriter from "../screens/TopWriter";
import Popular from "../screens/Popular";
import Discover from "../screens/Discover";

const Stack = createNativeStackNavigator();
const ExploreStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Explore"
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="Explore" component={Explore} />
      <Stack.Screen name="Topics" component={Topics} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Writer" component={TopWriter} />
      <Stack.Screen name="Popular" component={Popular} />
      <Stack.Screen name="Discover" component={Discover} />
    </Stack.Navigator>
  );
};
export { ExploreStack };
