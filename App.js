import { createStackNavigator, createAppContainer } from "react-navigation";

import {Home} from './components/Home.js';
import {Subreddit} from './components/Subreddit.js';
import {Comments} from './components/Comments.js';

const MainNavigator = createStackNavigator({
  Home: { screen: Home },
  Subreddit: { screen: Subreddit },
  Comments: { screen: Comments },
});

const App = createAppContainer(MainNavigator);
export default App;


