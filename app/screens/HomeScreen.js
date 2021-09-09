import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";

import EventWidget from "../components/events/EventWidget";

const HomeScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <EventWidget />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
