import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Alert, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as Location from "expo-location";
import * as gameActions from "../../../store/actions/gameActions";

import DiscItem, { EmptyDiscItem } from "../../discs/DiscItem";
import StrokeMenu from "./StrokeMenu";
import StrokeMenuToggleButton from "./StrokeMenuToggleButton";
import InfoBar from "./InfoBar";
import Toggle from "../../ui/Toggle";

import getHaversineDistance from "../../../utils/getHaversineDist";

import AppColors from "../../../utils/AppColors";

const menuHeight = Dimensions.get("screen").height > 800 ? 200 : 150;

const GameActionMenu = (props) => {
  const dispatch = useDispatch();
  const {
    holeData,
    setIsHoleEndModalOpen,
    currentStrokes,
    courseZip,
    weather,
    navigation,
  } = props;

  const equippedDisc = useSelector((state) => state.game.equippedDisc);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isStrokeMenuOpen, setIsStrokeMenuOpen] = useState(false);

  const [location, setLocation] = useState();
  const [isHole, setIsHole] = useState(false);
  const [isBackHandThrow, setIsBackHandThrow] = useState(true);
  const [isPenalty, setIsPenalty] = useState(false);

  const getDistance = useCallback(() => {
    if (!location) {
      return 0;
    }
    if (currentStrokes.length === 0) {
      return getHaversineDistance(holeData.tee_box, location);
    }
    const prevStroke = currentStrokes[currentStrokes.length - 1];
    const prevPosition = { lat: prevStroke.lat, lng: prevStroke.lng };
    return getHaversineDistance(prevPosition, location);
  }, [location, currentStrokes, holeData, getHaversineDistance]);

  const verifyPermissions = async () => {
    const result = await Location.requestForegroundPermissionsAsync();
    const bgResult = await Location.requestBackgroundPermissionsAsync();

    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant location permissions to use this app",
        [{ text: "Okay" }]
      );
      return false;
    }

    return true;
  };

  const handleGetLocation = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsLoading(true);
      await navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          console.log("ERROR(" + err.code + "): " + err.message);
          return null;
        },
        { maximumAge: 0, timeout: 5000, enableHighAccuracy: true }
      );
    } catch (error) {
      Alert.alert(
        "Could Not Fetch Location",
        "Please try again later or pick a location on the map",
        [{ text: "Okay" }]
      );
    }
    setIsLoading(false);
  };

  const handleStrokeRecord = async (type) => {
    if (!equippedDisc) {
      Alert.alert(
        "No Disc Selected!",
        "Please select a disc before marking your location.",
        [{ text: "Okay" }]
      );
      return;
    }
    if (type === "STROKE") {
      await handleGetLocation();
    } else if (type === "PENALTY") {
      setIsPenalty(true);
      await handleGetLocation();
    } else if (type === "HOLE") {
      setIsHole(true);
      setLocation(holeData.basket);
      setIsHoleEndModalOpen(true);
    }
    setIsStrokeMenuOpen(false);
  };

  useEffect(() => {
    if (!weather) {
      dispatch(gameActions.fetchWeather(courseZip));
    }
  }, []);

  useEffect(() => {
    if (!location) {
      return;
    }
    const distance = getDistance();
    const equippedThrow = isBackHandThrow ? "backhand" : "forehand";
    const type = isHole ? "hole" : isPenalty ? "penalty" : "stroke";

    const stroke = {
      type: type,
      lat: location.lat,
      lng: location.lng,
      dist: distance,
      isHole: isHole,
      disc: equippedDisc.id, // Use the userDisc id, not disc id
      throw: equippedThrow,
      time: new Date(),
    };

    dispatch(gameActions.addStroke(stroke));
    setIsPenalty(false);
    setIsHole(false);
    setLocation();
  }, [location]);

  return (
    <View
      style={{
        ...styles.screen,
        height: isStrokeMenuOpen ? menuHeight * 2 : menuHeight,
      }}
    >
      <View style={styles.container}>
        <View style={styles.gameHud}>
          <InfoBar currentStrokes={currentStrokes} weather={weather} />
          <View style={styles.strokeMenu}>
            <StrokeMenuToggleButton
              isStrokeMenuOpen={isStrokeMenuOpen}
              setIsStrokeMenuOpen={setIsStrokeMenuOpen}
              isLoading={isLoading}
            />
            <Toggle
              labelLeft={"FH"}
              labelRight={"BH"}
              labelColor={AppColors.white}
              trackColor={{ false: AppColors.grey, true: AppColors.grey }}
              thumbColor={AppColors.accent}
              onValueChange={() => setIsBackHandThrow(!isBackHandThrow)}
              value={isBackHandThrow}
            />
          </View>
          <View style={styles.discMenu}>
            <DiscSelector navigation={navigation} equippedDisc={equippedDisc} />
          </View>
        </View>
      </View>
      <StrokeMenu
        isStrokeMenuOpen={isStrokeMenuOpen}
        handleStrokeRecord={handleStrokeRecord}
      />
    </View>
  );
};

const DiscSelector = (props) => {
  const { navigation, equippedDisc } = props;

  const handleDiscMenuPress = () => {
    navigation.navigate("GameDiscSelect");
  };

  if (!equippedDisc) {
    return (
      <View style={styles.discContainer}>
        <EmptyDiscItem
          discData={{}}
          style={styles.discDisplay}
          onPress={handleDiscMenuPress}
        />
      </View>
    );
  }

  return (
    <View style={styles.discContainer}>
      <DiscItem
        discData={equippedDisc}
        style={styles.discDisplay}
        onPress={handleDiscMenuPress}
      />
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
    paddingHorizontal: 5,
    backgroundColor: AppColors.blackTrans,
    height: menuHeight,
  },
  strokeMenu: {
    alignContent: "center",
    justifyContent: "space-between",
    width: "20%",
    paddingBottom: "10%",
  },
  discMenu: {
    alignContent: "center",
    justifyContent: "center",
    width: "40%",
    padding: 2,
  },
  discContainer: {
    height: "80%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  discDisplay: {
    height: "100%",
    aspectRatio: 1,
    maxWidth: "95%",
  },
});

export default GameActionMenu;
