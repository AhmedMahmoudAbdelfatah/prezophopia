import { Route, Routes } from "react-router-dom";

import "./styles/main.css"

import Home from "./components/Home";
import  SignIn  from "./components/SignIn.jsx";
import Register from "./components/Register.jsx";
import Posts from "./components/Posts";
import Profile from "./components/Profile";

function App() {
    return (
        <Routes>
            <Route element={ <Home />} path="/"/>
            <Route element={<SignIn />} path="/signin" />
            <Route element={<Register />} path="/register" />
            <Route element={<Posts />} path="/posts" />
            <Route element={<Profile /> }  path="/profile"/>
        </Routes>
    );
}

export default App;
