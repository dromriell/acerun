import React, { useState, useEffect, useLayoutEffect, Button } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import * as Location from "expo-location";

import { HeaderText } from "../../components/ui/AppText";
import { Ionicons } from "@expo/vector-icons";

import GameMap from "../../components/games/GameMap";
import GameHeader from "../../components/games/ui/GameHeader";
import GameActionMenu from "../../components/games/ui/GameActionMenu";
import HoleEndModal from "../../components/games/ui/HoleEndModal";
import GameScorecardModal from "../../components/games/GameScorecardModal";

import AppColors from "../../utils/AppColors";

const GameScreen = (props) => {
  const { navigation } = props;
  const [isHoleEndModalOpen, setIsHoleEndModalOpen] = useState(false);
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [geoLocationWatch, setGeoLocationWatch] = useState(null);

  const courseData = useSelector((state) => state.game.courseData);
  const currentHoleIndex = useSelector((state) => state.game.currentHoleIndex);
  const userScorecard = useSelector((state) => state.game.scorecard);

  useEffect(() => {
    // Location.installWebGeolocationPolyfill();
    const asyncSetWatch = async () => {
      const geoLocWatch = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          distanceInterval: 15,
        },
        (position) => {
          console.log(position);
          console.log("WATCH ON");
        }
      );
      // setGeoLocationWatch(
      //   navigator.geolocation.watchPosition(
      //     (position) => {
      //       console.log(position);
      //       console.log("WATCH ON");
      //     },
      //     () => {
      //       console.log("WATCH ERROR");
      //       return null;
      //     },
      //     {
      //       enableHighAccuracy: true,
      //       timeout: 5000,
      //       maximumAge: 0,
      //     }
      //   )
      // );

      setGeoLocationWatch(geoLocWatch);
    };
    if (!geoLocationWatch) {
      asyncSetWatch();
      // setGeoLocationWatch(asyncSetWatch);
    }
  }, []);

  useEffect(() => {
    const clearWatch = navigation.addListener("beforeRemove", async () => {
      await geoLocationWatch.remove();
      setGeoLocationWatch(null);
      // navigator.geolocation.clearWatch(geoLocationWatch);
    });
    return clearSearch;
  }, [navigation, geoLocationWatch]);

  if (!courseData) {
    return (
      <View style={styles.loadingContainer}>
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
        navigation={navigation}
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
