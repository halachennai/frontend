import React from "react";
import "./Hero.css";
import hand_icon from "../Assets/Frontend_Assets/hand_icon.png";
import arrow_icon from "../Assets/Frontend_Assets/arrow.png";
import hero_img from "../Assets/Custom/herobanner.png";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>New Arrivals Only</h2>
        <div>
          {/* <div className="hero-hand-icon">
            <p>new</p>
            <img src={hand_icon} alt="" />
          </div> */}
          <p>Collection</p>
          <p>for everyone</p>
        </div>
        <div className="hero-latest-btn">Latest Collection</div>
        <img src={arrow_icon} alt="" />
      </div>
      <div className="hero-right">
        <img src={hero_img} alt="" />
      </div>
    </div>
  );
};

export default Hero;
