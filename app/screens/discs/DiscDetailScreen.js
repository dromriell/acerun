import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import HeaderButton from "../../components/ui/HeaderButton";
import DiscRatingChart from "../../components/discs/DiscRatingChart";

import {
  HeaderText,
  SubHeaderText,
  BodyText,
} from "../../components/ui/AppText";
import AppColors from "../../utils/AppColors";

const DiscsOverviewScreen = (props) => {
  const { discData } = props.route.params;
  console.log(props.route.params);
  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scroll}>
        <View style={styles.scrollContent}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: discData.disc.img_url }}
              style={styles.image}
            />
            <View style={styles.flightRating}>
              <View style={styles.ratingContainer}>
                <SubHeaderText style={styles.flightType}>SPEED</SubHeaderText>
                <SubHeaderText style={styles.flightValue}>1</SubHeaderText>
              </View>
              <View style={styles.ratingContainer}>
                <SubHeaderText style={styles.flightType}>GLIDE</SubHeaderText>
                <SubHeaderText style={styles.flightValue}>1</SubHeaderText>
              </View>
              <View style={styles.ratingContainer}>
                <SubHeaderText style={styles.flightType}>TURN</SubHeaderText>
                <SubHeaderText style={styles.flightValue}>1</SubHeaderText>
              </View>
              <View style={styles.ratingContainer}>
                <SubHeaderText style={styles.flightType}>FADE</SubHeaderText>
                <SubHeaderText style={styles.flightValue}>1</SubHeaderText>
              </View>
            </View>
            <View style={styles.discType}>
              <SubHeaderText style={styles.discTypeText}>
                {discData.disc.type_display.toUpperCase()}
              </SubHeaderText>
            </View>
          </View>
          <View style={styles.detailHeader}>
            <HeaderText style={styles.detailHeaderText}>
              {discData.disc.manufacturer.name} {discData.disc.name}
            </HeaderText>
          </View>
          <View style={styles.discChart}>
            <DiscRatingChart />
          </View>
          <View style={styles.dataDeck}>
            <View style={styles.dataCard}>
              <BodyText style={styles.dataCardText}>
                Flexibility: {discData.disc.flexibility}
              </BodyText>
              <BodyText style={styles.dataCardText}>
                Max Weight : {discData.disc.weight}
              </BodyText>
              <BodyText style={styles.dataCardText}>
                Height : {discData.disc.height}
              </BodyText>
            </View>
            <View style={styles.dataCard}>
              <BodyText style={styles.dataCardText}>
                Rim Depth : {discData.disc.rim_depth}
              </BodyText>
              <BodyText style={styles.dataCardText}>
                Rim Thickness : {discData.disc.rim_thickness}
              </BodyText>
              <BodyText style={styles.dataCardText}>
                Rim Dep/Dia : {discData.disc.rim_depth_to_diameter}
              </BodyText>
            </View>
          </View>
          <View style={styles.dataDeck}>
            <View style={styles.dataCard}>
              <BodyText style={styles.dataCardText}>
                Throws : {discData.disc.flexibility}
              </BodyText>
              <BodyText style={styles.dataCardText}>
                Avg Dist : {discData.disc.weight}
              </BodyText>
              <BodyText style={styles.dataCardText}>
                Fav Throw : {discData.disc.height}
              </BodyText>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export const screenOptions = (navData) => {
  const { discAction } = navData.route.params;
  return {
    headerTitle: "",
    headerRight: () => {
      if (discAction.status !== "owned") {
        return (
          <HeaderButton
            iconName="add-circle-outline"
            size={30}
            color={AppColors.green}
          />
        );
      }
      return (
        <HeaderButton
          iconName="remove-circle"
          size={30}
          onPress={() => console.log("Remove this disc")}
          color={AppColors.red}
        />
      );
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  scroll: {
    width: "100%",
  },
  scrollContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  detailHeader: {
    height: 75,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  detailHeaderText: {
    color: AppColors.black,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 300,
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  flightRating: {
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    height: "20%",
    backgroundColor: AppColors.blackTrans,
  },
  discType: {
    position: "absolute",
    bottom: "20%",
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.primary,
    borderTopLeftRadius: 55,
    width: 200,
    height: "10%",
  },
  discTypeText: {
    color: AppColors.white,
  },
  ratingContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  flightType: {
    color: AppColors.accent,
  },
  flightValue: {
    color: AppColors.white,
  },
  dataDeck: {
    flexDirection: "row",
    width: "90%",
    elevation: 3,
    padding: 10,
    borderRadius: 3,
  },
  dataCard: {
    justifyContent: "space-around",
    alignItems: "flex-start",
    width: "50%",
    padding: 5,
    borderRadius: 10,
  },
  dataCardText: {
    color: AppColors.black,
  },
  discChart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    borderRadius: 3,
    width: "90%",
    height: 300,
  },
});

export default DiscsOverviewScreen;
