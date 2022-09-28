import React from "react";
import Routing from "./routes/Routing";
import { BrowserRouter } from "react-router-dom";
import { addDefaultsToAxios } from "./utils/localStorage";
import "./App.css";

const App: React.FC = () => {
  addDefaultsToAxios();
  return (
    <div className="App">
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </div>
  );
};

export default App;
