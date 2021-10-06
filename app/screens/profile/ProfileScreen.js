import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

import {
  BodyText,
  HeaderText,
  SubHeaderText,
} from "../../components/ui/AppText";
import * as authActions from "../../store/actions/authActions";
import AppColors from "../../utils/AppColors";
import { TouchComp } from "../../components/ui/TouchComp";

const ProfileScreen = (props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);
  console.log(profile);
  return (
    <View style={styles.screen}>
      <View style={styles.profileImageContainer}>
        <Image
          style={styles.profileImage}
          source={require("../../assets/icons/map/disc-golf-basket.png")}
        />
      </View>
      <View style={styles.infoHeaderContainer}>
        <HeaderText size={32}>Username Here</HeaderText>
        <SubHeaderText>
          {profile.city && profile.city} {profile.state}
        </SubHeaderText>
        <View style={styles.countRow}>
          <View style={{ ...styles.countCard, ...styles.borderRight }}>
            <SubHeaderText size={24}>{profile.friends.length}</SubHeaderText>
            <BodyText centered>Friends</BodyText>
          </View>
          <View style={{ ...styles.countCard, ...styles.borderRight }}>
            <SubHeaderText size={24}>{profile.disc_bag.length}</SubHeaderText>
            <BodyText centered>Discs</BodyText>
          </View>
          <View style={styles.countCard}>
            <SubHeaderText size={24}>{profile.disc_bag.length}</SubHeaderText>
            <BodyText centered>Games</BodyText>
          </View>
        </View>
      </View>
      <View style={styles.buttonGroup}>
        <TouchComp onPress={() => props.navigation.navigate("ProfileEdit")}>
          <View style={styles.button}>
            <MaterialIcons name="edit" size={24} color={AppColors.primary} />
            <BodyText> Edit Profile</BodyText>
          </View>
        </TouchComp>
        <TouchComp onPress={() => console.log("CHANGE SETTINGS")}>
          <View style={styles.button}>
            <MaterialIcons
              name="settings"
              size={24}
              color={AppColors.primary}
            />
            <BodyText> Settings</BodyText>
          </View>
        </TouchComp>
        <TouchComp onPress={() => dispatch(authActions.logout())}>
          <View style={styles.button}>
            <MaterialIcons name="logout" size={24} color={AppColors.primary} />
            <BodyText> Logout</BodyText>
          </View>
        </TouchComp>
      </View>
    </View>
  );
};

export const screenOptions = () => {
  return {
    headerTitle: "",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: AppColors.white,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 150,
    overflow: "hidden",
  },
  profileImage: {
    width: 150,
    height: 150,
    backgroundColor: AppColors.darkGrey,
    borderRadius: 100,
  },
  infoHeaderContainer: {
    width: "100%",
    alignItems: "center",
  },
  countRow: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  countCard: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
  },
  borderRight: {
    borderRightWidth: 2,
    borderRightColor: AppColors.grey,
  },
  buttonGroup: {
    width: "100%",
    padding: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 10,
    marginBottom: 5,
  },
});

export default ProfileScreen;
