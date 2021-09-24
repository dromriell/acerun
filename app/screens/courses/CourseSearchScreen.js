import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SubHeaderText } from "../../components/ui/AppText";

//  import * as discActions from "../../store/actions/discsActions";

import SearchBar from "../../components/ui/SearchBar";
//  import DiscList from "../../components/discs/DiscList";

import AppColors from "../../utils/AppColors";

const CourseSearchScreen = (props) => {
  const dispatch = useDispatch();
  const { navigation, route } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useSelector((state) => state.auth.token);
  const searchResults = useSelector((state) => state.discs.searchResults);

  console.log(route);

  const handleSearch = useCallback(
    async (term) => {
      if (term.length < 3) {
        //   dispatch(discActions.resetSearch());
        return;
      }
      setError(null);
      setIsLoading(true);
      try {
        // await dispatch(discActions.searchDiscs(token, term));
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    },
    [dispatch, setError]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <SearchBar
          placeholder="Search Courses..."
          onPress={() => navData.navigation.navigate("CourseSearch")}
          onSearch={(text) => handleSearch(text)}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const clearSearch = navigation.addListener("beforeRemove", () => {
      // dispatch(discActions.resetSearch());
    });

    return clearSearch;
  }, [navigation]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An Error Occured</Text>
      </View>
    );
  }

  if (!isLoading && searchResults.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No courses found</Text>
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
    //   <DiscList
    //     data={searchResults}
    //     navigation={navigation}
    //     onDiscSelect={route.params?.onDiscSelect}
    //   />
    <View>
      <SubHeaderText>RESULTS</SubHeaderText>
    </View>
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.white,
  },
});

export default CourseSearchScreen;
