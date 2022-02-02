import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  StatusBar,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import EventWidget from "../components/events/EventWidget";
import GameHistoryWidget from "../components/games/GameHistoryWidget";
import { HeaderText } from "../components/ui/AppText";
import AppColors from "../utils/AppColors";

const HomeScreen = (props) => {
  const token = useSelector((state) => state.auth.token);
  const profile = useSelector((state) => state.auth.profile);
  const { first_name, username } = profile.user;

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={AppColors.primary} />
      <ImageBackground
        source={require("../assets/images/disc-golf-002.png")}
        style={styles.backgroundImage}
      >
        <LinearGradient
          // Background Linear Gradient
          colors={[AppColors.black, AppColors.black, AppColors.primary]}
          style={styles.background}
          start={{ x: 0.1, y: 0.1 }}
        />
      </ImageBackground>
      <View style={styles.header}>
        <HeaderText color={AppColors.white} size={24}>
          Hello,{" "}
        </HeaderText>
        <HeaderText color={AppColors.accent} size={24}>
          {!first_name ? username : first_name}
        </HeaderText>
      </View>
      <ScrollView style={{ width: "95%" }}>
        <View style={styles.container}>
          <EventWidget token={token} />
        </View>
        <View style={styles.container}>
          <GameHistoryWidget token={token} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: AppColors.darkGrey,
  },
  backgroundImage: {
    position: "absolute",
    height: "100%",
    width: "100%",
    flex: 1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    opacity: 0.7,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    paddingTop: Platform.OS === "android" ? 10 : 20,
    backgroundColor: AppColors.primary,
    elevation: 5,
    borderBottomRightRadius: 30,
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
  },
});

export default HomeScreen;
