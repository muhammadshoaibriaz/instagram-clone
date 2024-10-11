import { useNavigation, useRoute } from "@react-navigation/native";
import React, { Component } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ArrowRightIcon, BookmarkIcon } from "react-native-heroicons/outline";
export const SPACING = 14;

export default function Writers({ data, title }) {
  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 14 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 14,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat3",
            fontSize: 18,
          }}
        >
          {title}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Writer")}>
          <ArrowRightIcon size={20} color="#a1614b" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: SPACING }}
        renderItem={({ item, index }) => {
          return (
            <TouchableWithoutFeedback key={index}>
              <View style={styles.card}>
                <Image
                  source={{
                    uri: item?.urlToImage,
                  }}
                  style={styles.image}
                />
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Montserrat3",
                    }}
                    numberOfLines={1}
                  >
                    {item?.author}
                  </Text>

                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: "Montserrat",
                      color: "#777",
                    }}
                    numberOfLines={1}
                  >
                    {item?.source?.name}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 80,
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});
