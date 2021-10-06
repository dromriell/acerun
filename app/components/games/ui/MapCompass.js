import React from "react";
import { View, StyleSheet } from "react-native";

import { FontAwesome } from "@expo/vector-icons";

import { BodyText } from "../../ui/AppText";
import AppColors from "../../../utils/AppColors";

const MapCompass = (props) => {
  const { degree } = props;
  const zDegree = degree - 45;
  return (
    <View style={styles.compass}>
      <View style={{ ...styles.direction, ...styles.north }}>
        <BodyText size={10} color={AppColors.white}>
          N
        </BodyText>
      </View>
      <View style={{ ...styles.direction, ...styles.south }}>
        <BodyText size={10} color={AppColors.white}>
          S
        </BodyText>
      </View>
      <View style={{ ...styles.direction, ...styles.east }}>
        <BodyText size={10} color={AppColors.white}>
          E
        </BodyText>
      </View>
      <View style={{ ...styles.direction, ...styles.west }}>
        <BodyText size={10} color={AppColors.white}>
          W
        </BodyText>
      </View>
      <View
        style={{
          ...styles.icon,
          transform: [{ rotateZ: `${zDegree}deg` }],
        }}
      >
        <FontAwesome name="location-arrow" size={15} color={AppColors.accent} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  compass: {
    alignItems: "center",
    justifyContent: "center",
    width: 45,
    aspectRatio: 1,
    backgroundColor: AppColors.darkGrey,
    borderRadius: 5,
    padding: 2,
  },
  direction: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  north: {
    alignItems: "center",
  },
  south: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  east: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  west: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  icon: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    transform: [{ rotateZ: "-45deg" }],
  },
});

export default MapCompass;
