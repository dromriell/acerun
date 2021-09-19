import React, { useState, useReducer, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import AppColors from "../../utils/AppColors";
import { SubHeaderText } from "./AppText";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [errorMessage, setErrorMessage] = useState("Please Enter A Value");
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.isValid,
    touched: false,
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, id, onInputChange]);

  const handleTextChange = (text) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      setErrorMessage("This is a required field!");
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      setErrorMessage("Invalid Email Address!");
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
      setErrorMessage(`Entry must be more than ${props.min}!`);
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
      setErrorMessage(`Entry must be less than ${props.max}!`);
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
      setErrorMessage(`Must be at least ${props.minLength} characters long!`);
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const handleBlurFocus = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={styles.formControl}>
      <SubHeaderText style={{ ...styles.label, ...props.labelStyle }}>
        {props.label}
      </SubHeaderText>
      <View style={styles.inputContainer}>
        {props.icon}
        <TextInput
          {...props}
          style={styles.input}
          value={inputState.value}
          onChangeText={handleTextChange}
          onBlur={handleBlurFocus}
        />
      </View>
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    height: 75,
    marginVertical: 10,
  },
  label: {
    color: AppColors.black,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 35,
    marginVertical: 5,
  },
  input: {
    width: "90%",
    height: "100%",
    backgroundColor: AppColors.white,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  errorText: {
    color: "red",
    fontSize: 13,
  },
});

export default Input;
