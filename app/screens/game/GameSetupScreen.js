import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import GameCourseItem from "../../components/games/GameCourseItem";
import GamePlayerList from "../../components/games/GamePlayerList";

import * as gameActions from "../../store/actions/gameActions";

import AppColors from "../../utils/AppColors";

const GameSetupScreen = (props) => {
  const dispatch = useDispatch();
  const selectedCourse = useSelector((state) => state.game.course);
  const userID = useSelector((state) => state.auth.profile.user);

  const handleStartGame = () => {
    if (!selectedCourse) {
      Alert.alert("No Course Selected", "Please select a course.", [
        { text: "Okay" },
      ]);
      return;
    }
    props.navigation.navigate("GameLaunch", { players: [userID] }); //Currently one user, can add others for game on API
  };

  return (
    <View style={styles.screen}>
      <View style={styles.containerRow}>
        <GameCourseItem
          course={selectedCourse}
          onCoursePress={() => props.navigation.navigate("GameCourseSelect")}
        />
      </View>
      <View style={styles.containerRow}>
        <GamePlayerList />
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
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  containerRow: {
    width: "100%",
    height: "35%",
  },
  card: {
    height: "100%",
    margin: 10,
    borderRadius: 5,
  },

  playerList: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    width: 125,
    borderRadius: 5,
    elevation: 5,
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitleAlign: "center",
    headerTitle: "New Game Setup",
    headerLeft: () => null,
  };
};

export default GameSetupScreen;
