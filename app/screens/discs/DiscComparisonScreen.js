import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
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
      <SubHeaderText style={styles.propertyHeader}>
        {disc.name || "---"}
      </SubHeaderText>
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
  const [discA, setDiscA] = useState(null);
  const [discB, setDiscB] = useState(null);

  const handleDiscSelect = (disc, targetIndex) => {
    console.log(disc, targetIndex);
    /*
      Handles the assignment of discs selected from the DiscSearchScreen.
      Navigates back to this screen once done. Function is passed up stack
      via navigation route params.
    */
    if (targetIndex === 0) {
      setDiscA(disc);
    } else if (targetIndex === 1) {
      setDiscB(disc);
    }
    props.navigation.goBack();
  };

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
      if (discArray[i]) {
        discItemArray.push(
          <DiscItem
            discData={discArray[i]}
            onPress={() =>
              props.navigation.navigate("DiscSearch", {
                onDiscSelect: (disc) => handleDiscSelect(disc, i),
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
                onDiscSelect: (disc) => handleDiscSelect(disc, i),
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
    width: "90%",
    marginBottom: 20,
  },
  propertyHeader: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: AppColors.accent,
  },
  property: {
    padding: 5,
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: "Compare Discs",
  };
};

export default DiscComparisonScreen;
