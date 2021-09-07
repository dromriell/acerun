import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import DiscItem, { EmptyDiscItem } from "../../components/discs/DiscItem";
import DiscRatingChart from "../../components/discs/DiscRatingChart";

import { Ionicons } from "@expo/vector-icons";
import AppColors from "../../utils/AppColors";
import { BodyText, SubHeaderText } from "../../components/ui/AppText";

const DiscComparisonSelect = (props) => {
  const renderDiscItems = () => {
    const discItemArray = [];
    for (let i = 0; i < 2; i++) {
      if (props.discs[i]) {
        discItemArray.push(<DiscItem />);
      } else {
        discItemArray.push(
          <EmptyDiscItem
            key={`emptyDisc=${i}`}
            title={"Select a Disc"}
            icon={<Ionicons name="md-add" size={52} color={AppColors.accent} />}
            onPress={() => console.log("GO TO SEARCH SCREEN", i)}
          />
        );
      }
    }
    return discItemArray;
  };

  return (
    <View style={styles.discSelect}>
      {renderDiscItems().map((discComp) => discComp)}
    </View>
  );
};

const DiscPropertyColumn = (props) => {
  return (
    <View style={styles.propertyColumn}>
      <SubHeaderText>Disc Name Here</SubHeaderText>
      <View style={styles.propertyList}>
        <BodyText>* Test</BodyText>
        <BodyText>* Test</BodyText>
        <BodyText>* Test</BodyText>
        <BodyText>* Test</BodyText>
        <BodyText>* Test</BodyText>
        <BodyText>* Test</BodyText>
        <BodyText>* Test</BodyText>
        <BodyText>* Test</BodyText>
      </View>
    </View>
  );
};

const DiscComparisonScreen = (props) => {
  const [discArray, setDiscArray] = useState([]);

  // Use Redux to set discArray

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.container}>
          <DiscComparisonSelect discs={discArray} />
          <View style={styles.discChart}>
            <DiscRatingChart data={discArray} />
          </View>
          <View style={styles.properties}>
            <DiscPropertyColumn />
            <DiscPropertyColumn />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  container: {
    alignItems: "center",
  },
  discSelect: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  discChart: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 350,
    marginVertical: 10,
  },
  properties: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: "Compare Discs",
  };
};

export default DiscComparisonScreen;
