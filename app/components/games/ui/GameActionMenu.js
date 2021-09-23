import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Switch,
  Animated,
  Easing,
  Alert,
  ActivityIndicator,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as gameActions from "../../../store/actions/gameActions";

import DiscItem, { EmptyDiscItem } from "../../discs/DiscItem";
import HoleEndModal from "./HoleEndModal";
import StrokeMenu from "./StrokeMenu";
import MapCompass from "./MapCompass";

import getHaversineDistance from "../../../utils/getHaversineDist";

import AppColors from "../../../utils/AppColors";

import { HeaderText, SubHeaderText, BodyText } from "../../ui/AppText";
import { TouchComp } from "../../ui/TouchComp";

const GameActionMenu = (props) => {
  const dispatch = useDispatch();
  const { holeData, currentHoleIndex, setIsHoleEndModalOpen, courseZip } =
    props;
  const scorecard = useSelector((state) => state.game.scorecard);
  const currentStrokes = useSelector((state) => state.game.currentStrokes);
  const weather = useSelector((state) => state.game.weather);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isStrokeMenuOpen, setIsStrokeMenuOpen] = useState(false);

  const [location, setLocation] = useState();
  const [equippedDisc, setEquippedDisc] = useState();
  const [isHole, setIsHole] = useState(false);
  const [isBackHandThrow, setIsBackHandThrow] = useState(true);
  const [isPenalty, setIsPenalty] = useState(false);

  const getDistance = () => {
    if (!location) {
      return 0;
    }
    if (currentStrokes.length === 0) {
      return getHaversineDistance(holeData.tee_box, location);
    }
    const prevStroke = currentStrokes[currentStrokes.length - 1];
    const prevPosition = { lat: prevStroke.lat, lng: prevStroke.lng };
    return getHaversineDistance(prevPosition, location);
  };

  useEffect(() => {
    console.log(weather);
    if (!weather) {
      dispatch(gameActions.fetchWeather(courseZip));
    } else {
      console.log("WEATHER", weather);
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
      disc: 1, // PLACEHOLDER VALUE, CHANGE TO EQUIPPED USERDISC ID
      throw: equippedThrow,
      time: new Date(),
    };

    dispatch(gameActions.addStroke(stroke));
    setIsPenalty(false);
    setLocation();
  }, [location]);

  const verifyPermissions = async () => {
    const result = await Location.requestForegroundPermissionsAsync();
    console.log("LOCRESULT", result);

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
    console.log("HAVE PERMS");
    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: 1,
    });
    try {
      setIsLoading(true);
      setLocation({
        lat: currentLocation.coords.latitude,
        lng: currentLocation.coords.longitude,
      });
      console.log(currentLocation);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Could Not Fetch Location",
        "Please try again later or pick a location on the map",
        [{ text: "Okay" }]
      );
    }
    setIsLoading(false);
  };

  const handleStrokeRecord = async (type) => {
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

  return (
    <View
      style={{
        ...styles.screen,
        height: isStrokeMenuOpen ? 300 : 150,
      }}
    >
      <View style={styles.container}>
        <View style={styles.gameHud}>
          <View style={styles.infoBar}>
            <View style={styles.infoCard}>
              <SubHeaderText>Stroke: {currentStrokes.length + 1}</SubHeaderText>
            </View>
            <View style={styles.infoCard}>
              <SubHeaderText>
                Dist: {currentStrokes[currentStrokes.length - 1]?.dist || 0}ft
              </SubHeaderText>
            </View>
            <View style={styles.infoCard}>
              <MapCompass degree={weather ? weather.wind.deg : 0} />
              <SubHeaderText>
                {" "}
                {weather ? weather.wind.speed : 0}mph
              </SubHeaderText>
            </View>
          </View>
          <StrokeMenuButton
            isStrokeMenuOpen={isStrokeMenuOpen}
            setIsStrokeMenuOpen={setIsStrokeMenuOpen}
          />
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
            <DiscSelector setEquippedDisc={setEquippedDisc} />
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

const StrokeMenuButton = (props) => {
  const { isStrokeMenuOpen, setIsStrokeMenuOpen } = props;
  const firstRender = useRef(true);

  const rotateButtonAnim = useRef(new Animated.Value(0)).current;

  const rotateInterpolate = rotateButtonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "135deg"],
  });

  const rotateToCancelButtonAnimation = Animated.parallel([
    Animated.timing(rotateButtonAnim, {
      toValue: 1,
      duration: 150,
      easing: Easing.bounce,
      useNativeDriver: true,
    }),
  ]);

  const rotateToAddButtonAnimation = Animated.parallel([
    Animated.timing(rotateButtonAnim, {
      toValue: 0,
      duration: 150,
      easing: Easing.bounce,
      useNativeDriver: true,
    }),
  ]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!isStrokeMenuOpen) {
      rotateToAddButtonAnimation.start();
    } else {
      rotateToCancelButtonAnimation.start();
    }
  }, [isStrokeMenuOpen]);

  const handleStrokeMenuToggle = () => {
    setIsStrokeMenuOpen(!isStrokeMenuOpen);
  };

  return (
    <View style={styles.strokeMenu}>
      <Animated.View
        style={{
          ...styles.strokeButtonContainer,
          transform: [{ rotateZ: rotateInterpolate }],
        }}
      >
        <TouchComp onPress={handleStrokeMenuToggle}>
          <Ionicons
            name="add-circle-sharp"
            color={isStrokeMenuOpen ? AppColors.red : AppColors.accent}
            style={styles.strokeButton}
            size={55}
          />
        </TouchComp>
      </Animated.View>
    </View>
  );
};

const DiscSelector = (props) => {
  const { setEquippedDisc } = props;

  return <EmptyDiscItem discData={{}} style={styles.discDisplay} />;
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
    paddingHorizontal: 10,
    backgroundColor: AppColors.blackTrans,
  },

  infoBar: {
    justifyContent: "space-around",
    width: "40%",
  },
  infoCard: {
    flexDirection: "row",
    justifyContent: "center",
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
