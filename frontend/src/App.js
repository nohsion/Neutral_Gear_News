import React from "react";
import "./App.css";
import { HashRouter, Route } from "react-router-dom";
import About from "./routes/About";
import Home from "./routes/Home";
import Detail from "./routes/detail_page/Detail";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div>
      <HashRouter>
        <h1 class="main_name">중.립.기.어 News</h1>
        {/* <Navigation /> */}
        <Route path="/" exact={true} component={Home} />
        <Route path="/about" component={About} />
        <Route path="/detail/:id" component={Detail} />
      </HashRouter>
    </div>
  );
}

export default App;
