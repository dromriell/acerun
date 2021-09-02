import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'


const ProfileScreen = (props) => {
   return (
      <View style={styles.screen}>
         <Text>Profile Screen</Text>
         <Button title='Go Back Home' onPress={() => props.navigation.goBack()} />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#fff',
     alignItems: 'center',
     justifyContent: 'center',
   },
 });

export default ProfileScreen