import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import GameCourseItem from "../../components/courses/GameCourseItem";
import GamePlayerList from "../../components/games/GamePlayerList";

import * as gameActions from "../../store/actions/gameActions";

import AppColors from "../../utils/AppColors";

const GameSetupScreen = (props) => {
  const dispatch = useDispatch();
  const selectedCourse = useSelector((state) => state.game.course);
  const userProfile = useSelector((state) => state.auth.profile.user);

  const handleStartGame = () => {
    if (!selectedCourse) {
      Alert.alert("No Course Selected", "Please select a course.", [
        { text: "Okay" },
      ]);
      return;
    }
    props.navigation.navigate("GameLaunch", { players: [userProfile.id] }); //Currently one user, can add others for game on API
  };

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.containerRow}>
          <GameCourseItem
            course={selectedCourse}
            onCoursePress={() => props.navigation.navigate("GameCourseSelect")}
          />
        </View>
        <View style={styles.playerRow}>
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
