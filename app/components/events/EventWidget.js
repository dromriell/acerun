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
        <SubHeaderText size={24} capitalize>
          {event.tournament_name}
        </SubHeaderText>
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
  const [currentEventIndex, setCurrentEventIndex] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const userLocation = useSelector((state) => state.auth.profile.state);
  const homeEvents = useSelector((state) => state.events.homeEvents);

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  const loadEvents = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(eventActions.fetchHomeEvents(props.token, userLocation));
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
    setCurrentEventIndex(0);
  }, [dispatch, setIsLoading, setError]);

  const renderEvents = (itemData) => {
    return <EventItem event={itemData.item} />;
  };

  const handleViewableItemsChanged = useCallback(({ changed }) => {
    /**
     * Called on FlatList when viewable item changes from either user
     * or timeout interaction and sets the currentEventIndex to the
     * most recent item index (forwards or backwards).
     */
    setCurrentEventIndex(changed[0].index);
  }, []);

  const handleAutoScroll = () => {
    /**
     * Autoscrolls the Flatlist items and resets once it has reached
     * the last item. Tracking and setting currentEventIndex is done
     * in handleViewableItemsChanged
     */
    const eventListLength = homeEvents ? homeEvents.events.length : 0;
    const nextIndex = currentEventIndex + 1;
    if (nextIndex >= eventListLength) {
      eventListRef.current.scrollToIndex({ animated: true, index: 0 });
    } else {
      eventListRef.current.scrollToIndex({ animated: true, index: nextIndex });
    }
  };

  useEffect(() => {
    const scrollTimeout = setTimeout(handleAutoScroll, 9000);
    return () => {
      return clearTimeout(scrollTimeout);
    };
  }, [currentEventIndex]);

  useEffect(() => {
    loadEvents();
  }, [dispatch, loadEvents, setError]);

  if (isLoading) {
    return (
      <View style={{ ...styles.container, ...styles.loadingContainer }}>
        <ActivityIndicator size="large" color={AppColors.accent} />
      </View>
    );
  }

  if (!isLoading && !homeEvents) {
    return (
      <View style={styles.container}>
        <View style={styles.eventHeader}>
          <HeaderText>Events</HeaderText>
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
          size={32}
          color={AppColors.accent}
          onPress={() => {
            eventListRef.current.scrollToIndex({ animated: true, index: 0 });
            setCurrentEventIndex(0);
          }}
        >
          Events
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
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={handleViewableItemsChanged}
        // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
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
    height: 250,
    elevation: 5,
    borderBottomColor: AppColors.black,
    borderRadius: 5,
    backgroundColor: AppColors.grey,
    overflow: "hidden",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  emptyItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  eventHeader: {
    padding: 5,
    backgroundColor: AppColors.primary,
  },
  eventItem: {
    flexDirection: "row",
    justifyContent: "center",
    width: width,
    height: "100%",
    padding: 5,
  },
  eventBar: {
    alignItems: "center",
    width: "25%",
  },
  eventInfo: {
    width: "75%",
    paddingHorizontal: 5,
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
