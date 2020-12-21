import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Platform } from "react-native";

import AlternativeScreen from "../screens/moora/AlternativeScreen";
import AlternativeDetailScreen from "../screens/moora/AlternativeDetailScreen";
import EditAlternativeScreen from "../screens/moora/EditAlternativeScreen";
import CriteriaScreen from "../screens/moora/CriteriaScreen";
import CriteriaDetailScreen from "../screens/moora/CriteriaDetailScreen";
import EditCriteriaScreen from "../screens/moora/EditCriteriaScreen";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "white",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
};

const AlternativeNavigator = createStackNavigator(
  {
    Alternative: AlternativeScreen,
    AlternativeDetail: AlternativeDetailScreen,
    EditAlternative: EditAlternativeScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-analytics" : "ios-analytics"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const CriteriaNavigator = createStackNavigator(
  {
    Criteria: CriteriaScreen,
    CriteriaDetail: CriteriaDetailScreen,
    EditCriteria: EditCriteriaScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MooraNavigator = createDrawerNavigator(
  {
    Alternative: AlternativeNavigator,
    Criteria: CriteriaNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primaryColor,
    },
  }
);

export default createAppContainer(MooraNavigator);
