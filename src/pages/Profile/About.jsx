// import React from "react";
// import { useState } from "react";
// import "../../styles/Profile.css"




// export default function About(props){
//     // Simulating the authenticated user ID
//     const authenticatedUserId = '123'; 

//     // Check if the user_id prop matches the authenticated user ID
//     // const isAuthorized = props.user_id === authenticatedUserId;
//     const isAuthorized  = true;
  
// //Start About List
// const aboutItemsData = 'Lorem ipsum dolor sit, amet consectetur Lorem ipsum dolor sit, amet consectetur Lorem ipsum dolor sit, amet consectetur '

// const [aboutText, setAboutText] = useState(aboutItemsData);
// const [editMode, setEditMode] = useState(false);

// const handleAboutInputChange = (e) => {
//   setAboutText(e.target.value);
// };

// const handleEdit = () => {
//   setEditMode(true);
// };

// const handleSave = () => {
//   // Perform any save or update logic here
//   console.log('About text:', aboutText);
//   setEditMode(false);
// };


// //End About List
//   return (
//       <div>
//         {isAuthorized ? (
//           // MY PROFILE
//           <div>
//           <h2>About</h2>
//           <ul className="about-list">
//             <li>
//               {editMode ? (
//                 <textarea
//                   className="text-area"
//                   value={aboutText}
//                   onChange={handleAboutInputChange}
//                   placeholder="Enter your text here"
//                 />
//               ) : (
//                 <div className="text">{aboutText}</div>
//               )}
//               {editMode ? (
//                 <button className="save-btn" onClick={handleSave}>Save</button>
//               ) : (
//                 <button className="edit-btn" onClick={handleEdit}>Edit</button>
//               )}
//             </li>
//           </ul>
//         </div>
//         ) : (
//           // USER PROFILE
//           <div>
//             <h2>About</h2>
//             <ul className="about-list">
//               <li>
//                   <div className="text">{aboutText}</div>
//               </li>
//             </ul>
//           </div>
//         )}
      
//     </div>
    
//   )
// }






// ------------------------------------------------------------------------
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../features/UserContext";
import { useParams } from "react-router-dom";

export default function About(props) {
    const { user } = useContext(UserContext);
    const { userId } = useParams();


    // Check if the user_id prop matches the authenticated user ID
    // const isAuthorized = props.user_id === authenticatedUserId;
    const isAuthorized  = +user.id === +userId;

  const [aboutText, setAboutText] = useState("");
  const [editMode, setEditMode] = useState(false);

  const handleAboutInputChange = (e) => {
    setAboutText(e.target.value);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      // Send a POST request to update the aboutText in the API
      const response = await axios.put('http://localhost:8080/api/profile/update/bio?bio='+aboutText , {},{
        headers: {
          "Content-Type": "application/json",
          Authorization:
              "Bearer " + user.accessToken
            }}
            );
      console.log(response.data)
      setEditMode(false);
    } catch (error) {
      console.log("Error saving about text:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the aboutText data from the API
        const response = await axios.get('http://localhost:8080/api/profile/'+userId ,{
          headers: {
            "Content-Type": "application/json",
            Authorization:
                "Bearer " + user.accessToken
              }}
              );
        setAboutText(response.data.data.bio);
        console.log(response.data.data.bio)
      } catch (error) {
        console.error("Error fetching about text:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div>
      {isAuthorized ? (
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
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>
              ) : (
                <button className="edit-btn" onClick={handleEdit}>
                  Edit
                </button>
              )}
            </li>
          </ul>
        </div>
      ) : (
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
  );
}