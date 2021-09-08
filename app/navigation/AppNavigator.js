import React from "react";
import { Platform } from "react-native";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import LaunchScreen from "../screens/LaunchScreen";
import AuthScreen from "../screens/auth/AuthScreen";

import HomeScreen from "../screens/HomeScreen";

// DISC SCREENS
import DiscsOverviewScreen, {
  screenOptions as discOverviewScreenOptions,
} from "../screens/discs/DiscsOverviewScreen";
import UserDiscsScreen, {
  screenOptions as userDiscScreenOptions,
} from "../screens/discs/UserDiscsScreen";
import DiscDetailScreen, {
  screenOptions as discDetailScreenOptions,
} from "../screens/discs/DiscDetailScreen";
import DiscComparisonScreen, {
  screenOptions as discComparisonScreenOptions,
} from "../screens/discs/DiscComparisonScreen";
import DiscSearchScreen, {
  screenOptions as discSearchScreenOptions,
} from "../screens/discs/DiscSearchScreen";

import CoursesOverviewScreen from "../screens/courses/CoursesOverviewScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import GameSetupScreen from "../screens/game/GameSetupScreen";

import AppColors from "../utils/AppColors";

const Tab = createBottomTabNavigator();
const DiscStack = createStackNavigator();
const AuthStack = createNativeStackNavigator();

const defaultStackNavOptions = {
  screenInterpolator: () => {},
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

const defaultAuthNavOptions = {
  headerShown: false,
};

export const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={defaultAuthNavOptions}
      initialRouteName="Launch"
    >
      <AuthStack.Screen name="Launch" component={LaunchScreen} />
      <AuthStack.Screen name="Login" component={AuthScreen} />
    </AuthStack.Navigator>
  );
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
      <DiscStack.Screen
        name="DiscComparison"
        component={DiscComparisonScreen}
        options={discComparisonScreenOptions}
      />
      <DiscStack.Screen
        name="DiscSearch"
        component={DiscSearchScreen}
        options={discSearchScreenOptions}
      />
    </DiscStack.Navigator>
  );
};

export const AppNavigator = (props) => {
  return (
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
  );
};
