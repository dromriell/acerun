import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { stateArray } from "../../utils/stateArray";

import { SubHeaderText } from "./AppText";
import AppColors from "../../utils/AppColors";

const StatePicker = (props) => {
  const { handleInputChange, initialValue } = props;
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const StateItem = Picker.Item;

  return (
    <View style={{ ...styles.formControl, ...props.formControlStyle }}>
      {Platform.OS === "android" ? (
        <SubHeaderText style={{ ...styles.label, ...props.labelStyle }}>
          {props.label}
        </SubHeaderText>
      ) : null}

      <View style={{ ...styles.inputContainer, ...props.inputContainerStyle }}>
        {props.icon}
        <Picker
          selectedValue={selectedValue || null}
          onValueChange={(itemValue) => {
            setSelectedValue(itemValue);
            handleInputChange("state", itemValue, true);
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
                color={isSelected ? AppColors.primary : ""}
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
    height: Platform.OS === "android" ? 75 : 150,
    marginVertical: Platform.OS === "android" ? 10 : 20,
    // width: "95%",
  },
  label: {
    color: AppColors.black,
    height: Platform.OS === "android" ? "40%" : 0,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: Platform.OS === "android" ? "space-around" : "center",
    alignItems: "center",
    width: "95%",
    height: Platform.OS === "android" ? 35 : "100%",
    marginVertical: 5,
    backgroundColor: AppColors.white,
    borderRadius: 10,
    paddingHorizontal: Platform.OS === "android" ? 0 : 10,
    paddingLeft: Platform.OS === "android" ? 10 : 0,
  },
  input: {
    width: "90%",
    height: "100%",
    borderRadius: 10,
    paddingLeft: 10,
  },
  errorText: {
    color: "red",
    fontSize: 13,
  },
  items: {
    textAlign: "center",
  },
});

export default StatePicker;
