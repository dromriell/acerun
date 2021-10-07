import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Text,
} from "react-native";
import AppColors from "../../utils/AppColors";

import { SubHeaderText } from "../ui/AppText";

const FilterOptionButton = (props) => {
  const [isSelected, setIsSelected] = useState(false);
  const { selected } = props;

  useEffect(() => {
    setIsSelected(selected);
  }, [selected, setIsSelected]);

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => props.onPress("all")}
      >
        <SubHeaderText style={selected ? styles.selected : styles.text}>
          {props.title}
        </SubHeaderText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  touchable: {},
  text: {
    color: AppColors.white,
    borderBottomColor: AppColors.grey,
    paddingHorizontal: "20%",
    borderBottomWidth: 1,
    paddingHorizontal: "20%",
  },
  selected: {
    color: AppColors.accent,
    borderBottomColor: AppColors.accent,
    paddingHorizontal: "20%",
    borderBottomWidth: 3,
  },
});

export default FilterOptionButton;
