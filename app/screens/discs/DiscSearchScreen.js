import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import * as discActions from "../../store/actions/discsActions";

import SearchBar from "../../components/ui/SearchBar";
import DiscList from "../../components/discs/DiscList";

import { SubHeaderText } from "../../components/ui/AppText";
import AppColors from "../../utils/AppColors";

const DiscSearchScreen = (props) => {
  const dispatch = useDispatch();
  const { navigation, route } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useSelector((state) => state.auth.token);
  const searchResults = useSelector((state) => state.discs.searchResults);

  const minSearchTermLength = 3;

  const handleSearch = useCallback(
    async (term) => {
      if (term.length < minSearchTermLength) {
        dispatch(discActions.resetSearch());
        return;
      }
      setError(null);
      setIsLoading(true);
      try {
        await dispatch(discActions.searchDiscs(token, term));
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    },
    [dispatch, setError]
  );

  /**
   * Only called if this screen is navigated to from the disc comparison screen.
   */
  const handleDiscCompareSelect = (disc, placement) => {
    dispatch(discActions.addComparisonDisc(placement, disc));
    props.navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <SearchBar
          placeholder="Search Discs..."
          onPress={() => navData.navigation.navigate("DiscSearch")}
          onSearch={(text) => handleSearch(text)}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const clearSearch = navigation.addListener("beforeRemove", () => {
      dispatch(discActions.resetSearch());
    });

    return clearSearch;
  }, [navigation]);

  if (error) {
    return (
      <View style={styles.screen}>
        <SubHeaderText color={AppColors.red}>An Error Occured</SubHeaderText>
      </View>
    );
  }

  if (!isLoading && searchResults.length === 0) {
    return (
      <View style={styles.screen}>
        <SubHeaderText color={AppColors.white}>No discs found</SubHeaderText>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color={AppColors.primary} />
      </View>
    );
  }

  return (
    <DiscList
      data={searchResults}
      navigation={navigation}
      onDiscSelect={
        route.params?.onDiscSelect === "compare"
          ? (disc) => handleDiscCompareSelect(disc, route.params.placement)
          : null
      }
    />
  );
};

export const screenOptions = () => {
  return {
    animationEnabled: false,
    headerTitleAlign: "center",
    headerTitleStyle: {
      height: 30,
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.darkGrey,
  },
});

export default DiscSearchScreen;
