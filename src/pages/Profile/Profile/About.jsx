import React from "react";
import { useState } from "react";
// import "../../styles/Profile.css"




export default function About(props){
    // Simulating the authenticated user ID
    const authenticatedUserId = '123'; 

    // Check if the user_id prop matches the authenticated user ID
    // const isAuthorized = props.user_id === authenticatedUserId;
    const isAuthorized  = true;
  
//Start About List
const aboutItemsData = 'Lorem ipsum dolor sit, amet consectetur Lorem ipsum dolor sit, amet consectetur Lorem ipsum dolor sit, amet consectetur '

const [aboutText, setAboutText] = useState(aboutItemsData);
const [editMode, setEditMode] = useState(false);

const handleAboutInputChange = (e) => {
  setAboutText(e.target.value);
};

const handleEdit = () => {
  setEditMode(true);
};

const handleSave = () => {
  // Perform any save or update logic here
  console.log('About text:', aboutText);
  setEditMode(false);
};


//End About List
  return (
      <div>
        {isAuthorized ? (
          // MY PROFILE
          <div>
          <h2>About</h2>
          <ul className="about-list">
            <li>
              {editMode ? (
                <textarea
                  className="text-area"
                  value={aboutText}
                  onChange={handleAboutInputChange}
                  placeholder="Enter your text here"
                />
              ) : (
                <div className="text">{aboutText}</div>
              )}
              {editMode ? (
                <button className="save-btn" onClick={handleSave}>Save</button>
              ) : (
                <button className="edit-btn" onClick={handleEdit}>Edit</button>
              )}
            </li>
          </ul>
        </div>
        ) : (
          // USER PROFILE
          <div>
            <h2>About</h2>
            <ul className="about-list">
              <li>
                  <div className="text">{aboutText}</div>
              </li>
            </ul>
          </div>
        )}
      
    </div>
    
  )
}
