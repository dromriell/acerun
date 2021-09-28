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
import { FontAwesome } from "@expo/vector-icons";

import { TouchComp } from "./TouchComp";
import { useFocusEffect } from "@react-navigation/native";
import AppColors from "../../utils/AppColors";

const SearchButton = (props) => {
  const { onPress } = props;
  return (
    <View
      style={{
        position: "absolute",
        right: 10,
        overflow: "hidden",
        borderRadius: 50,
      }}
    >
      <TouchComp onPress={onPress}>
        <View
          style={{
            padding: 2,
          }}
        >
          <FontAwesome name="search" size={24} color={AppColors.accent} />
        </View>
      </TouchComp>
    </View>
  );
};

const SearchBar = (props) => {
  const { onSearch, searchButton, onManualSearch } = props;
  const [isRefSet, setIsRefSet] = useState(false);
  const [isInitialFocus, setIsInitialFocus] = useState(true);
  const searchRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearchSubmit = () => {
    if (onManualSearch && isRefSet) {
      console.log(searchTerm);
      onManualSearch(searchTerm);
    }
  };

  if (props.button) {
    return (
      <View style={{ ...styles.searchBar, ...props.style }}>
        <TouchComp onPress={props.onPress}>
          <Text style={styles.placeholder}>{props.placeholder}</Text>
        </TouchComp>
        {searchButton && <SearchButton />}
      </View>
    );
  }

  return (
    <View style={{ ...styles.searchBar, ...props.style }}>
      <TouchComp onPress={props.onPress}>
        <TextInput
          // autoFocus={props.autoFocus}
          style={styles.searchField}
          ref={searchRef}
          onChangeText={
            searchButton
              ? (text) => setSearchTerm(text)
              : (text) => onSearch(text)
          }
        />
      </TouchComp>
      {searchButton && (
        <SearchButton termRef={searchRef} onPress={handleSearchSubmit} />
      )}
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
