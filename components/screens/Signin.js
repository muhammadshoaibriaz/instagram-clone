import React, { Component } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { useFonts } from "expo-font";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { IP_ADDRESS } from "../../db/IP";
export default function SignIn() {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <Image
        source={{
          uri: "https://ouch-cdn2.icons8.com/jzGJuvLLwdsrPAJkbzQh-sZtcWNa0Ixh3vJqnF6oByc/rs:fit:368:368/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMjkw/L2JiYjU1OWMwLTI2/NGUtNDc2ZS04MzA4/LTcyNmIzYmIxYTAx/Yi5wbmc.png",
        }}
        style={{
          width: 300,
          height: 300,
        }}
      />
      <Text
        style={{
          fontFamily: "MontserratMedium",
          fontSize: 28,
          marginBottom: 30,
        }}
        onPress={() => navigation.navigate("Interest")}
      >
        Let's you in
      </Text>
      <TouchableOpacity style={styles.touchableBtn}>
        <View style={styles.btn}>
          <FontAwesome name="google" size={24} />
          <Text style={styles.text}>Continue with google</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchableBtn}>
        <View style={styles.btn}>
          <FontAwesome name="facebook-official" size={24} />
          <Text style={styles.text}>Continue with facebook</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchableBtn}>
        <View style={styles.btn}>
          <FontAwesome name="apple" size={24} />
          <Text style={styles.text}>Continue with apple</Text>
        </View>
      </TouchableOpacity>
      <Text style={{ marginBottom: 20, marginTop: 10 }}>or</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Tab")}
        style={[styles.touchableBtn, { backgroundColor: "#a1614b" }]}
      >
        <Text
          style={[
            styles.text,
            { color: "#fff", fontFamily: "MontserratMedium" },
          ]}
        >
          Sign in with password
        </Text>
      </TouchableOpacity>
      <Text style={{ fontFamily: "MontserratMedium" }}>
        Don't have an account?{" "}
        <Text
          style={{ color: "chocolate" }}
          onPress={() => navigation.navigate("Signup")}
        >
          Sign up
        </Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  touchableBtn: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 30,
    width: 280,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "MontserratMedium",
    marginLeft: 10,
  },
});
