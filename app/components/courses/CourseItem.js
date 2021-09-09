import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import AppColors from '../../utils/AppColors'
import { HeaderText, SubHeaderText, BodyText } from '../ui/AppText'

const CourseItem = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: 'https://www.dgcoursereview.com/course_pics/315/c1e98116.jpg' }} style={styles.image} />
            </View>
            <View style={styles.headerContainer}>
                <HeaderText style={styles.header}>Course Name</HeaderText>
                <BodyText style={styles.headerSub}>Lexington, KY</BodyText>
                <BodyText style={styles.headerSub}>15mi Away</BodyText>
            </View>
            <View style={styles.infoBar}>
                <View style={styles.badge}>
                    <SubHeaderText>18</SubHeaderText>
                </View>
                <View style={styles.badge}>
                    <SubHeaderText>18</SubHeaderText>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 250,

    },
    imageContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
      },
      headerContainer: {
          width: '100%'
      },
      header: {
          paddingLeft: 15,
          paddingTop: 15,
          color: AppColors.white,
          fontSize: 26
      },
      headerSub: {
        color: AppColors.white,
        paddingLeft: 15,
      },
      infoBar: {
          flexDirection: 'row',
          position: 'absolute',
          bottom: 5,
          width: '100%',
          padding: 10,
      },
      badge: {
          margin: 5,
          padding: 5,
          width: 50,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 50,
          backgroundColor: AppColors.primary
      },

})

export default CourseItem