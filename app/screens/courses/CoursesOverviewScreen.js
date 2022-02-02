import React from "react";
import { View, StyleSheet } from "react-native";

import SearchBar from "../../components/ui/SearchBar";
import AppImageBackground from "../../components/ui/AppImageBackground";
import backgroundImages from "../../assets/backgroundImages";
import AppColors from "../../utils/AppColors";
import { HeaderText } from "../../components/ui/AppText";

const CoursesOverviewScreen = (props) => {
  return (
    <View style={styles.screen}>
      <HeaderText color={AppColors.white}>Courses Home Screen</HeaderText>
      <AppImageBackground image={backgroundImages.locationsRender} />
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
  },
});

export default CoursesOverviewScreen;
