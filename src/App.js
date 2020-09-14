import React from "react";

import "./App.css";

import { CardView } from "./components/CardView/CardView";

function App() {
  return (
    <div className="App">
      <CardView rank={"ACE"} suit={"SPADES"} />
    </div>
  );
}

export default App;
