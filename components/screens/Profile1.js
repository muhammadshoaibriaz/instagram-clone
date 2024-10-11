import { useFonts } from "expo-font";
import React, { Component, useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  ArrowLeftIcon,
  EllipsisHorizontalCircleIcon,
  EnvelopeIcon,
} from "react-native-heroicons/outline";
import About from "./About";
import Articles from "./Articles";
export default function Profile1({ route }) {
  const [following, setFollowing] = useState(false);
  const [val, setVal] = useState(1);
  const { params } = route;
  const user = params?.user;
  // console.log("user is ", user.username);

  const randomNumber = Math.floor(Math.random() * 999);

  const CustomComponent = () => {
    if (val === 1) {
      return <Articles />;
    } else {
      return <About />;
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
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <TouchableOpacity>
          <ArrowLeftIcon size={20} color="#777" />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: 80,
          }}
        >
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate("Notify")}
          >
            {/* <TableCellsIcon size={20} color="#777" /> */}
            <EnvelopeIcon color={"#777"} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate("Bookmarks")}
          >
            <EllipsisHorizontalCircleIcon size={20} color="#777" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.profileCard}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={{ uri: user?.image }} style={styles.image} />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontFamily: "Montserrat3", fontSize: 18 }}>
              {user?.username || "unknown"}
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat",
                opacity: 0.6,
                textTransform: "lowercase",
              }}
            >
              @{user?.username.replace(" ", "_") + randomNumber}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.follow,
            {
              backgroundColor: following ? "#fff" : "#a1614b",
              borderWidth: 1,
              borderColor: following ? "#a1614b" : "#fff",
            },
          ]}
          onPress={() => setFollowing(!following)}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              color: following ? "#a1614b" : "#fff",
            }}
          >
            {following ? "Following" : "Follow"}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: 80,
          marginHorizontal: 14,
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
        }}
      >
        <View style={styles.item}>
          <Text style={{ fontFamily: "Montserrat3", fontSize: 20 }}>365</Text>
          <Text style={{ fontFamily: "Montserrat", fontSize: 16 }}>
            Articles
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={{ fontFamily: "Montserrat3", fontSize: 20 }}>
            {user?.following?.length}
          </Text>
          <Text style={{ fontFamily: "Montserrat", fontSize: 16 }}>
            following
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={{ fontFamily: "Montserrat3", fontSize: 20 }}>
            {user?.followers?.length}
          </Text>
          <Text style={{ fontFamily: "Montserrat", fontSize: 16 }}>
            followers
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 14,
          borderBottomWidth: 1,
          borderBottomColor: "#eee",
        }}
      >
        <TouchableOpacity style={styles.aboutBtn} onPress={() => setVal(1)}>
          <Text
            style={{
              fontFamily: "Montserrat3",
              fontSize: 16,
              color: val === 1 ? "#a1614b" : "#333",
            }}
          >
            Articles
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.aboutBtn} onPress={() => setVal(2)}>
          <Text
            style={{
              fontFamily: "Montserrat3",
              fontSize: 16,
              color: val === 2 ? "#a1614b" : "#333",
            }}
          >
            About
          </Text>
        </TouchableOpacity>
      </View>
      <CustomComponent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    marginTop: 30,
  },
  iconBtn: {
    width: 35,
    height: 35,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  touchableBtn: {
    borderRadius: 40,
    backgroundColor: "#a1614b",
    width: 110,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  aboutBtn: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  follow: {
    paddingHorizontal: 14,
    height: 40,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a1614b",
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    marginHorizontal: 14,
    borderBlockColor: "#eee",
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    width: "33%",
    borderRightWidth: 1,
    borderRightColor: "#eee",
  },
});
