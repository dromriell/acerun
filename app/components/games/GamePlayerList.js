import React from "react";
import { View, StyleSheet } from "react-native";

import { SubHeaderText, BodyText } from "../ui/AppText";
import AppColors from "../../utils/AppColors";

const dummyPlayerData = [
  {
    username: "admin",
  },
];

const GamePlayerList = (props) => {
  return (
    <View style={styles.list}>
      <SubHeaderText style={styles.header}>Player List</SubHeaderText>
      <View style={styles.listHeader}>
        <SubHeaderText>Player</SubHeaderText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
    padding: 10,
  },
  header: {
    padding: 10,
    color: AppColors.black,
  },
  listHeader: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomColor: AppColors.darkGrey,
    borderBottomWidth: 1,
  },
});

export default GamePlayerList;
