import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { UserContext } from "../../features/UserContext";
import { useParams } from "react-router-dom";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";



export default function Contact(props) {
    const { user } = useContext(UserContext);
    const { userId } = useParams()
    // Simulating the authenticated user ID
    
    const isAuthorized  = +user.id === +userId;
    

      
      // console.log(contactInfoDataAPI)
    
  // START Contact-Info List
// const contactInfoDataList = [
//   { label: 'Email', value: 'example@example.com' },
//   { label: 'Phone', value: '123-456-7890' },
//   { label: 'Address', value: '123 Main St, City, State' },
// ];



const [contactInfoData, setContactInfoData] = useState([]);

const [newContact, setNewContact] = useState({
      phone: "",
      telephone: "",
      email:"" ,
      address: ""
});

const [editContactIndex, setEditContactIndex] = useState(null);



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
            //   console.log(response);
              setContactInfoData([newContact]);
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

    const [error, setError] = useState('');

const handleContactInputChange = (e) => {
  const { name, value } = e.target;
  setNewContact((prevEducation) => ({
    ...prevEducation,
    [name]: value
  }));

  // Perform validation and display error message
  if (name === 'phone' && !validatePhone(value)) {
    setError('Invalid phone number format');
  } else if (name === 'telephone' && !validateTelephone(value)) {
    setError('Invalid telephone number format');
  } else if (name === 'email' && !validateEmail(value)) {
    setError('Invalid email address');
  }
  else if (name === "address" && !validateAddress(value)) setError("Invalid address"); 
  else {
    setError('');
  }
};

const validateAddress = (address) => {
    const addressRegex = /^(?=[\w\d])[ \w\d,-]{8,50}[ \w\d,-]$/
    return addressRegex.test(address);
}

// Start Validation functions
const validatePhone = (phone) => {
  const phoneRegex = /^0\d{10}$/; // Regular expression to match 11-digit phone numbers
  return phoneRegex.test(phone);
};

const validateTelephone = (telephone) => {
  const telephoneRegex = /^0\d{9}$/ // Regular expression to match 10-digit telephone numbers
  return telephoneRegex.test(telephone);
};

const validateEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;// Regular expression to validate email addresses
  return emailRegex.test(email);
};

const [urlError, setUrlError] = useState("");

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setLink((prevLink) => ({
    ...prevLink,
    [name]: value
  }));

  if (!value) {
    setUrlError("Please select a social media and enter a URL.");
  } else if (!validateURL(value)) {
    setUrlError("Please enter a valid URL.");
  } else {
    setUrlError("");
  }
};

const validateURL = (url) => {
  // Regular expression pattern to validate URL
  const urlPattern =  /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9]-*)*[a-z0-9]+)(?:\.(?:[a-z0-9]-*)*[a-z0-9]+)*(?:\.(?:[a-z]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i;
  return urlPattern.test(url);
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
                    placeholder="Enter a valid phone number (e.g., 01234567890)"
                  />
                <input
                    className="input-to-add"
                    type="text"
                    name="telephone"
                    value={newContact.telephone}
                    onChange={handleContactInputChange}
                    placeholder="Enter your telephone number (e.g., 0282584428)"
                  />
                  
                  <input
                    className="input-to-add"
                    type="email"
                    name="email"
                    value={newContact.email}
                    onChange={handleContactInputChange}
                    placeholder="Enter your email address"
                    />
                 
                  <input
                    className="input-to-add"
                    type="text"
                    name="address"
                    value={newContact.address}
                    onChange={handleContactInputChange}
                    placeholder="Enter Valid Address (eg., 1234 Main St, Anytown, NY 12345)"
                    />
                    {error &&  <div className="error-message" ><FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "8px" }} />  {error}</div>}
                  <button className="add-button input-to-add" onClick={handleAddContact}>
                    {editContactIndex !== null ? 'Update' : 'Add'}
                  </button>
                </li>
              </ul>
          <h2 style={{marginTop: '50px'}}>Social Media</h2>
              <div>
                 <select className="input-url" name="name" onChange={handleInputChange}>
                    <option value="">Select social media</option>
                    <option value="facebook">Facebook</option>
                    <option value="twitter">Twitter</option>
                    <option value="linkedin">LinkedIn</option>
                </select>
                <input
                className="input-url"
                  type="text"
                  name="url"
                  placeholder="URL"
                  value={link.url}
                  onChange={handleInputChange}
                />
                <button onClick={handleSocialAddButtonClick} disabled={!!urlError} className="add-button add-button-url">Add</button>
              </div>
                {urlError && <p className="url-error error-message"><FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "8px" }} />{urlError}</p>}
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
                            item?.telephone?
                            <li key={index}>
                            <p>{item?.telephone}</p>
                            <h3>{item?.phone}</h3>
                            <p>{item?.email}</p>
                            <p>{item?.address}</p>
                            </li> : null
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


