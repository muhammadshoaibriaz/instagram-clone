import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import {
  HomeIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import React, { Component } from "react";
import Article from "../screens/Article";
import Explore from "../screens/Explore";
import Home from "../screens/Home";
import Profile1 from "../screens/Profile1";
import { HomeStack } from "./HomeStack";
import { ExploreStack } from "./ExploreStack";

const Tab = createBottomTabNavigator();

const TabNavigation = ({ route }) => {
  const { params } = route;
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { borderTopColor: "#fff", display: getRouteName(route) },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        initialParams={params}
        options={{
          tabBarIcon: ({ focused }) => {
            return <HomeIcon color={focused ? "#a1614b" : "#888"} size={22} />;
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Explores"
        component={ExploreStack}
        initialParams={params}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <GlobeAltIcon size={22} color={focused ? "#a1614b" : "#888"} />
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Article"
        component={Article}
        initialParams={params}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <DocumentTextIcon
                size={22}
                color={focused ? "#a1614b" : "#888"}
              />
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={Profile1}
        initialParams={params}
        options={{
          tabBarIcon: ({ focused }) => {
            return <UserIcon size={22} color={focused ? "#a1614b" : "#888"} />;
          },
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

const getRouteName = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  // console.log(routeName);
  if (
    routeName?.includes("Notify") ||
    routeName?.includes("Bookmarks") ||
    routeName?.includes("Popular") ||
    routeName?.includes("Search") ||
    routeName?.includes("Details") ||
    routeName?.includes("Topics")
  ) {
    return "none";
  } else {
    return "flex";
  }
};

export { TabNavigation };
