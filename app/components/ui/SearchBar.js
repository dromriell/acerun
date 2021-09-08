import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  StyleSheet,
  View,
  Text,
  TextInput,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AppColors from "../../utils/AppColors";

const SearchBar = (props) => {
  const { onSearch } = props;
  const [isRefSet, setIsRefSet] = useState(false);
  const [isInitialFocus, setIsInitialFocus] = useState(true);
  const searchRef = useRef();

  useEffect(() => {
    if (searchRef.current && !isRefSet) {
      setIsRefSet(true);
    }
  }, [searchRef, setIsRefSet]);

  useEffect(() => {
    if (isRefSet && isInitialFocus) {
      searchRef.current.focus();
      setIsInitialFocus(false);
    }
  }, [isRefSet, setIsInitialFocus]);

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
          <TextInput
            // autoFocus={props.autoFocus}
            style={styles.searchField}
            ref={searchRef}
            onChangeText={(text) => onSearch(text)}
          />
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
    height: "50%",
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
