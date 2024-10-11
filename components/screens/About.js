import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import React, { Component, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function About() {
  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 12 }}
      style={{ height: 400 }}
    >
      <View
        style={{
          paddingBottom: 10,
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat3",
            fontSize: 18,
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          Description
        </Text>
        <Text
          style={{
            fontFamily: "Montserrat",
            color: "#555",
          }}
        >
          My name is Shoaib Riaz. I'm a Front-End-Developer etc.
        </Text>
      </View>
      <View
        style={{
          paddingBottom: 10,
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat3",
            fontSize: 18,
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          Social Media
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 40,
          }}
        >
          <FontAwesome name="whatsapp" size={24} color="#a1614b" />
          <Text
            style={{
              fontFamily: "Montserrat3",
              color: "#a1614b",
              marginLeft: 10,
            }}
          >
            Whatsapp
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 40,
          }}
        >
          <FontAwesome name="facebook-square" size={24} color="#a1614b" />
          <Text
            style={{
              fontFamily: "Montserrat3",
              color: "#a1614b",
              marginLeft: 10,
            }}
          >
            Facebook
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", height: 40 }}
        >
          <FontAwesome name="twitter" size={24} color="#a1614b" />
          <Text
            style={{
              fontFamily: "Montserrat3",
              color: "#a1614b",
              marginLeft: 10,
            }}
          >
            Twitter
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", height: 40 }}
        >
          <FontAwesome name="instagram" size={24} color="#a1614b" />
          <Text
            style={{
              fontFamily: "Montserrat3",
              color: "#a1614b",
              marginLeft: 10,
            }}
          >
            Instagram
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingBottom: 10,
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat3",
            fontSize: 18,
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          More Info
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome name="globe" size={24} color="#a1614b" />
          <Text
            style={{
              fontFamily: "Montserrat",
              color: "#555",
              marginLeft: 10,
            }}
          >
            www.exampledomain.com
          </Text>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Feather name="map-pin" size={24} color="#a1614b" />
          <Text
            style={{
              fontFamily: "Montserrat",
              color: "#555",
              marginLeft: 10,
            }}
          >
            Khanewal Punjab, Pakistan
          </Text>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Feather name="info" size={24} color="#a1614b" />
          <Text
            style={{
              fontFamily: "Montserrat",
              color: "#555",
              marginLeft: 10,
            }}
          >
            Joined, since August 24, 2024
          </Text>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Feather name="bar-chart" size={24} color="#a1614b" />
          <Text
            style={{
              fontFamily: "Montserrat",
              color: "#555",
              marginLeft: 10,
            }}
          >
            3,453,536 readers
          </Text>
        </View>
      </View>
    </ScrollView>
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
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 40,
  },
  blogImage: {
    width: 160,
    height: 150,
    borderRadius: 20,
  },
  card: {
    width: 160,
    height: "auto",
    borderRadius: 20,
    position: "relative",
    backgroundColor: "#fff",
    paddingBottom: 4,
    marginBottom: 10,
  },
  bookmarkBtn: {
    width: 30,
    height: 30,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "#a1614b",
  },
  username: {
    fontSize: 12,
    marginLeft: 5,
    fontFamily: "Montserrat3",
    color: "#a1614b",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    marginTop: 5,
  },
  title: {
    fontSize: 16,
    fontFamily: "Montserrat3",
    marginLeft: 5,
    marginTop: 4,
  },
});
