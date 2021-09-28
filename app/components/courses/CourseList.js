import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";

import GameCourseItem from "./GameCourseItem";

const CourseList = (props) => {
  const { data, onCoursePress } = props;
  const [error, setError] = useState();

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
    padding: 10,
  },
  courseList: {
    width: "100%",
  },
});

export default CourseList;
