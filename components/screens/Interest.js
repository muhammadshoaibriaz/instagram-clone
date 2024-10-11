import React, { Component, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { useFonts } from "expo-font";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Input, CheckBox } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
export default function Interest() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(false);
  const [data, setData] = useState([
    { name: "Science & Technology", selected: false },
    { name: "Design", selected: false },
    { name: "Politics", selected: false },
    { name: "Health", selected: false },
    { name: "Economy", selected: false },
    { name: "Sports", selected: false },
    { name: "Music", selected: false },
    { name: "Life style", selected: false },
    { name: "Education", selected: false },
    { name: "Social and cultural", selected: false },
    { name: "Energy", selected: false },
    { name: "Business", selected: false },
    { name: "Environment", selected: false },
    { name: "3D", selected: false },
    { name: "Crime", selected: false },
    { name: "Video", selected: false },
    { name: "Government", selected: false },
    { name: "Anime", selected: false },
    { name: "Movies", selected: false },
    { name: "Music", selected: false },
  ]);

  const toggleSelect = (index) => {
    const newData = [...data];
    newData[index].selected = !newData[index].selected;
    setData(newData);
    console.log(data);
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
        Select your topic of interest 🏷
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontFamily: "MontserratMedium",
          marginBottom: 20,
        }}
      >
        Select topic of interest for your better recommendations, or you can
        skip it.
      </Text>

      <View style={{ marginTop: 10, flexDirection: "row", flexWrap: "wrap" }}>
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => toggleSelect(index)}
              activeOpacity={1}
              style={[
                styles.touchableBtn,
                {
                  backgroundColor: item.selected ? "#a1614b" : "#fff",
                  borderColor: item.selected ? "#ddd" : "#a1614b",
                  borderWidth: item.selected ? 2 : 1,
                },
              ]}
            >
              <Text
                style={{
                  fontFamily: "MontserratMedium",
                  fontSize: 15,
                  color: item.selected ? "#fff" : "#111",
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Tab")}
          style={[
            styles.touchableBtn,
            {
              backgroundColor: "#eee",
              alignSelf: "center",
              marginTop: 30,
              width: "40%",
              height: 50,
              borderWidth: 0,
            },
          ]}
        >
          <Text
            style={[
              styles.text,
              { color: "#222", fontFamily: "MontserratMedium" },
            ]}
          >
            Skip
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Discover")}
          style={[
            styles.touchableBtn,
            {
              backgroundColor: "#a1614b",
              alignSelf: "center",
              marginTop: 30,
              width: "40%",
              height: 50,
            },
          ]}
        >
          <Text
            style={[
              styles.text,
              { color: "#fff", fontFamily: "MontserratMedium" },
            ]}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  touchableBtn: {
    borderWidth: 2,
    borderColor: "#a1614b",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "600",
    fontFamily: "Montserrat1",
    marginLeft: 10,
  },
});
