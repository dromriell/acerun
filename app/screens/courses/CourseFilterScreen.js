import React, { useState, useRef, useLayoutEffect, useCallback } from "react";
import { View, StyleSheet, Switch, Platform } from "react-native";
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
      <SubHeaderText>{props.label}</SubHeaderText>
      <Switch
        value={props.value}
        onValueChange={(newValue) => props.onChange(newValue)}
        trackColor={{ true: AppColors.primary, false: "#ccc" }}
        thumbColor={
          Platform.OS === "android"
            ? props.value
              ? AppColors.primary
              : "#ccc"
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
  const [hasFee, setHasFee] = useState(filters ? filters.fees : false);
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
      fees: hasFee,
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
    hasFee,
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
              <MaterialIcons name="save" size={32} color={AppColors.accent} />
            </View>
          </TouchComp>
        </View>
      ),
    });
  }, [navigation, handleSave]);

  return (
    <View style={styles.screen}>
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
      <FilterSwitch label="Free?" value={hasFee} onChange={setHasFee} />
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
        <SubHeaderText>Hole Min</SubHeaderText>
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
    alignItems: "center",
  },
  saveButton: {
    padding: 10,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 15,
  },
  numberInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 15,
    height: 50,
  },
  formControlStyle: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  inputContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: 75,
  },
  inputStyle: {
    height: "100%",
    marginBottom: 10,
    backgroundColor: AppColors.grey,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});

export default CourseFilterScreen;
