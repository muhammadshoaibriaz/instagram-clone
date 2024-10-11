import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import {
  View,
  Animated,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";

const { width, height } = Dimensions.get("screen");
const DATA = new Array(20).fill();
const HEADER_HEIGHT = 250;
const HEADER_FINAL_HEIGHT = HEADER_HEIGHT / 3;
const IMAGE_SIZE = 160;

export default function AnimatedHeader({ navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const height = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [HEADER_HEIGHT, HEADER_FINAL_HEIGHT],
    extrapolate: "clamp",
  });

  const scale = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [1, HEADER_FINAL_HEIGHT / HEADER_HEIGHT],
    extrapolate: "clamp",
  });
  // const translateX = scrollY.interpolate({
  //   inputRange: [0, HEADER_HEIGHT],
  //   outputRange: [0, -300],
  //   extrapolate: "clamp",
  // });
  const translateImageY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -(HEADER_FINAL_HEIGHT - HEADER_HEIGHT) / 2.7],
    extrapolate: "clamp",
  });
  const translateImageX = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -width + IMAGE_SIZE / HEADER_HEIGHT - 30],
    extrapolate: "clamp",
  });
  const translateTextX = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -60],
    extrapolate: "clamp",
  });
  const translateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_FINAL_HEIGHT],
    extrapolate: "clamp",
  });
  return (
    <View style={styles.container}>
      <StatusBar translucent={false} />
      <Animated.View style={[styles.header, { height }]}>
        <Animated.Image
          source={require("../images/img3.jpg")}
          style={{
            width: IMAGE_SIZE,
            height: IMAGE_SIZE,
            borderRadius: 100,
            transform: [
              { scale },
              { translateY: translateImageY },
              { translateX: translateImageX },
            ],
          }}
          resizeMode="contain"
        />
        <Animated.Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 10,
            transform: [{ translateY }, { translateX: translateTextX }],
          }}
        >
          Shoaib
        </Animated.Text>
      </Animated.View>
      <ScrollView
        scrollEventThrottle={16}
        endFillColor="gold"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {DATA.map((item) => (
          <View key={item} style={styles.item}></View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    height: HEADER_HEIGHT,
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "blue",
    marginTop: 10,
    flexDirection: "column",
    paddingHorizontal: 14,
  },
  item: {
    width: 360,
    height: 100,
    marginBottom: 10,
    backgroundColor: "red",
  },
});
