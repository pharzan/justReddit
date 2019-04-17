import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import moment from "moment";

let commentStrings = [];
export class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: {}, post: {}, commentStrings: [] };
    this.loaded = false;
  }

  getCurrent(postId) {
    return new Promise((resolve, reject) => {
      fetch(`https://www.reddit.com/api/info.json?id=${postId}`)
        .then(res => res.json())
        .then(result => {
          return resolve(result.data);
        });
    });
  }

  parseComments(comments, i, j) {
    for (let property in comments) {
      if (comments.hasOwnProperty(property)) {
        if (property === "replies") {
          this.parseComments(comments[property], i, j);
        } else if (typeof comments[property] === "object") {
          if (comments[property] != null) {
            if (comments[property].body != undefined) {
              this.setState({
                commentStrings: commentStrings.push(
                  ".".repeat(j) + comments[property].body
                )
              });
              // console.log(".".repeat(j), property, comments[property].body);
              console.log(this.state.commentStrings);
              j += 1;
            }
            this.parseComments(comments[property], i, j);
          }
        }
      } else {
        console.log("!!!HERE");
      }
    }
  }

  getComments() {
    // const url = `https://www.reddit.com/r/${subreddit}/comments/${postId}.json`;

    const url = `https://www.reddit.com/r/redditdev/comments/bdgd0o.json`;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(result => {
          return resolve(result);
        });
    });
  }

  componentDidMount() {
    const { navigation } = this.props;
    const post = navigation.getParam("post", "post");
    this.setState({
      post: post.item
    });
    this.getComments().then(result => {
      this.parseComments(result, 0, 0);
    });
  }

  render() {
    return (
      <View>
        {commentStrings.map((c,i) => (
          <Text key={i} >{c}</Text>
        ))}
        <Text>{this.state.post.title}</Text>
      </View>
    );
  }
}
