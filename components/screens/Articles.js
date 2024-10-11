import { Feather, FontAwesome } from "@expo/vector-icons";
import React, { Component, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from "react-native";
import {
  BookmarkIcon,
  ListBulletIcon,
  Squares2X2Icon,
} from "react-native-heroicons/outline";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/action/action";
import { fetchAuthor } from "../newsDb";

export default function Articles() {
  useEffect(() => {
    getAuthor();
  }, []);
  const dispatch = useDispatch();
  const addItems = (item) => {
    dispatch(addItem(item));
  };
  const [bookmark, setBookmark] = useState([1, 2, 3, 4, 5]);
  const [article, setArticles] = useState([]);
  const [row, setRow] = useState(false);
  const getAuthor = async () => {
    const data = await fetchAuthor();
    // console.log("authors are", data);
    if (data && data?.articles) setArticles(data.articles);
  };
  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: 50,
          paddingHorizontal: 14,
        }}
      >
        <Text style={{ fontFamily: "Montserrat3", fontSize: 16 }}>
          {article.length} Articles
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => setRow(false)}
          >
            <ListBulletIcon size={20} color={row ? "#777" : "#a1614b"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setRow(true)}>
            <Squares2X2Icon size={20} color={row ? "#a1614b" : "#777"} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={article}
        style={{ height: 350 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 14 }}
        renderItem={({ item, index }) => {
          return (
            <TouchableWithoutFeedback key={index}>
              <View style={[styles.card]}>
                <View>
                  <Image
                    source={{
                      uri: item?.urlToImage,
                    }}
                    style={[
                      styles.blogImage,
                      { width: row ? 160 : 100, height: row ? 160 : 100 },
                    ]}
                  />
                  <TouchableOpacity
                    style={[styles.bookmarkBtn]}
                    onPress={() => addItems(item)}
                  >
                    <BookmarkIcon size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    marginLeft: row ? 0 : 10,
                    width: row ? 160 : "66%",
                  }}
                >
                  <Text
                    numberOfLines={row ? 2 : 3}
                    style={[
                      styles.title,
                      {
                        marginTop: row ? 0 : -6,
                        textTransform: "capitalize",
                      },
                    ]}
                  >
                    {item?.title}
                  </Text>
                  <View style={styles.footer}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={{
                          uri: "https://t4.ftcdn.net/jpg/01/05/90/77/360_F_105907729_4RzHYsHJ2UFt5koUI19fc6VzyFPEjeXe.jpg",
                        }}
                        style={styles.userImage}
                      />
                      <Text style={styles.username}>{item?.author}</Text>
                    </View>
                    <TouchableOpacity>
                      <Feather name="more-vertical" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
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
  userImage: {
    width: 24,
    height: 24,
    borderRadius: 40,
  },
  blogImage: {
    width: 160,
    height: 150,
    borderRadius: 20,
  },
  card: {
    borderRadius: 20,
    position: "relative",
    paddingBottom: 4,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  bookmarkBtn: {
    width: 30,
    height: 30,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 2,
    top: 2,
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
