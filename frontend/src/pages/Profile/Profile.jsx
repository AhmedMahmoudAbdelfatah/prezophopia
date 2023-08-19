import React, { useContext } from "react";
import "./Profile.css"
import Posts from "../Posts/Posts"
import Education from "./Education"
import Skills from "./Skills"
import Contact from "./Contact"
import About from "./About"
import { useState , useEffect} from "react";
import axios from "axios";
import { UserContext } from "../../features/UserContext";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";


export default function Profile(props) {
    const { userId } = useParams();
    const { user, setUser } = useContext(UserContext);
    
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
          setUser({...user, "image_url": response.data.data})
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
                        
          if (isFollowingValue.some((user) => +user.id === +userId)) {
              setIsFollowingValue((prev) => {
                  const temp = prev;
                  return temp.map((user) => user.id !== userId);
              });
              
          }
          else setIsFollowingValue((prev) => [...prev, { id: userId }]);
          
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
          if (response?.data?.data?.image_url)
              setProfilePicture(`http://localhost:8080/${response?.data?.data?.image_url}`);
          else setProfilePicture('http://localhost:3000/images/noprofil.jpeg');
          if (response?.data?.data?.coverImage_url)
              setCoverPhoto(`http://localhost:8080/${response?.data?.data?.coverImage_url}`);
          else setCoverPhoto('http://localhost:3000/images/nocover.jpeg');
              // console.log(response.data.data.user.id)
              setName(response.data.data.user.username)
            setUserPosts(response.data.data.user.userPosts)
            const followingResponse = await axios.get(`http://localhost:8080/api/profile/following/get/${user.id}` , {
                        headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer " + user.accessToken
                        }}
                );           
            setIsFollowingValue(followingResponse.data.data)
              
      } catch (error) {
        console.log("Error fetching Data:", error);
      }
    };
  
    fetchData();
  }, [user, userId]);
  
    const imageStyles = {
                backgroundImage: `url(${image? image : "http://localhost:3000/images/noprofil.jpeg"})`,
                backgroundPosition: "center",
                backgroundSize: "cover"
            }   
    const coverStyles = {
                backgroundImage: `url(${coverimage? coverimage : "http://localhost:3000/images/nocover.jpeg"})`,
                backgroundPosition: "center",
                backgroundSize: "cover"
            }   


  return (
      
      <div>
          <div className="profile"> 
              <div className="profile-container">
            <div class="upload-cover"  style={coverStyles}>  
            {/* <img src={coverimage} alt="Cover Img" className="cover-photo" width="100%"/> */}
              {
                isAuthorized && <div className="round">
                    <label htmlFor="cover-input" className="label">Change cover photo</label>
                    <input type="file" id="cover-input" accept="image/*" onChange={handleCoverPhotoChange} />
                </div>
              }
          </div>


            {
                !isAuthorized && <button className="follow-btn" onClick={handleFollow}>
                { isFollowingValue.some((user)=> {
                    return +user.id === +userId;
                }) ? 'Following' : 'Follow'}
                </button>
                
            }


               
            <div class="upload" style={imageStyles}>
              {/* <img src={image} alt="Profile Img" className="profile-picture" width = "100" height = "100"/> */}
              {
                isAuthorized && <div className="round">      
                    <input type="file" onChange={handleProfilePictureChange} />
                    {/* <i class="fa-solid fa-camera"></i> */}
                    <FontAwesomeIcon icon={faCamera} style={{color: "#FFF"}}/>
                </div>
              }
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
          <div className="content-tabs">
            <div
                className={toggleState === 1 ? "content  active-content" : "content"}
            >
                <Posts id={ userId } />
            </div>
              
          </div>
    </div>
          
      
  )
}