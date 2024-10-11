import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import {
  EllipsisHorizontalCircleIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import ArticleCard from "../ArticleCard";
import { fetchAuthor, fetchPopularEntertainment } from "../newsDb";
import SmallCard from "../SmallCard";
import Writers from "../Writers";

export default function Explore() {
  useEffect(() => {
    getPopularNews();
    getAuthor();
  }, []);
  const [popular, setPopular] = useState([1, 2, 3, 4]);
  const [topics, setTopics] = useState([1, 2, 3, 4]);
  const [writer, serWriters] = useState([1, 2, 3, 4]);

  const getPopularNews = async () => {
    const data = await fetchPopularEntertainment();
    // console.log("entertainment", data);
    if (data && data?.articles) setPopular(data.articles);
  };
  const getAuthor = async () => {
    const data = await fetchAuthor();
    console.log("authors are", data);
    if (data && data?.articles) serWriters(data.articles);
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
    <View style={{ backgroundColor: "#fff" }}>
      <SafeAreaView
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 14,
          marginTop: 30,
          height: 50,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../assets/images/logo1.png")}
            style={{ width: 30, height: 30 }}
          />
          <Text
            style={{ fontSize: 22, fontFamily: "Montserrat3", marginLeft: 10 }}
          >
            Discover
          </Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <EllipsisHorizontalCircleIcon size={20} color="#777" />
        </TouchableOpacity>
      </SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 90,
        }}
      >
        <View style={styles.searchBar}>
          <MagnifyingGlassIcon size={20} color="#888" />
          <TextInput
            style={styles.input}
            placeholder="Search for news or article writer"
          />
        </View>
        <ScrollView
          horizontal
          style={{ marginTop: 8 }}
          contentContainerStyle={{ paddingHorizontal: 14 }}
          showsHorizontalScrollIndicator={false}
        >
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <TouchableOpacity style={styles.categoryBtn}>
              <Text style={styles.category}>Entertainment</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ArticleCard data={popular} title="Entertainment" />
        {/* <SmallCard data={topics} title="Explore by Topics" /> */}
        <Writers data={writer} title="Top Writers" />
      </ScrollView>
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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#eee",
    height: 45,
    paddingLeft: 12,
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    marginLeft: 4,
  },
  category: {
    fontFamily: "Montserrat",
    fontSize: 13,
  },
  categoryBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f6f6f6",
    borderRadius: 40,
    marginRight: 8,
    marginTop: 6,
  },
});
