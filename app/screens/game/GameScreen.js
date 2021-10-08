import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import * as Location from "expo-location";

import GameMap from "../../components/games/GameMap";
import GameHeader from "../../components/games/ui/GameHeader";
import GameActionMenu from "../../components/games/ui/GameActionMenu";
import HoleEndModal from "../../components/games/ui/HoleEndModal";
import GameScorecardModal from "../../components/games/GameScorecardModal";

import AppColors from "../../utils/AppColors";

const GameScreen = (props) => {
  /**
   * Main screen to display all game related actions and user interactions.
   **/

  const { navigation } = props;
  const [isHoleEndModalOpen, setIsHoleEndModalOpen] = useState(false);
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [geoLocationWatch, setGeoLocationWatch] = useState(null);

  const token = useSelector((state) => state.auth.token);
  const game = useSelector((state) => state.game.game);
  const courseData = useSelector((state) => state.game.courseData);
  const currentHoleIndex = useSelector((state) => state.game.currentHoleIndex);
  const userScorecard = useSelector((state) => state.game.scorecard);
  const currentStrokes = useSelector((state) => state.game.currentStrokes);
  const weather = useSelector((state) => state.game.weather);

  useEffect(() => {
    // Set watchPosition in order to track user movement during game
    // and increase stroke getLocation accuracy.

    Location.installWebGeolocationPolyfill();
    const asyncSetWatch = async () => {
      const geoLocWatch = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          distanceInterval: 5,
        },
        (position) => {} // Nothing is done with location data collected here
      );
      setGeoLocationWatch(geoLocWatch);
    };
    if (!geoLocationWatch) {
      asyncSetWatch();
    }
  }, []);

  useEffect(() => {
    // Event listener to remove watchPosition when user leaves the screen.
    const clearWatch = navigation.addListener("beforeRemove", async () => {
      await geoLocationWatch.remove();
      setGeoLocationWatch(null);
    });
    return clearWatch;
  }, [navigation, geoLocationWatch]);

  if (!courseData) {
    // Loading display
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={AppColors.accent} />
      </View>
    );
  }

  const holeData = courseData?.holes[currentHoleIndex]; // Assign after courseData is retrieved

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
            token={token}
            gameID={game.id}
            isGameEnd={true}
            setIsGameEnd={setIsGameEnd}
            navigation={navigation}
            userScorecard={userScorecard}
          />
        </View>
      )}
      <GameHeader
        navigation={navigation}
        courseName={courseData.name}
        holeData={holeData}
      />
      <GameActionMenu
        holeData={holeData}
        courseZip={courseData.zip_code}
        currentHoleIndex={currentHoleIndex}
        setIsHoleEndModalOpen={setIsHoleEndModalOpen}
        currentStrokes={currentStrokes}
        weather={weather}
        navigation={navigation}
      />
      <GameMap holeData={holeData} currentStrokes={currentStrokes} />
    </View>
  );
};

export const screenOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  loadingContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
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
