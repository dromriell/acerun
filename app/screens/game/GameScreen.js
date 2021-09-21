import React, { useState, useEffect, useLayoutEffect, Button } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { HeaderText } from "../../components/ui/AppText";

import { Ionicons } from "@expo/vector-icons";

import GameMap from "../../components/games/GameMap";
import GameHeader from "../../components/games/ui/GameHeader";
import GameActionMenu from "../../components/games/ui/GameActionMenu";
import HoleEndModal from "../../components/games/ui/HoleEndModal";
import GameScorecardModal from "../../components/games/GameScorecardModal";

import AppColors from "../../utils/AppColors";

const GameScreen = (props) => {
  const [isHoleEndModalOpen, setIsHoleEndModalOpen] = useState(false);
  const [isGameEnd, setIsGameEnd] = useState(false);
  const courseData = useSelector((state) => state.game.courseData);
  const currentHoleIndex = useSelector((state) => state.game.currentHoleIndex);
  const userScorecard = useSelector((state) => state.game.scorecard);

  if (!courseData) {
    return (
      <View style={styles.mapContainer}>
        <ActivityIndicator size="large" color={AppColors.accent} />
      </View>
    );
  }

  const holeData = courseData.holes[currentHoleIndex];

  return (
    <View style={styles.mapContainer}>
      {isHoleEndModalOpen && (
        <HoleEndModal
          holeData={holeData}
          setIsHoleEndModalOpen={setIsHoleEndModalOpen}
          setIsGameEnd={setIsGameEnd}
        />
      )}
      {isGameEnd && (
        <View style={styles.centeredView}>
          <GameScorecardModal
            isGameEnd={true}
            setIsGameEnd={setIsGameEnd}
            navigation={props.navigation}
            userScorecard={userScorecard}
          />
        </View>
      )}
      <GameHeader
        navigation={props.navigation}
        courseName={courseData.name}
        holeData={holeData}
      />
      <GameActionMenu
        holeData={holeData}
        currentHoleIndex={currentHoleIndex}
        setIsHoleEndModalOpen={setIsHoleEndModalOpen}
      />
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
  centeredView: {
    flex: 1,
    position: "absolute",
    top: 0,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});

export default GameScreen;
