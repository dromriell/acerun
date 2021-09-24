import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  StatusBar,
} from "react-native";

import SearchBar from "../../components/ui/SearchBar";
import AppColors from "../../utils/AppColors";

const CoursesOverviewScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Courses Overview Screen</Text>
      <Button title="Go Back Home" onPress={() => props.navigation.goBack()} />
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerLeft: () => {
      return (
        <View style={styles.headerLeftContainer}>
          <Text style={styles.headerLeftText}> </Text>
        </View>
      );
    },
    headerTitle: () => (
      <SearchBar
        placeholder="Search Courses..."
        onPress={() => navData.navigation.navigate("CourseSearch")}
        button
      />
    ),
    headerTitleAlign: "center",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
  },
});

export default CoursesOverviewScreen;
