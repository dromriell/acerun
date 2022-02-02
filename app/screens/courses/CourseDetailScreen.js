import React from "react";
import { View, ScrollView, ImageBackground, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import AppColors from "../../utils/AppColors";
import { BodyText, SubHeaderText } from "../../components/ui/AppText";

const CourseDetailScreen = (props) => {
  const { route } = props;
  const courseID = route.params.courseID;
  const filteredCourses = useSelector((state) => state.courses.filteredResults);
  const selectedCourse = filteredCourses.find(
    (course) => course.course_id === courseID
  );
  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scroll}>
        <View style={styles.scrollContent}>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={{ uri: selectedCourse.image_url }}
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
            <View style={styles.detailHeaderCard}>
              <View style={styles.detailHeader}>
                <SubHeaderText size={24}>
                  {selectedCourse.course_name}
                </SubHeaderText>
                <BodyText>{selectedCourse.street}</BodyText>
                <BodyText>
                  {selectedCourse.city}, {selectedCourse.state_province}
                </BodyText>
                <BodyText>
                  {selectedCourse.country !== "United States" &&
                    selectedCourse.country}
                </BodyText>
              </View>
            </View>
          </View>
          <View style={styles.detailCard}>
            <SubHeaderText style={styles.cardHeader}>Description</SubHeaderText>
            <View style={styles.courseProp}>
              <SubHeaderText>{selectedCourse.course_description}</SubHeaderText>
            </View>
          </View>
          <View style={styles.detailCard}>
            <SubHeaderText style={styles.cardHeader}>
              Course Details
            </SubHeaderText>
            <View style={styles.courseProp}>
              <BodyText capitalize>holes:</BodyText>
              <BodyText capitalize>{selectedCourse.holes}</BodyText>
            </View>
            <View style={styles.courseProp}>
              <BodyText capitalize>Holes {"<"} 300ft:</BodyText>
              <BodyText capitalize>
                {selectedCourse.number_of_holes_less_than_300 || 0}
              </BodyText>
            </View>
            <View style={styles.courseProp}>
              <BodyText capitalize>Holes 300ft to 400ft:</BodyText>
              <BodyText capitalize>
                {selectedCourse.number_of_holes_between_300_and_400 || 0}
              </BodyText>
            </View>
            <View style={styles.courseProp}>
              <BodyText capitalize>Holes {">"} 400ft:</BodyText>
              <BodyText capitalize>
                {selectedCourse.number_of_holes_greater_than_400 || 0}
              </BodyText>
            </View>
            <View style={styles.courseProp}>
              <BodyText capitalize>Total Length:</BodyText>
              <BodyText>
                <BodyText capitalize>
                  {selectedCourse.total_length_of_course}
                </BodyText>
                <BodyText> ft</BodyText>
              </BodyText>
            </View>
            <View style={styles.courseProp}>
              <BodyText capitalize>Total Alt Length:</BodyText>
              <BodyText>
                <BodyText capitalize>
                  {selectedCourse.total_length_of_alternate}
                </BodyText>
                <BodyText> ft</BodyText>
              </BodyText>
            </View>
            <View style={styles.courseProp}>
              <BodyText capitalize>Tee Types:</BodyText>
              <BodyText capitalize>{selectedCourse.tee_types}</BodyText>
            </View>
            <View style={styles.courseProp}>
              <BodyText capitalize>baskets:</BodyText>
              <BodyText capitalize>{selectedCourse.basket_types}</BodyText>
            </View>
          </View>
          <View style={styles.detailCard}>
            <SubHeaderText style={styles.cardHeader}>
              Location Details
            </SubHeaderText>
            <View style={styles.coursePropList}>
              <View style={styles.column}>
                <View style={styles.courseProp}>
                  <BodyText capitalize>foliage: </BodyText>
                  <BodyText capitalize>
                    {selectedCourse.course_foliage}
                  </BodyText>
                </View>
                <View style={styles.courseProp}>
                  <BodyText capitalize>facilities:</BodyText>
                  <BodyText capitalize>{selectedCourse.facilities}</BodyText>
                </View>
                <View style={styles.courseProp}>
                  <BodyText capitalize>fees:</BodyText>
                  <BodyText capitalize>{selectedCourse.fees}</BodyText>
                </View>
                <View style={styles.courseProp}>
                  <BodyText capitalize>Camping:</BodyText>
                  <BodyText capitalize>{selectedCourse.camping}</BodyText>
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.courseProp}>
                  <BodyText capitalize>elevation: </BodyText>
                  <BodyText capitalize>
                    {selectedCourse.course_elevation}
                  </BodyText>
                </View>
                <View style={styles.courseProp}>
                  <BodyText capitalize>private: </BodyText>
                  <BodyText capitalize>{selectedCourse.private}</BodyText>
                </View>
                <View style={styles.courseProp}>
                  <BodyText capitalize>signage:</BodyText>
                  <BodyText capitalize>{selectedCourse.signage}</BodyText>
                </View>
                <View style={styles.courseProp}>
                  <BodyText capitalize>handicap:</BodyText>
                  <BodyText capitalize>
                    {selectedCourse.handicap || "N/A"}
                  </BodyText>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export const screenOptions = () => {
  return {
    headerTitle: "Course Detail",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.darkGrey,
  },
  scroll: {
    width: "100%",
  },
  headerRightContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 11,
    marginVertical: 3,
  },
  scrollContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  detailHeaderCard: {
    position: "absolute",
    bottom: -15,
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  detailHeader: {
    width: "80%",
    alignItems: "center",
    padding: 5,
    backgroundColor: AppColors.white,
    borderRadius: 15,
    elevation: 5,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 300,
    marginBottom: 25,
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
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
  description: {
    width: "90%",
  },
  detailCard: {
    flex: 1,
    width: "90%",
    paddingHorizontal: 5,
    paddingVertical: 15,
    elevation: 3,
    marginVertical: 10,
    borderRadius: 15,
    backgroundColor: AppColors.white,
    alignItems: "center",
  },
  cardHeader: {
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: AppColors.primary,
    textAlign: "center",
  },
  coursePropList: {
    flexDirection: "row",
    width: "100%",
  },
  column: {
    width: "50%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  courseProp: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
});

export default CourseDetailScreen;
