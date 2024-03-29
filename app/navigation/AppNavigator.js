import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import GameIcons from "../assets/fonts/GameIcons";

// AUTH SCREENS
import LaunchScreen from "../screens/LaunchScreen";
import AuthScreen from "../screens/auth/AuthScreen";
import SignUpScreen, {
  screenOptions as SignUpScreenOptions,
} from "../screens/auth/SignUpScreen";

// HOME SCREEN
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

// GAME CONFIG SCREENS
import GameHomeScreen, {
  screenOptions as gameHomeScreenOptions,
} from "../screens/game/GameHomeScreen";
import GameSetupScreen, {
  screenOptions as gameSetupScreenOptions,
} from "../screens/game/GameSetupScreen";
import GameCourseSelectScreen, {
  screenOptions as gameCourseSelectScreenOptions,
} from "../screens/game/GameCourseSelectScreen";
import GameLaunchScreen, {
  screenOptions as GameLaunchScreenOptions,
} from "../screens/game/GameLaunchScreen";

// GAME SCREENS
import GameScreen, {
  screenOptions as gameScreenOptions,
} from "../screens/game/GameScreen";
import GameDiscSelectScreen, {
  screenOptions as gameDiscSelectScreenOptions,
} from "../screens/game/GameDiscSelectScreen";
import GameDrawerScreen from "../screens/game/GameDrawerScreen";

// COURSE SCREENS
import CoursesOverviewScreen, {
  screenOptions as courseOverviewScreenOptions,
} from "../screens/courses/CoursesOverviewScreen";
import CourseSearchScreen, {
  screenOptions as courseSearchScreenOptions,
} from "../screens/courses/CourseSearchScreen";
import CourseDetailScreen, {
  screenOptions as courseDetailScreenOptions,
} from "../screens/courses/CourseDetailScreen";
import CourseFilterScreen, {
  screenOptions as courseFilterScreenOptions,
} from "../screens/courses/CourseFilterScreen";

// PROFILE SCREENS
import ProfileScreen, {
  screenOptions as profileOverviewScreenOptions,
} from "../screens/profile/ProfileScreen";
import EditProfileScreen, {
  screenOptions as profileEditScreenOptions,
} from "../screens/profile/EditProfileScreen";

import AppColors from "../utils/AppColors";

const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();
const CourseStack = createStackNavigator();
const DiscStack = createStackNavigator();
const GameHomeStack = createStackNavigator();
const GamePlayStack = createStackNavigator();
const GamePlayDrawer = createDrawerNavigator();
const AuthStack = createNativeStackNavigator();

const AppStack = createStackNavigator();

const defaultStackNavOptions = {
  screenInterpolator: () => {},
  headerStyle: {
    backgroundColor: AppColors.primary,
  },
  headerTitleStyle: {
    fontFamily: "TitilliumWeb_600SemiBold",
  },
  headerBackTitleStyle: {
    fontFamily: "TitilliumWeb_400Regular",
  },
  headerTintColor: AppColors.white,
  headerBackTitleVisible: false,
};

const gameDrawerNavOptions = {
  drawerStyle: { backgroundColor: AppColors.black },
  drawerPosition: "right",
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
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={SignUpScreenOptions}
      />
    </AuthStack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator screenOptions={defaultStackNavOptions}>
      <ProfileStack.Screen
        name="ProfileOverview"
        component={ProfileScreen}
        options={profileOverviewScreenOptions}
      />
      <ProfileStack.Screen
        name="ProfileEdit"
        component={EditProfileScreen}
        options={profileEditScreenOptions}
      />
    </ProfileStack.Navigator>
  );
};

const CourseStackNavigator = () => {
  return (
    <CourseStack.Navigator screenOptions={defaultStackNavOptions}>
      <CourseStack.Screen
        name="CourseOverview"
        component={CoursesOverviewScreen}
        options={courseOverviewScreenOptions}
      />
      <CourseStack.Screen
        name="CourseSearch"
        component={CourseSearchScreen}
        options={courseSearchScreenOptions}
      />
      <CourseStack.Screen
        name="CourseDetail"
        component={CourseDetailScreen}
        options={courseDetailScreenOptions}
      />
      <CourseStack.Screen
        name="CourseFilters"
        component={CourseFilterScreen}
        options={courseFilterScreenOptions}
      />
    </CourseStack.Navigator>
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

const GameHomeStackNavigator = () => {
  return (
    <GameHomeStack.Navigator screenOptions={defaultStackNavOptions}>
      <GameHomeStack.Screen
        name="GameHome"
        component={GameHomeScreen}
        options={gameHomeScreenOptions}
      />
      <GameHomeStack.Screen
        name="GameSetup"
        component={GameSetupScreen}
        options={gameSetupScreenOptions}
      />
      <GameHomeStack.Screen
        name="GameCourseSelect"
        component={GameCourseSelectScreen}
        options={gameCourseSelectScreenOptions}
      />
      <GameHomeStack.Screen
        name="GameLaunch"
        component={GameLaunchScreen}
        options={GameLaunchScreenOptions}
      />
    </GameHomeStack.Navigator>
  );
};

const GamePlayStackNavigator = () => {
  return (
    <GamePlayStack.Navigator>
      <GamePlayStack.Screen
        name="GamePlayScreen"
        component={GameScreen}
        options={gameScreenOptions}
      />
      <GamePlayStack.Screen
        name="GameDiscSelect"
        component={GameDiscSelectScreen}
        options={gameDiscSelectScreenOptions}
      />
    </GamePlayStack.Navigator>
  );
};

const GamePlayDrawerNavigator = () => {
  return (
    <GamePlayDrawer.Navigator
      screenOptions={gameDrawerNavOptions}
      drawerContent={(props) => <GameDrawerScreen {...props} />}
    >
      <GamePlayDrawer.Screen
        name="GamePlay"
        component={GamePlayStackNavigator}
        options={{ headerShown: false }}
      />
    </GamePlayDrawer.Navigator>
  );
};

const AppTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: { backgroundColor: AppColors.primary },
        tabBarLabel: () => {
          return null;
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          size = 35;

          switch (route.name) {
            case "Home":
              iconName = focused ? "md-home-sharp" : "md-home-outline";
              return <Ionicons name={iconName} size={size} color={color} />;
            case "Discs":
              iconName = focused ? "bag-personal" : "bag-personal-outline";
              return (
                <GameIcons name={"frisbee-(1)"} size={size} color={color} />
              );
            case "Games":
              iconName = focused ? "gamepad-round" : "gamepad-round-outline";
              return (
                <GameIcons
                  name={"disc-golf-basket"}
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
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
      <Tab.Screen name="Courses" component={CourseStackNavigator} />
      <Tab.Screen name="Games" component={GameHomeStackNavigator} />
      <Tab.Screen name="Discs" component={DiscStackNavigator} />
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export const AppNavigator = (props) => {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="AppHome" component={AppTabNavigator} />
      <AppStack.Screen name="AppGame" component={GamePlayDrawerNavigator} />
    </AppStack.Navigator>
  );
};
