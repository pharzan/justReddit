import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  SearchBar,
  WebView,
  Dimensions,
  RefreshControl
} from "react-native";

import { Icon } from "react-native-elements";

import { List, ListItem } from "react-native-elements";
//react-navigation
import { createStackNavigator, createAppContainer } from "react-navigation";
import moment from "moment";

import {Settings} from './components/Settings.js';

console.log("^^^",Settings)


class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

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
