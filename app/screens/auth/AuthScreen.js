import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'


const AuthScreen = (props) => {
   return (
      <View style={styles.screen}>
         <Text>Auth Screen</Text>
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

export default AuthScreen