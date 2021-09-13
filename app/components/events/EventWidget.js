import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native";
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

const { width } = Dimensions.get("window");

const EventItem = (props) => {
  const { event } = props;
  const startDate = new Date(event.start_date);
  return (
    <View style={styles.eventItem}>
      <View style={styles.eventBar}>
        <View style={styles.dateBox}>
          <SubHeaderText style={styles.day}>
            {startDate.getDate()}
          </SubHeaderText>
          <SubHeaderText style={styles.month}>
            {monthArray[startDate.getMonth()]}
          </SubHeaderText>
        </View>
        <BodyText style={styles.eventBadge}>{event.class}</BodyText>
        <BodyText style={styles.eventBadge}>{event.tier}</BodyText>
      </View>
      <View style={styles.eventInfo}>
        <SubHeaderText>{event.tournament_name}</SubHeaderText>
        <BodyText>
          {event.city}, {event.state_prov}
        </BodyText>
      </View>
    </View>
  );
};

const EventWidget = (props) => {
  const dispatch = useDispatch();
  const eventListRef = useRef();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const userLocation = useSelector((state) => state.auth.profile.state);
  const homeEvents = useSelector((state) => state.events.homeEvents);

  const loadEvents = useCallback(async () => {
    console.log("LOOOADING");
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(eventActions.fetchHomeEvents(props.token, userLocation));
    } catch (error) {
      setError(error);
      console.log(error);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  const renderEvents = (itemData) => {
    return <EventItem event={itemData.item} />;
  };

  useEffect(() => {
    loadEvents();
  }, [dispatch, loadEvents, setError]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={AppColors.accent} />
      </View>
    );
  }

  if (!isLoading && !homeEvents) {
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

  return (
    <View style={styles.container}>
      <View style={styles.eventHeader}>
        <HeaderText
          onPress={() =>
            eventListRef.current.scrollToIndex({ animated: true, index: 0 })
          }
        >
          Upcoming Events
        </HeaderText>
      </View>
      <FlatList
        ref={eventListRef}
        data={homeEvents.events}
        renderItem={renderEvents}
        keyExtractor={(item) => item.tournament_id}
        horizontal={true}
        decelerationRate={0}
        snapToInterval={width}
        snapToAlignment={"center"}
        contentInset={{
          top: 0,
          left: 30,
          bottom: 0,
          right: 30,
        }}
      />
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
    width: width,
    height: "100%",
    paddingHorizontal: 10,
  },
  eventBar: {
    alignItems: "center",
    width: "25%",
  },
  eventInfo: {
    flex: 1,
    paddingHorizontal: 10,
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
