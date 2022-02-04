import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";

import AppColors from "../../utils/AppColors";
import TouchComp from "../ui/TouchComp";
import { SubHeaderText } from "../ui/AppText";

const DiscHomeMenu = (props) => {
  const navigateToScreen = (screenName) =>
    props.navigation.navigate(screenName);

  return (
    <View style={styles.menu}>
      <View style={styles.buttonContainer}>
        <TouchComp useForeground onPress={() => navigateToScreen("UserDiscs")}>
          <View style={styles.button}>
            <Feather name="circle" size={60} color={AppColors.accent} />
            <SubHeaderText style={styles.buttonText}>My Discs</SubHeaderText>
          </View>
        </TouchComp>
      </View>
      <View style={styles.buttonContainer}>
        <TouchComp
          onPress={() => navigateToScreen("DiscComparison")}
          useForeground
        >
          <View style={styles.button}>
            <MaterialIcons name="compare" size={60} color={AppColors.accent} />
            <SubHeaderText style={styles.buttonText}>Compare</SubHeaderText>
          </View>
        </TouchComp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: Dimensions.get("screen").width,
    height: 150,
  },
  buttonContainer: {
    width: 150,
    aspectRatio: 1,
    backgroundColor: AppColors.primary,
    borderRadius: 10,
    elevation: 10,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  buttonText: {
    color: AppColors.white,
  },
});

export default DiscHomeMenu;
