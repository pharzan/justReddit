import { createStackNavigator, createAppContainer } from "react-navigation";
import moment from "moment";

import {Home} from './components/Home.js';

const MainNavigator = createStackNavigator({
  Home: { screen: Home },
});
const App = createAppContainer(MainNavigator);
export default App;


