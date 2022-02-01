import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { Ionicons } from "@expo/vector-icons";

import * as gameActions from "../../store/actions/gameActions";

import DiscList from "../../components/discs/DiscList";
import { TouchComp } from "../../components/ui/TouchComp";
import AppColors from "../../utils/AppColors";

const GameDiscSelectScreen = (props) => {
  const dispatch = useDispatch();
  const discs = useSelector((state) => state.discs.userDiscs);

  const handleModalClose = () => {
    props.navigation.goBack();
  };

  const onDiscSelect = async (disc) => {
    await dispatch(gameActions.setEquippedDisc(disc));
    props.navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.closeContainer}>
          <TouchComp onPress={handleModalClose}>
            <View style={styles.close}>
              <Ionicons name="md-close" size={32} color={AppColors.red} />
            </View>
          </TouchComp>
        </View>
      </View>
      <DiscList
        data={discs}
        style={styles.discList}
        onDiscSelect={onDiscSelect}
      />
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerShown: false,
    presentation: "transparentModal",
    headerStyle: {
      marginTop: 25,
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.blackTrans,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 50,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: Platform.OS === "android" ? 0 : 15,
    backgroundColor: AppColors.primary,
  },
  closeContainer: {
    overflow: "hidden",
    borderRadius: 50,
  },
  close: {
    width: 32,
    backgroundColor: AppColors.primary,
  },
  discList: {
    backgroundColor: AppColors.blackTrans,
  },
});

export default GameDiscSelectScreen;
