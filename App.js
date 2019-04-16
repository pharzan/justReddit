import React from 'react';
import {
  StyleSheet
} from "react-native";

import { Icon } from "react-native-elements";

import { List, ListItem } from "react-native-elements";
//react-navigation
import { createStackNavigator, createAppContainer } from "react-navigation";
import moment from "moment";

import {Settings} from './components/Settings.js';

import {Home} from './components/Home.js';

console.log("^^^",Settings)




const MainNavigator = createStackNavigator({
  Home: { screen: Home },
});
const App = createAppContainer(MainNavigator);
export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
