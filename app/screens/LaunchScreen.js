import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authActions from "../store/actions/authActions";
import * as discActions from "../store/actions/discsActions";
import AppColors from "../utils/AppColors";

const LaunchScreen = (props) => {
  const dispatch = useDispatch();
  /**
   * Login if userData in storage. Expiration handling needs to be addressed.
   */
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Login");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { userId, token, profile } = transformedData;

      // const expirationDate = new Date(expiryDate);
      // if (expirationDate <= new Date() || !token || !userId) {
      //   props.navigation.navigate("Login");
      //   return;
      // }

      // const expirationTime = expirationDate.getTime() - new Date().getTime();
      dispatch(authActions.authenticate(userId, token, profile));
      dispatch(discActions.fetchUserDiscs(token));
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={AppColors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LaunchScreen;
