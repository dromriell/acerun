import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import Constants from "expo-constants";

import EventWidget from "../components/events/EventWidget";
import GameHistoryWidget from "../components/games/GameHistoryWidget";
import { HeaderText } from "../components/ui/AppText";
import AppColors from "../utils/AppColors";

const HomeScreen = (props) => {
  const token = useSelector((state) => state.auth.token);
  const profile = useSelector((state) => state.auth.profile);
  const { first_name, username } = profile.user;
  console.log(!first_name ? username : first_name);

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.header}>
          <HeaderText color={AppColors.black} size={24}>
            Hello, {!first_name ? username : first_name}
          </HeaderText>
        </View>
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
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 10,
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
});

export default HomeScreen;
