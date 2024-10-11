import React, { Component } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ArrowLeftIcon,
  BellIcon,
  BookmarkIcon,
  Cog8ToothIcon,
} from "react-native-heroicons/outline";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
export default function Notifications() {
  const navigation = useNavigation();
  const [loaded] = useFonts({
    Montserrat: require("../../assets/fonts/Montserrat-Medium.ttf"),
    Montserrat3: require("../../assets/fonts/Montserrat-Medium.ttf"),
  });
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <SafeAreaView
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 14,
          marginTop: 30,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeftIcon size={20} color="#777" />
          </TouchableOpacity>
          <Text
            style={{ fontSize: 22, fontFamily: "Montserrat3", marginLeft: 10 }}
          >
            Notifications
          </Text>
        </View>

        <TouchableOpacity style={styles.iconBtn}>
          <Cog8ToothIcon size={20} color="#777" />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={{
            uri: "https://ouch-cdn2.icons8.com/EAx_DerhY0Vz_dOPZ7zPATd34M8ND6uTclhde2O-Pt8/rs:fit:368:421/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMTQ4/LzhmMTEzYjhhLWY3/ODMtNGJmOC1iMzc0/LTdmODFjMzZmMzJh/Mi5zdmc.png",
          }}
          resizeMode="contain"
          style={{
            width: 200,
            height: 280,
            alignSelf: "center",
            marginTop: 50,
            marginBottom: 30,
          }}
        />
        <Text style={{ fontFamily: "Montserrat3", fontSize: 22 }}>Empty</Text>
        <Text style={{ fontFamily: "Montserrat", marginTop: 10 }}>
          You don't have any notification of this time.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
