import React from "react";
import { Modal, View, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import * as gameActions from "../../../store/actions/gameActions";

import AppColors from "../../../utils/AppColors";

import { SubHeaderText } from "../../ui/AppText";

const GameQuitConfirmModal = (props) => {
  const dispatch = useDispatch();
  const { isModalOpen, setIsModalOpen, navigation } = props;

  const handleQuitGame = () => {
    navigation.navigate("AppHome", { screen: "Home" });
    dispatch(gameActions.resetGame());
  };

  return (
    <Modal
      visible={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      transparent
    >
      <View style={styles.centeredView}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <SubHeaderText size={16} color={AppColors.primary}>
              Are you sure you want to quit?
            </SubHeaderText>
          </View>
          <View style={styles.buttonRow}>
            <View style={styles.button}>
              <Button
                title="Quit"
                onPress={handleQuitGame}
                color={AppColors.red}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Resume"
                onPress={() => setIsModalOpen(false)}
                color={AppColors.primary}
              />
            </View>
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
  modal: {
    width: "75%",
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
  header: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderBottomColor: AppColors.accent,
    borderBottomWidth: 2,
    paddingVertical: 15,
  },
  buttonRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingTop: 15,
  },
  button: {
    width: "40%",
    padding: 5,
  },
});

export default GameQuitConfirmModal;
