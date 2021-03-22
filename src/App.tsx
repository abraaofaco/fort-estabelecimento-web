import React from "react";
import Modal from "react-modal";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from "./styles/globals";
import AppProvider from "./hooks";
import Routes from "./routes";

Modal.setAppElement("#root");

const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>
      <GlobalStyle />
    </Router>
  );
};

export default App;
