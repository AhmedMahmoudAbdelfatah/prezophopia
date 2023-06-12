import React from "react";
import { useState } from "react";
// import "../../styles/Profile.css"




export default function Contact(props){
    // Simulating the authenticated user ID
    const authenticatedUserId = '123'; 

    // Check if the user_id prop matches the authenticated user ID
    // const isAuthorized = props.user_id === authenticatedUserId;
    const isAuthorized  = true;
    
  //START Contact-Info List
const contactInfoDataList = [
  { label: 'Email', value: 'example@example.com' },
  { label: 'Phone', value: '123-456-7890' },
  { label: 'Address', value: '123 Main St, City, State' },
  { label: 'Facebook', value: 'facebook.com/example' },
  { label: 'Twitter', value: 'twitter.com/example' },
  { label: 'Instagram', value: 'instagram.com/example' },
];
const [contactInfoData, setContactInfoData] = useState(contactInfoDataList);
const [newContactInfo, setNewContactInfo] = useState({
  label: '',
  value: ''
});

const [isEditMode, setIsEditMode] = useState(false);
const [editIndex, setEditIndex] = useState(null);

const handleContactInfoInputChange = (e) => {
  const { name, value } = e.target;
  setNewContactInfo((prevContactInfo) => ({
    ...prevContactInfo,
    [name]: value
  }));
};

const handleAddContactInfo = () => {
  if (newContactInfo.label && newContactInfo.value) {
    if (isEditMode) {
      const updatedData = [...contactInfoData];
      updatedData[editIndex] = newContactInfo;
      setContactInfoData(updatedData);
      setIsEditMode(false);
      setEditIndex(null);
    } else {
      setContactInfoData((prevData) => [...prevData, newContactInfo]);
    }
    setNewContactInfo({
      label: '',
      value: ''
    });
  }
};

const handleEditContactInfo = (index) => {
  setIsEditMode(true);
  setEditIndex(index);
  const contactInfo = contactInfoData[index];
  setNewContactInfo({
    label: contactInfo.label,
    value: contactInfo.value
  });
};

const handleDeleteContactInfo = (index) => {
  setContactInfoData((prevData) => {
    const updatedData = [...prevData];
    updatedData.splice(index, 1);
    return updatedData;
  });
  setIsEditMode(false);
  setEditIndex(null);
};
// END Contact Info

  return (
      <div>
        {isAuthorized ? (
          // MY PROFILE
          <div>
          <h2>Contact Information</h2>
          <ul className="contact-info-list">
            {contactInfoData.map((contactInfo, index) => (
              <li key={index}>
                <div>
                  <span className="label">{contactInfo.label}</span>
                  <span className="value">{contactInfo.value}</span>
                </div>
                <div>
                  {isEditMode && editIndex === index ? (
                    <>
                      <button className="update-button" onClick={handleAddContactInfo}>
                        Update
                      </button>
                      <button className="cancel-button" onClick={() => setIsEditMode(false)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button className="edit-button" onClick={() => handleEditContactInfo(index)}>
                      Edit
                    </button>
                  )}
                  <button className="delete-button" onClick={() => handleDeleteContactInfo(index)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
            <li>
              <input
              className="addlablel"
                type="text"
                name="label"
                value={newContactInfo.label}
                onChange={handleContactInfoInputChange}
                placeholder="Label"
              />
              <input
              className="addlablel"
                type="text"
                name="value"
                value={newContactInfo.value}
                onChange={handleContactInfoInputChange}
                placeholder="Value"
              />
              <button className="add-button" onClick={handleAddContactInfo}>
                {isEditMode ? 'Update' : 'Add'}
              </button>
            </li>
          </ul>

        </div>
        ) : (
          // USER PROFILE
          <div>
              <h2>Contact Information</h2>
              <ul className="contact-info-list">
                {contactInfoData.map((item, index) => (
                  <li key={index}>
                    <span className="label">{item.label}:</span>
                    <span className="value">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
        )}
      
    </div>
    
  )
}
