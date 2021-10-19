import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as discActions from "../../store/actions/discsActions";

import DiscHomeMenu from "../../components/discs/DiscHomeMenu";
import DiscCarousel from "../../components/discs/DiscCarousel";
import SearchBar from "../../components/ui/SearchBar";

import AppColors from "../../utils/AppColors";
import { SubHeaderText } from "../../components/ui/AppText";

const DiscsOverviewScreen = (props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const overviewDiscs = useSelector((state) => state.discs.overviewDiscs);

  const loadUserDiscs = useCallback(async () => {
    setError(null);
    try {
      await dispatch(discActions.fetchOverviewDiscs());
    } catch (error) {
      setError(error.message);
    }
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadUserDiscs().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadUserDiscs, setError]);

  if (error) {
    return (
      <View>
        <Text>An Error Occured</Text>
        <Button
          title="Try Again"
          onPress={loadUserDiscs}
          color={AppColors.primary}
        />
      </View>
    );
  }

  if (!isLoading && overviewDiscs.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No discs found! Start adding some!</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={AppColors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView>
        <DiscHomeMenu navigation={props.navigation} />
        <DiscCarousel
          data={[]} // Currently no endpoint.
          title={"Trending Discs"}
          navigation={props.navigation}
        />
        <DiscCarousel
          data={[]} // Currently no endpoint.
          title={"New Discs"}
          navigation={props.navigation}
        />
      </ScrollView>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerLeft: () => {},
    headerTitle: () => (
      <SearchBar
        placeholder="Search Discs..."
        onPress={() => navData.navigation.navigate("DiscSearch")}
        button
      />
    ),
    headerTitleAlign: "center",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.darkGrey,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 10,
  },
  centered: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DiscsOverviewScreen;
