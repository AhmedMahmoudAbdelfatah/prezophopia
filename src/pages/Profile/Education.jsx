// import React, { useContext } from "react";
// import { useState , useEffect} from "react";
// import axios from "axios";
// import { UserContext } from "../../features/UserContext";



// export default function Education(props) {
//     const { user } = useContext(UserContext);   
//     // Simulating the authenticated user ID
//     const authenticatedUserId = 123;
//     // Check if the user_id prop matches the authenticated user ID
//     // const isAuthorized = props.user_id === authenticatedUserId;
//     const isAuthorized  = true;
  

// // START Education List
// const educationDataList = [
//   {
//     degree: 'Bachelor of Science in Computer Science',
//     instituteName: 'University of Example',
//     from: '2015',
//     to:"2019"
//   },
//   {
//     degree: 'Master of Business Administration',
//     instituteName: 'Business School XYZ',
//     from: '2020',
//     to:"2022"
//   }
// ];

// // const [EducationDataFromAPI , setEducationDataFromAPI] = useState({})


// const [educationData, setEducationData] = useState(educationDataList);

// const [newEducation, setNewEducation] = useState({
//   instituteName: "",
//   degree: "",
//   from:"" ,
//   to: ""
// });

// const [editEducationIndex, setEditEducationIndex] = useState(null);

// const handleEducationInputChange = (e) => {
//   const { name, value } = e.target;
//   setNewEducation((prevEducation) => ({
//     ...prevEducation,
//     [name]: value
//   }));
// };

// const handleAddEducation = async() => {
//   if (newEducation.instituteName && newEducation.degree && newEducation.from&& newEducation.to) {
//     if (editEducationIndex !== null) {
//       // Update existing education
//       try {
//         // Send a POST request to update the aboutText in the API
//         const response = await axios.put('http://localhost:8087/api/profile/update/education' , newEducation ,{
//           headers: {
//             "Content-Type": "application/json",
//             Authorization:
//                 "Bearer " +
//                 ("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhaG1lZEBnbWFpbC5jb20iLCJqdGkiOiI0IiwiaWF0IjoxNjg2Njc4NjQ2LCJleHAiOjE2ODc1NDI2NDZ9.gectJVHyuqBn-GQ_vPfOWspsYapiQXn9yh5iBKLd2Nmrg3lSRw722Uuz078Q_ZMcD1vsOpKJKLQDlVyJZqFVrw")
//               }}
//               );
//               console.log(response.data)
//       } catch (error) {
//         console.log("Error saving skills:", error);
//       }
//       setEducationData((prevData) => {
//         const updatedData = [...prevData];
//         updatedData[editEducationIndex] = newEducation;
//         return updatedData;
//       });
//       setEditEducationIndex(null);
//     } else {
//       // Add new education
//       setEducationData((prevData) => [...prevData, newEducation]);
//     }

//     setNewEducation({
//       degree: "",
//       from:"" ,
//       instituteName: "",
//       to: ""
//     });
//   }
// };

// const handleDeleteEducation = (index) => {
//   setEducationData((prevData) => {
//     const updatedData = [...prevData];
//     updatedData.splice(index, 1);
//     return updatedData;
//   });
// };

// const handleEditEducation = (index) => {
//   const educationToEdit = educationData[index];
//   setNewEducation(educationToEdit);
//   setEditEducationIndex(index);
// };

// // degree: "",
// // from:"" ,
// // instituteName: "",
// // to: ""
// // END Education List

//   return (
//       <div>
//         {isAuthorized ? (
//           // MY PROFILE
//           <div>
//               <h2>Education</h2>
//               <ul className="education-list">
//                 {educationData.map((education, index) => (
//                   <li key={index}>
//                     <div>
//                       <div className="degree">{ education.degree}</div>
//                       <div className="institute name">{education.instituteName}</div>
//                       <div className="from"><span style={{ fontWeight: 'bold' }}>From: </span>{education.from}</div>
//                       <div className="to"><span style={{ fontWeight: 'bold' }}>To: </span>{education.to}</div>
//                     </div>
//                     <div className="buttons-container">
//                       <button className="edit-button" onClick={() => handleEditEducation(index)}>
//                         Edit
//                       </button>
//                       <button className="delete-button" onClick={() => handleDeleteEducation(index)}>
//                         Delete
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//                 <li>
//                 <input
//                     className="input-to-add"
//                     type="text"
//                     name="degree"
//                     value={newEducation.degree}
//                     onChange={handleEducationInputChange}
//                     placeholder="degree"
//                   />
//                   <input
//                     className="input-to-add"
//                     type="text"
//                     name="instituteName"
//                     value={newEducation.instituteName}
//                     onChange={handleEducationInputChange}
//                     placeholder="institute name"
//                   /> 
//                   <input
//                     className="input-to-add"
//                     type="text"
//                     name="from"
//                     value={newEducation.from}
//                     onChange={handleEducationInputChange}
//                     placeholder="from"
//                   />
                  
//                   <input
//                     className="input-to-add"
//                     type="text"
//                     name="to"
//                     value={newEducation.to}
//                     onChange={handleEducationInputChange}
//                     placeholder="to"
//                   />
//                   <button className="add-button input-to-add" onClick={handleAddEducation}>
//                     {editEducationIndex !== null ? 'Update' : 'Add'}
//                   </button>
//                 </li>
//               </ul>
//             </div>
//         ) : (
//           // USER PROFILE
//           <div>
//                 <h2>Education</h2>
//                 <ul className="education-list">
//                   {educationData.map((item, index) => (
//                     <li key={index}>
//                       <p>{item.degree}</p>
//                       <h3>{item.instituteName}</h3>
//                       <p>{item.from}</p>
//                       <p>{item.to}</p>
//                     </li>
//                   ))}
//                 </ul>
//             </div>
//         )}
      
//     </div>
    
//   )
// }




















import React, { useContext } from "react";
import { useState , useEffect} from "react";
import axios from "axios";
import { UserContext } from "../../features/UserContext";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";



export default function Education(props) {
    const { user } = useContext(UserContext);
    const { userId } = useParams();
    // Simulating the authenticated user ID
    const isAuthorized  = +user.id === +userId;
  

// START Education List
// const educationDataList = [
//   {
//     degree: 'Bachelor of Science in Computer Science',
//     institution: 'University of Example',
//     year: '2015-2019'
//   },
//   {
//     degree: 'Master of Business Administration',
//     institution: 'Business School XYZ',
//     year: '2020-2022'
//   }
// ];

// const [EducationDataFromAPI , setEducationDataFromAPI] = useState()

const [error, setError] = useState('');

  function isValidDateFormat(dateString) {
    // Regular expression pattern for dd/mm/yyyy format
    var pattern = /^\d{2}\/\d{2}\/\d{4}$/;
  
    // Check if the input matches the pattern
    return pattern.test(dateString);
  }

const [educationData, setEducationData] = useState([]);

const [newEducation, setNewEducation] = useState({
  instituteName: "",
  degree: "",
  from:"" ,
  to: ""
});

const [editEducationIndex, setEditEducationIndex] = useState(null);

const handleEducationInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'instituteName' && value.length > 40) {
      setError('Maximum length exceeded for institute name');
    } else if (name === 'degree' && value.length > 40)  {
      setError('Maximum length exceeded for degree');
    }
    else if (name === 'instituteName' && value.length <= 0) {
        setError('instituteName can not be empty')
    }
    else if (name === 'degree' && value.length <= 0) {
        setError('degree can not be empty')
    }
    else if ((name === 'from' || name === 'to') && isValidDateFormat(value)) {
      setError('Invalid date format (dd/mm/yyyy)');
    } else {
      setError('');
    }
    setNewEducation((prevEducation) => ({
      ...prevEducation,
      [name]: value
    }));
  };

const handleAddEducation = async() => {
  if (newEducation.instituteName && newEducation.degree && newEducation.from&& newEducation.to) {
 
          // Update existing education
          try {
              // Send a POST request to update the aboutText in the API
              const response = await axios.put('http://localhost:8080/api/profile/update/education', {
                  ...newEducation,
                  to: new Date(newEducation?.to),
                  from: new Date(newEducation?.from)
              }, {
                  headers: {
                      "Content-Type": "application/json",
                      Authorization:
                          "Bearer " + user.accessToken
                  }
              }
              );
              console.log(response);
              setEducationData([newEducation]);
              setNewEducation({
                  degree: "",
                  from: "",
                  instituteName: "",
                  to: ""
              });
          } catch (error) {
              console.log("Error saving skills:", error);
          }
          //   setEducationData((prevData) => {
          //     const updatedData = [...prevData];
          //     updatedData[editEducationIndex] = newEducation;
          //     return updatedData;
          //   });
          //   setEditEducationIndex(null);
          // } else {
          //   // Add new education
          //   setEducationData((prevData) => [...prevData, newEducation]);
          // }
    
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
  setNewEducation({...educationToEdit, from: educationToEdit.from.split('T')[0],  to: educationToEdit.to.split('T')[0],});
  setEditEducationIndex(index);
};




useEffect(() => {
  const fetchData = async () => {
    try {
      // Fetch the aboutText data from the API
      const response = await axios.get('http://localhost:8080/api/profile/'+ userId ,{
        headers: {
          "Content-Type": "application/json",
          Authorization:
              "Bearer " + user.accessToken
            }}
        );
        console.log(response);
      setEducationData([response.data.data.education]);
      // console.log(response.data.data.education)
    } catch (error) {
      console.error("Error fetching about text:", error);
    }
    };
    console.log("start");
  fetchData();
}, [user]);

// degree: "",
// from:"" ,
// instituteName: "",
// to: ""
// END Education List

  return (
      <div>
        {isAuthorized ? (
          // MY PROFILE
          <div>
              <h2>Education</h2>
              <ul className="education-list">
                {educationData?.map((education, index) => (
                    education?.degree? 
                  <li key={index}>
                    <div>
                      <div className="institute name">{education?.instituteName}</div>
                      <div className="degree">{education?.degree}</div>
                      <div className="from">{education?.from?.split('T')[0]}</div>
                      <div className="to">{education?.to?.split('T')[0]}</div>
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
                  : null
                ))}
                <li>
                <input
                    className="input-to-add"
                    type="text"
                    name="instituteName"
                    value={newEducation?.instituteName}
                    onChange={handleEducationInputChange}
                    placeholder="Enter Institute Name"
                  />
                <input
                    className="input-to-add"
                    type="text"
                    name="degree"
                    value={newEducation?.degree}
                    onChange={handleEducationInputChange}
                    placeholder="Enter Degree"
                  />
                  
                  <input
                    className="input-to-add"
                    type="date"
                    name="from"
                    value={newEducation?.from}
                    onChange={handleEducationInputChange}
                    placeholder="yyyy/mm/dd"
                  />
                 
                  <input
                    className="input-to-add"
                    type="date"
                    name="to"
                    value={newEducation?.to}
                    onChange={handleEducationInputChange}
                    placeholder="yyyy/mm/dd"   
                    />
                    {error &&  <div className="error-message" > <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "8px" }} />  {error}</div>}
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
                {
                   educationData?.length?
                        <ul className="education-list">
                        {educationData?.map((item, index) => (
                            
                            item?.degree? 
                                <li key={index}>
                                    <p>{item?.degree}</p>
                                    <h3>{item?.instituteName}</h3>
                                    <p>{item?.from?.split('T')[0]}</p>
                                    <p>{item?.to?.split('T')[0]}</p>
                                </li>
                            : null
                            
                        ))}
                        </ul>
                    : null
                }      
            </div>
        )}
      
    </div>
    
  )
}