import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { IP_ADDRESS } from "../../db/IP";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { Snackbar } from "react-native-paper";
import { useAuth } from "../../AuthContext";
export default function Article({ route }) {
  const { params } = route;
  // console.log("params data is ", params);
  const [user_id, setUserId] = useState(2);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);
  // const { user } = useAuth();
  // console.log("user data is ", user);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    setImage(result.assets[0].uri);
  };

  const writePost = async () => {
    const data = {
      image,
      content,
      user_id,
    };
    try {
      if (params?.token) {
        const results = await axios.post(`${IP_ADDRESS}/api/post`, data);
        setVisible(true);
        console.log(results);
      }
    } catch (error) {
      alert("UnAuthorized user!");
      console.log("Error while creating post ", error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
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
            Article
          </Text>
        </View>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.navigate("Search")}
        >
          <MagnifyingGlassIcon size={20} color="#777" />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <TouchableOpacity style={styles.pickImage} onPress={pickImage}>
          {!image ? (
            <Ionicons name="image-outline" size={90} style={{ opacity: 0.1 }} />
          ) : (
            <Image
              source={{ uri: image }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="What's on your mind?"
          placeholderTextColor="#777"
          multiline
          onChangeText={(text) => setContent(text)}
        />
        <TouchableOpacity style={styles.postBtn} onPress={writePost}>
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontFamily: "MontserratMedium",
            }}
          >
            Post
          </Text>
        </TouchableOpacity>
      </View>
      <Snackbar
        onDismiss={() => setVisible(false)}
        visible={visible}
        onIconPress={() => setVisible(false)}
      >
        Post uploaded Successfully !
      </Snackbar>
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
  pickImage: {
    width: "80%",
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#999",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  input: {
    minHeight: 45,
    height: "auto",
    width: "85%",
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingLeft: 6,
    fontFamily: "MontserratRegular",
  },
  postBtn: {
    width: "85%",
    height: 45,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a1614b",
    marginTop: 20,
  },
});
