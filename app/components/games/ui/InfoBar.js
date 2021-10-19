import React from "react";
import { View, StyleSheet } from "react-native";

import { SubHeaderText } from "../../ui/AppText";
import MapCompass from "./MapCompass";
import AppColors from "../../../utils/AppColors";

const InfoBar = (props) => {
  const { currentStrokes, weather } = props;
  return (
    <View style={styles.infoBar}>
      <View style={styles.infoCard}>
        <SubHeaderText color={AppColors.white}>
          Stroke: {currentStrokes.length + 1}
        </SubHeaderText>
      </View>
      <View style={styles.infoCard}>
        <SubHeaderText color={AppColors.white}>
          Dist: {currentStrokes[currentStrokes.length - 1]?.dist || 0} ft
        </SubHeaderText>
      </View>
      <View style={styles.infoCard}>
        <MapCompass degree={weather ? weather.wind.deg : 0} />
        <SubHeaderText color={AppColors.white}>
          {" "}
          {weather ? weather.wind.speed : 0}mph
        </SubHeaderText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoBar: {
    justifyContent: "space-around",
    width: "40%",
  },
  infoCard: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.darkGrey,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 5,
    marginVertical: 1,
  },
});

export default InfoBar;
