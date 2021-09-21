import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useDispatch } from "react-redux";
import * as gameActions from "../../store/actions/gameActions";

import GameScorecardModal from "../../components/games/GameScorecardModal";
import GameQuitConfirmModal from "../../components/games/ui/GameQuitConfirmModal";

import AppColors from "../../utils/AppColors";

const GameDrawerScreen = (props) => {
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.centeredView}>
        <GameScorecardModal
          isModalOpen={isScoreModalOpen}
          setIsModalOpen={setIsScoreModalOpen}
        />
      </View>
      <View style={styles.centeredView}>
        <GameQuitConfirmModal
          isModalOpen={isConfirmModalOpen}
          setIsModalOpen={setIsConfirmModalOpen}
          navigation={props.navigation}
        />
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Scorecard"
        labelStyle={styles.label}
        onPress={() => {
          setIsScoreModalOpen(true);
        }}
      />
      <DrawerItem
        label="Quit Game"
        labelStyle={styles.label}
        onPress={() => setIsConfirmModalOpen(true)}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    color: AppColors.accent,
    fontSize: 21,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});

export default GameDrawerScreen;
