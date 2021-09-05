import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBar from "../../components/ui/SearchBar";

const DiscSearchScreen = (props) => {
  return (
    <View>
      <Text>Search Screen</Text>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: () => (
      <SearchBar
        placeholder="Search Discs..."
        onPress={() => navData.navigation.navigate("DiscSearch")}
      />
    ),
    headerTitleAlign: "center",
    animationEnabled: false,
  };
};

const styles = StyleSheet.create({});

export default DiscSearchScreen;
