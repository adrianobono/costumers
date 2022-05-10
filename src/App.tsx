import React, { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import List from "./components/list/List";
import Modal from "./components/modal/Modal";
function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="App">
      <Header />
      <List />
      <button onClick={() => setIsOpen(true)}>Click to Open Modal</button>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        Teste modal
      </Modal>
    </div>
  );
}

export default App;
