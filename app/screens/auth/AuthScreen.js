import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  ImageBackground,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppColors from "../../utils/AppColors";
import { SubHeaderText } from "../../components/ui/AppText";

const AuthScreen = (props) => {
  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require("../../assets/images/disc-golf-4985907_960_720.jpg")}
        style={styles.backgroundImage}
      >
        <LinearGradient
          // Background Linear Gradient
          colors={[AppColors.blue, AppColors.black, AppColors.green]}
          style={styles.background}
          start={{ x: 1.1, y: 0.9 }}
        />
      </ImageBackground>
      <View style={styles.authCard}>
        <Text>Here</Text>
        <View style={styles.loginForm}>
          <View style={styles.textInputContainer}>
            <SubHeaderText style={styles.label}>Username</SubHeaderText>
            <View style={styles.inputContainer}>
              <Ionicons
                name="person"
                size={24}
                color={AppColors.accent}
                style={styles.inputIcon}
              />
              <TextInput style={styles.textInput} />
            </View>
          </View>
          <View style={styles.textInputContainer}>
            <SubHeaderText style={styles.label}>Password</SubHeaderText>
            <View style={styles.inputContainer}>
              <Ionicons
                name="md-lock-closed"
                size={24}
                color={AppColors.accent}
                style={styles.inputIcon}
              />
              <TextInput style={styles.textInput} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    position: "absolute",
    height: "100%",
    width: "100%",
    flex: 1,
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    opacity: 0.7,
  },
  authCard: {
    alignItems: "center",
    width: "80%",
    height: 300,
    backgroundColor: AppColors.blackTrans,
    borderRadius: 10,
  },
  loginForm: {
    width: "90%",
  },
  textInputContainer: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 35,
    marginVertical: 5,
  },
  label: {
    color: AppColors.white,
  },
  inputIcon: {
    textAlignVertical: "center",
    textAlign: "center",
    width: "10%",
    height: "100%",
    backgroundColor: AppColors.white,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textInput: {
    width: "90%",
    height: "100%",
    backgroundColor: AppColors.white,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default AuthScreen;
