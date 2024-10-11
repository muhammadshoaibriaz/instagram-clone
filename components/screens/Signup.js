import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { useFonts } from "expo-font";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Input, CheckBox } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
export default function Signup() {
  const [checked, setChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  const [secure1, setSecure1] = useState(true);
  const [secure2, setSecure2] = useState(true);

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleUserName = (username) => {
    setUsername(username);
  };
  const handleEmail = (email) => {
    setEmail(email);
  };
  const handlePassword = (password) => {
    setPassword(password);
  };
  const handleConfirmPassword = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
  };

  const submitForm = async () => {
    if (!email || !password || !username) {
      ToastAndroid.show("Please fill out both fields!", 3000);
    } else {
      navigation.navigate("Profile", {
        username,
        email,
        password,
      });
    }
  };

  const [loaded] = useFonts({
    Montserrat: require("../../assets/fonts/Montserrat-Medium.ttf"),
    Montserrat1: require("../../assets/fonts/Montserrat-Bold.ttf"),
    Montserrat3: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <ScrollView
      style={{
        flex: 1,
        paddingHorizontal: 14,
        backgroundColor: "#fff",
      }}
    >
      <TouchableOpacity
        style={{
          position: "relative",
          width: 40,
          alignItems: "flex-start",
          justifyContent: "center",
          marginTop: 40,
          marginBottom: 10,
        }}
        onPress={() => navigation.navigate("Signin")}
      >
        <AntDesign name="arrowleft" size={24} />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: "MontserratSemiBold",
          fontSize: 24,
          marginBottom: 10,
        }}
      >
        Create an account 🔏
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontFamily: "MontserratRegular",
          marginBottom: 20,
        }}
      >
        Enter your username, password & email, If you forget it then you have to
        do forget password.
      </Text>

      <View style={{ marginTop: 10 }}>
        <Text style={styles.title}>Username</Text>
        <Input
          ref={usernameRef}
          inputMode="text"
          value={username}
          onChangeText={handleUserName}
          placeholder="Username"
          style={styles.input}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={styles.title}>Email</Text>
        <Input
          ref={emailRef}
          value={email}
          onChangeText={handleEmail}
          placeholder="Email"
          keyboardType="email-address"
          style={styles.input}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={styles.title}>Password</Text>
        <Input
          ref={passwordRef}
          value={password}
          onChangeText={handlePassword}
          placeholder="Password"
          secureTextEntry={secure1}
          rightIcon={
            <FontAwesome
              onPress={() => setSecure1(!secure1)}
              name="eye-slash"
              size={20}
              color="#a1614b"
            />
          }
          style={styles.input}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={styles.title}>Confirm Password</Text>
        <Input
          ref={confirmPasswordRef}
          value={confirmPassword}
          onChangeText={handleConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry={secure2}
          rightIcon={
            <FontAwesome
              name="eye-slash"
              onPress={() => setSecure2(!secure2)}
              size={20}
              color="#a1614b"
            />
          }
          style={styles.input}
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
      <TouchableOpacity
        style={[
          styles.touchableBtn,
          {
            backgroundColor: "#a1614b",
            alignSelf: "center",
            marginTop: 30,
            width: "100%",
          },
        ]}
        onPress={submitForm}
      >
        <Text
          style={[
            styles.text,
            { color: "#fff", fontFamily: "MontserratSemiBold" },
          ]}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </ScrollView>
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
  input: {
    fontFamily: "Montserrat",
    fontSize: 15,
  },
  penBtn: {
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    bottom: 50,
    left: 25,
    backgroundColor: "#a1614b",
    borderRadius: 5,
  },
  title: {
    fontFamily: "MontserratSemiBold",
  },
});
