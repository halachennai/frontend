import React from "react";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import NewCollections from "../Components/NewCollections/NewCollections";

const Home = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <NewCollections />
    </div>
  );
};

export default Home;
