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
        <SubHeaderText
          size={event.tournament_name.length < 61 ? 24 : 20}
          style={styles.eventName}
        >
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
    setCurrentEventIndex((oldEvents) => {
      let newEventIndex = null;

      changed.forEach(({ index, isViewable }) => {
        if (isViewable) {
          newEventIndex = index;
        }
      });
      return newEventIndex;
    });
  }, []);

  const handleAutoScroll = () => {
    /**
     * Autoscrolls the Flatlist items and resets once it has reached
     * the last item. Tracking and setting currentEventIndex is done
     * in handleViewableItemsChanged
     */
    if (!homeEvents.events) {
      return;
    }
    const eventListLength = homeEvents.events.length;
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
      <View style={styles.container}>
        <View style={styles.eventHeader}>
          <HeaderText size={32} color={AppColors.white}>
            Events
          </HeaderText>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={AppColors.accent} />
        </View>
      </View>
    );
  }

  if (!isLoading && !homeEvents.events) {
    return (
      <View style={styles.container}>
        <View style={styles.eventHeader}>
          <HeaderText size={32} color={AppColors.white}>
            Events
          </HeaderText>
        </View>
        <View style={styles.emptyItem}>
          <SubHeaderText size={24}>No Events Found!</SubHeaderText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.eventHeader}>
        <HeaderText
          size={32}
          color={AppColors.white}
          onPress={() => {
            eventListRef.current.scrollToIndex({ animated: true, index: 0 });
            setCurrentEventIndex(0);
          }}
        >
          Events
        </HeaderText>
      </View>
      <View style={styles.listContainer}>
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
          contentInset={{
            top: 0,
            left: 30,
            bottom: 0,
            right: 30,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 250,
    borderBottomColor: AppColors.black,
    overflow: "hidden",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "50%",
  },
  listContainer: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  emptyItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    backgroundColor: AppColors.grey,
    elevation: 5,
  },
  eventHeader: {
    padding: 5,
  },
  eventItem: {
    flexDirection: "row",
    justifyContent: "center",
    width: width,
    height: "100%",
    backgroundColor: AppColors.grey,
    elevation: 5,
    padding: 5,
  },
  eventBar: {
    alignItems: "center",
    width: "25%",
  },
  eventInfo: {
    width: "75%",
    paddingHorizontal: 5,
    justifyContent: "space-between",
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
  eventName: {
    width: "95%",
  },
  eventBadge: {
    width: "95%",
    paddingHorizontal: 3,
    marginVertical: 2,
    textAlign: "center",
    textAlignVertical: "center",
    color: AppColors.white,
    backgroundColor: AppColors.black,
    borderColor: AppColors.accent,
    borderWidth: 3,
    borderRadius: 10,
    elevation: 3,
    overflow: "hidden",
  },
});

export default EventWidget;
