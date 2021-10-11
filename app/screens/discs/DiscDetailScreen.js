import React, {
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
} from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import HeaderButton from "../../components/ui/HeaderButton";
import DiscRatingChart from "../../components/discs/DiscRatingChart";
import * as discActions from "../../store/actions/discsActions";
import { discDetailEP } from "../../utils/apiEndPoints";

import {
  HeaderText,
  SubHeaderText,
  BodyText,
} from "../../components/ui/AppText";
import AppColors from "../../utils/AppColors";

const StatCard = (props) => {
  /*
   Component organizes disc properties explicitly passed down to it. Used to
   seperate physical disc traits and user stats. Takes a 'header'(string),
   'stats'(array), and 'labels'(array) props. The values of 'stats' and
   'labels' are linked by their indexes and should be ordered together.
  */

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

const DiscsDetailScreen = (props) => {
  /*
   Screen for displaying detailed info about a given disc. Is passed down a disc id
   from parent screen via navigation props.
  */
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isScreenLoading, setIsScreenLoading] = useState(true);
  const [error, setError] = useState();

  const [isUserDisc, setIsUserDisc] = useState(false);
  const [disc, setDisc] = useState(null);

  const { navigation } = props;
  const { discId, userDiscId } = props.route.params;

  const token = useSelector((state) => state.auth.token);
  const profileId = useSelector((state) => state.auth.profile.id);
  const userDiscs = useSelector((state) => state.discs.userDiscs);

  const loadDisc = useCallback(async () => {
    /*
     Loads the target disc data from API and sets the disc state.
    */
    setError(null);
    try {
      const response = await fetch(`${discDetailEP}${discId}/`, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      const discDataResponse = await response.json();
      setDisc(discDataResponse);
    } catch (error) {
      setError(error.message);
    }
  }, [dispatch, setError]);

  useEffect(() => {
    loadDisc();
  }, []);

  useEffect(() => {
    // Check if the target disc is currently in userDiscs
    const currentArray = userDiscs.filter((targetDisc) => {
      if (targetDisc) {
        return targetDisc.disc.id === discId;
      }
      return false;
    });

    // Set isUserDisc and change screenLoading to false.
    setIsUserDisc(currentArray.length > 0);
    setIsScreenLoading(false);
  }, [disc]);

  const handleDiscAdd = useCallback(async () => {
    /*
     Handle adding disc to user bag.
    */
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(discActions.addDiscToUserBag(token, profileId, discId));
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setIsUserDisc(true);
    setIsLoading(false);
  }, [dispatch, setError, setIsLoading, setIsUserDisc]);

  const handleDiscRemove = useCallback(async () => {
    /*
     Handle removing disc to user bag.
    */
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(discActions.removeDiscFromUserBag(token, userDiscId));
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setIsUserDisc(false);
    setIsLoading(false);
  }, [dispatch, setError, setIsLoading, setIsUserDisc]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (isLoading) {
          return (
            <View style={styles.headerRightContainer}>
              <ActivityIndicator size="small" color={AppColors.accent} />
            </View>
          );
        }
        if (!isUserDisc) {
          return (
            <View style={styles.headerRightContainer}>
              <HeaderButton
                iconName="add-circle-outline"
                size={35}
                color={AppColors.accent}
                onPress={handleDiscAdd}
              />
            </View>
          );
        }
        return (
          <View style={styles.headerRightContainer}>
            <HeaderButton
              iconName="remove-circle"
              size={35}
              onPress={handleDiscRemove}
              color={AppColors.accent}
            />
          </View>
        );
      },
    });
  }, [navigation, isUserDisc, isLoading]);

  if (isScreenLoading || !disc) {
    return (
      <View style={{ ...styles.screen, ...styles.loading }}>
        <ActivityIndicator size="large" color={AppColors.accent} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scroll}>
        <View style={styles.scrollContent}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: disc.img_url }} style={styles.image} />
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
                {disc.type_display.toUpperCase()}
              </SubHeaderText>
            </View>
          </View>
          <View style={styles.detailHeader}>
            <HeaderText style={styles.detailHeaderText}>
              {disc.manufacturer.name} {disc.name}
            </HeaderText>
          </View>
          <View style={styles.discChart}>
            <DiscRatingChart data={[disc]} />
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
  return {
    headerTitle: "",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.darkGrey,
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
  },
  scroll: {
    width: "100%",
  },
  headerRightContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 11,
    marginVertical: 3,
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
    color: AppColors.white,
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
    color: AppColors.white,
  },
  dataContainer: {
    width: "50%",
    marginVertical: 5,
  },
  dataLabel: {
    fontSize: 16,
    color: AppColors.grey,
  },
  data: {
    color: AppColors.white,
  },
  dataCard: {
    justifyContent: "space-around",
    alignItems: "flex-start",
    width: "50%",
    padding: 5,
    borderRadius: 10,
  },
  dataCardText: {
    color: AppColors.white,
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
});

export default DiscsDetailScreen;
