import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

const DiscComparisonScreen = (props) => {
  return (
    <View>
      <Text>Disc Comparison Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export const screenOptions = (navData) => {
  return {
    headerTitle: "Compare Discs",
  };
};

export default DiscComparisonScreen;
