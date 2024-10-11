import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Splash from "../Splash";
import { TabNavigation } from "./TabNavigation";
const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="AppNavigator" component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { AppNavigator };
