import React, { Component, useCallback, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  TextInput,
  FlatList,
} from "react-native";
import {
  BookmarkIcon,
  ListBulletIcon,
  Squares2X2Icon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
} from "react-native-heroicons/outline";
import { debounce } from "lodash";
const apikey = "pub_32195d62affccf8550870ed06ef9f33b5ab65";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as Animatable from "react-native-animatable";
import { AntDesign, Feather } from "@expo/vector-icons";
export default function Search() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [row, setRow] = useState(false);
  const handleSearch = (value) => {
    if (value.length > 3) {
      axios
        .request(`https://newsdata.io/api/1/news?apikey=${apikey}&q=${value}`)
        .then((res) => {
          if (res && res.data.results) setData(res.data.results);
        });
    }
  };
  const handleDebounce = useCallback(debounce(handleSearch, 600), []);
  return (
    <ScrollView
      style={{ backgroundColor: "#fff" }}
      contentContainerStyle={{ paddingHorizontal: 14 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: 350,
          marginTop: 30,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 24,
            height: 24,
            justifyContent: "center",
          }}
        >
          <ArrowLeftIcon size={20} color="#888" />
        </TouchableOpacity>
        <View style={[styles.searchBar, { width: "85%", marginLeft: 10 }]}>
          <MagnifyingGlassIcon size={20} color="#888" />
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleDebounce(text)}
            placeholder="Search for news or article writer"
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: 50,
        }}
      >
        <Text style={{ fontFamily: "Montserrat3", fontSize: 16 }}>
          {data.length} Articles
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
        data={data}
        contentContainerStyle={{
          flexDirection: row ? "row" : "column",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: 10,
        }}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flexDirection: row ? "row" : "column",
                flexWrap: "wrap",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push("Details")}
              >
                <Animatable.View
                  animation={"fadeInUp"}
                  delay={index * 200}
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
                      // source={{
                      //   uri: "https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg",
                      // }}
                      source={{ uri: item?.image_url }}
                      style={[
                        styles.blogImage,
                        { width: row ? 160 : 100, height: row ? 160 : 100 },
                      ]}
                    />
                    <TouchableOpacity style={[styles.bookmarkBtn]}>
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
                      numberOfLines={2}
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
                        <Text style={styles.username}>{item?.creator}</Text>
                      </View>
                      <TouchableOpacity>
                        <Feather name="more-vertical" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Animatable.View>
              </TouchableWithoutFeedback>
            </View>
          );
        }}
      />
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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#eee",
    height: 45,
    paddingLeft: 12,
  },
  input: {
    flex: 1,
    height: "100%",
    marginLeft: 4,
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
