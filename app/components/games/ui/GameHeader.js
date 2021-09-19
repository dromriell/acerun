import React from "react";
import { View, StyleSheet, StatusBar, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import getHaversineDistance from "../../../utils/getHaversineDist";

import AppColors from "../../../utils/AppColors";

import { HeaderText, SubHeaderText, BodyText } from "../../ui/AppText";
import { TouchComp } from "../../ui/TouchComp";

const GameHeader = (props) => {
  const { courseName, holeData } = props;
  const holeDist = getHaversineDistance(holeData.tee_box, holeData.basket);

  return (
    <View style={styles.header}>
      <StatusBar barStyle={AppColors.white} />
      <View style={styles.titleRow}>
        <HeaderText capitalize color={AppColors.grey} size={24}>
          {courseName}
        </HeaderText>
        <TouchComp onPress={() => props.navigation.toggleDrawer()}>
          <Ionicons name="menu" color={AppColors.accent} size={32} />
        </TouchComp>
      </View>
      <View style={styles.holeInfoRow}>
        <SubHeaderText
          style={styles.holeInfoText}
          color={AppColors.white}
          size={24}
        >
          Hole {holeData.hole_number}
        </SubHeaderText>
        <BodyText style={styles.holeInfoText} color={AppColors.white} size={18}>
          Par {holeData.par}
        </BodyText>
        <BodyText style={styles.holeInfoText} color={AppColors.white} size={18}>
          {holeDist} ft
        </BodyText>
      </View>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    width: "100%",
    height: 80,
    zIndex: 100,
    backgroundColor: AppColors.blackTrans,
    padding: 10,
  },
  holeInfoText: {
    marginRight: 20,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
  },
  holeInfoRow: {
    color: AppColors.white,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    width: "75%",
  },
});

export default GameHeader;
