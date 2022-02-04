import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as gameActions from "../../../store/actions/gameActions";

import TouchComp from "../../ui/TouchComp";
import { BodyText, HeaderText, SubHeaderText } from "../../ui/AppText";

import AppColors from "../../../utils/AppColors";

const HoleEndModal = (props) => {
  const dispatch = useDispatch();
  const { holeData, setIsHoleEndModalOpen, setIsGameEnd } = props;
  const { par, id: holeID } = holeData;

  const token = useSelector((state) => state.auth.token);
  const userID = useSelector((state) => state.auth.profile.user.id);
  const currentStrokes = useSelector((state) => state.game.currentStrokes);
  const courseData = useSelector((state) => state.game.courseData);
  const currentHoleIndex = useSelector((state) => state.game.currentHoleIndex);
  const scorecard = useSelector((state) => state.game.scorecard);

  const [isLoading, setIsLoading] = useState(false);
  const score = currentStrokes.length;
  const isEndGame = currentHoleIndex + 1 === courseData.holes.length;

  const longestThrow = currentStrokes
    ? Math.max.apply(
        Math,
        currentStrokes.map((stroke) => stroke.dist)
      )
    : 0;

  const getScoreName = () => {
    switch (score) {
      case par - (par - 1):
        return "Aced!";
      case par - 3:
        return "Double Eagle (-3)";
      case par - 2:
        return "Eagle (-2)";
      case par - 1:
        return "Birdie (-1)";
      case par:
        return "Par";
      case par + 1:
        return "Bogey (+1)";
      case par + 2:
        return "Double bogey (+2)";
      case par + 3:
        return "Triple bogey (+3)";
      default:
        return `+${score}`;
    }
  };

  const handleCourseReset = () => {
    dispatch(gameActions.resetHole());
    setIsHoleEndModalOpen(false);
  };

  const handleHoleEnd = async () => {
    const holeScore = {
      score_card: scorecard.id,
      hole: holeID,
      score: score,
      strokes: currentStrokes,
    };
    await dispatch(
      gameActions.setHoleEnd(token, holeScore, scorecard.game, userID)
    );
    if (isEndGame) {
      setIsGameEnd(true);
    }
    dispatch(
      gameActions.fetchCurrentGameData(token, scorecard.game, userID, false)
    );
    setIsHoleEndModalOpen(false);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.modal}>
          <HeaderText style={styles.header}>Hole Complete!</HeaderText>
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={AppColors.accent} />
          </View>
        </View>
        <View />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <HeaderText style={styles.header}>Hole Complete!</HeaderText>
        <SubHeaderText style={styles.score}>{getScoreName()}</SubHeaderText>
        <BodyText style={styles.longest}>
          Longest Throw: {longestThrow}ft
        </BodyText>
        <View style={styles.buttonRow}>
          <View style={styles.buttonContainer}>
            <TouchComp onPress={handleCourseReset}>
              <View
                style={
                  Platform.OS === "android"
                    ? styles.buttonAndroid
                    : styles.buttonIOS
                }
              >
                <SubHeaderText>Reset Hole</SubHeaderText>
              </View>
            </TouchComp>
          </View>
          <View style={styles.buttonContainer}>
            <TouchComp onPress={handleHoleEnd}>
              <View
                style={
                  Platform.OS === "android"
                    ? styles.buttonAndroid
                    : styles.buttonIOS
                }
              >
                <SubHeaderText color={AppColors.darkGrey} size={18}>
                  {isEndGame ? "End Game" : "Next Hole"}
                </SubHeaderText>
              </View>
            </TouchComp>
          </View>
        </View>
      </View>
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    padding: 15,
    backgroundColor: AppColors.blackTrans,
    zIndex: 300,
  },
  modal: {
    width: "90%",
    height: "35%",
    backgroundColor: AppColors.primary,
    borderRadius: 15,
    overflow: "hidden",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    width: "100%",
    textAlign: "center",
    fontSize: 24,
    backgroundColor: AppColors.primary,
    color: AppColors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  score: {
    width: "100%",
    fontSize: 32,
    textAlign: "center",
    backgroundColor: AppColors.primary,
    color: AppColors.accent,
  },
  longest: {
    width: "100%",
    fontSize: 21,
    textAlign: "center",
    backgroundColor: AppColors.primary,
    color: AppColors.white,
    paddingVertical: 10,
  },
  buttonRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  buttonContainer: {
    width: "40%",
    borderRadius: 15,
    backgroundColor: AppColors.accent,
    elevation: 10,
    overflow: "hidden",
  },
  buttonAndroid: {
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderRadius: 15,
    borderBottomColor: AppColors.blackTrans,
  },
  buttonIOS: {
    padding: 0,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderRadius: 15,
    borderBottomColor: AppColors.blackTrans,
  },
});

export default HoleEndModal;
