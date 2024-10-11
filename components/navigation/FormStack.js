import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { TabNavigation } from "./TabNavigation";
import Profile from "../screens/Profile";
import Interest from "../screens/Interest";
import Signin from "../screens/Signin";
import Signup from "../screens/Signup";
import Login from "../screens/Login";
import Discover from "../screens/Discover";
import Splash from "../Splash";
const Stack = createNativeStackNavigator();
const FormStack = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_bottom" }}
      initialRouteName="SplashScreen"
    >
      <Stack.Screen name="SplashScreen" component={Splash} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Interest" component={Interest} />
      <Stack.Screen name="Discover" component={Discover} />
      <Stack.Screen
        name="Tab"
        options={{
          animation: "flip",
        }}
        component={TabNavigation}
      />
    </Stack.Navigator>
  );
};

export { FormStack };
