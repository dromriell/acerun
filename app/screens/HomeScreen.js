import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import Constants from "expo-constants";

import EventWidget from "../components/events/EventWidget";
import GameHistoryWidget from "../components/games/GameHistoryWidget";

const HomeScreen = (props) => {
  const token = useSelector((state) => state.auth.token);

  return (
    <View style={styles.screen}>
      <ScrollView>
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
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
});

export default HomeScreen;
