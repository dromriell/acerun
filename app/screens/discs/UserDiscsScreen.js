import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as discActions from "../../store/actions/discsActions";

import DiscList from "../../components/discs/DiscList";

import AppColors from "../../utils/AppColors";

const UserDiscsScreen = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useSelector((state) => state.auth.token);
  const userDiscs = useSelector((state) => state.discs.userDiscs);

  const loadUserDiscs = useCallback(async () => {
    setError(null);
    try {
      await dispatch(discActions.fetchUserDiscs(token));
    } catch (error) {
      setError(error.message);
    }
  }, [dispatch, setError]);

  useEffect(() => {
    const clearSearch = navigation.addListener("focus", () => {
      setIsLoading(true);
      loadUserDiscs().then(() => {
        setIsLoading(false);
      });
    });

    return clearSearch;
  }, [navigation, dispatch, loadUserDiscs, setError]);

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

  if (isLoading) {
    return (
      <View style={{ ...styles.screen, ...styles.loading }}>
        <ActivityIndicator size="large" color={AppColors.accent} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <DiscList data={userDiscs} navigation={props.navigation} />
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "My Discs",
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
});

export default UserDiscsScreen;
