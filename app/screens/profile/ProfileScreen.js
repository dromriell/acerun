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
import {
  BodyText,
  HeaderText,
  SubHeaderText,
} from "../../components/ui/AppText";
import * as authActions from "../../store/actions/authActions";
import AppColors from "../../utils/AppColors";

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
          <BodyText width={"50%"} centered>
            Friends: {profile.friends.length}
          </BodyText>
          <BodyText width={"50%"} centered>
            Discs: {profile.disc_bag.length}
          </BodyText>
        </View>
        <View style={styles.bioContainer}>
          <SubHeaderText>Bio:</SubHeaderText>
          <BodyText>{profile.bio}</BodyText>
        </View>
      </View>
      <Button title="Logout" onPress={() => dispatch(authActions.logout())} />
    </View>
  );
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
    height: 200,
    overflow: "hidden",
  },
  profileImage: {
    width: 200,
    height: 200,
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
    justifyContent: "space-around",
  },
  bioContainer: {
    width: "90%",
    padding: 10,
    elevation: 2,
  },
});

export default ProfileScreen;
