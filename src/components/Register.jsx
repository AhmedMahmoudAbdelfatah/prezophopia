import '../styles/Form.css'
import { useState } from "react";
import  axios  from 'axios'
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";


const RESGITER_URL = 'http://localhost:8080/api/auth/signup'
const USER_EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}/;
const FONT_AWESOME_COMPONENT = <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "8px" }} />;
const EMAIL_INSTRUCTIONS = 
    <>
        {FONT_AWESOME_COMPONENT}
        Please enter valid email.
    </>
const PWD_INSTRUCTIONS = 
    <>
        {FONT_AWESOME_COMPONENT}
        Must include uppercase, lowercase letters, numbers, special characters
        &#38; 8 to 24 characters. special characters allowed: @ # ! % &#38;
    </>
const CONFIRM_PWD_INSTRUCTIONS = 
    <>
        {FONT_AWESOME_COMPONENT}
        Please enter the same password. 
    </>

export default function Register() {

    const navigate = useNavigate(); 

    const [userEmail, setUserEmail] = useState('');

    const [name, setName] = useState('');

    const [pwd, setPwd] = useState('');

    const [confirmPwd, setConfirmPwd] = useState('');

    const isValidFormValues = () => {
        const isValidEmail = USER_EMAIL_REGEX.test(userEmail);
        const isValidPassword = PWD_REGEX.test(pwd);
        const isValidMatch = pwd === confirmPwd;
        return isValidEmail && isValidMatch && isValidPassword;
    }



    const onRegisterFormSubmit = async (e) => {
        e.preventDefault();
        if (isValidFormValues()) {
            try {
                const response = await axios.post(RESGITER_URL, JSON.stringify({
                    email: userEmail,
                    password: pwd,
                    username: name
                }), {
                    headers: { 'Content-Type': 'application/json' },
                });
                if (response.data) navigate("/signin");
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="register-container">
            <div className="home-link"><Link to={"/"}>PREZOPHOPIA</Link></div>
            <section className="register">
                <h1>Register For Free</h1>
                <form className="register-form" onSubmit={onRegisterFormSubmit}>
                    <div className="inputs-container">
                         <Input
                            type="text"
                            id={"name"}
                            value={name}
                            isValid={true}
                            setValue={setName}
                        >
                            Name
                        </Input>
                        <Input
                            type="email"
                            id={"email"}
                            value={userEmail}
                            setValue={setUserEmail}
                            validateValue = {USER_EMAIL_REGEX}
                            instructions={EMAIL_INSTRUCTIONS}
                            ariaDescribedby = {"emnote"}
                        >
                            Email
                        </Input>
                        <Input
                            type="password"
                            id={"password"}
                            value={pwd}
                            setValue={setPwd}
                            validateValue = {PWD_REGEX}
                            instructions={PWD_INSTRUCTIONS}
                            ariaDescribedby = {"pwdnote"}
                        >
                            Password
                        </Input>
                        <Input
                            type="password"
                            id={"confirm-password"}
                            value={confirmPwd}
                            matchValue={pwd}
                            setValue={setConfirmPwd}
                            instructions={CONFIRM_PWD_INSTRUCTIONS}
                            ariaDescribedby = {"confirmnote"}
                        >
                            Confirm Password
                        </Input>
                    </div>
                    <div className="buttons-container">
                        <button type="button"><Link to={"/signin"} style={{ textDecoration: "none"}}>Sign in instead</Link></button>
                        <button type="submit">Sign up</button>
                    </div>
                </form>
            </section>
        </div>
    );
}
