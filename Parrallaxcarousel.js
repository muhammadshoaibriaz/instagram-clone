import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
const { width, height } = Dimensions.get("screen");
const IMAGES = [
  { img: require("./images/img1.jpg") },
  { img: require("./images/img3.jpg") },
  { img: require("./images/bird10.jpg") },
  { img: require("./images/img23.jpg") },
  { img: require("./images/cat1.jpg") },
  { img: require("./images/cat5.jpg") },
  { img: require("./images/img25.jpg") },
  { img: require("./images/img23.jpg") },
];

const ITEM_WIDTH = width * 0.75;
const ITEM_HEIGHT = ITEM_WIDTH * 1.45;

export default function ParallaxCarousel({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <FlatList
        data={IMAGES}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={64}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * 0.3, 0, width * 0.3],
          });
          return (
            <View
              style={{
                width,
                height,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Animated.View
                style={{
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                  overflow: "hidden",
                  borderRadius: 18,
                  backgroundColor: "#fff",
                  elevation: 10,
                  borderWidth: 16,
                  borderColor: "#fff",
                  position: "relative",
                }}
              >
                <Animated.Image
                  source={item.img}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 16,
                    transform: [{ translateX }],
                  }}
                  resizeMode="cover"
                />
              </Animated.View>
              <Animated.Image
                source={require("./images/img3.jpg")}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                  position: "absolute",
                  bottom: ITEM_HEIGHT / 2.2,
                  right: 90,
                  borderWidth: 4,
                  borderColor: "#f8f8f8",
                }}
                resizeMode="contain"
              />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
