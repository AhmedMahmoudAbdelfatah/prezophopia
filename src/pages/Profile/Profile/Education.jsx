import React from "react";
import { useState } from "react";
// import "../../styles/Profile.css"




export default function Education(props){
    // Simulating the authenticated user ID
    const authenticatedUserId = '123'; 

    // Check if the user_id prop matches the authenticated user ID
    // const isAuthorized = props.user_id === authenticatedUserId;
    const isAuthorized  = true;
  

// START Education List
const educationDataList = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University of Example',
    year: '2015-2019'
  },
  {
    degree: 'Master of Business Administration',
    institution: 'Business School XYZ',
    year: '2020-2022'
  }
];
const [educationData, setEducationData] = useState(educationDataList);

const [newEducation, setNewEducation] = useState({
  degree: '',
  institution: '',
  year: ''
});

const [editEducationIndex, setEditEducationIndex] = useState(null);

const handleEducationInputChange = (e) => {
  const { name, value } = e.target;
  setNewEducation((prevEducation) => ({
    ...prevEducation,
    [name]: value
  }));
};

const handleAddEducation = () => {
  if (newEducation.degree && newEducation.institution && newEducation.year) {
    if (editEducationIndex !== null) {
      // Update existing education
      setEducationData((prevData) => {
        const updatedData = [...prevData];
        updatedData[editEducationIndex] = newEducation;
        return updatedData;
      });
      setEditEducationIndex(null);
    } else {
      // Add new education
      setEducationData((prevData) => [...prevData, newEducation]);
    }

    setNewEducation({
      degree: '',
      institution: '',
      year: ''
    });
  }
};

const handleDeleteEducation = (index) => {
  setEducationData((prevData) => {
    const updatedData = [...prevData];
    updatedData.splice(index, 1);
    return updatedData;
  });
};

const handleEditEducation = (index) => {
  const educationToEdit = educationData[index];
  setNewEducation(educationToEdit);
  setEditEducationIndex(index);
};

// END Education List
  return (
      <div>
        {isAuthorized ? (
          // MY PROFILE
          <div>
              <h2>Education</h2>
              <ul className="education-list">
                {educationData.map((education, index) => (
                  <li key={index}>
                    <div>
                      <div className="degree">{education.degree}</div>
                      <div className="institution">{education.institution}</div>
                      <div className="year">{education.year}</div>
                    </div>
                    <div className="buttons-container">
                      <button className="edit-button" onClick={() => handleEditEducation(index)}>
                        Edit
                      </button>
                      <button className="delete-button" onClick={() => handleDeleteEducation(index)}>
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
                <li>
                  <input
                    className="input-to-add"
                    type="text"
                    name="degree"
                    value={newEducation.degree}
                    onChange={handleEducationInputChange}
                    placeholder="Degree"
                  />
                  <input
                    className="input-to-add"
                    type="text"
                    name="institution"
                    value={newEducation.institution}
                    onChange={handleEducationInputChange}
                    placeholder="Institution"
                  />
                  <input
                    className="input-to-add"
                    type="text"
                    name="year"
                    value={newEducation.year}
                    onChange={handleEducationInputChange}
                    placeholder="Year"
                  />
                  <button className="add-button input-to-add" onClick={handleAddEducation}>
                    {editEducationIndex !== null ? 'Update' : 'Add'}
                  </button>
                </li>
              </ul>
            </div>
        ) : (
          // USER PROFILE
          <div>
                <h2>Education</h2>
                <ul className="education-list">
                  {educationData.map((item, index) => (
                    <li key={index}>
                      <h3>{item.degree}</h3>
                      <p>{item.institution}</p>
                      <p>{item.year}</p>
                    </li>
                  ))}
                </ul>
            </div>
        )}
      
    </div>
    
  )
}
