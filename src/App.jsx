import { Route, Routes } from "react-router-dom";

import "./main.css"

import Home from "./pages/Home/Home";
import  SignIn  from "./pages/Signin/SignIn";
import Register from "./pages/Register/Register";
import Posts from "./pages/Posts/Posts";
import Profile from "./pages/Profile/Profile";
import UserContextProvider from "./features/UserContext";
import VideoStream from "./pages/VideoStream/VideoStream";

function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route element={ <Home />} path="/"/>
                <Route element={<SignIn />} path="/signin" />
                <Route element={<Register />} path="/register" />
                <Route element={<Posts />} path="/posts" />
                <Route element={<Profile />} path="/profile" />
                <Route element={<VideoStream />} path="/stream" />
            </Routes>
        </UserContextProvider>
    );
}

export default App;
