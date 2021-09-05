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

const StatCard = (props) => {
  return (
    <View style={styles.dataDeck}>
      <SubHeaderText style={styles.dataHeader}>{props.header}</SubHeaderText>
      {props.stats.map((stat, i) => {
        return (
          <View key={`discStat-${stat}-${i}`} style={styles.dataContainer}>
            <SubHeaderText style={styles.dataLabel}>
              {props.labels[i]}
            </SubHeaderText>
            <BodyText style={styles.data}>{stat}</BodyText>
          </View>
        );
      })}
    </View>
  );
};

const DiscsOverviewScreen = (props) => {
  const { discData } = props.route.params;
  const disc = discData.disc ? discData.disc : discData;

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
                <SubHeaderText style={styles.flightValue}>
                  {disc.speed}
                </SubHeaderText>
              </View>
              <View style={styles.ratingContainer}>
                <SubHeaderText style={styles.flightType}>GLIDE</SubHeaderText>
                <SubHeaderText style={styles.flightValue}>
                  {disc.glide}
                </SubHeaderText>
              </View>
              <View style={styles.ratingContainer}>
                <SubHeaderText style={styles.flightType}>TURN</SubHeaderText>
                <SubHeaderText style={styles.flightValue}>
                  {disc.turn}
                </SubHeaderText>
              </View>
              <View style={styles.ratingContainer}>
                <SubHeaderText style={styles.flightType}>FADE</SubHeaderText>
                <SubHeaderText style={styles.flightValue}>
                  {disc.fade}
                </SubHeaderText>
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
            <DiscRatingChart data={[discData]} />
          </View>
          <StatCard
            header="Properties"
            labels={[
              "Flexibility",
              "Weight",
              "Height",
              "Rim Depth",
              "Rim Thickness",
              "Rim/Diameter",
            ]}
            stats={[
              disc.flexibility,
              `${disc.weight} g`,
              disc.height,
              disc.rim_depth,
              disc.rim_thickness,
              disc.rim_depth_to_diameter,
            ]}
          />
          <StatCard
            header={"User Stats"}
            labels={["Throws", "Avg Dist", "Fav Throw"]}
            stats={[disc.flexibility, `${disc.weight} g`, disc.height]}
          />
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
    fontSize: 24,
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
    flexWrap: "wrap",
    width: "90%",
    padding: 10,
    marginVertical: 15,
  },
  dataHeader: {
    width: "100%",
    marginBottom: 15,
    fontSize: 21,
    borderBottomColor: AppColors.accent,
    borderBottomWidth: 1,
    color: AppColors.black,
  },
  dataContainer: {
    width: "50%",
    marginVertical: 5,
  },
  dataLabel: {
    fontSize: 16,
    color: AppColors.blackTrans,
  },
  data: {},
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
    width: "90%",
    height: 350,
    marginVertical: 10,
  },
});

export default DiscsOverviewScreen;
