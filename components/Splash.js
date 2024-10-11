import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { Component, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import logo from "../assets/images/logo1.png";
import { IMAGE, TITLE } from "../Theme";
import * as Animatable from "react-native-animatable";

export default function Splash() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(async () => {
      const email = await AsyncStorage.getItem("user_email");
      if (email) {
        navigation.replace("Login");
      } else {
        navigation.replace("Signin");
      }
    }, 5000);
  }, []);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <Animatable.Image
        animation={"fadeInUp"}
        duration={1000}
        source={logo}
        style={IMAGE}
      />
      <Animatable.Text animation={"fadeInUp"} style={TITLE}>
        Scribblr
      </Animatable.Text>
    </View>
  );
}
