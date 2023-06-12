import React from "react";
import "./Profile.css"
import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";
import Education from "./Profile/Education"
import Skills from "./Profile/Skills"
import Contact from "./Profile/Contact"
import About from "./Profile/About"



export default function Profile( props ) {





  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };



//Start Cover Photo
const [coverPhoto, setCoverPhoto] = useState('images/nocover.jpeg');

  const handleCoverPhotoChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setCoverPhoto(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };
//End Cover Photo


// Start Profile PIC
const [profilePicture, setProfilePicture] = useState('images/noprofil.jpeg');

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setProfilePicture(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };
// End Profile PIC



  return (
      <div>
      <Navbar />
      <div>
          <div className="profile"> 

          <div className="profile-container">
          <div class="upload-cover">
            <img src={coverPhoto} alt="Cover Photo" className="cover-photo" width="100%"/>
              <div className="round">
                <label htmlFor="cover-input">Upload Cover Photo</label>
                <input type="file" id="cover-input" accept="image/*" onChange={handleCoverPhotoChange} />
              </div>
          </div>


            <div class="upload">
              {/* <img src="images/noprofil.jpg" width = "100" height = "100"  alt=""/>
              <div class="round">
                <input type="file"></input>
                <i class="fa-solid fa-camera"></i>
              </div> */}
              <img src={profilePicture} alt="Profile Picture" className="profile-picture" width = "100" height = "100"/>
              <div className="round">
                <input type="file" onChange={handleProfilePictureChange} />
                <i class="fa-solid fa-camera"></i>
              </div>
            <p className="name">Profile name</p>
            </div>
        </div>

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
            Contact Info
          </button>
          <button
            className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(5)}
          >
            About
          </button>
          </div>

          <div className="content-tabs">
          <div
            className={toggleState === 1 ? "content  active-content" : "content"}
          >
            <h2>Posts</h2>
            <hr />
            <ul >
            
            </ul>
          </div>


          {/* Start Education */}
          <div
            className={toggleState === 2 ? "content  active-content" : "content"}
          >
            <Education />
        </div>
          {/* End Education */}


          {/* Start Skills */}
          <div
            className={toggleState === 3 ? "content  active-content" : "content"}
          >
            <Skills />
          </div>
          {/* End Skills */}

          {/*Start Contact Info */}  
          <div
            className={toggleState === 4 ? "content  active-content" : "content"}
          >
            <Contact />
          </div>
          {/*End Contact Info */}  
          
          {/*Start About */}
          <div
            className={toggleState === 5 ? "content  active-content" : "content"}
          >
            <About />
          </div>
          {/* End About */}

          </div>
          </div>
      </div> 
  </div>
      </div>
      
  )
}