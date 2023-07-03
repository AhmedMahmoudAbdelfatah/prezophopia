// import React from "react";
// import { useState } from "react";
// import "../../styles/Profile.css"
// import axios from "axios";




// export default function Skills(props){
//     // Simulating the authenticated user ID
//     const authenticatedUserId = '123'; 

//     // Check if the user_id prop matches the authenticated user ID
//     // const isAuthorized = props.user_id === authenticatedUserId;
//     const isAuthorized  = true;
  
//   //START Skills LIST
//   const skillsData = ['JavaScript', 'React', 'HTML', 'CSS'];
//   const [skills, setSkills] = useState(skillsData);
//   const [newSkill, setNewSkill] = useState('');
  
//   const handleSkillsInputChange = (e) => {
//     setNewSkill(e.target.value);
//   };
  
//   const handleAddSkill = () => {
//     if (newSkill) {
//       setSkills([...skills, newSkill]);
//       setNewSkill('');
//     }
//   };
  
//   const handleDeleteSkill = (index) => {
//     const updatedSkills = [...skills];
//     updatedSkills.splice(index, 1);
//     setSkills(updatedSkills);
//   };

//   return (
//       <div>
//         {isAuthorized ? (
//           // MY PROFILE
//           <div>
//           <h2>Skills</h2>
//           <ul className="skills-list">
//             {skills.map((skill, index) => (
//               <li key={index}>
//                 <span className="text">{skill}</span>
//                 <button className="delete-button" onClick={() => handleDeleteSkill(index)}><i class="fa-solid fa-delete-left"></i></button>
//               </li>
//             ))}
//             <li className="add-li">
//               <input type="text" value={newSkill} onChange={handleSkillsInputChange} />
//               <button className="add-button" onClick={handleAddSkill}>Add</button>
//             </li>
//           </ul>
//         </div>
//         ) : (
//           // USER PROFILE
//           <div>
//               <h2>Skills</h2>
//               <ul className="skills-list">
//                 {skills.map((skill, index) => (
//                   <li key={index}>{skill}</li>
//                 ))}
//               </ul>
//             </div>
//         )}
      
//     </div>
    
//   )
// }
// //END Skills LIST














// --------------------------------------------------------
import React, { useContext } from "react";
import { useState , useEffect} from "react";
import axios from "axios";
import { UserContext } from "../../features/UserContext";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faInfoCircle } from "@fortawesome/free-solid-svg-icons";




export default function Skills(props) {
    const { userId } = useParams();
    const { user } = useContext(UserContext);

    // Simulating the authenticated user ID
    const isAuthorized  = +userId === +user.id;
  
  //START Skills LIST
  const skillsData = ['JavaScript', 'React', 'HTML', 'CSS'];
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  

  
  const handleAddSkill = async () => {
    if (newSkill) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
      try {
        // Send a POST request to update the aboutText in the API
        const response = await axios.put('http://localhost:8080/api/profile/update/skills?skills='+newSkill , {},{
          headers: {
            "Content-Type": "application/json",
            Authorization:
                "Bearer " + user.accessToken
              }}
              );
              console.log(response.data)
      } catch (error) {
        console.log("Error saving skills:", error);
      }
      
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
        setSkills(response.data.data.skills);
        console.log(response.data.data.skills)
      } catch (error) {
        console.error("Error fetching about text:", error);
      }
    };

    fetchData();
  }, [user]);



  const handleDeleteSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };
  const [error, setError] = useState('');

  const handleSkillsInputChange = (event) => {
    const inputValue = event.target.value;

    // Validate the input
    if (inputValue.length > 0 && inputValue.length <= 20) {
      // Valid input
      setError(""); // Clear any previous error
    } else {
        // Invalid input
        //   setNewSkill("");
        setError("Skill should be between 1 and 20 characters"); // Set the error message
    }
    setNewSkill(inputValue);
    
  };

  return (
      <div>
        {isAuthorized ? (
          // MY PROFILE
          <div>
          <h2>Skills</h2>
          <ul className="skills-list">
            {skills.map((skill, index) => (
              <li key={index}>
                    <span className="text">{skill}</span>
                    <button className="delete-button" onClick={() => handleDeleteSkill(index)}>
                        {/* <i class="fa-solid fa-delete-left"></i> */}
                        <FontAwesomeIcon icon={faDeleteLeft}/>
                    </button>
              </li>
            ))}
            <li className="add-li">
              <input type="text" value={newSkill} onChange={handleSkillsInputChange} />
              <button className="add-button" onClick={handleAddSkill}>Add</button>
            </li>
          {error &&  <div className="error-message" ><FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "8px" }} />  {error}</div>}
          </ul>
        </div>
        ) : (
          // USER PROFILE
          <div>
              <h2>Skills</h2>
              <ul className="skills-list">
                {skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
        )}
      
    </div>
    
  )
}
//END Skills LIST
