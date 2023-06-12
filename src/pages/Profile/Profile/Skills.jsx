import React from "react";
import { useState } from "react";
// import "../../styles/Profile.css"




export default function Skills(props){
    // Simulating the authenticated user ID
    const authenticatedUserId = '123'; 

    // Check if the user_id prop matches the authenticated user ID
    // const isAuthorized = props.user_id === authenticatedUserId;
    const isAuthorized  = true;
  
  //START Skills LIST
  const skillsData = ['JavaScript', 'React', 'HTML', 'CSS'];
  const [skills, setSkills] = useState(skillsData);
  const [newSkill, setNewSkill] = useState('');
  
  const handleSkillsInputChange = (e) => {
    setNewSkill(e.target.value);
  };
  
  const handleAddSkill = () => {
    if (newSkill) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };
  
  const handleDeleteSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
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
                <button className="delete-button" onClick={() => handleDeleteSkill(index)}><i class="fa-solid fa-delete-left"></i></button>
              </li>
            ))}
            <li className="add-li">
              <input type="text" value={newSkill} onChange={handleSkillsInputChange} />
              <button className="add-button" onClick={handleAddSkill}>Add</button>
            </li>
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
