import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  Animated,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { AntDesign } from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
const { width, height } = Dimensions.get("screen");
const ITEM_WIDTH = width - 100;
const ITEM_HEIGHT = height / 2.2;
const RADIUS = 20;
const SPACING = 4;

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const colors = [
  ["#fae3bf", "#618869"],
  ["#c8c8f8", "#618869"],
  ["#bfeefa", "#3a475b"],
  ["#faa7c9", "#886171"],
  ["#bfd0fa", "#886171"],
  ["#618869", "#886171"],
  ["#fabfd0", "#618869"],
  ["#bff5fa", "#618869"],
  ["#fae3bf", "#618869"],
];

const BackDrop = ({ scrollX }) => {
  const inputRange = colors.map((_, i) => i * ITEM_WIDTH);

  const backgroundColor1 = scrollX.interpolate({
    inputRange,
    outputRange: colors.map((color) => color[0]),
  });

  const backgroundColor2 = scrollX.interpolate({
    inputRange,
    outputRange: colors.map((color) => color[1]),
  });

  return (
    <AnimatedLinearGradient
      colors={[backgroundColor1, backgroundColor2]}
      style={StyleSheet.absoluteFillObject}
    />
  );
};

export default function TikTokCarousel() {
  const data = [
    {
      username: "Ayyan Ali",
      email: "mudassirbinmaqbool@gmail.com",
      subtitle: "People you may know",
      image: require("../assets/images/img3.jpg"),
      images: [
        require("../assets/images/img1.jpg"),
        require("../assets/images/img18.jpg"),
        require("../assets/images/img3.jpg"),
      ],
      followed: [
        {
          url: require("../assets/images/img22.jpg"),
          username: "Emily Chen",
        },
        {
          url: require("../assets/images/img21.jpg"),
          username: "Shabii",
        },
        {
          url: require("../assets/images/img21.jpg"),
          username: "Iman Ali",
        },
      ],
    },
    {
      username: "Mehreen Syed",
      email: "mudassirbinmaqbool@gmail.com",
      subtitle: "People you may know",
      image: require("../assets/images/img18.jpg"),
      images: [
        require("../assets/images/img25.jpg"),
        require("../assets/images/img24.jpg"),
        require("../assets/images/img23.jpg"),
      ],
      followed: [
        {
          url: require("../assets/images/img22.jpg"),
          username: "Sabeeka Imam",
        },
        {
          url: require("../assets/images/img21.jpg"),
          username: "Hira Tareen",
        },
      ],
    },
    {
      username: "Cybil Chowdhry",
      email: "mudassirbinmaqbool@gmail.com",
      subtitle: "People you may know",
      image: require("../assets/images/img16.jpg"),
      images: [
        require("../assets/images/img22.jpg"),
        require("../assets/images/img21.jpg"),
        require("../assets/images/img20.jpg"),
      ],
      followed: [
        {
          url: require("../assets/images/img22.jpg"),
          username: "Sunita Marshall",
        },
        {
          url: require("../assets/images/img21.jpg"),
          username: "Zara Abid",
        },
      ],
    },
    {
      username: "Saba Qamar",
      email: "mudassirbinmaqbool@gmail.com",
      subtitle: "People you may know",
      image: require("../assets/images/img8.jpg"),
      images: [
        require("../assets/images/img15.jpg"),
        require("../assets/images/img14.jpg"),
        require("../assets/images/img11.jpg"),
      ],
    },
    {
      username: "Sadaf Kanwal",
      email: "mudassirbinmaqbool@gmail.com",
      subtitle: "People you may know",
      image: require("../assets/images/img9.jpg"),
      images: [
        require("../assets/images/img1.jpg"),
        require("../assets/images/img3.jpg"),
        require("../assets/images/img8.jpg"),
      ],
    },
    {
      username: "Amna Ilyas",
      email: "mudassirbinmaqbool@gmail.com",
      subtitle: "People you may know",
      image: require("../assets/images/img15.jpg"),
      images: [
        require("../assets/images/img25.jpg"),
        require("../assets/images/img18.jpg"),
        require("../assets/images/img11.jpg"),
      ],
    },
    {
      username: "Rabia Butt",
      email: "mudassirbinmaqbool@gmail.com",
      subtitle: "People you may know",
      image: require("../assets/images/img23.jpg"),
      images: [
        require("../assets/images/img15.jpg"),
        require("../assets/images/img14.jpg"),
        require("../assets/images/img24.jpg"),
      ],
    },
    {
      username: "Ayesha Omar",
      email: "mudassirbinmaqbool@gmail.com",
      subtitle: "People you may know",
      image: require("../assets/images/img20.jpg"),
      images: [
        require("../assets/images/img17.jpg"),
        require("../assets/images/img21.jpg"),
        require("../assets/images/img23.jpg"),
      ],
      followed: [
        {
          url: require("../assets/images/img22.jpg"),
          username: "Nadia Hussain",
        },
        {
          url: require("../assets/images/img21.jpg"),
          username: "Noor Bukhari",
        },
      ],
    },
    {
      username: "Emily Chen",
      subtitle: "People you may know",
      image: require("../assets/images/img.jpg"),
      images: [
        require("../assets/images/img1.jpg"),
        require("../assets/images/img23.jpg"),
        require("../assets/images/img18.jpg"),
      ],
    },
  ];
  const scrollX = useRef(new Animated.Value(0)).current;
  const randomNumber = Math.floor(Math.random() * 200);
  const loaded = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });
  if (!loaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <BackDrop scrollX={scrollX} />
      <View style={styles.header}>
        <Text></Text>
        <View style={styles.headerBtn}>
          <Text style={styles.following}>Following </Text>
          <Text style={{ fontWeight: "600", color: "#fff", fontSize: 20 }}>
            For You
          </Text>
        </View>
        <AntDesign name="search1" size={24} color="#fff" />
      </View>
      <Animated.FlatList
        contentContainerStyle={{
          paddingLeft: width / 7,
          paddingRight: width / 7,
          paddingTop: 100,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        data={data}
        horizontal
        snapToAlignment="center"
        pagingEnabled
        decelerationRate={"fast"}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const scale = scrollX.interpolate({
            inputRange: [
              (index - 1) * ITEM_WIDTH + 12,
              index * ITEM_WIDTH,
              (index + 1) * ITEM_WIDTH + 12,
            ],
            outputRange: [0.9, 1.04, 0.9],
          });
          return (
            <Animated.View
              key={index}
              style={[styles.itemContainer, { transform: [{ scale }] }]}
            >
              <TouchableOpacity style={styles.touchableBtn}>
                <AntDesign name="close" size={18} color="#ddd" />
              </TouchableOpacity>
              <Image
                source={item.image}
                style={{
                  width: 130,
                  height: 130,
                  borderRadius: 100,
                  marginBottom: 10,
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  color: "#fff",
                  fontFamily: "Montserrat-Bold",
                }}
              >
                {item.username}
              </Text>
              {item?.followed?.length > 0 ? (
                <View style={styles.followerList}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {item?.followed?.length > 0
                      ? item?.followed?.map((item, index) => (
                          <Image
                            source={item.url}
                            style={[
                              styles.smallImage,
                              { marginLeft: index * 20 },
                            ]}
                          />
                        ))
                      : null}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      flexWrap: "wrap",
                      marginLeft: item?.followed?.length > 2 ? 76 : 54,
                    }}
                  >
                    {item?.followed?.map((item, index) => (
                      <Text style={styles.name} numberOfLines={2}>
                        {index === 0
                          ? "Followed by " + item?.username + ", "
                          : item.username + ", "}
                      </Text>
                    ))}
                  </View>
                </View>
              ) : (
                <Text
                  style={{ fontFamily: "Montserrat-Medium", color: "#eee" }}
                >
                  {item.subtitle}
                </Text>
              )}
              <View style={styles.imagesBar}>
                {item?.images?.map((item, index) => (
                  <View key={index} style={{ width: "33%", height: 100 }}>
                    <Image
                      source={item}
                      style={{
                        flex: 1,
                        borderRadius: 4,
                        width: "100%",
                      }}
                    />
                    <View
                      style={{
                        position: "absolute",
                        bottom: 6,
                        left: 4,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <AntDesign name={"play"} color="#fff" />
                      <Text
                        style={{
                          fontFamily: "Montserrat-Regular",
                          color: "#fff",
                          marginLeft: 2,
                        }}
                      >
                        {randomNumber}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </Animated.View>
          );
        }}
      />
      <View style={styles.btns}>
        <TouchableOpacity style={[styles.touchableBtns, { width: "55%" }]}>
          <Text style={styles.interested}>Not Interested</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.touchableBtns, { backgroundColor: "red" }]}
        >
          <Text style={styles.follow}>Follow</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    width: "80%",
    justifyContent: "space-between",
  },
  itemContainerFull: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: RADIUS,
    backgroundColor: "#eeeeee30",
    paddingHorizontal: 14,
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING,
    marginLeft: SPACING,
  },
  touchableBtn: {
    width: 35,
    height: 35,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 14,
    top: 14,
  },
  touchableBtns: {
    borderRadius: 10,
    backgroundColor: "#eeeeee20",
    width: "42%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  smallImage: {
    width: 30,
    height: 30,
    borderRadius: 30,
    position: "absolute",
    borderWidth: 1.2,
    borderColor: "#eee",
  },
  followerList: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 5,
  },
  name: {
    color: "#eee",
    fontSize: 13,
    fontFamily: "Montserrat-Medium",
  },
  imagesBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
    width: "100%",
    justifyContent: "space-between",
  },
  btns: {
    flexDirection: "row",
    alignItems: "center",
    width: "75%",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 120,
  },
  follow: {
    fontFamily: "Montserrat-Bold",
    color: "#fff",
    fontSize: 18,
  },
  interested: {
    fontFamily: "Montserrat-Bold",
    color: "#fff",
    fontSize: 18,
  },
  headerBtn: {
    flexDirection: "row",
    alignItems: "center",
    width: "60%",
    justifyContent: "space-between",
    marginLeft: 20,
  },
  following: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 20,
  },
});
