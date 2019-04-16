import React from "react";
import {
  RefreshControl,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { Icon } from "react-native-elements";

import { Settings } from "./Settings";
import moment from "moment";
export class Subreddit extends React.Component {
  constructor(props) {
    super(props);
    this.boundaries = [];
    this.state = {
      isLoaded: false,
      children: [],
      refreshing: false,
      pageCount: 1
    };
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

  getAfter(subreddit, before, after) {
    const url = `https://api.pushshift.io/reddit/submission/search/?subreddit=${subreddit}&after=${after}&before=${before}&size=100`;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(result => {
          return resolve(result.data);
        });
    });
  }

  getLastViewed(subreddit) {
    return Settings.subscriptions[subreddit].lastViewed;
  }

  getPostData(subreddit) {
    return new Promise((resolve, reject) => {
      this.getCurrent(this.lastViewed).then(current => {
        const lastIdx = current.children.length - 1;
        const after = current.children[lastIdx].data.created_utc;
        const before =
          moment("2019-04-12 16:00:00", "YYYY-MM-DD HH:mm:ss").valueOf() / 1000;
        this.getAfter(subreddit, before, after).then(after => {
          this.setState(prevState => {
            return {
              children: [...prevState.children, ...after],
              ready: true
            };
          });
          console.log(this.state.children);
          resolve("");
        });
      });
    });
  }
  handleLoadMore() {}
  componentDidMount() {
    const { navigation } = this.props;
    const subreddit = navigation.getParam("subbreddit", "subbreddit");

    this.lastViewed = this.getLastViewed(subreddit);

    this.getPostData(subreddit).then(r => {
      console.log("Current", r);
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { children } = this.state.children;
    const deviceWidth = Dimensions.get("window").width;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.9 }}>
          <FlatList
            ref={ref => {
              this.flatListRef = ref;
            }}
            style={{
              backgroundColor: "red"
            }}
            data={this.state.children}
            renderItem={post => {
              // console.log("Item",item)
              return (
                <TouchableOpacity ref={ref => {
                  this.itemRef = ref;
                }}
                  onLayout={e => {
                    const boundary = {
                      width: e.nativeEvent.layout.width,
                      height: e.nativeEvent.layout.height,
                      x: e.nativeEvent.layout.x,
                      y: e.nativeEvent.layout.y
                    };
                    this.boundaries.push(boundary);
                  }}
                  onPress={() => {
                    navigate("Story", { parent: item });
                  }}>
                <Text>{post.item.title}</Text>
              </TouchableOpacity>
                )
            }}
            // keyExtractor={item => item.data.name}
            onEndReached={i => {
              this.handleLoadMore();
            }}
            // scrollToIndex={}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  width: "100%",
                  height: 0.7,
                  backgroundColor: "rgba( 52,52,52,1)"
                }}
              />
            )}
            onEndReachedThreshold={0.1}
            ListEmptyComponent={() => <Text style={{ flex: 1 }}>Loading</Text>}
          />
        </View>
        <View style={{ flex: 0.15 }}>
          <TouchableOpacity
            style={{ flex: 1, color: "black", flexDirection: "row" }}
          >
            <Icon
              name="home"
              type="font-awesome"
              color="#517fa4"
              size={26}
              reverse={true}
              onPress={() => {
                this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
