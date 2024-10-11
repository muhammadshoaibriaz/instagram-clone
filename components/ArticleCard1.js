import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
} from "react-native";
import React from "react";
import { Image } from "react-native";
import {
  BookmarkIcon,
  EllipsisVerticalIcon,
} from "react-native-heroicons/outline";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/action/action";

export default function ArticleCard1({ onPress, item }) {
  console.log("item details are", item);
  const dispatch = useDispatch();
  const addItems = (item) => {
    dispatch(addItem(item));
  };
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={{ position: "relative", flex: 0.3 }}>
          <Image
            source={{ uri: item?.urlToImage }}
            style={styles.blogImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={() => {
              addItems(item);
              ToastAndroid.show("Bookmark added successfully", 2000);
            }}
            style={styles.iconBtn}
          >
            <BookmarkIcon size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: 12, flex: 0.7 }}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: "MontserratSemiBold",
              opacity: 0.3,
            }}
          >
            {item?.source?.name}
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontFamily: "MontserratSemiBold",
              marginTop: 4,
            }}
            numberOfLines={2}
          >
            {item?.content}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: item?.image,
                }}
                style={{ width: 24, height: 24, borderRadius: 40 }}
              />
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 12,
                  marginLeft: 5,
                  fontFamily: "MontserratMedium",
                  opacity: 0.4,
                }}
              >
                {!item?.author ? "unknown" : item?.author} ·{" "}
                {item?.publishedAt?.slice(0, 10)}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                width: 28,
                height: 28,
                borderRadius: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EllipsisVerticalIcon size={16} color="#777" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  blogImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  card: {
    flex: 1,
    height: "auto",
    flexDirection: "row",
    borderRadius: 20,
    position: "relative",
    backgroundColor: "#fff",
    marginBottom: 10,
    alignItems: "center",
  },
  iconBtn: {
    width: 28,
    height: 28,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 0,
    top: 2,
  },
});
