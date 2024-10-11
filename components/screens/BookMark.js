import { AntDesign, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { Component, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  ArrowLeftIcon,
  BookmarkSlashIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
} from "react-native-heroicons/outline";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native";
import { removeItem } from "../../redux/action/action";

export default function BookMark() {
  const navigation = useNavigation();
  const items = useSelector((state) => state);
  const dispatch = useDispatch();
  const removeItems = (index) => {
    dispatch(removeItem(index));
  };

  const url = "https://randomuser.me/api/";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((response) => setUser(response.results));
  }, []);

  const [user, setUser] = useState([]);
  const [row, setRow] = useState(false);
  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", paddingHorizontal: 14, flex: 1 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
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
            My Bookmark
          </Text>
        </View>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.navigate("Search")}
        >
          <MagnifyingGlassIcon size={20} color="#777" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontFamily: "Montserrat3", fontSize: 16 }}>
          {items.length} items
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
        contentContainerStyle={{
          flexDirection: row ? "row" : "column",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
        data={items}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <TouchableWithoutFeedback key={index}>
              <View
                style={[
                  styles.card,
                  {
                    flexDirection: row ? "column" : "row",
                    alignItems: row ? "" : "center",
                    width: row ? 160 : "100%",
                  },
                ]}
              >
                <View>
                  <Image
                    source={{
                      // uri: "https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg",
                      uri: item?.urlToImage,
                    }}
                    resizeMode="cover"
                    style={[
                      styles.blogImage,
                      { width: row ? 160 : 100, height: row ? 160 : 100 },
                    ]}
                  />
                  <TouchableOpacity
                    style={[styles.bookmarkBtn]}
                    onPress={() => removeItems(index)}
                  >
                    <BookmarkSlashIcon size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    marginLeft: row ? 0 : 10,
                    width: row ? 160 : "66%",
                  }}
                >
                  <Text
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
                        source={{ uri: item?.urlToImage }}
                        style={styles.userImage}
                        resizeMode="contain"
                      />
                      <Text style={styles.username}>{item?.author}</Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        width: 24,
                        height: 24,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Feather name="more-vertical" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
    </SafeAreaView>
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
    right: 6,
    top: 6,
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
