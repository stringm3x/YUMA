import React from "react";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Add from "./components/Add";
import Fav from "./components/Fav";

const pageMen = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Menu />
      <Add />
      <Fav />
    </div>
  );
};

export default pageMen;
