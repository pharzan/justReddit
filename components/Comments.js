import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import moment from "moment";

export class Comments extends React.Component {
  constructor(props) {
    super(props);
    (this.state = { comments: {} }), (this.loaded = false);
  }
  componentDidMount(){
  } 

  render() {
    const { navigation } = this.props;
    const post = navigation.getParam("post", "post");

    return (
      <View>
        <Text>{post.item.title}</Text>
      </View>
    );
  }
}
