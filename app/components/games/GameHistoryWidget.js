import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  Text,
} from "react-native";
import { useDispatch } from "react-redux";

import { LinearGradient } from "expo-linear-gradient";

import { BodyText, HeaderText, SubHeaderText } from "../ui/AppText";

import { gameHistoryEP } from "../../utils/apiEndPoints";
import AppColors from "../../utils/AppColors";

const GameSummaryLarge = (props) => {
  const { game, total_score, player } = props.game;
  const { course, date, isInProgress } = game;
  const displayDate = new Date(date);
  const isUnderPar = total_score <= 0;

  return (
    <View style={styles.gameSummaryLrg}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={{ uri: course.image_url }}
          style={styles.image}
        >
          <LinearGradient
            colors={[
              AppColors.blackTrans,
              AppColors.black,
              AppColors.blackTrans,
            ]}
            style={styles.background}
            start={{ x: 0.7, y: 0.1 }}
          />
        </ImageBackground>
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
      const response = await fetch(gameHistoryEP, {
        headers: {
          Authorization: `Token ${props.token}`,
          "Content-Type": "application/json",
        },
      });
      const gameHistoryResponse = await response.json();
      setGameHistory(gameHistoryResponse);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadGameHistory();
    return () => setGameHistory();
  }, [dispatch, loadGameHistory, setError]);

  if (isLoading) {
    return (
      <View style={{ ...styles.container, ...styles.loadingContainer }}>
        <ActivityIndicator size="large" color={AppColors.accent} />
      </View>
    );
  }

  if ((!isLoading && !gameHistory) || gameHistory.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <HeaderText size={32} color={AppColors.white}>
            Recent Games
          </HeaderText>
        </View>
        <View style={styles.emptyItem}>
          <SubHeaderText size={24}>So Empty...</SubHeaderText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <HeaderText size={32} color={AppColors.white}>
          Recent Games
        </HeaderText>
      </View>
          <View style={styles.gameContainer}>
      {gameHistory.map((game, i) => {
        if (!game.game) {
          return;
        }
        if (i === 0) {
          return <GameSummaryLarge key={game.id} game={game} />;
        }
        return <GameSummarySmall key={game.id} game={game} />;
      })}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    minHeight: 450,
    elevation: 5,
    borderBottomColor: AppColors.black,
    borderRadius: 15,
    overflow: "hidden",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
  },
  containerHeader: {
    width: "100%",
    padding: 5,
    backgroundColor: AppColors.darkGrey,
  },
  gameSummaryLrg: {
    width: "100%",
    height: 250,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
    elevation: 5,
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
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    opacity: 0.7,
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
    flexDirection: 'row',
    position: "absolute",
    top: 15,
    right: 15,
    alignItems: 'center',
    justifyContent: "center",
    width: 50,
    height: 50,
    marginLeft: 15,
    borderRadius: 50,
    backgroundColor: AppColors.white,
      lineHeight: 38,
  },
  underParBadge: {
    color: AppColors.green,
    fontSize: 38,
  lineHeight: 55,

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
    marginVertical: 5,
    textTransform: "capitalize",
    borderBottomWidth: 1,
    borderBottomColor: AppColors.black,
    width: "95%",
  },
gameContainer: {
backgroundColor: AppColors.grey,
    flex: 1,
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',

}
});

export default GameHistoryWidget;
