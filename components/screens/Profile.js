import React, { Component, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ToastAndroid,
} from "react-native";
import { useFonts } from "expo-font";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { IP_ADDRESS } from "../../db/IP";

export default function Profile({ route }) {
  const { username, email, password } = route.params;
  // console.log("user details are ", password);
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState(null);
  const [dateBirth, setDateBirth] = useState("");
  const navigation = useNavigation();

  const handlePhone = (phone) => {
    setPhone(phone);
  };
  const handleGender = (gender) => {
    setGender(gender);
  };
  const handleDate = (date) => {
    setDateBirth(date);
  };

  const pickImage = async () => {
    const response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (response) {
      setImage(response.assets[0].uri);
    }
  };

  const onSubmit = async () => {
    if (
      !username.trim() ||
      !phone.trim() ||
      !gender.trim() ||
      !dateBirth.trim()
    ) {
      ToastAndroid.show("Please fill all fields ", 3000);
    } else {
      try {
        const response = await axios.post(`${IP_ADDRESS}/api/users`, {
          username,
          email,
          password,
          image,
        });
        const data = response.data;
        if (data) {
          console.log("Form submitted successfully!");
          navigation.navigate("Interest", username);
        }
      } catch (error) {
        console.log("Error while creating account!", error.message);
      }
    }
  };

  return (
    <SafeAreaView
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
        onPress={() => navigation.goBack()}
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
        Complete your profile 🗓
      </Text>
      <Text style={{ fontSize: 16, fontFamily: "MontserratMedium" }}>
        Don't worry only you can see your personal details. No one will be able
        to see you
      </Text>

      <View
        style={{
          position: "relative",
          alignItems: "center",
          width: 120,
          height: 120,
          alignSelf: "center",
          marginTop: 20,
          marginBottom: 30,
          borderWidth: 2,
          borderColor: "#eee",
          borderRadius: 100,
        }}
      >
        {!image ? (
          <View
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
            }}
          >
            <FontAwesome
              size={110}
              name="user-circle"
              style={{ opacity: 0.1 }}
            />
          </View>
        ) : (
          <Image
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 100,
            }}
            resizeMode="contain"
            source={{ uri: image }}
          />
        )}
        <TouchableOpacity style={styles.penBtn} onPress={pickImage}>
          <FontAwesome name="image" size={13} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontFamily: "MontserratSemiBold" }}>Full Name</Text>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor={"#888"}
          style={styles.input}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontFamily: "MontserratSemiBold" }}>Phone Number</Text>
        <TextInput
          placeholder="PhoneNumber"
          value={phone}
          onChangeText={handlePhone}
          placeholderTextColor={"#888"}
          keyboardType="phone-pad"
          style={styles.input}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontFamily: "MontserratSemiBold" }}>Gender</Text>
        <TextInput
          placeholder="Gender"
          value={gender}
          onChangeText={handleGender}
          keyboardType="default"
          placeholderTextColor={"#888"}
          style={styles.input}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontFamily: "MontserratSemiBold" }}>Date of Birth</Text>
        <TextInput
          placeholder="MM/DD/YYYY"
          value={dateBirth}
          onChangeText={handleDate}
          placeholderTextColor={"#888"}
          style={styles.input}
          keyboardType="decimal-pad"
        />
      </View>
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
        onPress={onSubmit}
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
    fontWeight: "600",
    marginLeft: 10,
  },
  input: {
    fontFamily: "MontserratMedium",
    height: 45,
    fontSize: 15,
    borderBottomColor: "#a1614b",
    borderBottomWidth: 1,
  },
  penBtn: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    bottom: 25,
    left: 25,
    backgroundColor: "#a1614b",
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#eee",
  },
});
