import React from "react";
import { Platform } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import DiscsOverviewScreen, {
  screenOptions as discOverviewScreenOptions,
} from "../screens/discs/DiscsOverviewScreen";
import UserDiscsScreen, {
  screenOptions as userDiscScreenOptions,
} from "../screens/discs/UserDiscsScreen";
import DiscDetailScreen, {
  screenOptions as discDetailScreenOptions,
} from "../screens/discs/DiscDetailScreen";
import CoursesOverviewScreen from "../screens/courses/CoursesOverviewScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import GameSetupScreen from "../screens/game/GameSetupScreen";

import AppColors from "../utils/AppColors";

const Tab = createBottomTabNavigator();
const DiscStack = createNativeStackNavigator();

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor:
      Platform.OS === "android" ? AppColors.primary : AppColors.white,
  },
  headerTitleStyle: {
    fontFamily: "TitilliumWeb_600SemiBold",
  },
  headerBackTitleStyle: {
    fontFamily: "TitilliumWeb_400Regular",
  },
  headerTintColor:
    Platform.OS === "android" ? AppColors.white : AppColors.primary,
};

const DiscStackNavigator = () => {
  return (
    <DiscStack.Navigator screenOptions={defaultStackNavOptions}>
      <DiscStack.Screen
        name="DiscOverview"
        component={DiscsOverviewScreen}
        options={discOverviewScreenOptions}
      />
      <DiscStack.Screen
        name="UserDiscs"
        component={UserDiscsScreen}
        options={userDiscScreenOptions}
      />
      <DiscStack.Screen
        name="DiscDetail"
        component={DiscDetailScreen}
        options={discDetailScreenOptions}
      />
    </DiscStack.Navigator>
  );
};

const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { backgroundColor: AppColors.primary },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            size = 30;

            switch (route.name) {
              case "Home":
                iconName = focused ? "md-home-sharp" : "md-home-outline";
                return <Ionicons name={iconName} size={size} color={color} />;
              case "Discs":
                iconName = focused ? "bag-personal" : "bag-personal-outline";
                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={size}
                    color={color}
                  />
                );
              case "Game":
                iconName = focused ? "gamepad-round" : "gamepad-round-outline";
                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={size}
                    color={color}
                  />
                );
              case "Courses":
                iconName = focused ? "tree" : "tree-outline";
                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={size}
                    color={color}
                  />
                );
              case "Profile":
                iconName = focused
                  ? "ios-person-circle"
                  : "ios-person-circle-outline";
                return <Ionicons name={iconName} size={size} color={color} />;
              default:
                return <Ionicons name={iconName} size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: AppColors.accent,
          tabBarInactiveTintColor: AppColors.black,
          tabBarStyle: {
            height: 65,
            alignItems: "center",
            justifyContent: "center",
          },
          tabBarLabelStyle: {
            paddingBottom: 10,
          },
        })}
      >
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Courses" component={CoursesOverviewScreen} />
        <Tab.Screen name="Game" component={GameSetupScreen} />
        <Tab.Screen name="Discs" component={DiscStackNavigator} />
        <Tab.Screen name="Home" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
