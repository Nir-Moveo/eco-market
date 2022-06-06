import React from "react";
import "./App.css";

import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import MainFrame from "./components/main-frame/MainFrame";

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
        <MainFrame />
      </div>
    );
  }
}

export default App;
