import React, { useContext } from "react";
import "./Profile.css"
import Navbar from "../../components/Navbar/Navbar";
import Posts from "../Posts/Posts"
import Education from "./Education"
import Skills from "./Skills"
import Contact from "./Contact"
import About from "./About"
import { useState , useEffect} from "react";
import axios from "axios";
import { UserContext } from "../../features/UserContext";
import { useParams } from "react-router-dom";


export default function Profile(props) {
    const { userId } = useParams();
    const { user } = useContext(UserContext);
    
    const isAuthorized  = +user.id === +userId;

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };


   // Start Cover Photo
    const [userPosts, setUserPosts] = useState([]);
   // ...


  const [profileUsername, setName] = useState('');
 // ...

  // Start Cover Photo
  const [coverimage, setCoverPhoto] = useState('');
  // ...

  // Start Profile PIC
  const [image, setProfilePicture] = useState('');
  // ...

  const handleCoverPhotoChange = (event) => {
    const file = event.target.files[0];
    // Make an HTTP POST request to send the cover photo to the backend
    const formData = new FormData();
    formData.append('coverimage', file);
    console.log(file)

    axios.post('http://localhost:8080/api/profile/upload-coverimage', formData , {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization:
            "Bearer " + user.accessToken
          }} )
      .then((response) => {
        // Handle the response from the backend if needed
        console.log(response);
        setCoverPhoto(URL.createObjectURL(file))
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.log(error);
      });
      
  };





  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    // Make an HTTP POST request to send the cover photo to the backend
    const formData = new FormData();
    formData.append('image', file);

    axios.post('http://localhost:8080/api/profile/upload-image', formData , {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization:
            "Bearer " + user.accessToken
          }} )
      .then((response) => {
        // Handle the response from the backend if needed
        console.log(response);
        setProfilePicture(URL.createObjectURL(file))
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.log(error);
      });
      
  };

// FOLLOW BUTTON
const [isFollowingValue, setIsFollowingValue] = useState([]);

  // console.log(isFollowing)

  const handleFollow = async() => {
    // if(isFollowingValue === null){setIsFollowing(false)}
      try {
          const followingResponse = await axios.get(`http://localhost:8080/api/profile/follow/${userId}` , {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization:
                          "Bearer " + user.accessToken
                    }}
            );
                        
            console.log(followingResponse)
          setIsFollowingValue((prev) => [...prev, userId]);
          
      } catch (error) {
        console.log(error);
      }
  };








  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the aboutText data from the API
        const response = await axios.get(`http://localhost:8080/api/profile/${userId}` , {
          headers: {
            "Content-Type": "application/json",
            Authorization:
                "Bearer " + user.accessToken
              }}
              );
              setProfilePicture(response?.data?.data?.image_url);
              setCoverPhoto(response?.data?.data?.coverImage_url);
              // console.log(response.data.data.user.id)
              setName(response.data.data.user.username)
            setUserPosts(response.data.data.user.userPosts)
            const followingResponse = await axios.get(`http://localhost:8080/api/profile/following/get/${userId}` , {
                        headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer " + user.accessToken
                        }}
                );           
            console.log(followingResponse)
            setIsFollowingValue(followingResponse.data.data)
              
      } catch (error) {
        console.log("Error fetching Data:", error);
      }
    };
  
    fetchData();
  }, []);
  


  return (
      <div>
      <Navbar />
      <div>
          <div className="profile"> 

          <div className="profile-container">
          <div class="upload-cover">
            <img src={coverimage?`http://localhost:8080/${coverimage}`:'images/nocover.jpeg'} alt="Cover Img" className="cover-photo" width="100%"/>
              <div className="round">
                <label htmlFor="cover-input" className="label">Change cover photo</label>
                <input type="file" id="cover-input" accept="image/*" onChange={handleCoverPhotoChange} />
              </div>
          </div>



          <button className="follow-btn" onClick={handleFollow}>
          { isFollowingValue.indexOf(userId) >= 0? 'Following' : 'Follow'}
          </button>



            <div class="upload">
              <img src={image?`http://localhost:8080/${image}`:'images/noprofil.jpeg'} alt="Profile Img" className="profile-picture" width = "100" height = "100"/>
              <div className="round">
                <input type="file" onChange={handleProfilePictureChange} />
                <i class="fa-solid fa-camera"></i>
              </div>
            <p className="profileUsername">{profileUsername === ''? 'userName' : profileUsername}</p>
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
            {/* <Posts id={ isAuthorized? user.id : '' } /> */}
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