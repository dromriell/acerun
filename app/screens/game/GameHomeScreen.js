import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as gameActions from "../../store/actions/gameActions";

import { HeaderText } from "../../components/ui/AppText";

const GameHomeScreen = (props) => {
  const dispatch = useDispatch();
  const [isGameInProgress, setIsGameInProgress] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const userID = useSelector((state) => state.auth.profile.user);

  useEffect(() => {
    const checkIfGameInProgress = async () => {
      const currentGame = await AsyncStorage.getItem("currentGame");
      if (!currentGame) {
        return;
      }
      const transformedData = JSON.parse(currentGame);
      console.log(transformedData);
      const { course, id } = transformedData.gameData;

      dispatch(gameActions.fetchCurrentGameData(token, id, userID));
      dispatch(gameActions.setCourseGameData(token, course));

      setIsGameInProgress(true);
    };
    checkIfGameInProgress();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <HeaderText>Game Home Screen</HeaderText>
      <Button
        title="Start New Game"
        onPress={() => props.navigation.navigate("GameSetup")}
      />
      {isGameInProgress ? (
        <Button
          title="Return to Game"
          onPress={() =>
            props.navigation.navigate("AppGame", { screen: "GamePlayScreen" })
          }
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GameHomeScreen;
