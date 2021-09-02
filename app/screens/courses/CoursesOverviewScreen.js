import React from 'react'
import {View, Text, StyleSheet, Button, Platform, StatusBar} from 'react-native'


const CoursesOverviewScreen = (props) => {
   return (
      <View style={styles.screen}>
         <Text>Courses Overview Screen</Text>
         <Button title='Go Back Home' onPress={() => props.navigation.goBack()} />
      </View>
   )
}

const styles = StyleSheet.create({
   screen: {
     flex: 1,
     backgroundColor: '#aaa',
     alignItems: 'center',
     justifyContent: 'center',
     paddingTop: StatusBar.currentHeight
   },
 });

export default CoursesOverviewScreen