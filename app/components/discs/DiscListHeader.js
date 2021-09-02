import React from "react";
import { View, Button, StyleSheet } from "react-native";
import AppColors from "../../utils/AppColors";

import FilterOptionButton from "./FilterOptionButton";

const DiscListHeader = (props) => {
  return (
    <View style={styles.listFilterButtonContainer}>
      <FilterOptionButton
        onPress={() => props.onPress("all")}
        selected={props.selectedFilter === "all"}
        title="All"
      />
      <FilterOptionButton
        onPress={() => props.onPress("dist")}
        selected={props.selectedFilter === "dist"}
        title="Dist"
      />
      <FilterOptionButton
        onPress={() => props.onPress("frwy")}
        selected={props.selectedFilter === "frwy"}
        title="Frwy"
      />
      <FilterOptionButton
        onPress={() => props.onPress("mid")}
        selected={props.selectedFilter === "mid"}
        title="Mid"
      />
      <FilterOptionButton
        onPress={() => props.onPress("putt")}
        selected={props.selectedFilter === "putt"}
        title="Putt"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listFilterButtonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  listFilterButton: {
    width: "20%",
    color: "black",
  },
});

export default DiscListHeader;
