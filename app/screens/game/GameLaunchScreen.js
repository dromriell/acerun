import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as gameActions from "../../store/actions/gameActions";
import AppColors from "../../utils/AppColors";

const GameLaunchScreen = (props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [hasAttemptedCreateGame, setHasAttemptedCreateGame] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const userID = useSelector((state) => state.auth.profile.user);
  const courseID = useSelector((state) => state.game.course.id);
  const { players } = props.route.params;

  const game = useSelector((state) => state.game.game);

  useEffect(() => {
    if (!hasAttemptedCreateGame) {
      return;
    }

    if (!!game && hasAttemptedCreateGame && error) {
      props.navigation.navigate("GameSetup", { errorCreating: error });
      return;
    }

    if (game && hasAttemptedCreateGame) {
      props.navigation.navigate("AppGame", { screen: "GamePlayScreen" });
      return;
    }
  }, [game, hasAttemptedCreateGame, error]);

  useEffect(() => {
    const launchGame = async () => {
      try {
        await dispatch(gameActions.setCourseGameData(token, courseID));
        await dispatch(
          gameActions.createGame(token, courseID, players, userID)
        );
      } catch (error) {
        setError(error.message);
      }
      setHasAttemptedCreateGame(true);
    };
    launchGame();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={AppColors.primary} />
    </View>
  );
};

export const screenOptions = () => {
  return {
    headerLeft: () => null,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GameLaunchScreen;
