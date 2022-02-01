import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  StatusBar,
  Platform,
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

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scroll}>
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
            source={require("../../assets/icons/map/disc-golf-basket.png")}
          />
        </View>
        <View style={styles.infoHeaderContainer}>
          <HeaderText color={AppColors.white} size={32}>
            {profile.user.username}
          </HeaderText>
          <SubHeaderText color={AppColors.grey}>
            {profile.city && profile.city} {profile.state}
          </SubHeaderText>
          <View style={styles.countRow}>
            <View style={{ ...styles.countCard, ...styles.borderRight }}>
              <SubHeaderText size={24} style={styles.font}>
                {profile.friends.length}
              </SubHeaderText>
              <BodyText color={AppColors.grey} centered>
                Friends
              </BodyText>
            </View>
            <View style={{ ...styles.countCard, ...styles.borderRight }}>
              <SubHeaderText size={24} style={styles.font}>
                {profile.disc_bag.length}
              </SubHeaderText>
              <BodyText centered color={AppColors.grey}>
                Discs
              </BodyText>
            </View>
            <View style={styles.countCard}>
              <SubHeaderText size={24} style={styles.font}>
                {profile.disc_bag.length}
              </SubHeaderText>
              <BodyText centered color={AppColors.grey}>
                Games
              </BodyText>
            </View>
          </View>
        </View>
        <View style={styles.buttonGroup}>
          <TouchComp onPress={() => props.navigation.navigate("ProfileEdit")}>
            <View style={styles.button}>
              <MaterialIcons name="edit" size={24} color={AppColors.accent} />
              <BodyText style={styles.font}> Edit Profile</BodyText>
            </View>
          </TouchComp>
          <TouchComp onPress={() => null}>
            <View style={styles.button}>
              <MaterialIcons
                name="settings"
                size={24}
                color={AppColors.accent}
              />
              <BodyText style={styles.font}> Settings</BodyText>
            </View>
          </TouchComp>
          <TouchComp onPress={() => dispatch(authActions.logout())}>
            <View style={styles.button}>
              <MaterialIcons name="logout" size={24} color={AppColors.accent} />
              <BodyText style={styles.font}> Logout</BodyText>
            </View>
          </TouchComp>
        </View>
      </ScrollView>
    </View>
  );
};

export const screenOptions = () => {
  return {
    headerTitle: "",
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.darkGrey,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scroll: {
    width: "100%",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight: 50,
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
    backgroundColor: AppColors.primary,
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
    marginBottom: 30,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 10,
    marginBottom: 5,
  },
  font: {
    color: AppColors.white,
  },
});

export default ProfileScreen;
