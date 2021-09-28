import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { MaterialIcons } from "@expo/vector-icons";

import * as courseActions from "../../store/actions/courseActions";

import CourseList from "../../components/courses/CourseList";
import SearchBar from "../../components/ui/SearchBar";
import { TouchComp } from "../../components/ui/TouchComp";

import AppColors from "../../utils/AppColors";

const CourseSearchScreen = (props) => {
  const dispatch = useDispatch();
  const { navigation, route } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useSelector((state) => state.auth.token);
  const searchResults = useSelector((state) => state.courses.filteredResults);

  const handleSearch = useCallback(
    async (term) => {
      // if (term.length < 3) {
      //   return;
      // }
      setError(null);
      setIsLoading(true);
      try {
        await dispatch(courseActions.searchCourses(token, term));
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    },
    [dispatch, setError, token]
  );

  const handleCourseSelect = (course) => {
    navigation.navigate("CourseDetail", { courseID: course.course_id });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <SearchBar
          placeholder="Search Courses..."
          onPress={() => props.navigation.navigate("CourseSearch")}
          onSearch={() => {}}
          searchButton={true}
          onManualSearch={(text) => handleSearch(text)}
        />
      ),
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <TouchComp onPress={() => props.navigation.navigate("CourseFilters")}>
            <View style={styles.filterButton}>
              <MaterialIcons
                name="filter-list"
                size={32}
                color={AppColors.accent}
              />
            </View>
          </TouchComp>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const clearSearch = navigation.addListener("beforeRemove", () => {
      // dispatch(discActions.resetSearch());
    });

    return clearSearch;
  }, [navigation]);

  if (error) {
    console.log(error);
    return (
      <View style={styles.centered}>
        <Text>An Error Occured</Text>
      </View>
    );
  }

  if (!isLoading && searchResults.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No courses found</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={AppColors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.centered}>
      <CourseList
        data={searchResults}
        navigation={props.navigation}
        onCoursePress={handleCourseSelect}
      />
    </View>
  );
};

export const screenOptions = () => {
  return {
    animationEnabled: false,
    headerTitleAlign: "center",
    headerTitleStyle: {
      height: 30,
    },
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.white,
  },
  headerRightContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    overflow: "hidden",
    borderRadius: 5,
  },
  filterButton: {
    width: "100%",
  },
});

export default CourseSearchScreen;
