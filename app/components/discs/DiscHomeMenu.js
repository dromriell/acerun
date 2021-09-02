import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";

import { SubHeaderText } from "../ui/AppText";
import AppColors from "../../utils/AppColors";

const DiscHomeMenu = (props) => {
  const TouchComp =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return (
    <View style={styles.menu}>
      <View style={styles.buttonContainer}>
        <TouchComp
          useForeground
          onPress={() => {
            props.navigation.navigate("UserDiscs");
          }}
        >
          <View style={styles.button}>
            <Feather name="circle" size={60} color={AppColors.accent} />
            <SubHeaderText style={styles.buttonText}>My Discs</SubHeaderText>
          </View>
        </TouchComp>
      </View>
      <View style={styles.buttonContainer}>
        <TouchComp onPress={() => console.log("BUTTON")} useForeground>
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
    width: "100%",
  },
  buttonContainer: {
    height: 150,
    width: 150,
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
