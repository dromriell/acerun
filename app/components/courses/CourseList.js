import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

import GameCourseItem from "./GameCourseItem";

/**
 * Takes a callback prop (onCoursePress) to handle user
 * interaction with course items at the screen level.
 */
const CourseList = (props) => {
  const { data, onCoursePress } = props;

  const renderCourseItem = (itemData) => {
    return (
      <GameCourseItem
        course={itemData.item}
        onCoursePress={() => onCoursePress(itemData.item)}
      />
    );
  };

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={data}
        renderItem={renderCourseItem}
        style={styles.courseList}
        keyExtractor={(item) => item.course_id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
  courseList: {
    width: "100%",
  },
});

export default CourseList;
