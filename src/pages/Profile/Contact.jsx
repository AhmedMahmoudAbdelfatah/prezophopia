import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { UserContext } from "../../features/UserContext";
import { useParams } from "react-router-dom";



export default function Contact(props) {
    const { user } = useContext(UserContext);
    const { userId } = useParams()
    // Simulating the authenticated user ID
    
    const isAuthorized  = +user.id === +userId;
    

      
      // console.log(contactInfoDataAPI)
    
  // START Contact-Info List
const contactInfoDataList = [
  { label: 'Email', value: 'example@example.com' },
  { label: 'Phone', value: '123-456-7890' },
  { label: 'Address', value: '123 Main St, City, State' },
];



const [contactInfoData, setContactInfoData] = useState([]);

const [newContact, setNewContact] = useState({
      phone: "",
      telephone: "",
      email:"" ,
      address: ""
});

const [editContactIndex, setEditContactIndex] = useState(null);

const handleContactInputChange = (e) => {
  const { name, value } = e.target;
  setNewContact((prevEducation) => ({
    ...prevEducation,
    [name]: value
  }));
};

const handleAddContact = async() => {
  if (newContact.phone && newContact.telephone && newContact.email&& newContact.address) {

          // Update existing education
          try {
              // Send a POST request address update the aboutText in the API
              const response = await axios.put('http://localhost:8080/api/profile/contactInfo/update', newContact, {
                  headers: {
                      "Content-Type": "application/json",
                      Authorization:
                          "Bearer " + user.accessToken
                  }
              }
              );
              console.log(response);
              setNewContact({
                phone: "",
                telephone: "",
                email:"" ,
                address: ""
              });
          } catch (error) {
              console.log("Error saving skills:", error);
          }
    
  }
};

const handleDeleteEducation = (index) => {
  setContactInfoData((prevData) => {
    const updatedData = [...prevData];
    updatedData.splice(index, 1);
    return updatedData;
  });
};

const handleEditEducation = (index) => {
  const educationToEdit = contactInfoData[index];
  setNewContact({...educationToEdit});
  setEditContactIndex(index);
};


// END Contact Info


// Start Social Media

const [facebookUrlfromAPI, setFacebookUrlfromAPI] = useState('');
const [twitterUrlfromAPI , setTwitterUrlfromAPI]= useState('');
const [linkedinUrlfromAPI , setLinkedinUrlfromAPI]= useState('');

const [link, setLink] = useState({
  name: "",
  url: ""
});

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setLink((prevLink) => ({
    ...prevLink,
    [name]: value
  }));
};

const handleSocialAddButtonClick = () => {
  // Send the link object to the backend
  axios
    .post("http://localhost:8080/api/profile/social/add", link, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + user.accessToken
      }
    })
    .then((response) => {
      // Handle the response from the backend
        console.log(response.data);
        switch (link.name) {
            case "facebook":
                setFacebookUrlfromAPI(link.url);
                break;
            case "twitter":
                setTwitterUrlfromAPI(link.url);
                break;
            case "linkedin":
                setLinkedinUrlfromAPI(link.url);
                break;
            default:
                break;
        }
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });

  // Clear the input fields after sending the data
  setLink({
    name: "",
    url: ""
  });
};
// End Social Media 

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
      console.log("info", response.data)
      setFacebookUrlfromAPI(response.data.data.socialLinks.facebook)
      setTwitterUrlfromAPI(response.data.data.socialLinks.twitter)
      setLinkedinUrlfromAPI(response.data.data.socialLinks.linkedin)
      setContactInfoData([response.data.data.contactInfo]);


    } catch (error) {
      console.error("Error fetching about text:", error);
    }
  };

  fetchData();
}, [user]);


  return (
      <div>
        {isAuthorized ? (
          // MY PROFILE
          <div>
          <h2>Contact Information</h2>
          <ul className="education-list">
                {contactInfoData?.map((education, index) => (
                    education?.telephone? 
                  <li key={index}>
                    <div>
                      <div className="institute name">{education?.phone}</div>
                      <div className="telephone">{education?.telephone}</div>
                      <div className="from">{education?.email}</div>
                      <div className="address">{education?.address}</div>
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
                    name="phone"
                    value={newContact.phone}
                    onChange={handleContactInputChange}
                    placeholder="phone"
                  />
                <input
                    className="input-to-add"
                    type="text"
                    name="telephone"
                    value={newContact.telephone}
                    onChange={handleContactInputChange}
                    placeholder="telephone"
                  />
                  
                  <input
                    className="input-to-add"
                    type="email"
                    name="email"
                    value={newContact.email}
                    onChange={handleContactInputChange}
                    placeholder="email"
                  />
                 
                  <input
                    className="input-to-add"
                    type="text"
                    name="address"
                    value={newContact.address}
                    onChange={handleContactInputChange}
                    placeholder="address"
                  />
                  <button className="add-button input-to-add" onClick={handleAddContact}>
                    {editContactIndex !== null ? 'Update' : 'Add'}
                  </button>
                </li>
              </ul>
          <h2 style={{marginTop: '50px'}}>Social Media</h2>
              <div>
                  <input
                  className="input-url"
                  type="text"
                  name="name"
                  placeholder="Social Media Name Ex: facebook or witter or linkedin"
                  value={link.name}
                  onChange={handleInputChange}
                />
                <input
                className="input-url"
                  type="text"
                  name="url"
                  placeholder="URL"
                  value={link.url}
                  onChange={handleInputChange}
                />
                <button onClick={handleSocialAddButtonClick}className="add-button add-button-url">Add</button>
              </div>
              <div className="social-icons">
                {
                    facebookUrlfromAPI? <a href={`${facebookUrlfromAPI}`} className="f-facebook" target="_blank" rel="noreferrer">
                                            <FontAwesomeIcon icon={faFacebookF} />
                                        </a> : null
                }
                {
                    twitterUrlfromAPI?  <a href={`${twitterUrlfromAPI}`} className="f-twitter" target="_blank" rel="noreferrer">
                                            <FontAwesomeIcon icon={faTwitter} />
                                        </a> : null
                }
                    {
                        linkedinUrlfromAPI?     <a href={`${linkedinUrlfromAPI}`} className="f-linkedin" target="_blank" rel="noreferrer">
                                                    <FontAwesomeIcon icon={faLinkedinIn} />
                                                </a> : null 
                }
            </div>
        </div>
        ) : (
          // USER PROFILE
          <div>
              <h2>Contact Information</h2>
              <ul className="contact-info-list">
              {
                  contactInfoData?.length?
                        <ul className="education-list">
                        {contactInfoData?.map((item, index) => (
                            <li key={index}>
                            <p>{item?.telephone}</p>
                            <h3>{item?.phone}</h3>
                            <p>{item?.email}</p>
                            <p>{item?.address}</p>
                            </li>
                        ))}
                        </ul>
                    : null
                } 
              </ul>
          <h2 style={{marginTop: '50px'}}>Social Media</h2>
                <div className="social-icons">
                    {
                        facebookUrlfromAPI? <a href={`${facebookUrlfromAPI}`} className="f-facebook" target="_blank" rel="noreferrer">
                                                <FontAwesomeIcon icon={faFacebookF} />
                                            </a> : null
                    }
                    {
                        twitterUrlfromAPI?  <a href={`${twitterUrlfromAPI}`} className="f-twitter" target="_blank" rel="noreferrer">
                                                <FontAwesomeIcon icon={faTwitter} />
                                            </a> : null
                  }
                     {
                          linkedinUrlfromAPI?     <a href={`${linkedinUrlfromAPI}`} className="f-linkedin" target="_blank" rel="noreferrer">
                                                     <FontAwesomeIcon icon={faLinkedinIn} />
                                                    </a> : null 
                  }
                 
              </div>
            </div>
        )}
      
    </div>
    
  )
}


