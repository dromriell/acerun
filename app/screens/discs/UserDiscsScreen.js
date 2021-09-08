import React, { useEffect, useState, useCallback, useRef } from "react";
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

  if (!isLoading && userDiscs.length === 0) {
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

  return <DiscList data={userDiscs} navigation={props.navigation} />;
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "My Discs",
  };
};

const styles = StyleSheet.create({});

export default UserDiscsScreen;
