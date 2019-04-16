import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export class Comments extends React.Component {
  constructor(props) {
    super(props);
    (this.state = { comments: {} }), (this.loaded = false);
  }

  render() {
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );
  }
}
