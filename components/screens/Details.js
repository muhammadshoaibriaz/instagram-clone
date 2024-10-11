import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ArrowLeftIcon,
  BellIcon,
  BookmarkIcon,
  BookOpenIcon,
  EllipsisHorizontalCircleIcon,
  PaperAirplaneIcon,
} from "react-native-heroicons/outline";
export default function Details({ route }) {
  const { item } = route.params;
  const navigation = useNavigation();
  // console.log("items data is ", item);
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <StatusBar translucent={true} />
      <SafeAreaView style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon color={"#fff"} size={20} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "45%",
          }}
        >
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate("Notify")}
          >
            <BookmarkIcon size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate("Bookmarks")}
          >
            <PaperAirplaneIcon
              style={{ transform: [{ rotate: "-35deg" }] }}
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate("Notify")}
          >
            <EllipsisHorizontalCircleIcon size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={{ backgroundColor: "gold" }}>
        <Image
          source={{ uri: item?.urlToImage }}
          style={{
            width: "100%",
            height: 340,
            zIndex: -1,
          }}
        />
        <Text
          style={{
            fontFamily: "MontserratSemiBold",
            fontSize: 22,
            textTransform: "capitalize",
            position: "absolute",
            bottom: 40,
            paddingHorizontal: 14,
            width: "100%",
            color: "#fff",
          }}
        >
          {item?.title}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 14,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          bottom: 30,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBlockColor: "#eee",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={{ uri: item?.urlToImage }} style={styles.image} />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontFamily: "MontserratSemiBold", fontSize: 18 }}>
                {item?.author}
              </Text>
              <Text
                style={{
                  fontFamily: "MontserratRegular",
                  textTransform: "lowercase",
                  opacity: 0.6,
                }}
              >
                @{item?.author}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.follow}>
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontFamily: "MontserratSemiBold",
              }}
            >
              Follow
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            marginTop: 10,
            fontFamily: "MontserratMedium",
            color: "#a1614b",
          }}
        >
          {item?.source?.name}
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontFamily: "MontserratRegular",
            color: "#777",
          }}
        >
          {item?.content}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eeeeee20",
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
  card: {
    elevation: 14,
    borderRadius: 10,
    padding: 14,
    marginHorizontal: 14,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginTop: 20,
    position: "relative",
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
    width: 90,
    height: 40,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a1614b",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    position: "absolute",
    top: 25,
    height: 50,
    zIndex: 11,
    width: "100%",
  },
});
