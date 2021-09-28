import React from "react";
import { View, ImageBackground, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import {
  Ionicons,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";

import { TouchComp } from "../ui/TouchComp";
import { HeaderText, SubHeaderText, BodyText } from "../ui/AppText";
import AppColors from "../../utils/AppColors";

const GameCourseItem = (props) => {
  const { course, onCoursePress, onEmptyCoursePress } = props;

  if (!course) {
    return (
      <View style={styles.empty}>
        <TouchComp
          style={styles.touchable}
          onPress={onEmptyCoursePress || onCoursePress}
          useForeground
        >
          <View style={styles.courseItem}>
            <View style={styles.emptyCourse}>
              <Ionicons name="add" size={32} color={AppColors.accent} />
              <SubHeaderText color={AppColors.white}>
                Select a Course
              </SubHeaderText>
            </View>
          </View>
        </TouchComp>
      </View>
    );
  }

  return (
    <View>
      <TouchComp style={styles.touchable} onPress={onCoursePress} useForeground>
        <View style={styles.courseItem}>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={{ uri: course.image_url }}
              style={styles.image}
            >
              <LinearGradient
                colors={[
                  AppColors.blackTrans,
                  AppColors.black,
                  AppColors.blackTrans,
                ]}
                style={styles.background}
                start={{ x: 0.7, y: 0.1 }}
              />
            </ImageBackground>
          </View>
          <View style={styles.courseInfo}>
            <HeaderText capitalize style={styles.header}>
              {course.course_name}
            </HeaderText>
            <Text style={styles.headerSub}>
              <BodyText capitalize>{course.city}, </BodyText>
              <BodyText>{course.state_province.toUpperCase()}</BodyText>
            </Text>
            {course.distance !== "" && (
              <BodyText style={styles.headerSub}>
                {parseFloat(course.distance).toFixed("2")} mi away
              </BodyText>
            )}
          </View>
          <View style={styles.courseInfoBar}>
            <View style={styles.badge}>
              <Ionicons
                name="golf"
                size={36}
                color={AppColors.accent}
                style={styles.badgeIcon}
              />
              <SubHeaderText style={styles.badgeText}>
                {course.holes}
              </SubHeaderText>
            </View>
            <View style={styles.badge}>
              <FontAwesome
                name="tree"
                size={36}
                color={AppColors.accent}
                style={styles.badgeIcon}
              />
              <SubHeaderText style={styles.badgeText}>
                {course.course_foliage}
              </SubHeaderText>
            </View>
            <View style={styles.badge}>
              <FontAwesome5
                name="mountain"
                size={30}
                color={AppColors.accent}
                style={styles.badgeIcon}
              />
              <SubHeaderText style={styles.badgeText}>
                {course.course_elevation}
              </SubHeaderText>
            </View>
            <View style={styles.badge}>
              <MaterialIcons
                name={course.fees === "yes" ? "attach-money" : "money-off"}
                size={50}
                color={AppColors.accent}
              />
            </View>
            <View style={styles.badge}>
              <FontAwesome5
                name={
                  course.facilities === "yes"
                    ? "toilet-paper"
                    : "toilet-paper-slash"
                }
                size={30}
                color={AppColors.accent}
              />
            </View>
            <View style={styles.badge}>
              <FontAwesome5
                name={course.private === "yes" ? "lock" : "lock-open"}
                size={30}
                color={AppColors.accent}
              />
            </View>
          </View>
        </View>
      </TouchComp>
    </View>
  );
};

const styles = StyleSheet.create({
  courseItem: {
    flex: 1,
    minHeight: 250,
  },
  empty: {
    flex: 1,
    borderWidth: 1,
    borderColor: AppColors.accent,
    borderRadius: 10,
  },
  touchable: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  touchableContainer: {
    height: "100%",
  },
  emptyCourse: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    opacity: 0.7,
  },
  headerContainer: {
    width: "100%",
  },
  header: {
    paddingLeft: 15,
    paddingTop: 15,
    color: AppColors.white,
    fontSize: 26,
  },
  headerSub: {
    color: AppColors.white,
    paddingLeft: 15,
  },
  courseInfoBar: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    width: "100%",
  },
  badge: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: AppColors.primary,
  },
  badgeIcon: {
    position: "absolute",
  },
  badgeText: {
    position: "absolute",
    bottom: 5,
    color: AppColors.black,
    fontSize: 22,
  },
});

export default GameCourseItem;
