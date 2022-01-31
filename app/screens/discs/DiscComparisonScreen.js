import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";

import DiscItem, { EmptyDiscItem } from "../../components/discs/DiscItem";
import DiscRatingChart from "../../components/discs/DiscRatingChart";

import { Ionicons } from "@expo/vector-icons";
import AppColors from "../../utils/AppColors";
import { BodyText, SubHeaderText } from "../../components/ui/AppText";

const DiscPropertyColumn = (props) => {
  /*
  Component for displaying disc properties in a column. Takes a 'disc'
  prop (not userDisc).
  */
  const { disc } = props;

  return (
    <View style={styles.propertyColumn}>
          <View style={styles.headerContainer}>
        <SubHeaderText style={styles.propertyHeader}>
          {disc.name || "---"}
        </SubHeaderText>
      </View>
      <View style={styles.propertyList}>
        <BodyText style={styles.property}>
          Flexibility: {disc.flexibility}
        </BodyText>
        <BodyText style={styles.property}>Height: {disc.height}</BodyText>
        <BodyText style={styles.property}>Weight: {disc.weight}</BodyText>
        <BodyText style={styles.property}>Rim Depth: {disc.rim_depth}</BodyText>
        <BodyText style={styles.property}>
          Rim Thickness: {disc.rim_thickness}
        </BodyText>
        <BodyText style={styles.property}>
          Rim/Diameter {disc.rim_depth_to_diameter}
        </BodyText>
      </View>
    </View>
  );
};

const DiscComparisonScreen = (props) => {
  /*
  Screen which allows user to compare properties of two discs. Displays a
  DiscRatingChart, DiscItems, EmptyDiscItems, and local DiscPropertyColumn
  component.
  */

  const [discArray, setDiscArray] = useState([]);
  const discA = useSelector((state) => state.discs.comparisonDiscA);
  const discB = useSelector((state) => state.discs.comparisonDiscB);

  useEffect(() => {
    // Update the discArray anytime discA or discB are changed.
    setDiscArray([discA, discB]);
  }, [discA, discB]);

  const renderDiscItems = () => {
    /*
      Render discArray and return either a DiscItem if a disc is present,
      or and EmptyDiscItem if not. Both components navigate to DiscSearchScreen
      onPress and pass along handleDiscSelect via nav params.    
    */

    const discItemArray = [];

    // Loop twice since array will only hold two possible discs.
    for (let i = 0; i < 2; i++) {
      const placement = i === 0 ? "A" : "B";
      if (discArray[i]) {
        discItemArray.push(
          <DiscItem
            key={`discCompare${i}`}
            discData={discArray[i]}
            onPress={() =>
              props.navigation.navigate("DiscSearch", {
                onDiscSelect: "compare",
                placement: placement,
              })
            }
          />
        );
      } else {
        discItemArray.push(
          <EmptyDiscItem
            key={`emptyDisc=${i}`}
            title={"Select a Disc"}
            icon={<Ionicons name="md-add" size={52} color={AppColors.accent} />}
            onPress={() =>
              props.navigation.navigate("DiscSearch", {
                onDiscSelect: "compare",
                placement: placement,
              })
            }
          />
        );
      }
    }
    return discItemArray;
  };

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.discSelect}>
            {renderDiscItems().map((discComp) => discComp)}
          </View>
          <View style={styles.discChart}>
            <DiscRatingChart data={discArray.filter((disc) => !!disc)} />
          </View>
          <View style={styles.properties}>
            {discArray.map((disc, i) => {
              if (!disc) {
                return null;
              }
              return (
                <DiscPropertyColumn key={`discPropCol-${i + 1}`} disc={disc} />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.darkGrey,
  },
  container: {
    alignItems: "center",
  },
  discSelect: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginVertical: 15,
  },
  discChart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    aspectRatio: 1,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 300,
    borderWidth: 2,
    borderColor: AppColors.accent,
    elevation: 10,
  },
  properties: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginBottom: 20,
  },
  headerContainer: {
    width: '100%',
    marginBottom: 15,
    borderBottomColor: AppColors.accent,
    borderBottomWidth: 1,
  },
  propertyHeader: {
    justifyContent: "center",
    alignItems: "center",
    color: AppColors.white,
    textAlign: "center",
  },
  property: {
    padding: 5,
    color: AppColors.grey,
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: "Compare Discs",
  };
};

export default DiscComparisonScreen;
