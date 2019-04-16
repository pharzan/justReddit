import { createStackNavigator, createAppContainer } from "react-navigation";
import moment from "moment";

import {Home} from './components/Home.js';
import {Subreddit} from './components/Subreddit.js';

const MainNavigator = createStackNavigator({
  Home: { screen: Home },
  Subreddit: { screen: Subreddit },
});
const App = createAppContainer(MainNavigator);
export default App;


