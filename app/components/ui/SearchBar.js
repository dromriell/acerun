import React from "react";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  StyleSheet,
  View,
  Text,
} from "react-native";
import AppColors from "../../utils/AppColors";

const SearchBar = (props) => {
  const TouchComp =
    Platform.OS === "android" && Platform.Version >= 22
      ? TouchableNativeFeedback
      : TouchableOpacity;
  return (
    <View style={styles.searchBar}>
      <TouchComp onPress={props.onPress}>
        <Text style={styles.placeholder}>{props.placeholder}</Text>
      </TouchComp>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: AppColors.white,
  },
  placeholder: {
    flex: 1,
    width: "100%",
    color: AppColors.blackTrans,
    textAlign: "center",
  },
});

export default SearchBar;
