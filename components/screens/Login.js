import React, { Component, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  ToastAndroid,
  Modal,
} from "react-native";
const { height, width } = Dimensions.get("screen");
import { useFonts } from "expo-font";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CheckBox, Input } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { IP_ADDRESS } from "../../db/IP";
export default function Login() {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const onHandleInput = (value) => {
    setUserEmail(value);
  };
  const onHandlePasswordInput = (value) => {
    setUserPassword(value);
  };

  const submitForm = async () => {
    if (!userEmail || !userPassword) {
      ToastAndroid.show("Please fill out both fields!", 3000);
    } else {
      try {
        const response = await axios.post(`${IP_ADDRESS}/api/login`, {
          email: userEmail,
          password: userPassword,
        });
        const data = response.data;
        if (response.status === 200) {
          console.log("data", data);
          navigation.replace("Tab", data);
        } else {
          Alert.alert("Login Failed", data.error);
        }
      } catch (error) {
        console.log("Error while login!", error.message);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 14,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[
          styles.btn,
          { width: 30, height: 30, marginTop: 30, marginBottom: 20 },
        ]}
      >
        <AntDesign name="arrowleft" size={22} />
      </TouchableOpacity>
      <Text
        onPress={() => {
          alert("my name nai janta tu hannn😡");
        }}
        style={{
          fontFamily: "MontserratSemiBold",
          fontSize: 28,
          marginBottom: 20,
        }}
      >
        Hello there 👋
      </Text>
      <Text
        style={{
          fontFamily: "MontserratMedium",
          fontSize: 16,
          marginBottom: 30,
          opacity: 0.7,
        }}
      >
        Please enter your username/email and password to sign in.
      </Text>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontFamily: "MontserratSemiBold" }}>
          Username / Email
        </Text>
        <TextInput
          value={userEmail}
          placeholder="johndoe@gmail.com"
          placeholderTextColor={"#888"}
          style={styles.input}
          onChangeText={onHandleInput}
          keyboardType="email-address"
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontFamily: "MontserratSemiBold" }}>Password</Text>
        <TextInput
          value={userPassword}
          placeholder="Password"
          onChangeText={onHandlePasswordInput}
          placeholderTextColor={"#888"}
          style={styles.input}
          secureTextEntry={true}
        />
      </View>
      <CheckBox
        title="Remember me"
        checked={checked}
        onPress={() => setChecked(!checked)}
        containerStyle={{
          padding: 0,
          marginLeft: 0,
          paddingVertical: 5,
          paddingHorizontal: 3,
          backgroundColor: "white",
          borderColor: "#fff",
          width: "100%",
          marginTop: 10,
        }}
        checkedColor="#a1614b"
      />
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <Text
          style={[
            styles.text,
            { color: "#a1614b", alignSelf: "center", marginTop: 20 },
          ]}
        >
          Forgot Password
        </Text>
      </TouchableOpacity>
      <Text
        onPress={() => navigation.navigate("Signup")}
        style={[
          styles.text,
          {
            alignSelf: "center",
            marginTop: 20,
            fontFamily: "MontserratRegular",
          },
        ]}
      >
        or continue with
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginTop: 30,
        }}
      >
        <TouchableOpacity
          style={styles.touchableBtn}
          onPress={() => navigation.replace("Tab")}
        >
          <FontAwesome name="google" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableBtn}>
          <FontAwesome name="facebook-official" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableBtn}>
          <FontAwesome name="apple" size={24} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={submitForm}
        style={[
          styles.touchableBtn,
          {
            backgroundColor: "#a1614b",
            width: "100%",
            alignSelf: "center",
            top: 90,
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            { color: "#fff", fontFamily: "MontserratSemiBold" },
          ]}
        >
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  touchableBtn: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 30,
    width: 80,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  input: {
    height: 50,
    fontSize: 16,
    borderBottomColor: "#a1614b",
    borderBottomWidth: 1,
    fontFamily: "MontserratMedium",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "600",
    fontFamily: "MontserratSemiBold",
    marginLeft: 10,
  },
});
