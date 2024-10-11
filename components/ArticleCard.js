import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ArticleCard1 from "./ArticleCard1";
export const SPACING = 14;
export default function ArticleCard({ data, title, subtitle }) {
  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 14 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 14,
          marginBottom: 14,
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
        <TouchableOpacity onPress={() => navigation.navigate("Popular")}>
          <Text style={{ fontFamily: "Montserrat", fontSize: 13 }}>
            {subtitle}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 14 }}
        renderItem={({ item, index }) => {
          return (
            <ArticleCard1
              item={item}
              onPress={() => navigation.navigate("Details", { item })}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  blogImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  card: {
    flex: 1,
    height: "auto",
    flexDirection: "row",
    borderRadius: 20,
    position: "relative",
    backgroundColor: "#fff",
    paddingBottom: 4,
    marginRight: SPACING,
    marginBottom: 10,
    backgroundColor: "lightblue",
  },
  iconBtn: {
    width: 28,
    height: 28,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 6,
    top: 6,
  },
});
