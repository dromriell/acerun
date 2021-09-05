import React from "react";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  StyleSheet,
  View,
  Text,
  TextInput,
} from "react-native";
import AppColors from "../../utils/AppColors";

const SearchBar = (props) => {
  const TouchComp =
    Platform.OS === "android" && Platform.Version >= 22
      ? TouchableNativeFeedback
      : TouchableOpacity;
  return (
    <View style={{ ...styles.searchBar, ...props.style }}>
      <TouchComp onPress={props.onPress}>
        {props.button ? (
          <Text style={styles.placeholder}>{props.placeholder}</Text>
        ) : (
          <TextInput style={styles.searchField} />
        )}
      </TouchComp>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: AppColors.white,
  },
  placeholder: {
    flex: 1,
    width: "100%",
    color: AppColors.blackTrans,
    textAlign: "center",
    paddingVertical: 5,
  },
  searchField: {
    flex: 1,
    width: "100%",
    color: AppColors.blackTrans,
    textAlign: "left",
    paddingHorizontal: 10,
  },
});

export default SearchBar;
