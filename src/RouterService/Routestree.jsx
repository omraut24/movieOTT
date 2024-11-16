import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../page-components/home/index";
import TopRated from "../page-components/top-rated/top-rated";
import Upcoming from "../page-components/upcoming/upcoming";
// import Navbar from "../page-components/header/header";
const Routestree = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/toprated" element={<TopRated />} />
        <Route exact path="/upcoming" element={<Upcoming />} />
      </Routes>
    </>
  );
};
export default Routestree;
