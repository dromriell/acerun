import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Switch,
  Dimensions,
  Animated,
  Button,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import DiscItem, { EmptyDiscItem } from "../../discs/DiscItem";

import AppColors from "../../../utils/AppColors";

import { HeaderText, SubHeaderText, BodyText } from "../../ui/AppText";
import { TouchComp } from "../../ui/TouchComp";

const GameActionMenu = (props) => {
  const { onStrokeMenuPress } = props;
  const [isBackHandThrow, setIsBackHandThrow] = useState(true);
  const actionMenuHeight = Dimensions.get("screen").height;

  // console.log(yScaleAnim);

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.gameHud}>
          <View style={styles.infoBar}>
            <View style={styles.infoCard}>
              <SubHeaderText>Stroke: 1</SubHeaderText>
            </View>
            <View style={styles.infoCard}>
              <SubHeaderText>Dist: 500ft</SubHeaderText>
            </View>
            <View style={styles.infoCard}>
              <SubHeaderText>COMP 13mph</SubHeaderText>
            </View>
          </View>
          <View style={styles.strokeMenu}>
            <View style={styles.strokeButtonContainer}>
              <TouchComp onPress={onStrokeMenuPress}>
                <Ionicons
                  name="add-circle-sharp"
                  color={AppColors.accent}
                  style={styles.strokeButton}
                  size={55}
                />
              </TouchComp>
            </View>
          </View>
          <View style={styles.discMenu}>
            <View style={styles.toggleContainer}>
              <BodyText color={AppColors.white}>FH</BodyText>
              <View style={styles.toggle}>
                <Switch
                  trackColor={{ false: AppColors.grey, true: AppColors.grey }}
                  thumbColor={AppColors.accent}
                  onValueChange={() => setIsBackHandThrow(!isBackHandThrow)}
                  value={isBackHandThrow}
                />
              </View>
              <BodyText color={AppColors.white}>BH</BodyText>
            </View>
            <EmptyDiscItem discData={{}} style={styles.discDisplay} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    zIndex: 100,
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 150,
    minHeight: 100,
  },
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  gameHud: {
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: AppColors.blackTrans,
  },

  infoBar: {
    justifyContent: "space-around",
    width: "40%",
  },
  infoCard: {
    alignItems: "center",
    backgroundColor: AppColors.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 5,
  },
  strokeMenu: {
    width: "20%",
    position: "relative",
    alignItems: "center",
  },
  strokeButtonContainer: {
    position: "absolute",
    flexDirection: "row",
    width: 50,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  strokeButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  discMenu: {
    alignContent: "center",
    justifyContent: "space-around",
    width: "40%",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "20%",
  },
  toggle: {
    alignItems: "center",
    justifyContent: "center",
  },
  discDisplay: {
    height: "70%",
  },
});

export default GameActionMenu;
