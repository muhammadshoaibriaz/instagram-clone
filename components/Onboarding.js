import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React, { PureComponent, useRef } from "react";
import { Animated, Dimensions, TouchableOpacity } from "react-native";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("screen");

const Indicator = ({ scrollX, data }) => {
  return (
    <View style={styles.pagination}>
      {data.map((item, index) => {
        const scale = scrollX.interpolate({
          inputRange: [(index - 1) * width, index * width, (index + 1) * width],
          outputRange: [1, 3, 1],
          extrapolate: "clamp",
        });
        const backgroundColor = scrollX.interpolate({
          inputRange: [(index - 1) * width, index * width, (index + 1) * width],
          outputRange: ["#ddd", "#a1614b", "#ddd"],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              { transform: [{ scaleX: scale }], backgroundColor },
            ]}
          ></Animated.View>
        );
      })}
    </View>
  );
};

export default function Onboarding() {
  // const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const DATA = [
    {
      img: require("../assets/images/onboarding1.png"),
      title: "Read interesting articles every single day!",
      description:
        "Lorem ipsum dollar sit amit consectur adipsing elit, sed do euismod tempor.",
    },
    {
      img: require("../assets/images/onboarding4.png"),
      title: "Create and publish your own article to the world!",
      description:
        "Lorem ipsum dollar sit amit consectur adipsing elit, sed do euismod tempor.",
    },
    {
      img: require("../assets/images/onboarding5.png"),
      title: "Let's connect with others right now!",
      description:
        "Lorem ipsum dollar sit amit consectur adipsing elit, sed do euismod tempor.",
    },
  ];

  const [loaded] = useFonts({
    Montserrat: require("../assets/fonts/Montserrat-Medium.ttf"),
    Montserrat1: require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        data={DATA}
        horizontal
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <Animated.View style={[styles.itemCard]}>
              <Image source={item.img} style={styles.image} />
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 22,
                    fontFamily: "Montserrat1",
                    marginTop: 20,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 17,
                    fontFamily: "Montserrat",
                    marginTop: 30,
                  }}
                >
                  {item.description}
                </Text>
              </View>
            </Animated.View>
          );
        }}
      />
      {
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            justifyContent: "space-between",
            position: "absolute",
            width: "100%",
            bottom: 40,
          }}
        >
          <TouchableOpacity
            style={[styles.finishBtn, { backgroundColor: "#eee" }]}
            // onPress={() => navigation.navigate("HomeStack")}
          >
            <Text style={[styles.text, { color: "#a1614b" }]}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.finishBtn}>
            <Text style={styles.text}>Finish</Text>
          </TouchableOpacity>
        </View>
      }
      <Indicator data={DATA} scrollX={scrollX} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginTop: 70,
  },
  itemCard: {
    width,
    height,
    alignItems: "center",
    paddingHorizontal: 14,
  },
  pagination: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 20,
    bottom: 120,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    marginLeft: 16,
    backgroundColor: "#ddd",
  },
  finishBtn: {
    width: "47%",
    height: 50,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a1614b",
  },
  text: {
    color: "#fff",
    fontFamily: "Montserrat1",
  },
});
