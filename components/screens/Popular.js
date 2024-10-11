import { useNavigation } from "@react-navigation/native";
import React, { Component, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookmarkIcon,
  ListBulletIcon,
  Squares2X2Icon,
} from "react-native-heroicons/outline";

export default function Popular() {
  const navigation = useNavigation();
  const [bookmark, setBookmark] = useState([1, 2, 3, 4, 5]);
  const [row, setRow] = useState(false);
  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 14 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: 50,
          marginTop: 30,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftIcon size={20} color="#777" />
          </TouchableOpacity>
          <Text
            style={{ fontSize: 20, fontFamily: "Montserrat3", marginLeft: 10 }}
          >
            Most Popular
          </Text>
        </View>
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
      <View
        style={{
          flexDirection: row ? "row" : "column",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        {/* apply map method here */}
        {bookmark.map((item, index) => {
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
                      uri: "https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg",
                    }}
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
                    style={[
                      styles.title,
                      {
                        marginTop: row ? 0 : -6,
                        textTransform: "capitalize",
                      },
                    ]}
                  >
                    10 tips for boosting your productivity
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
                      <Text style={styles.username}>John Doe</Text>
                    </View>
                    <Text style={{ fontSize: 10, fontFamily: "Montserrat" }}>
                      5 days ago
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
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
