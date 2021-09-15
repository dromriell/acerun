import React, { useState, useReducer, useCallback, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  StyleSheet,
  Button,
  ImageBackground,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/authActions";
import Input from "../../components/ui/Input";

import { Ionicons } from "@expo/vector-icons";
import AppColors from "../../utils/AppColors";

const formReducer = (state, action) => {
  switch (action.type) {
    case "FORM_INPUT_UPDATE":
      const updateValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };
      let isUpdatedFormValid = true;
      for (const [key, value] of Object.entries(updatedValidities)) {
        isUpdatedFormValid = isUpdatedFormValid && value;
      }
      return {
        ...state,
        inputValues: updateValues,
        inputValidities: updatedValidities,
        isFormValid: isUpdatedFormValid,
      };
    default:
      return state;
  }
};

const AuthScreen = (props) => {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: "",
      password: "",
    },
    inputValidities: {
      username: false,
      password: false,
    },
    isFormValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("Something Went Wrong...", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const handleAuthSubmit = async () => {
    const here = await Keyboard.dismiss();
    const action = isSignUp
      ? authActions.signup(
          formState.inputValues.username,
          formState.inputValues.password
        )
      : authActions.login(
          formState.inputValues.username,
          formState.inputValues.password
        );
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleInputChange = useCallback(
    (inputName, inputValue, isInputValid) => {
      dispatchFormState({
        type: "FORM_INPUT_UPDATE",
        value: inputValue,
        isValid: isInputValid,
        input: inputName,
      });
    },
    [dispatchFormState]
  );

  const handleSignUpToggle = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <ImageBackground
        source={require("../../assets/images/disc-golf-4985907_960_720.jpg")}
        style={styles.backgroundImage}
      >
        <LinearGradient
          // Background Linear Gradient
          colors={[AppColors.blue, AppColors.black, AppColors.green]}
          style={styles.background}
          start={{ x: 1.1, y: 0.9 }}
        />
      </ImageBackground>
      <View style={styles.authCard}>
        <View style={styles.loginForm}>
          <Input
            id="username"
            icon={
              <Ionicons
                name="person"
                size={24}
                color={AppColors.accent}
                style={styles.inputIcon}
              />
            }
            label="Username"
            labelStyle={styles.label}
            keyBoardType="text"
            required
            autoCapitalize="none"
            errorText="Please enter a valid username"
            onInputChange={handleInputChange}
            initialValue=""
          />
          <Input
            id="password"
            icon={
              <Ionicons
                name="md-lock-closed"
                size={24}
                color={AppColors.accent}
                style={styles.inputIcon}
              />
            }
            label="Password"
            labelStyle={styles.label}
            keyBoardType="password"
            secureTextEntry
            required
            autoCapitalize="none"
            errorText="Invalid Password"
            onInputChange={handleInputChange}
            initialValue=""
          />
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={AppColors.primary} />
            ) : (
              <Button
                title={isSignUp ? "Sign-Up" : "Login"}
                color={AppColors.primary}
                onPress={handleAuthSubmit}
              />
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={`Switch to ${isSignUp ? "Login" : "Sign-Up"}`}
              color={AppColors.accent}
              onPress={handleSignUpToggle}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    position: "absolute",
    height: "100%",
    width: "100%",
    flex: 1,
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    opacity: 0.7,
  },
  authCard: {
    alignItems: "center",
    width: "80%",
    height: 300,
    backgroundColor: AppColors.blackTrans,
    borderRadius: 10,
  },
  loginForm: {
    width: "90%",
  },
  buttonContainer: {
    marginTop: 10,
  },
  label: {
    color: AppColors.white,
  },
  inputIcon: {
    textAlignVertical: "center",
    textAlign: "center",
    width: "10%",
    height: "100%",
    backgroundColor: AppColors.white,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default AuthScreen;
