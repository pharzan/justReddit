import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Settings } from "./Settings";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { subreddits: [] };
  }

  componentDidMount() {
    const _subreddits = Object.keys(Settings.subscriptions);
    this.setState(prevState => ({
      subreddits: [..._subreddits]
    }));
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        {this.state.subreddits.map((subreddit, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => {
                navigate("Home", {
                  navigate: navigate,
                  subbreddit: subreddit
                });
              }}
            >
              <Text>{subreddit}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}
