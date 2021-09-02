import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppColors from "../../utils/AppColors";

const HeaderButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} {...props}>
      <Ionicons
        name={props.iconName}
        size={props.size || 24}
        color={
          props.color
            ? props.color
            : Platform.OS === "android"
            ? AppColors.accent
            : AppColors.primary
        }
      />
    </TouchableOpacity>
  );
};

export default HeaderButton;
