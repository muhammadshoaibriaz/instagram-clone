import React, { Component, useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { useFonts } from "expo-font";
import * as Animatable from "react-native-animatable";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Input, CheckBox, Dialog } from "react-native-elements";
import { fetchAuthor } from "../newsDb";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { IP_ADDRESS } from "../../db/IP";

const Item = ({ username, image, item, index }) => {
  const [follow, setFollow] = useState(false);
  return (
    <View key={index} style={styles.personList}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={require("../../assets/images/tolga.png")}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={{ marginLeft: 12 }}>
          <Text
            style={{
              fontFamily: "MontserratSemiBold",
              fontSize: 15,
              width: 160,
              textTransform: "capitalize",
            }}
            numberOfLines={1}
          >
            {item?.username || "Unknown"}
          </Text>
          <Text
            style={{
              fontFamily: "MontserratRegular",
              fontSize: 12,
              color: "#999",
              textTransform: "lowercase",
            }}
          >
            @{item?.username || "@unknown"}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.follow,
          {
            backgroundColor: follow ? "white" : "#a1614b",
            borderWidth: 1,
            borderColor: follow ? "#a1614b" : "white",
          },
        ]}
        onPress={(index) => index == setFollow(!follow)}
      >
        <Text
          style={{
            fontFamily: "MontserratSemiBold",
            color: follow ? "#111" : "#fff",
            fontSize: 12,
          }}
        >
          {follow ? "Following" : "Follow"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Discover() {
  const navigation = useNavigation();
  useEffect(() => {
    getAuthor();
  }, []);
  const [visible, setVisible] = useState(false);
  const [author, setAuthors] = useState([]);
  const [loadeds, setLoaded] = useState(false);

  const getAuthor = async () => {
    const results = await axios.get(`${IP_ADDRESS}/api/users`);
    const data = results.data;
    setAuthors(data);
  };

  return (
    <View
      style={{
        paddingHorizontal: 14,
        backgroundColor: "#fff",
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: "relative",
          width: 40,
          alignItems: "flex-start",
          justifyContent: "center",
          marginTop: 40,
          marginBottom: 10,
        }}
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
        Discover people 🥰
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontFamily: "MontserratRegular",
          marginBottom: 20,
        }}
      >
        Pick some people to follow.
      </Text>
      <FlatList
        data={author}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return <Item item={item} index={index} />;
        }}
      />
      <Dialog
        isVisible={visible}
        transparent={true}
        animationType="fade"
        onDismiss={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}
        statusBarTranslucent={true}
        overlayStyle={{ borderRadius: 30 }}
        backdropStyle={{ backgroundColor: "#00000099" }}
      >
        <View
          style={{
            width: "100%",
            height: 360,
            borderRadius: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Animatable.Image
            animation={"zoomIn"}
            source={require("../../assets/images/success.png")}
            style={{ width: 140, height: 140 }}
          />
          <Text
            style={{
              fontFamily: "MontserratSemiBold",
              fontSize: 18,
              marginBottom: 10,
              marginTop: 20,
              color: "#a1614b",
            }}
          >
            Sign Up Successfully
          </Text>
          <Text
            style={{
              fontFamily: "MontserratMedium",
              fontSize: 14,
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            Your account has been created. Please wait a moment, we are
            preparing for you.
          </Text>
          {loadeds ? (
            <Image
              style={{ width: 140, height: 120 }}
              source={{
                uri: "https://i.gifer.com/origin/e4/e439272bf16c2df6b43e480de9fb1810_w200.gif",
              }}
            />
          ) : (
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
                navigation.navigate("Tab");
              }}
              style={[
                styles.touchableBtn,
                {
                  backgroundColor: "#a1614b",
                  marginTop: 10,
                  width: "90%",
                  height: 50,
                },
              ]}
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
          )}
        </View>
      </Dialog>

      <TouchableOpacity
        onPress={() => {
          setVisible(true);
          setLoaded(true);
          setTimeout(() => {
            setLoaded(false);
          }, 5000);
        }}
        style={[
          styles.touchableBtn,
          {
            backgroundColor: "#a1614b",
            marginTop: 10,
            width: "100%",
            height: 50,
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            { color: "#fff", fontFamily: "MontserratSemiBold" },
          ]}
        >
          Finish
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  touchableBtn: {
    borderWidth: 1.3,
    borderColor: "#a1614b",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
  },
  personList: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "600",
    fontFamily: "MontserratMedium",
    marginLeft: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  follow: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 40,
    backgroundColor: "#a1614b",
  },
});
