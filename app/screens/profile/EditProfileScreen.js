import React, { useReducer, useEffect, useState, useCallback } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Button } from "react-native";
import { useDispatch } from "react-redux";
import Input from "../../components/ui/Input";

import { Ionicons } from "@expo/vector-icons";
import AppColors from "../../utils/AppColors";

import {
  BodyText,
  HeaderText,
  SubHeaderText,
} from "../../components/ui/AppText";

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

const EditProfileScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: "",
      city: "",
      state: "",
    },
    inputValidities: {
      username: false,
      city: false,
      state: false,
    },
    isFormValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("Something Went Wrong...", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const handleEditSubmit = async () => {
    const here = await Keyboard.dismiss();
    // authActions.login(
    //      formState.inputValues.username,
    //      formState.inputValues.password
    //    );
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

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <View style={styles.form}>
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
          id="city"
          icon={
            <Ionicons
              name="md-lock-closed"
              size={24}
              color={AppColors.accent}
              style={styles.inputIcon}
            />
          }
          label="City"
          labelStyle={styles.label}
          keyBoardType="text"
          autoCapitalize="none"
          errorText="Invalid City"
          onInputChange={handleInputChange}
          initialValue=""
          max={20}
        />
        <Input
          id="state"
          icon={
            <Ionicons
              name="md-lock-closed"
              size={24}
              color={AppColors.accent}
              style={styles.inputIcon}
            />
          }
          label="State"
          labelStyle={styles.label}
          keyBoardType="text"
          autoCapitalize="none"
          errorText="Invalid State"
          onInputChange={handleInputChange}
          initialValue=""
          max={2}
        />
        <View style={styles.buttonContainer}>
          {isLoading ? (
            <ActivityIndicator size="small" color={AppColors.primary} />
          ) : (
            <Button
              title="Submit"
              color={AppColors.primary}
              onPress={handleEditSubmit}
              disabled // TEMPA - Disable until form handling complete
            />
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = () => {
  return {
    animationEnabled: false,
    headerTitle: "Edit Profile",
    headerTitleAlign: "center",
    headerTitleStyle: {
      height: 30,
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: AppColors.darkGrey,
  },
  form: {
    width: "90%",
  },
  label: {
    color: AppColors.white,
  },
  inputIcon: {
    textAlignVertical: "center",
    textAlign: "center",
    height: "100%",
    aspectRatio: 1,
    backgroundColor: AppColors.primary,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 15,
  },
});

export default EditProfileScreen;
