import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useQuery, gql } from "@apollo/client";
import List from "./components/list/List";

function App() {
  return (
    <div className="App">
      <List />
    </div>
  );
}

export default App;
