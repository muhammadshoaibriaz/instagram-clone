import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Provider } from "react-redux";
import { Text } from "react-native";
import { FormStack } from "./components/navigation/FormStack";
import { TabNavigation } from "./components/navigation/TabNavigation";
import { myStore } from "./redux/store/store";
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();
export default function App() {
  const [loaded] = useFonts({
    MontserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
    MontserratMedium: require("./assets/fonts/Montserrat-Medium.ttf"),
    MontserratSemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
  });
  if (!loaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <Provider store={myStore}>
      <NavigationContainer>
        <StatusBar translucent={true} />
        <Stack.Navigator
          initialRouteName="FormStack"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="FormStack" component={FormStack} />
          <Stack.Screen name="Tab" component={TabNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
