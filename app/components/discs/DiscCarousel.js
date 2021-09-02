import React, { useState } from "react";
import { View, FlatList, StyleSheet, ScrollView } from "react-native";

import DiscItem from "./DiscItem";
import { SubHeaderText } from "../ui/AppText";

const DiscCarousel = (props) => {
  const handleDiscSelect = (discData) => {
    props.navigation.navigate("DiscDetail", {
      discAction: {
        status: props.listType,
      },
      discData: discData,
    });
  };

  const renderDiscs = (itemData) => {
    const discData = itemData.item;
    return (
      <DiscItem
        discName={discData.disc.name}
        imageUri={discData.disc.img_url}
        onPress={() => handleDiscSelect(discData)}
      />
    );
  };

  return (
    <View style={styles.listContainer}>
      <SubHeaderText>Trending Discs</SubHeaderText>
      <ScrollView style={styles.discList} horizontal={true}>
        {props.data.map((disc) => {
          return (
            <DiscItem
              discName={disc.disc.name}
              imageUri={disc.disc.img_url}
              onPress={() => handleDiscSelect(disc)}
              style={styles.disc}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
  },
  discList: {
    width: "100%",
  },
  disc: {
    width: 150,
  },
  listRow: {
    flex: 1,
    justifyContent: "space-around",
  },
});

export default DiscCarousel;
