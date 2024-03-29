import React from "react";
import { View, StyleSheet } from "react-native";

import { SubHeaderText } from "../ui/AppText";
import AppColors from "../../utils/AppColors";

/**
 * Currently only displays one player (current user).
 * Intended to be used to display all users attached
 * to a given game once friends features added.
 */
const GamePlayerList = (props) => {
  const { players } = props;
  return (
    <View style={styles.list}>
      <SubHeaderText
        style={styles.header}
        color={AppColors.white}
        size={21}
        centered
      >
        Player List
      </SubHeaderText>
      <View style={styles.listHeader}>
        {players.map((player) => {
          return (
            <SubHeaderText centered key={player.id}>
              {player.first_name} {player.last_name}
            </SubHeaderText>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    alignItems: "center",
    backgroundColor: AppColors.white,
    borderRadius: 15,
    overflow: "hidden",
  },
  header: {
    width: "100%",
    padding: 10,
    color: AppColors.black,
    backgroundColor: AppColors.primary,
    borderBottomWidth: 2,
    borderBottomColor: AppColors.accent,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "center",
    width: "90%",
    paddingVertical: 10,
    borderBottomColor: AppColors.darkGrey,
    borderBottomWidth: 1,
  },
});

export default GamePlayerList;
