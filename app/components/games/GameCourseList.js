import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import * as gameActions from "../../store/actions/gameActions";

import GameCourseItem from "../../components/games/GameCourseItem";

const GameCourseList = (props) => {
  const dispatch = useDispatch();

  const { data } = props;
  const [error, setError] = useState();

  const handleCourseSelect = async (course) => {
    try {
      await dispatch(gameActions.setGameCourse(course));
      props.navigation.goBack();
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const renderCourseItem = (itemData) => {
    return (
      <GameCourseItem
        course={itemData.item}
        onCoursePress={() => handleCourseSelect(itemData.item)}
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

export default GameCourseList;
