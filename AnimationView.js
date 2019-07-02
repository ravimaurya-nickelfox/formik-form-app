import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions
} from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    let screenWidth = Dimensions.get("window").width,
      screenHeight = Dimensions.get("window").height;
    this.state = {
      MainPosition: [
        styles.main,
        { width: screenWidth * 2 },
        { height: screenHeight },
        { marginTop: 0 },
        { marginLeft: 0 }
      ],
      paneDimensions: [
        styles.pane,
        { width: screenWidth },
        { height: screenHeight }
      ],
      list:[1]
    };
    this.slideCount = 1
  }
  
  componentWillMount() {
    this.animatedLeftMargin = new Animated.Value(0);
    console.log(this.animatedLeftMargin)
  }

  SlidePane = direction => {
    let screenHeight = Dimensions.get("window").height,
      screenWidth = Dimensions.get("window").width,
      theLeftMargin;

    console.log("MM, ", theLeftMargin);
    if (direction === "right") {
      theLeftMargin = parseInt("-" + (screenWidth*this.slideCount));
      Animated.timing(this.animatedLeftMargin, {
        toValue: theLeftMargin,
        duration: 300
      }).start();

      this.slideCount += 1
      let {list} = this.state
        list.push(Math.floor(Math.random()*10))
        this.setState({list})
    } else {
      theLeftMargin = parseInt("-" + (screenWidth*this.slideCount));
      theLeftMargin = theLeftMargin+screenWidth
      Animated.timing(this.animatedLeftMargin, {
        toValue: theLeftMargin,
        duration: 300
      }).start();
      this.slideCount -= 1
      let {list} = this.state
        list.push(Math.floor(Math.random()*10))
        this.setState({list})
    }
    this.setState({
      MainPosition: [
        styles.main,
        { width: screenWidth * (this.slideCount+1) },
        { height: screenHeight },
        { marginTop: 0 }
      ]
    });
  };

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <Animated.View
          style={[
            this.state.MainPosition,
            { marginLeft: this.animatedLeftMargin }
          ]}
        >
          {/* <StatusBar hidden /> */}
          {
              this.state.list.map((item,index)=>
              <View style={this.state.paneDimensions}>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.SlidePane("right")}
                    >
                    <Text style={styles.buttonText} onPress={() => this.SlidePane("left")}>Slide Right {item}</Text>
                    </TouchableOpacity>
                </View>
              </View>
            )
          }
          {/* <View style={this.state.paneDimensions}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => this.SlidePane("left")}
            >
              <Text style={styles.paneText}>Right Pane</Text>
            </TouchableOpacity>
          </View> */}
        </Animated.View>
      </View>
    ); // end return
  } // end render
} // end export

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "hsla(0, 0%, 0%, 1)"
  },
  row: {
    flexDirection: "row",
    width: "100%",
    height: "100%"
  },
  pane: {
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 50,
    borderTopColor: "transparent",
    backgroundColor: "hsla(38, 100%, 73%, 1)"
  },
  paneText: {
    fontSize: 20,
    color: "black"
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingTop: 0,
    paddingBottom: 3
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "94%",
    marginBottom: 3,
    padding: 10,
    backgroundColor: "hsla(38, 100%, 50%, 1)"
  },
  buttonText: {
    fontSize: 20,
    color: "red"
  }
});
