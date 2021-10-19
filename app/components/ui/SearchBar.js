import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Keyboard,
  TextInput,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { TouchComp } from "./TouchComp";
import { BodyText } from "./AppText";
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
          <FontAwesome name="search" size={21} color={AppColors.accent} />
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
      onManualSearch(searchTerm);
    }
  };

  if (props.button) {
    return (
      <View style={{ ...styles.searchBar, ...props.style }}>
        <TouchComp onPress={props.onPress}>
          <BodyText style={styles.placeholder}>{props.placeholder}</BodyText>
        </TouchComp>
        {searchButton && <SearchButton />}
      </View>
    );
  }

  return (
    <View style={{ ...styles.searchBar, ...props.style }}>
      <TouchComp onPress={props.onPress}>
        <TextInput
          style={styles.searchField}
          ref={searchRef}
          onChangeText={
            searchButton
              ? (text) => setSearchTerm(text)
              : (text) => onSearch(text)
          }
          returnKeyType="search"
          onSubmitEditing={handleSearchSubmit}
        />
      </TouchComp>
      {searchButton && (
        <SearchButton
          termRef={searchRef}
          onPress={() => {
            Keyboard.dismiss();
            handleSearchSubmit();
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    width: Dimensions.get("screen").width * 0.7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: AppColors.white,
    height: "50%",
  },
  placeholder: {
    width: "100%",
    color: AppColors.blackTrans,
    textAlign: "center",
    fontSize: 16,
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
