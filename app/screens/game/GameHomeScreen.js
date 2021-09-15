import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { useSelector } from "react-redux";

import { HeaderText } from "../../components/ui/AppText";

const GameHomeScreen = (props) => {
  const gameID = useSelector((state) => state.game.gameID);

  return (
    <View style={styles.screen}>
      <HeaderText>Game Home Screen</HeaderText>
      <Button
        title="Start New Game"
        onPress={() => props.navigation.navigate("GameSetup")}
      />
      {gameID ? (
        <Button
          title="Return to Game"
          onPress={() => props.navigation.navigate("GamePlayScreen")}
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
