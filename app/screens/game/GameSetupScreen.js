import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import GameCourseItem from "../../components/courses/GameCourseItem";
import GamePlayerList from "../../components/games/GamePlayerList";

import * as gameActions from "../../store/actions/gameActions";

import UpdateBadge from "../../components/ui/UpdateBadge";
import AppColors from "../../utils/AppColors";

const GameSetupScreen = (props) => {
  const dispatch = useDispatch();
  const errorCreating = props.route.params
    ? props.route.params.errorCreating
    : null;
  const [courseUnavailable, setCourseUnavailable] = useState(errorCreating);
  const selectedCourse = useSelector((state) => state.game.course);
  const userProfile = useSelector((state) => state.auth.profile.user);

  //Currently one user, can add others for game on API
  const players = [userProfile];

  const handleStartGame = () => {
    if (!selectedCourse) {
      Alert.alert("No Course Selected", "Please select a course.", [
        { text: "Okay" },
      ]);
      return;
    }
    props.navigation.navigate("GameLaunch", {
      players: players.map((player) => player.id),
    });
  };

  useEffect(() => {
    if (!errorCreating) {
      return;
    }
    setCourseUnavailable(true);
    const badgeTimeout = setTimeout(() => {
      props.route.params.errorCreating = null;
      setCourseUnavailable(false);
    }, 5000);
    return () => clearTimeout(badgeTimeout);
  }, [errorCreating]);

  return (
    <View style={styles.screen}>
      {courseUnavailable && (
        <UpdateBadge
          message="Course Currently Unavailable"
          style={{ width: "100%" }}
        />
      )}
      <ScrollView>
        <View style={styles.containerRow}>
          <GameCourseItem
            course={selectedCourse}
            onCoursePress={() => props.navigation.navigate("GameCourseSelect")}
          />
        </View>
        <View style={styles.playerRow}>
          <GamePlayerList players={players} />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Cancel"
              onPress={() => {
                props.navigation.goBack();
                dispatch(gameActions.clearGameCourse());
              }}
              color={AppColors.red}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Start Game"
              onPress={handleStartGame}
              style={styles.button}
              color={AppColors.primary}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    presentation: "transparentModal",
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: "100%",
    backgroundColor: AppColors.blackTrans,
    paddingTop: Platform.OS === "android" ? 0 : 25,
  },
  containerRow: {
    width: "90%",
    minHeight: 250,
    marginVertical: 10,
    alignSelf: "center",
  },
  playerRow: {
    width: "90%",
    marginVertical: 10,
    alignSelf: "center",
  },
  playerList: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.white,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    justifyContent: "space-around",
    marginVertical: 10,
  },
  button: {
    width: 125,
    borderRadius: 5,
    elevation: 5,
  },
});

export default GameSetupScreen;
