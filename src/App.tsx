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

/*
test block :
    test("TITLE", () => {
        LOGIC (
            render component
            find elements we wanna interact w (inputs, buttons, etc.)
            interact w elements
            assert that results are as expected
        )
    });


convention : 

> go into component folder > create "__test__" folder inside it > name file "[NAME].test.js"
*/

// import { render } from "@testing-library/react";
// import App from "./App";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
