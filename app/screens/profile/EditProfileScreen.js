import React, { useReducer, useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import * as authActions from "../../store/actions/authActions";

import Input from "../../components/ui/Input";
import StatePicker from "../../components/ui/StatePicker";

import { Ionicons } from "@expo/vector-icons";
import AppColors from "../../utils/AppColors";

import {
  BodyText,
  HeaderText,
  SubHeaderText,
} from "../../components/ui/AppText";
import { ScrollView } from "react-native-gesture-handler";

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
  const [hasChanged, setHasChanged] = useState(false);
  const [showUpdateBadge, setShowUpdateBadge] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const profile = useSelector((state) => state.auth.profile);
  console.log(profile);

  const { bio, city, state, id } = profile;
  const { username, birth_day, email, first_name, last_name, userID } =
    profile.user;

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: username || "",
      email: email || "",
      first_name: first_name || "",
      last_name: last_name || "",
      city: city || "",
      state: state || "",
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

  useEffect(() => {
    if (showUpdateBadge) {
      setTimeout(() => setShowUpdateBadge(false), 5000);
    }
  }, [showUpdateBadge]);

  const handleEditSubmit = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(
        authActions.updateProfile(token, id, formState.inputValues)
      );
      setHasChanged(false);
      setShowUpdateBadge(true);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const handleInputChange = useCallback(
    (inputName, inputValue, isInputValid) => {
      if (!hasChanged) {
        setHasChanged(true);
      }
      console.log(inputName, inputValue);
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
      {showUpdateBadge && (
        <View style={styles.updateBadge}>
          <BodyText>Updated Successfully</BodyText>
        </View>
      )}

      <ScrollView style={styles.scroll}>
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
            initialValue={username || ""}
          />
          <Input
            id="email"
            icon={
              <Ionicons
                name="person"
                size={24}
                color={AppColors.accent}
                style={styles.inputIcon}
              />
            }
            label="Email"
            email
            labelStyle={styles.label}
            keyBoardType="text"
            required
            autoCapitalize="none"
            errorText="Please enter a valid email"
            onInputChange={handleInputChange}
            initialValue={email || ""}
          />
          <Input
            id="first_name"
            icon={
              <Ionicons
                name="person"
                size={24}
                color={AppColors.accent}
                style={styles.inputIcon}
              />
            }
            label="First Name"
            labelStyle={styles.label}
            keyBoardType="text"
            required
            autoCapitalize="none"
            errorText="Please enter a valid name"
            onInputChange={handleInputChange}
            initialValue={first_name || ""}
          />
          <Input
            id="last_name"
            icon={
              <Ionicons
                name="person"
                size={24}
                color={AppColors.accent}
                style={styles.inputIcon}
              />
            }
            label="Last Name"
            labelStyle={styles.label}
            keyBoardType="text"
            required
            autoCapitalize="none"
            errorText="Please enter a valid name"
            onInputChange={handleInputChange}
            initialValue={last_name || ""}
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
            initialValue={city || ""}
            max={20}
          />
          <StatePicker
            id="state"
            handleInputChange={handleInputChange}
            label="State"
            labelStyle={styles.label}
            keyBoardType="text"
            autoCapitalize="none"
            errorText="Invalid State"
            initialValue={state || ""}
          />
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={AppColors.primary} />
            ) : (
              <Button
                title="Submit"
                color={AppColors.primary}
                onPress={handleEditSubmit}
                disabled={hasChanged ? false : true}
                // disabled // TEMPA - Disable until form handling complete
              />
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = () => {
  return {
    animationEnabled: false,
    headerTitle: "Edit Profile",
    headerTitleAlign: "space-around",
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
  updateBadge: {
    position: "absolute",
    width: "75%",
    alignItems: "center",
    top: 20,
    backgroundColor: AppColors.accent,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    zIndex: 200,
  },
  scroll: { width: "100%" },
  form: {
    width: "100%",
    alignItems: "center",
  },
  formRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "red",
    paddingHorizontal: 5,
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
