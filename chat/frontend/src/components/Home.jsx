import axios from 'axios';
import React, { useState,useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link , Navigate, Outlet, useNavigate, useParams} from 'react-router-dom';
import Login from './login';
import Messenger from './messenger';
import Register from './register';
import {useDispatch,useSelector} from 'react-redux';
import {isUserAuth} from '../store/actions/authAction';
import ProtectedRoute from './protectedRoute';
import { FaLastfmSquare } from 'react-icons/fa';
import LoadingSpinner from './loadingSpinner';

const Home = () => {

 const [userInfo,setUserInfo] = useState(null);
 const [loading,setLoading] = useState(true);
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const { token_ } = useParams();
 const navigate = useNavigate();

 useEffect( ()=>{   
   
    // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoYXNzYW5AZy5jIiwianRpIjoiNTMiLCJpYXQiOjE2ODc0NTg3OTgsImV4cCI6MTY4ODMyMjc5OH0.FA7h79X7Jz1IkmVdhWTFXUm2coW683-m7vriBaaFjX6gIHZiY6IlZb9j2zMOy8pSI9-Adphsq41Da4tt5cKX9Q';
  
      axios.post('http://localhost:8080/api/auth/isAuthenticated', {}, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token_}`
        }
      })
        .then(response => {
        console.log("🚀 ~ file: Home.jsx:43 ~ fetchData ~ response:", response.data.data)

          const { data } = response.data;
          setUserInfo(data);
          setIsAuthenticated(true);
          setLoading(false);
        })
        .catch(error => {
          setIsAuthenticated(false);
          console.error('Error:', error.response);
          navigate("/messenger/login");
        });
    
 },[]);
 console.log("userInfo"+userInfo);
 console.log("🚀 ~ file: App.js:34 ~ App ~ token:", token_)

 console.log("is Authenticate",isAuthenticated);
  return(
   <>
   {
   loading ? <LoadingSpinner/>
   :
   <Messenger userInfo={userInfo}/>   
   }
  
   </>
  );
};



export default Home ;
