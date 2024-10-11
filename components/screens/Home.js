import { AntDesign, Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewPropTypes,
  View,
} from "react-native";

import {
  fetchBBCNews,
  fetchDummyNews,
  fetchNewsByHealth,
  fetchNewsByQuery,
  fetchPakistanNews,
} from "../newsDb";
import {
  ArrowRightIcon,
  BellIcon,
  BookmarkIcon,
} from "react-native-heroicons/outline";
import ArticleCard from "../ArticleCard";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";
import axios from "axios";
import { IP_ADDRESS } from "../../db/IP";

const ITEM_WIDTH = Dimensions.get("screen").width;

Carousel.propTypes = {
  // Your prop types here
  style: ViewPropTypes.style,
};

export default function Home({ route }) {
  console.log(route.params);

  useEffect(() => {
    // getNewsByQuery();
    // getNewsByHealth();
    getAllNews();
  }, []);

  const getAllNews = async () => {
    const results = await axios.get(`${IP_ADDRESS}/api/post`);
    setAllNews(results.data.result);
  };

  const getNewsByQuery = async () => {
    const data = await fetchNewsByQuery();
    // console.log("recent news are", data);
    if (data && data.articles) setTechnology(data.articles);
  };
  const getNewsByHealth = async () => {
    const data = await fetchNewsByHealth();
    // console.log("health news are", data);
    if (data && data.articles) setHealth(data.articles);
  };

  const navigation = useNavigation();
  const [technology, setTechnology] = useState([1, 2, 3, 4]);
  const [health, setHealth] = useState([1, 2, 3, 4]);
  const [allNews, setAllNews] = useState(null);
  console.log(allNews);

  return (
    <View style={{ backgroundColor: "#fff" }}>
      <SafeAreaView style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../assets/images/logo1.png")}
            style={{ width: 30, height: 30 }}
          />
          <Text
            style={{
              fontSize: 22,
              fontFamily: "MontserratSemiBold",
              marginLeft: 10,
            }}
          >
            Scribblr
          </Text>
        </View>
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
            onPress={() => navigation.navigate("Login")}
          >
            <BellIcon size={20} color="#777" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate("Bookmarks")}
          >
            <BookmarkIcon size={20} color="#777" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 14,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "MontserratSemiBold",
              fontSize: 18,
            }}
          >
            Breaking News
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Popular")}>
            <Text style={{ fontFamily: "MontserratMedium", fontSize: 12 }}>
              View all
            </Text>
          </TouchableOpacity>
        </View>
        <Carousel
          data={[1, 2, 3, 4]}
          itemHeight={200}
          itemWidth={320}
          sliderWidth={ITEM_WIDTH}
          sliderHeight={200}
          autoplay={true}
          decelerationRate={"fast"}
          loop
          activeAnimationType="timing"
          snapToAlignment="center"
          style={{ marginTop: 20 }}
          contentContainerStyle={{ marginTop: 20 }}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  backgroundColor: "gold",
                  borderRadius: 20,
                  overflow: "hidden",
                }}
              >
                <ImageBackground
                  source={require("../../assets/images/image.jpg")}
                  style={{
                    width: "100%",
                    height: 180,
                    borderRadius: 20,
                  }}
                >
                  <Text style={styles.sports}>Sports</Text>
                  <View
                    style={{
                      position: "absolute",
                      bottom: 14,
                      width: "100%",
                      paddingHorizontal: 12,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "MontserratMedium",
                        color: "#eee",
                        fontSize: 13,
                      }}
                    >
                      CNN China · 6 hours ago
                    </Text>
                    <Text
                      style={{
                        fontFamily: "MontserratMedium",
                        color: "#fff",
                        fontSize: 18,
                        width: "95%",
                        marginTop: 6,
                      }}
                    >
                      Alexander wears modified helmet in road races.
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            );
          }}
        />
      </ScrollView>
      <ArticleCard data={allNews} title="Recommendation" subtitle="View all" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    marginTop: 30,
    height: 50,
    marginBottom: 10,
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
    backgroundColor: "#fff",
    width: 110,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 14,
    marginBottom: 14,
  },
  card: {
    elevation: 14,
    borderRadius: 10,
    marginHorizontal: 14,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginTop: 20,
    position: "relative",
  },
  sports: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 30,
    backgroundColor: "skyblue",
    top: 14,
    left: 14,
    width: "auto",
    position: "absolute",
    fontFamily: "MontserratSemiBold",
  },
});
