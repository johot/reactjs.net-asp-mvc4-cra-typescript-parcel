import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { HelloWorld } from "./HelloWorld";

const App: React.FC = () => {
  return (
    <div className="App">
      <HelloWorld />
    </div>
  );
};

export default App;
