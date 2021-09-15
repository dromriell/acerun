import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { HeaderText } from "../../components/ui/AppText";

import { Ionicons } from "@expo/vector-icons";

import GameMap from "../../components/games/GameMap";
import AppColors from "../../utils/AppColors";

const GameScreen = (props) => {
  const courseData = useSelector((state) => state.game.courseData);
  const [currentHoleIndex, setCurrentHoleIndex] = useState(0);

  useEffect(() => {
    console.log(courseData);
  }, []);

  return (
    <View style={styles.mapContainer}>
      <GameMap holeData={courseData.holes[currentHoleIndex]} />
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "",
    headerLeft: () => null,
    headerRight: () => {
      <Ionicons name="menu" size={24} color={AppColors.accent} />;
    },
  };
};

const styles = StyleSheet.create({
  mapContainer: {
    width: "100%",
    height: "100%",
  },
});

export default GameScreen;
