import axios from 'axios';
import React, { useState,useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link , Navigate, Outlet, useNavigate, useParams} from 'react-router-dom';

import Home from './components/Home';
import Login from './components/login';
import Register from './components/register';

const App = () => {
 
  return(
   <>

   <Router>
      <Routes>
         <Route path='/:token_' element={<Home/>}></Route>
         <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>   
     </Routes>
</Router>
   
  
   </>
  );
};



export default App ;
