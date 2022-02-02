import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as gameActions from "../../store/actions/gameActions";
import AppImageBackground from "../../components/ui/AppImageBackground";
import backgroundImages from "../../assets/backgroundImages";
import AppColors from "../../utils/AppColors";
import { TouchComp } from "../../components/ui/TouchComp";
import { SubHeaderText } from "../../components/ui/AppText";

const GameHomeScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [isGameInProgress, setIsGameInProgress] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const userID = useSelector((state) => state.auth.profile.user.id);

  useEffect(() => {
    const checkExisitingGame = navigation.addListener("focus", async () => {
      const currentGame = await AsyncStorage.getItem("currentGame");
      if (!currentGame) {
        setIsGameInProgress(false);
        return;
      }
      dispatch(gameActions.resetGame());
      const transformedData = JSON.parse(currentGame);
      const { course, id } = transformedData.gameData;

      dispatch(gameActions.fetchCurrentGameData(token, id, userID));
      dispatch(gameActions.setCourseGameData(token, course));

      setIsGameInProgress(true);
    });
    return checkExisitingGame;
  }, [navigation, dispatch]);

  return (
    <View style={styles.screen}>
      <AppImageBackground image={backgroundImages.basketRender} />
      <View style={styles.buttonContainer}>
        <View style={styles.newGameButtonContainer}>
          <TouchComp onPress={() => props.navigation.navigate("GameSetup")}>
            <View style={styles.newGameButton}>
              <SubHeaderText centered color={AppColors.white}>
                New Game
              </SubHeaderText>
            </View>
          </TouchComp>
        </View>
        {isGameInProgress ? (
          <View style={styles.newGameButtonContainer}>
            <TouchComp
              onPress={() =>
                props.navigation.navigate("AppGame", {
                  screen: "GamePlayScreen",
                })
              }
            >
              <View style={styles.newGameButton}>
                <SubHeaderText centered color={AppColors.white}>
                  Resume Game
                </SubHeaderText>
              </View>
            </TouchComp>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export const screenOptions = () => {
  return {
    headerTitle: "",
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  newGameButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "75%",
    borderRadius: 15,
    backgroundColor: AppColors.primary,
    borderWidth: 3,
    borderColor: AppColors.accent,
    overflow: "hidden",
    elevation: 5,
  },
  newGameButton: {
    width: "100%",
    padding: 15,
    textAlign: "center",
  },
});

export default GameHomeScreen;
