import React from "react";
import { View, StyleSheet, ScrollView, Image, StatusBar, Platform } from "react-native";
import { useSelector } from "react-redux";

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
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    paddingTop: Platform.OS === 'android' ? 10 : 20,
    backgroundColor: AppColors.primary,
    elevation: 5,
    borderBottomRightRadius: 30,
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
});

export default HomeScreen;
