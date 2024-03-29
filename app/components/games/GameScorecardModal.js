import React, { useCallback } from "react";
import { Modal, View, Button, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import * as gameActions from "../../store/actions/gameActions";

import AppColors from "../../utils/AppColors";

import { BodyText, SubHeaderText } from "../ui/AppText";

const GameScorecardModal = (props) => {
  const dispatch = useDispatch();
  const {
    token,
    gameID,
    navigation,
    isModalOpen,
    setIsModalOpen,
    isGameEnd,
    setIsGameEnd,
  } = props;

  const userScorecard = useSelector((state) => state.game.scorecard);

  const renderScores = (item, index) => {
    const { hole, score, strokes } = item;
    const { hole_number: holeNumber, par } = hole;
    const longestThrow = Math.max.apply(
      Math,
      strokes.map((stroke) => stroke.dist)
    );
    const isEven = index % 2 === 0;

    return (
      <View style={{ ...styles.tableRow, ...(isEven ? styles.evenRow : {}) }}>
        <BodyText style={styles.tableData}>{holeNumber}</BodyText>
        <BodyText style={styles.tableData}>{par}</BodyText>
        <BodyText style={styles.tableData}>{score}</BodyText>
        <BodyText style={styles.tableData}>
          {longestThrow.toFixed(0)} ft
        </BodyText>
      </View>
    );
  };

  const handleGameEnd = useCallback(async () => {
    dispatch(gameActions.setGameEnd(token, gameID));
    navigation.navigate("AppHome", { screen: "Home" });
    setIsGameEnd(false);
  }, [token, gameID, dispatch, navigation]);

  if (!userScorecard) {
    return null;
  }

  return (
    <Modal
      visible={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      transparent
    >
      <View style={styles.centeredView}>
        <View style={styles.scorecard}>
          <View style={styles.header}>
            <SubHeaderText size={24} color={AppColors.primary}>
              Scorecard
            </SubHeaderText>

            {isGameEnd ? (
              <Button
                title="End Game"
                color={AppColors.primary}
                onPress={handleGameEnd}
              />
            ) : (
              <View style={styles.close}>
                <Ionicons
                  name="close"
                  color={AppColors.red}
                  size={32}
                  onPress={() => setIsModalOpen(false)}
                />
              </View>
            )}
          </View>
          <View></View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <SubHeaderText style={styles.tableHeader}>Hole</SubHeaderText>
              <SubHeaderText style={styles.tableHeader}>Par</SubHeaderText>
              <SubHeaderText style={styles.tableHeader}>Score</SubHeaderText>
              <SubHeaderText style={styles.tableHeader}>Lng</SubHeaderText>
            </View>
            <FlatList
              data={userScorecard.scores}
              renderItem={({ item, index }) => renderScores(item, index)}
              style={styles.tableField}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.blackTrans,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderBottomColor: AppColors.accent,
    borderBottomWidth: 2,
    paddingVertical: 15,
  },
  close: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  scorecard: {
    width: "90%",
    paddingHorizontal: 15,
    paddingBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  table: {
    width: "100%",
    alignItems: "center",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  tableHeader: {
    width: "25%",
    textAlign: "center",
  },
  evenRow: {
    backgroundColor: AppColors.grey,
  },
  tableData: {
    width: "25%",
    textAlign: "center",
  },
});

export default GameScorecardModal;
