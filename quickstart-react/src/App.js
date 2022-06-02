import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import AttentionBox from "monday-ui-react-core/dist/AttentionBox.js";

import Card from "./components/cards/Card";
import { images } from "./constans";
const monday = mondaySdk();

class App extends React.Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      settings: {},
      name: "",
    };
  }

  componentDidMount() {
    // TODO: set up event listeners
  }

  render() {
    return (
      <div className="App">
        <Card
          name="ZARA t-shirt"
          description="Popover message will appear here loremipsum dolor samet Popover message will appear here loremipsum dolor samet Popover message will appear here loremipsum dolor samet Popover message will appear here loremipsum dolor samet"
          owner="ofek ben david"
          images={images}
          interested_list={["alon gilad", "or levi", "ofek ben", "asff", "dsgfh"]}
          phone_number="23456"
          published_at={new Date().toDateString()}
        />
        <Card
          name="Ikea sofa"
          description="asdf Popover message will appear here loremipsum dolor samet Popover message will appear here loremipsum dolor samet Popover message will appear here loremipsum dolor sametg"
          owner="ofek ben david"
          interested_list={["alon gilad", "or levi", "ofek ben", "asff", "dsgfh"]}
          phone_number="23456"
          published_at={new Date().toDateString()}
        />
      </div>
    );
  }
}

export default App;
