import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStackNavigator, AppNavigator } from "./AppNavigator";
import AppTheme from "../utils/AppTheme";

const NavigationRouter = (props) => {
  const isAuth = useSelector((state) => {
    return !!state.auth.token;
  });

  return (
    <NavigationContainer theme={AppTheme}>
      {isAuth ? <AppNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default NavigationRouter;
