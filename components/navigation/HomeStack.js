import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Details from "../screens/Details";
import Home from "../screens/Home";
import Notifications from "../screens/Notifications";
import BookMark from "../screens/BookMark";
import Search from "../screens/Search";

const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomePage"
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="HomePage" component={Home} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Notify" component={Notifications} />
      <Stack.Screen name="Bookmarks" component={BookMark} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};
export { HomeStack };
