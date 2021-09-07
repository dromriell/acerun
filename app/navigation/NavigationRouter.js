import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStackNavigator, AppNavigator } from "./AppNavigator";

const NavigationRouter = (props) => {
  const navRef = useRef();
  const isAuth = false;
  //   const isAuth = useSelector((state) => {
  //     return !!state.auth.token;
  //   });

  //   useEffect(() => {
  //     if (!isAuth && navRef) {
  //       navRef.current.dispatch(
  //         NavigationActions.navigate({ routeName: "Auth" })
  //       );
  //     }
  //   }, [isAuth]);

  return (
    <NavigationContainer>
      {isAuth ? <AppNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default NavigationRouter;
