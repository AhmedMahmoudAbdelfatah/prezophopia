import { Route, Routes } from "react-router-dom";

import "./main.css"

import Home from "./pages/Home/Home";
import  SignIn  from "./pages/Signin/SignIn";
import Register from "./pages/Register/Register";
import Posts from "./pages/Posts/Posts";
import Profile from "./pages/Profile/Profile";
import UserContextProvider from "./features/UserContext";
import VideoStream from "./pages/VideoStream/VideoStream";
import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from "./features/PrivateRoute";

function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route element={ <Navbar/> } path="/">
                    <Route element={ <Home />} path=""/>
                    <Route element={<Posts />} path="posts" />
                    <Route element={<PrivateRoute />}>
                        <Route element={<Profile />} path="profile" />
                        <Route element={<VideoStream />} path="stream" />
                    </Route>
                </Route>
                <Route element={<SignIn />} path="/signin" />
                <Route element={<Register />} path="/register" />
            </Routes>
        </UserContextProvider>
    );
}

export default App;
