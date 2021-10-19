import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";

import { HeaderText } from "../../components/ui/AppText";

import SearchBar from "../../components/ui/SearchBar";
import AppColors from "../../utils/AppColors";

const CoursesOverviewScreen = (props) => {
  return (
    <View style={styles.screen}>
      <HeaderText color={AppColors.white}>Courses Home Screen</HeaderText>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerLeft: () => {
      return (
        <View style={styles.headerLeftContainer}>
          <HeaderText style={styles.headerLeftText}> </HeaderText>
        </View>
      );
    },
    headerTitle: () => (
      <SearchBar
        placeholder="Search Courses..."
        onPress={() => navData.navigation.navigate("CourseSearch")}
        button
        searchButton={true}
      />
    ),
    headerTitleAlign: "center",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.darkGrey,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
  },
});

export default CoursesOverviewScreen;
