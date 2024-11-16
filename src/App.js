// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "../src/page-components/home/index";
import TopRated from "../src/page-components/top-rated/top-rated";
import Upcoming from "../src/page-components/upcoming/upcoming";
// import Routestree from "../src/RouterService/Routestree";
import Details from "./page-components/details/detail";
import { Navbar } from "./page-components/header/header";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/toprated" element={<TopRated />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/:id" element={<Details />} />
        {/* */}
      </Routes>
    </Router>
  );
}

export default App;
