import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import * as eventActions from "../../store/actions/eventActions";

import AppColors from "../../utils/AppColors";
import { SubHeaderText, BodyText, HeaderText } from "../ui/AppText";

const monthArray = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const EventItem = (props) => {
  return (
    <View style={styles.eventItem}>
      <View style={styles.eventBar}>
        <View style={styles.dateBox}>
          <SubHeaderText style={styles.day}>13</SubHeaderText>
          <SubHeaderText style={styles.month}>JAN</SubHeaderText>
        </View>
        <BodyText style={styles.eventBadge}>Class</BodyText>
        <BodyText style={styles.eventBadge}>Tier</BodyText>
      </View>
      <View style={styles.eventInfo}>
        <SubHeaderText>Full Event Name</SubHeaderText>
        <BodyText>City, State</BodyText>
      </View>
    </View>
  );
};

const EventWidget = (props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const userLocation = useSelector((state) => state.auth.profile.state);
  const homeEvents = useSelector((state) => state.events.homeEvents);

  const loadEvents = useCallback(async () => {
    console.log("LOOOADING");
    setError(null);
    setIsLoading(true);
    try {
      dispatch(eventActions.fetchHomeEvents(token, userLocation));
    } catch (error) {}
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    if (homeEvents.length > 0) {
      console.log("EVENT FETCH SKIPPED");
      return;
    }
    setIsLoading(true);
    loadEvents().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadEvents, setError]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={AppColors.accent} />
      </View>
    );
  }

  if (!isLoading && homeEvents.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.eventHeader}>
          <HeaderText>Upcoming Events</HeaderText>
        </View>
        <View style={styles.emptyItem}>
          <SubHeaderText>No Events Found!</SubHeaderText>
        </View>
      </View>
    );
  }

  console.log(homeEvents.length);

  return (
    <View style={styles.container}>
      <View style={styles.eventHeader}>
        <HeaderText>Upcoming Events</HeaderText>
      </View>
      <EventItem />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 200,
    maxHeight: 300,
    padding: 10,
    elevation: 5,
    borderBottomColor: AppColors.black,
    borderRadius: 5,
  },
  emptyItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  eventHeader: {
    paddingVertical: 10,
  },
  eventItem: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  eventBar: {
    alignItems: "center",
    width: "25%",
  },
  eventInfo: {
    flex: 1,
  },
  dateBox: {
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    aspectRatio: 1,
    backgroundColor: AppColors.primary,
    borderRadius: 10,
    includeFontPadding: false,
    textAlignVertical: "center",
    textAlign: "center",
    elevation: 3,
  },
  day: {
    color: AppColors.white,
    fontSize: 40,
    padding: 0,
    margin: -10,
    includeFontPadding: false,
    textAlignVertical: "center",
    textAlign: "center",
  },
  month: {
    color: AppColors.accent,
    fontSize: 21,
    padding: 0,
    margin: 0,
    includeFontPadding: false,
    textAlign: "center",
    textAlignVertical: "center",
  },
  eventBadge: {
    width: "95%",
    paddingHorizontal: 3,
    paddingVertical: 5,
    marginVertical: 5,
    textAlign: "center",
    textAlignVertical: "center",
    color: AppColors.white,
    backgroundColor: AppColors.accent,
    borderRadius: 10,
    elevation: 3,
  },
});

export default EventWidget;
