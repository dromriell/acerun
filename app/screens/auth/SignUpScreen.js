import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import * as authActions from "../../store/actions/authActions";

import Input from "../../components/ui/Input";
import StatePicker from "../../components/ui/StatePicker";
import { HeaderText, SubHeaderText } from "../../components/ui/AppText";
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

const SignUpScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [hasChanged, setHasChanged] = useState(false);
  const [signUpConfirmed, setSignUpConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      state: null,
      password: "",
      passwordVerify: "",
    },
    inputValidities: {
      username: false,
      email: false,
      first_name: false,
      last_name: false,
      state: false,
      password: false,
      passwordVerify: false,
    },
    isFormValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("Something Went Wrong...", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const handleSignUpSubmit = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(authActions.signUpUser(formState.inputValues));
      setHasChanged(false);
      setIsLoading(false);
      navigation.navigate("Login", {
        signUpComplete: true,
      });
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleInputChange = useCallback(
    (inputName, inputValue, isInputValid) => {
      if (!hasChanged) {
        setHasChanged(true);
      }
      if (
        // Check if second password matches first password
        inputName === "passwordVerify" &&
        inputValue !== formState.inputValues.password
      ) {
        // If not, mark second password as invalid
        isInputValid = false;
      }
      dispatchFormState({
        type: "FORM_INPUT_UPDATE",
        value: inputValue,
        isValid: isInputValid,
        input: inputName,
      });
    },
    [dispatchFormState, formState.inputValues.password]
  );

  return (
    <View style={styles.screen}>
      <TouchableWithoutFeedback>
        <View style={styles.overlay}></View>
      </TouchableWithoutFeedback>
      <View style={styles.modal}>
        <ScrollView>
          <View style={styles.header}>
            <HeaderText size={32} color={AppColors.accent}>
              Sign Up
            </HeaderText>
          </View>
          <View style={styles.form}>
            <Input
              id="username"
              label="Username*"
              labelStyle={styles.label}
              formControlStyle={styles.input100}
              inputStyle={styles.input}
              keyBoardType="text"
              required
              autoCapitalize="none"
              errorText="Please enter a valid username"
              onInputChange={handleInputChange}
            />
            <Input
              id="email"
              label="Email*"
              email
              labelStyle={styles.label}
              formControlStyle={styles.input100}
              inputStyle={styles.input}
              keyBoardType="text"
              required
              autoCapitalize="none"
              errorText="Please enter a valid email address"
              onInputChange={handleInputChange}
            />
            <View style={styles.formRow}>
              <Input
                id="first_name"
                label="First Name"
                labelStyle={styles.label}
                formControlStyle={styles.input50}
                inputStyle={styles.input}
                keyBoardType="text"
                onInputChange={handleInputChange}
              />
              <Input
                id="last_name"
                label="Last Name"
                labelStyle={styles.label}
                formControlStyle={styles.input50}
                inputStyle={styles.input}
                keyBoardType="text"
                onInputChange={handleInputChange}
              />
            </View>
            <StatePicker
              id="state"
              label="State"
              initialValue=""
              labelStyle={styles.label}
              formControlStyle={
                Platform.OS === "android" ? styles.input100 : {}
              }
              inputStyle={styles.input}
              handleInputChange={handleInputChange}
            />
            <Input
              id="password"
              label="Password*"
              labelStyle={styles.label}
              formControlStyle={styles.input100}
              inputStyle={styles.input}
              required
              password
              secureTextEntry
              keyBoardType="password"
              autoCapitalize="none"
              errorText="Please enter a valid username"
              onInputChange={handleInputChange}
            />
            <Input
              id="passwordVerify"
              label="Confirm Password*"
              labelStyle={styles.label}
              formControlStyle={styles.input100}
              inputStyle={styles.input}
              required
              password
              secureTextEntry
              keyBoardType="password"
              autoCapitalize="none"
              errorText="Please enter a valid username"
              onInputChange={handleInputChange}
            />
          </View>
          <View style={styles.buttonRow}>
            <View style={{ width: "40%" }}>
              <Button
                title="Cancel"
                color={AppColors.red}
                onPress={() => navigation.navigate("Login")}
              />
            </View>
            <View style={{ width: "40%" }}>
              <Button
                title="Sign Up!"
                color={AppColors.primary}
                onPress={handleSignUpSubmit}
                style={{ width: "20%" }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export const screenOptions = () => {
  return {
    headerShown: false,
    presentation: "transparentModal",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: AppColors.blackTrans,
  },
  modal: {
    width: "90%",
    height: "90%",
    backgroundColor: AppColors.darkGrey,
    borderRadius: 10,
    elevation: 5,
  },
  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  formRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  label: { color: AppColors.white },
  input25: { width: "30%", marginVertical: 0 },
  input50: { width: "45%", marginVertical: 0 },
  input75: { width: "60%", marginVertical: 0 },
  input100: { width: "95%", marginVertical: 5 },
  input: { borderRadius: 10, width: "105%", paddingHorizontal: 10 },
  buttonRow: {
    flexDirection: "row",
    marginVertical: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default SignUpScreen;
