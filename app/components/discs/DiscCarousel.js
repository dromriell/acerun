import React, { useState } from "react";
import { View, FlatList, StyleSheet, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import DiscItem from "./DiscItem";
import { SubHeaderText } from "../ui/AppText";
import AppColors from "../../utils/AppColors";

const EmptyListPlaceHolder = (props) => {
  return (
    <View style={styles.placeholder}>
      <MaterialIcons
        name={"error-outline"}
        size={30}
        color={AppColors.accent}
      />
      <SubHeaderText>No Discs Found</SubHeaderText>
    </View>
  );
};

const DiscCarousel = (props) => {
  const handleDiscSelect = (discData) => {
    props.navigation.navigate("DiscDetail", {
      discAction: {
        status: props.listType,
      },
      discData: discData,
    });
  };

  return (
    <View style={styles.listContainer}>
      <SubHeaderText>{props.title}</SubHeaderText>
      {props.data.length > 0 ? (
        <ScrollView style={styles.discList} horizontal={true}>
          {props.data.map((disc) => {
            return (
              <DiscItem
                key={disc.disc.id}
                discName={disc.disc.name}
                imageUri={disc.disc.img_url}
                onPress={() => handleDiscSelect(disc)}
                style={styles.disc}
              />
            );
          })}
        </ScrollView>
      ) : (
        <EmptyListPlaceHolder />
      )}
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
  placeholder: {
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
  },
});

export default DiscCarousel;
