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
  const { speed, glide, turn, fade } = props;
  return (
    <View style={styles.flightRating}>
      <Text style={styles.flightLabel}>
        <BodyText style={styles.flightType}>S</BodyText>
        <HeaderText style={styles.flightValue}>{speed}</HeaderText>
      </Text>
      <Text style={styles.flightLabel}>
        <BodyText style={styles.flightType}>G</BodyText>
        <HeaderText style={styles.flightValue}>{glide}</HeaderText>
      </Text>
      <Text style={styles.flightLabel}>
        <BodyText style={styles.flightType}>T</BodyText>
        <HeaderText style={styles.flightValue}>{turn}</HeaderText>
      </Text>
      <Text style={styles.flightLabel}>
        <BodyText style={styles.flightType}>F</BodyText>
        <HeaderText style={styles.flightValue}>{fade}</HeaderText>
      </Text>
    </View>
  );
};

export const EmptyDiscItem = (props) => {
  const TouchComp =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return (
    <View style={{ ...styles.discContainer, ...props.style }}>
      <View style={styles.touchableEmpty}>
        <TouchComp onPress={props.onPress} useForeground>
          <View style={styles.emptyInfo}>
            <SubHeaderText>{props.title}</SubHeaderText>
            <BodyText>{props.body}</BodyText>
            {props.icon}
          </View>
        </TouchComp>
      </View>
    </View>
  );
};

const DiscItem = (props) => {
  const { discData } = props;
  const disc = discData.disc ? discData.disc : discData;

  const TouchComp =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return (
    <View style={{ ...styles.discContainer, ...props.style }}>
      <View style={styles.touchableDI}>
        <TouchComp onPress={props.onPress} useForeground>
          <View style={styles.discInfo}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: disc.img_url }} style={styles.image} />
            </View>
            <FlightRatingBar
              speed={disc.speed}
              glide={disc.glide}
              turn={disc.turn}
              fade={disc.fade}
            />
          </View>
        </TouchComp>
      </View>
      <View style={styles.discCardHeader}>
        <SubHeaderText style={styles.discHeaderText} numberOfLines={1}>
          {disc.name}
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
    width: 150,
    aspectRatio: 1,
    maxWidth: "45%",
    margin: 5,
  },
  touchableDI: {
    width: "100%",
    height: "80%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  touchableEmpty: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  emptyInfo: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  discInfo: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  discCardHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
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
