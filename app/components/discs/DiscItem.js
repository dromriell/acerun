import React from "react";
import {
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  Image,
  Text,
  Platform,
} from "react-native";
import { BodyText, SubHeaderText, HeaderText } from "../ui/AppText";

import AppColors from "../../utils/AppColors";

const FlightRatingBar = (props) => {
  return (
    <View style={styles.flightRating}>
      <Text style={styles.flightLabel}>
        <BodyText style={styles.flightType}>S</BodyText>
        <HeaderText style={styles.flightValue}>1</HeaderText>
      </Text>
      <Text style={styles.flightLabel}>
        <BodyText style={styles.flightType}>G</BodyText>
        <HeaderText style={styles.flightValue}>1</HeaderText>
      </Text>
      <Text style={styles.flightLabel}>
        <BodyText style={styles.flightType}>T</BodyText>
        <HeaderText style={styles.flightValue}>1</HeaderText>
      </Text>
      <Text style={styles.flightLabel}>
        <BodyText style={styles.flightType}>F</BodyText>
        <HeaderText style={styles.flightValue}>1</HeaderText>
      </Text>
    </View>
  );
};

const DiscItem = (props) => {
  const TouchComp =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return (
    <View style={{ ...styles.discContainer, ...props.style }}>
      <View style={styles.touchable}>
        <TouchComp onPress={props.onPress} useForeground>
          <View style={styles.discInfo}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: props.imageUri }} style={styles.image} />
            </View>
            <FlightRatingBar />
          </View>
        </TouchComp>
      </View>
      <View style={styles.discCardHeader}>
        <SubHeaderText style={styles.discHeaderText}>
          {props.discName}
        </SubHeaderText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  discContainer: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 150,
    width: "40%",
    margin: 5,
  },
  touchable: {
    width: "100%",
    height: "80%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  discInfo: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  discCardHeader: {
    color: "black",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    height: "20%",
    paddingHorizontal: 5,
    zIndex: 10,
  },
  discHeaderText: {
    color: AppColors.black,
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  flightRating: {
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "25%",
    backgroundColor: AppColors.blackTrans,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  flightType: {
    color: AppColors.grey,
  },
  flightValue: {
    color: AppColors.white,
  },
});

export default DiscItem;
