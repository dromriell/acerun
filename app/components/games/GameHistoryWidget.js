import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Image, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { BodyText, HeaderText, SubHeaderText } from "../ui/AppText";

import { gameHistoryEP } from "../../utils/apiEndPoints";
import AppColors from "../../utils/AppColors";
import { ScrollView } from "react-native-gesture-handler";

const GameSummaryLarge = (props) => {
  const { game, total_score, player } = props.game;
  const { course, date, isInProgress } = game;
  const displayDate = new Date(date);
  const isUnderPar = total_score <= 0;

  return (
    <View style={styles.gameSummaryLrg}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: course.image_url }} style={styles.image} />
      </View>
      <View style={styles.gameHeader}>
        <HeaderText capitalize style={styles.header}>
          {course.name}
        </HeaderText>
        <Text style={styles.headerSub}>
          <BodyText capitalize>{course.city}, </BodyText>
          <BodyText>{course.state.toUpperCase()}</BodyText>
        </Text>
        <BodyText style={styles.headerSub}>
          {displayDate.toLocaleDateString()}
        </BodyText>
        <BodyText style={styles.headerSub}>0 Min</BodyText>
        {isInProgress ? (
          <BodyText style={styles.headerSub}>In Progress...</BodyText>
        ) : null}
      </View>
      <View style={styles.scoreBadge}>
        <BodyText
          style={isUnderPar ? styles.underParBadge : styles.overParBadge}
        >
          {total_score}
        </BodyText>
      </View>
    </View>
  );
};

const GameSummarySmall = (props) => {
  const { game, total_score, player } = props.game;
  const { course, date, isInProgress } = game;
  const displayDate = new Date(date);
  const isUnderPar = total_score <= 0;

  return (
    <View style={styles.gameSummarySml}>
      <SubHeaderText capitalize>{course.name}</SubHeaderText>
      <BodyText>{displayDate.toLocaleDateString()}</BodyText>
      <BodyText style={isUnderPar ? styles.underPar : styles.overPar}>
        {total_score}
      </BodyText>
    </View>
  );
};

const GameHistoryWidget = (props) => {
  const dispatch = useDispatch();
  const [gameHistory, setGameHistory] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const loadGameHistory = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      console.log("Fetching Game History...");
      const response = await fetch(gameHistoryEP, {
        headers: {
          Authorization: `Token ${props.token}`,
          "Content-Type": "application/json",
        },
      });
      const gameHistoryResponse = await response.json();
      console.log("RES", gameHistoryResponse);
      setGameHistory(gameHistoryResponse);
    } catch (error) {
      setError(error);
      console.log(error);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadGameHistory();
    return () => setGameHistory();
  }, [dispatch, loadGameHistory, setError]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={AppColors.accent} />
      </View>
    );
  }

  if (!isLoading && !gameHistory) {
    return (
      <View style={styles.container}>
        <SubHeaderText>No Games Found</SubHeaderText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderText style={styles.containerHeader}>Game History</HeaderText>
      {gameHistory.map((game, i) => {
        console.log(i);
        if (i === 0) {
          return <GameSummaryLarge key={game.id} game={game} />;
        }
        return <GameSummarySmall key={game.id} game={game} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    elevation: 5,
    borderBottomColor: AppColors.black,
    borderRadius: 5,
  },
  containerHeader: {
    paddingVertical: 10,
  },
  gameSummaryLrg: {
    width: "100%",
    height: 250,
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  headerContainer: {
    width: "100%",
  },
  header: {
    paddingLeft: 15,
    paddingTop: 15,
    color: AppColors.white,
    fontSize: 26,
  },
  headerSub: {
    color: AppColors.white,
    paddingLeft: 15,
  },
  infoBar: {
    flexDirection: "row",
    position: "absolute",
    bottom: 5,
    width: "100%",
    padding: 10,
  },
  badge: {
    margin: 5,
    padding: 5,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: AppColors.primary,
  },
  underPar: {
    color: AppColors.green,
  },
  overPar: {
    color: AppColors.red,
  },
  scoreBadge: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    marginLeft: 15,
    borderRadius: 50,
    backgroundColor: AppColors.white,
  },
  underParBadge: {
    color: AppColors.green,
    fontSize: 38,
  },
  overParBadge: {
    color: AppColors.red,
    fontSize: 38,
  },
  gameSummarySml: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 5,
    marginVertical: 2,
    textTransform: "capitalize",
    borderBottomWidth: 1,
    borderBottomColor: AppColors.grey,
  },
});

export default GameHistoryWidget;
