import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { SubHeaderText } from "./AppText";
import AppColors from "../../utils/AppColors";

import { MaterialIcons } from "@expo/vector-icons";

const StatePicker = (props) => {
  const { handleInputChange, initialValue } = props;
  const [selectedValue, setSelectedValue] = useState();
  console.log(initialValue);

  useEffect(() => {
    handleInputChange(selectedValue);
  }, []);

  return (
    <View style={{ ...styles.formControl, ...props.formControlStyle }}>
      <SubHeaderText style={{ ...styles.label, ...props.labelStyle }}>
        {props.label}
      </SubHeaderText>
      <View style={{ ...styles.inputContainer, ...props.inputContainerStyle }}>
        {props.icon}
        <Picker
          selectedValue={initialValue || null}
          onValueChange={handleInputChange}
          {...props}
          style={{ ...styles.input, ...props.inputStyle }}
        >
          <Picker.Item label="Pick a state" value={null} />
          <Picker.Item label="Alabama" value="AL" />
          <Picker.Item label="Alaska" value="AK" />
          <Picker.Item label="Arizona" value="AZ" />
          <Picker.Item label="Arkansas" value="AR" />
          <Picker.Item label="California" value="CA" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Kentucky" value="KY" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
          <Picker.Item label="Colorado" value="CO" />
        </Picker>
        <View style={styles.dropdownIcon}>
          <MaterialIcons name="arrow-drop-down" size={24} color="black" />
        </View>
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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 35,
    marginVertical: 5,
    backgroundColor: AppColors.white,
    borderRadius: 10,
  },
  input: {
    width: "90%",
    height: "100%",
    backgroundColor: AppColors.white,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 5,
  },
  errorText: {
    color: "red",
    fontSize: 13,
  },
  dropdownIcon: {
    position: "absolute",
    right: 0,
  },
});

export default StatePicker;
