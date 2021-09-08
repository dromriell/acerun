import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/authActions";

const ProfileScreen = (props) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <Text>Profile Screen</Text>
      <Button title="Logout" onPress={() => dispatch(authActions.logout())} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileScreen;
