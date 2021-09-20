import React from "react";
import { View, Button, StyleSheet, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as gameActions from "../../../store/actions/gameActions";

import { TouchComp } from "../../ui/TouchComp";
import { BodyText, HeaderText, SubHeaderText } from "../../ui/AppText";

import AppColors from "../../../utils/AppColors";

const HoleEndModal = (props) => {
  const dispatch = useDispatch();
  const { holeData, setIsHoleEndModalOpen } = props;
  const { par, id: holeID } = holeData;

  const token = useSelector((state) => state.auth.token);
  const userID = useSelector((state) => state.auth.profile.user);
  const currentStrokes = useSelector((state) => state.game.currentStrokes);
  const courseData = useSelector((state) => state.game.courseData); // MAY NEED TO USE FOR GAME END
  const scorecard = useSelector((state) => state.game.scorecard);
  const score = currentStrokes.length;

  console.log(holeID);

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

  const handleHoleEnd = () => {
    const holeScore = {
      score_card: scorecard.id,
      hole: holeID,
      score: score,
      strokes: currentStrokes,
    };
    dispatch(gameActions.setHoleEnd(token, holeScore));
    setIsHoleEndModalOpen(false);
    dispatch(gameActions.fetchCurrentGameData(token, scorecard.game, userID));
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <HeaderText style={styles.header}>Hole Complete!</HeaderText>
        <SubHeaderText style={styles.score}>{getScoreName()}</SubHeaderText>
        <View style={styles.buttonRow}>
          <View style={styles.buttonContainer}>
            <TouchComp onPress={handleCourseReset}>
              <View style={styles.button}>
                <SubHeaderText>Reset Hole</SubHeaderText>
              </View>
            </TouchComp>
          </View>
          <View style={styles.buttonContainer}>
            <TouchComp onPress={handleHoleEnd}>
              <View style={styles.button}>
                <SubHeaderText color={AppColors.darkGrey} size={18}>
                  Next Hole
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
    height: "30%",
    backgroundColor: AppColors.primary,
    borderRadius: 15,
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
  button: {
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderRadius: 15,
    borderBottomColor: AppColors.blackTrans,
  },
});

export default HoleEndModal;
