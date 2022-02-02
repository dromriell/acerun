import React from "react";
import { View, ImageBackground, StyleSheet, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { HeaderText } from "../../components/ui/AppText";

import SearchBar from "../../components/ui/SearchBar";
import AppColors from "../../utils/AppColors";

const CoursesOverviewScreen = (props) => {
  return (
    <View style={styles.screen}>
      <HeaderText color={AppColors.white}>Courses Home Screen</HeaderText>
      <ImageBackground
        source={require("../../assets/images/disc-golf-004.png")}
        style={styles.backgroundImage}
      >
        <LinearGradient
          // Background Linear Gradient
          colors={[AppColors.black, AppColors.black, AppColors.primary]}
          style={styles.background}
          start={{ x: 0.1, y: 0.1 }}
        />
      </ImageBackground>
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
    // paddingTop: StatusBar.currentHeight,
  },
  backgroundImage: {
    position: "absolute",
    height: "100%",
    width: "100%",
    flex: 1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    opacity: 0.7,
  },
});

export default CoursesOverviewScreen;
