import React from "react";
import {
  RefreshControl,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
import { Icon, ListItem } from "react-native-elements";
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

  getAfter(subreddit, after, before) {
    const url = `https://api.pushshift.io/reddit/submission/search/?subreddit=${subreddit}&after=${after}&before=${before}&size=100`;
    console.log(url);
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
        const currentEPOCH = current.children[lastIdx].data.created;
        console.log(currentEPOCH);
        const afterEPOCH = Number(currentEPOCH)-100;
        const beforeEPOCH = Number(currentEPOCH)+100;
        // const afterEPOCH = moment(Date(currentEPOCH)).subtract(10, "seconds").valueOf()/1000;
        // const beforeEPOCH = moment(Date(currentEPOCH)).add(10, "seconds").valueOf()/1000;

        this.getAfter(subreddit, afterEPOCH, beforeEPOCH).then(after => {
          this.setState(prevState => {
            return {
              children: [...prevState.children, ...after],
              ready: true
            };
          });
          // console.log(this.state.children);
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
      // console.log("Current", r);
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
            keyExtractor={post => post.id}
            renderItem={post => {
              // console.log("Item",item)
              return (
                <TouchableOpacity
                  ref={ref => {
                    this.itemRef = ref;
                  }}
                  key={post.item.name}
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
                    navigate("Comments", { post: post });
                  }}
                >
                  <ListItem title={post.item.title} />
                  {post.item.preview ? (
                    //TODO: Fix preview part from temporary image display 
                    <Image
                      style={{ width: deviceWidth, height: 250 }}
                      resizeMode={"contain"}
                      source={{
                        uri: post.item.preview.images[0].resolutions[3]
                          ? post.item.preview.images[0].resolutions[3].url.replace(
                              /&amp;/g,
                              "&"
                            )
                          : post.item.preview.images[0].resolutions[0].url.replace(
                              /&amp;/g,
                              "&"
                            )
                      }}
                    />
                  ) : (
                    <Text>No Preview</Text>
                  )}
                </TouchableOpacity>
              );
            }}
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
