import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { stateArray } from "../../utils/stateArray";

import { SubHeaderText } from "./AppText";
import AppColors from "../../utils/AppColors";

import { MaterialIcons } from "@expo/vector-icons";

const StatePicker = (props) => {
  const { handleInputChange, initialValue } = props;
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const StateItem = Picker.Item;

  return (
    <View style={{ ...styles.formControl, ...props.formControlStyle }}>
      <SubHeaderText style={{ ...styles.label, ...props.labelStyle }}>
        {props.label}
      </SubHeaderText>
      <View style={{ ...styles.inputContainer, ...props.inputContainerStyle }}>
        {props.icon}
        <Picker
          selectedValue={initialValue.toUpperCase() || null}
          onValueChange={(itemValue) => {
            setSelectedValue(itemValue);
            handleInputChange("state", itemValue);
          }}
          {...props}
          style={{ ...styles.input, ...props.inputStyle }}
          itemStyle={{ ...styles.items, ...props.itemStyle }}
        >
          <Picker.Item label="Pick a state" value={null} />
          {stateArray.map((state) => {
            const isSelected = selectedValue === state.abbr;
            return (
              <StateItem
                key={state.abbr}
                label={state.name}
                value={state.abbr}
                color={isSelected ? AppColors.primary : null}
              />
            );
          })}
        </Picker>
      </View>
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
    justifyContent: "flex-end",
    alignItems: "center",
    width: "95%",
    height: 35,
    marginVertical: 5,
    backgroundColor: AppColors.white,
    borderRadius: 10,
  },
  input: {
    width: "90%",
    height: "100%",
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  errorText: {
    color: "red",
    fontSize: 13,
  },
  items: {},
});

export default StatePicker;