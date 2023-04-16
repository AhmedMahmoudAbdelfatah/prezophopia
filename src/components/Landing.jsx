/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import '../styles/Landing.css'

export default function Landing() {
  return (
    <div className="landing">
      <div className="container">
        <div className="text">
          <h1 className="text-content">Welcome, To PREZOPHOPIA</h1>
          <p className="text-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            illum, harum neque perspiciatis eius a minima obcaecati deserunt
            possimus ut, commodi facere nihil temporibus. Obcaecati soluta
            tenetur asperiores quae ipsum?
          </p>
        </div>
        <div className="image">
          <img src="images/landing.jpeg" alt="Landing Image" />
        </div>
      </div>
    </div>
  );
}
