import React from "react";
import "../styles/Profile.css"
import Navbar from "./Navbar";
import { useState } from "react";
import Post from "../components/Post"


export default function Profile() {

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };


  return (
      <div>
      <Navbar />
        <div className="profile"> 
        <img src="images/landing.jpeg" alt="" />
        <p className="name">Ahmed Ali<i class="fa-solid fa-camera"></i></p>


        <div className="container">
          <div className="bloc-tabs">
            <button
              className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(1)}
            >
              Posts
            </button>
            <button
              className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(2)}
            >
              Education 
            </button>
            <button
              className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(3)}
            >
              Skills
            </button>
            <button
              className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(4)}
            >
              Contact
            </button>
          </div>

          <div className="content-tabs">
            <div
              className={toggleState === 1 ? "content  active-content" : "content"}
            >
              <h2>Content 1</h2>
              <hr />
              <ul >
              {/* <Post />
              <Post />
              <Post />
              <Post />
              <Post /> */}
              </ul>
            </div>

            <div
              className={toggleState === 2 ? "content  active-content" : "content"}
            >
              <h2>Content 2</h2>
              <hr />

              <div className="education-box">
              <h3><i className="fa-solid fa-graduation-cap"></i> Dgeree 1 </h3>
              <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni blanditiis eaque aliquid neque, perspiciatis consectetur perferendis iure placeat repellendus nisi illum in unde, libero nulla dolorum facilis? Tempora, itaque dolor.
              </p>
              </div>
              <div className="education-box">
              <h3><i className="fa-solid fa-graduation-cap"></i> Dgeree 2</h3>
              <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni blanditiis eaque aliquid neque, perspiciatis consectetur perferendis iure placeat repellendus nisi illum in unde, libero nulla dolorum facilis? Tempora, itaque dolor.
              </p>
              </div>
              <div className="education-box">
              <h3><i className="fa-solid fa-graduation-cap"></i> Dgeree 3 </h3>
              <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni blanditiis eaque aliquid neque, perspiciatis consectetur perferendis iure placeat repellendus nisi illum in unde, libero nulla dolorum facilis? Tempora, itaque dolor.
              </p>
              </div>
            </div>

            <div
              className={toggleState === 3 ? "content  active-content" : "content"}
            >
              <h2>Content 3</h2>
              <hr />
              <p className="skill-item"><i class="fa-solid fa-circle"></i> Skill 1</p>
              <p className="skill-item"><i class="fa-solid fa-circle"></i> Skill 2</p>
              <p className="skill-item"><i class="fa-solid fa-circle"></i> Skill 3</p>
              <p className="skill-item"><i class="fa-solid fa-circle"></i> Skill 4</p>
                </div>

            <div
              className={toggleState === 4 ? "content  active-content" : "content"}
            >
              <h2>Content 4</h2>
              <hr />
              <ul>
                <li>
                  <i class="fa-solid fa-phone"></i>
                  <p>+20123456789
                    +20198765432</p>
                </li>
              </ul>
              <ul className="social-media">
              <li>
                <a href="#">
                  <i class="fa-brands fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fa-brands fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fa-brands fa-youtube"></i>
                </a>
              </li>
          </ul>
            </div>


          </div>
        </div>
      </div> 

      </div>
      
  )
}