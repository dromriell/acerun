import React, { useState, useLayoutEffect, useCallback } from "react";
import { View, StyleSheet, Switch, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as courseActions from "../../store/actions/courseActions";
import { MaterialIcons } from "@expo/vector-icons";

import { SubHeaderText } from "../../components/ui/AppText";
import { TouchComp } from "../../components/ui/TouchComp";
import Input from "../../components/ui/Input";
import AppColors from "../../utils/AppColors";

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <SubHeaderText color={AppColors.white}>{props.label}</SubHeaderText>
      <Switch
        value={props.value}
        onValueChange={(newValue) => props.onChange(newValue)}
        trackColor={{ true: AppColors.primary, false: AppColors.grey }}
        thumbColor={
          Platform.OS === "android"
            ? props.value
              ? AppColors.primary
              : AppColors.grey
            : ""
        }
      />
    </View>
  );
};

const CourseFilterScreen = (props) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.courses.filters);

  const { navigation } = props;
  const [hasCamping, setHasCamping] = useState(
    filters ? filters.camping : false
  );
  const [hasFacilities, setHasFacilities] = useState(
    filters ? filters.facilities : false
  );
  const [isFree, setIsFree] = useState(filters ? filters.fees : false);
  const [isHandicapAccessible, setIsHandicapAccessible] = useState(
    filters ? filters.handicap : false
  );
  const [isPrivate, setIsPrivate] = useState(filters ? filters.private : false);
  const [hasSigns, setHasSigns] = useState(filters ? filters.signage : false);
  const [holeMin, setHoleMin] = useState(filters ? filters.holeMin : 0);

  const handleNumberInput = (id, value, isValid) => {
    if (value === "" || !isValid) {
      setHoleMin(0);
    } else {
      setHoleMin(+value);
    }
  };

  const handleSave = useCallback(() => {
    const courseFilters = {
      camping: hasCamping,
      facilities: hasFacilities,
      fees: isFree,
      handicap: isHandicapAccessible,
      private: isPrivate,
      signage: hasSigns,
      holeMin: holeMin,
    };
    dispatch(courseActions.setCourseFilters(courseFilters));
    navigation.navigate("CourseSearch");
  }, [
    hasCamping,
    hasFacilities,
    isFree,
    isHandicapAccessible,
    isPrivate,
    hasSigns,
    holeMin,
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <TouchComp onPress={handleSave}>
            <View style={styles.saveButton}>
              <MaterialIcons
                name="save"
                size={Platform.OS === "android" ? 32 : 24}
                color={AppColors.accent}
              />
            </View>
          </TouchComp>
        </View>
      ),
    });
  }, [navigation, handleSave]);

  return (
    <View style={styles.screen}>
      <ScrollView style={{ width: "100%" }}>
        <FilterSwitch
          label="Camping?"
          value={hasCamping}
          onChange={setHasCamping}
        />
        <FilterSwitch
          label="Facilities?"
          value={hasFacilities}
          onChange={setHasFacilities}
        />
        <FilterSwitch label="Free?" value={isFree} onChange={setIsFree} />
        <FilterSwitch
          label="Handicap Accessible?"
          value={isHandicapAccessible}
          onChange={setIsHandicapAccessible}
        />
        <FilterSwitch
          label="Private?"
          value={isPrivate}
          onChange={setIsPrivate}
        />
        <FilterSwitch label="Signs?" value={hasSigns} onChange={setHasSigns} />
        <View style={styles.numberInput}>
          <SubHeaderText color={AppColors.white}>Hole Min</SubHeaderText>
          <Input
            id="holeMin"
            formControlStyle={styles.formControlStyle}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            max={30}
            onInputChange={handleNumberInput}
            value={holeMin}
            number
            defaultValue={filters ? filters.holeMin.toString() : "0"}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export const screenOptions = () => {
  return {
    headerTitle: "Course Filters",
    headerTitleAlign: "center",
    headerTitleStyle: {
      height: 30,
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: AppColors.darkGrey,
  },
  saveButton: {
    padding: 10,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  numberInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 15,
    height: 50,
    paddingHorizontal: 10,
  },
  formControlStyle: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  inputContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: 80,
    marginRight: 0,
  },
  inputStyle: {
    height: "100%",
    marginBottom: 10,
    backgroundColor: AppColors.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    textAlign: "center",
  },
});

export default CourseFilterScreen;
