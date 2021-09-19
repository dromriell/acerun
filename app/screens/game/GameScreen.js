import React, { useState, useEffect, useLayoutEffect, Button } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { HeaderText } from "../../components/ui/AppText";

import { Ionicons } from "@expo/vector-icons";

import GameMap from "../../components/games/GameMap";
import GameHeader from "../../components/games/ui/GameHeader";
import GameActionMenu from "../../components/games/ui/GameActionMenu";
import StrokeMenu from "../../components/games/ui/StrokeMenu";

import AppColors from "../../utils/AppColors";

const GameScreen = (props) => {
  const courseData = useSelector((state) => state.game.courseData);
  const currentHoleIndex = useSelector((state) => state.game.currentHoleIndex);

  const holeData = courseData.holes[currentHoleIndex];

  return (
    <View style={styles.mapContainer}>
      <GameHeader
        navigation={props.navigation}
        courseName={courseData.name}
        holeData={holeData}
      />
      <GameActionMenu holeData={holeData} currentHoleIndex={currentHoleIndex} />
      <GameMap holeData={holeData} />
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  mapContainer: {
    width: "100%",
    height: "100%",
  },
});

export default GameScreen;
