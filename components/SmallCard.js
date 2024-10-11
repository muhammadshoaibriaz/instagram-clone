import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import {
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

export default function SmallCard({ data, title }) {
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
        <TouchableOpacity onPress={() => navigation.navigate("Topics")}>
          <ArrowRightIcon size={20} color="#a1614b" />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: SPACING }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback key={index}>
              <View style={styles.card}>
                <Image
                  source={{
                    uri: "https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg",
                  }}
                  style={styles.blogImage}
                />
                <View style={{ position: "absolute", bottom: 10, left: 10 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Montserrat3",
                      color: "#fff",
                    }}
                  >
                    Travel
                  </Text>

                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Montserrat",
                      color: "#ddd",
                    }}
                  >
                    123 articles
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  blogImage: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
  },
  card: {
    width: 155,
    height: 100,
    position: "relative",
    marginRight: SPACING / 2,
  },
});
