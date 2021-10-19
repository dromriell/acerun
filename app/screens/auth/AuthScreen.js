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
  Image,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import * as authActions from "../../store/actions/authActions";

import Input from "../../components/ui/Input";
import AppColors from "../../utils/AppColors";
import { HeaderText } from "../../components/ui/AppText";
import UpdateBadge from "../../components/ui/UpdateBadge";

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
  const { navigation, route } = props;
  const { signUpComplete } = route?.params || false;

  const [isSignUpConfirmed, setIsSignUpConfirmed] = useState(signUpComplete);
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
    if (signUpComplete) {
      setIsSignUpConfirmed(signUpComplete);
    }
  }, [signUpComplete]);

  useEffect(() => {
    if (isSignUpConfirmed) {
      setTimeout(() => {
        route.params.signUpComplete = false;
        setIsSignUpConfirmed(false);
      }, 5000);
    }
  }, [isSignUpConfirmed, setIsSignUpConfirmed]);

  useEffect(() => {
    if (error) {
      Alert.alert("Something Went Wrong...", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const handleAuthSubmit = async () => {
    await Keyboard.dismiss();
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(
        authActions.login(
          formState.inputValues.username,
          formState.inputValues.password
        )
      );
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

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior="height"
      keyboardShouldPersistTaps={"handled"}
    >
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
      <View style={styles.container}>
        {isSignUpConfirmed && <UpdateBadge message={"Sign up successful!"} />}
        <View style={styles.brandContainer}>
          <View
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              backgroundColor: AppColors.primary,
              borderBottomLeftRadius: 50,
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
            }}
          ></View>
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/icons/bitmap.png")}
              style={styles.icon}
            />
          </View>
        </View>
        <View style={styles.authCard}>
          <View
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              backgroundColor: AppColors.darkGrey,
              borderBottomRightRadius: 50,
              borderTopRightRadius: 50,
              borderBottomLeftRadius: 50,
            }}
          ></View>
          <View style={styles.loginForm}>
            <Input
              id="username"
              icon={
                <Ionicons
                  name="person"
                  size={24}
                  color={AppColors.primary}
                  style={styles.inputIcon}
                />
              }
              label="Username"
              formControlStyle={styles.formControl}
              inputContainerStyle={styles.inputContainer}
              labelStyle={styles.label}
              inputStyle={styles.input}
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
                  color={AppColors.primary}
                  style={styles.inputIcon}
                />
              }
              label="Password"
              formControlStyle={styles.formControl}
              inputContainerStyle={styles.inputContainer}
              labelStyle={styles.label}
              inputStyle={styles.input}
              keyBoardType="password"
              secureTextEntry
              required
              autoCapitalize="none"
              errorText="Invalid Password"
              onInputChange={handleInputChange}
              initialValue=""
            />
            <View style={styles.buttonGroup}>
              <View style={styles.buttonContainer}>
                {isLoading ? (
                  <ActivityIndicator size="small" color={AppColors.primary} />
                ) : (
                  <Button
                    title="Login"
                    color={AppColors.primary}
                    onPress={handleAuthSubmit}
                    disabled={!formState.isFormValid}
                  />
                )}
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title="Sign-Up"
                  color={AppColors.accent}
                  onPress={() => navigation.navigate("SignUp")}
                />
              </View>
            </View>
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
    top: 0,
    left: 0,
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
  container: {
    width: "100%",
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
    minHeight: Dimensions.get("screen").height * 0.9,
  },
  brandContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    height: "37%",
    backgroundColor: AppColors.darkGrey,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    aspectRatio: 1.064516,
    borderRadius: 100,
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  authCard: {
    alignItems: "center",
    width: "90%",
    height: "63%",
    maxHeight: 350,
    backgroundColor: AppColors.primary,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  loginForm: {
    width: "90%",
    alignItems: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  buttonContainer: {
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    width: "45%",
    paddingVertical: 5,
  },
  formControl: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 0,
  },
  inputContainer: {
    height: 45,
    width: "90%",
  },
  input: {
    backgroundColor: AppColors.white,
    paddingHorizontal: 10,
  },
  label: {
    color: AppColors.grey,
  },
  inputIcon: {
    textAlignVertical: "center",
    textAlign: "center",
    height: "100%",
    aspectRatio: 1,
    backgroundColor: AppColors.accent,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default AuthScreen;
