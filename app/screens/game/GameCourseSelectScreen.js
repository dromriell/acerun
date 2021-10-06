import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import * as Location from "expo-location";
import * as gameActions from "../../store/actions/gameActions";

import { nearbyCoursesEP } from "../../utils/apiEndPoints";

import { HeaderText, SubHeaderText } from "../../components/ui/AppText";
import AppColors from "../../utils/AppColors";

import CourseList from "../../components/courses/CourseList";

// import { dummyCourse } from "../../../env";

const GameCourseSelectScreen = (props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState();
  const [courses, setCourses] = useState();
  const token = useSelector((state) => state.auth.token);

  const verifyPermissions = async () => {
    const result = await Location.requestForegroundPermissionsAsync();

    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant location permissions to use this app",
        [{ text: "Okay" }]
      );
      return false;
    }

    return true;
  };

  const handleCourseSelect = async (course) => {
    try {
      await dispatch(gameActions.setGameCourse(course));
      props.navigation.goBack();
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const handleGetLocation = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const currentLocation = await Location.getLastKnownPositionAsync();
    try {
      setIsLoading(true);
      setLocation({
        lat: currentLocation.coords.latitude,
        lng: currentLocation.coords.longitude,
      });
    } catch (error) {
      Alert.alert(
        "Could Not Fetch Location",
        "Please try again later or pick a location on the map",
        [{ text: "Okay" }]
      );
    }
    setIsLoading(false);
  };

  const loadCourses = useCallback(async () => {
    /*
     Loads nearby course data from API and sets the game course state on select.
    */
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(nearbyCoursesEP(location), {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      const courseDataResponse = await response.json();
      console.log(courseDataResponse);
      setCourses(courseDataResponse.courses);
      // setCourses(dummyCourse);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [location, setError]);

  useEffect(() => {
    handleGetLocation();
  }, []);

  useEffect(() => {
    if (!location) {
      return;
    }
    loadCourses();
  }, [location, loadCourses]);

  if (isLoading) {
    return (
      <View style={styles.launchScreen}>
        <ActivityIndicator size="large" color={AppColors.accent} />
      </View>
    );
  }

  if (!isLoading && !location) {
    return (
      <View style={styles.launchScreen}>
        <View style={styles.button}>
          <Button title="Try Again" color={AppColors.accent} />
        </View>
      </View>
    );
  }

  if (!isLoading && courses && courses.length === 0) {
    return (
      <View style={styles.launchScreen}>
        <HeaderText>No Courses Found Near You</HeaderText>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <CourseList
        data={courses}
        navigation={props.navigation}
        onCoursePress={handleCourseSelect}
      />
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitleAlign: "center",
    headerTitle: "Select a Course",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  launchScreen: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GameCourseSelectScreen;
