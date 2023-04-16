import '../styles/Form.css'
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import  axios  from 'axios'
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "./Input";


const SIGNIN_URL = 'http://localhost:8080/api/auth/signin'
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

export default function SignIn() {
    
    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState('');

    const [pwd, setPwd] = useState('');



    const onRegisterFormSubmit = async (e) => {
        e.preventDefault();
            try {
                const response = await axios.post(SIGNIN_URL, JSON.stringify({
                    email: userEmail,
                    password: pwd
                }), {
                    headers: { 'Content-Type': 'application/json' },
                });
                console.log(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                try {
                    const response2 = await axios.get(`http://localhost:8080/api/profile/${response.data.id}`, {
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + response.data.accessToken
                        }
                    });
                    localStorage.setItem("imgUrl", response2.data?.data?.image_url? response2.data?.data?.image_url : "");
                
                } catch (error) {
                    console.log(error);
                }
                navigate('/');
            } catch (error) {
                console.log(error);
            }
    }

    return (
        <div className="register-container">
            <div className="home-link"><Link to={"/"}>PREZOPHOPIA</Link></div>
            <section className="register">
                <h1>Sign In</h1>
                <form className="register-form" onSubmit={onRegisterFormSubmit}>
                    <div className="inputs-container">
                        <Input
                            type="email"
                            id={"email"}
                            value={userEmail}
                            setValue={setUserEmail}
                            isValid = {true}
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
                            isValid = {true}
                            instructions={PWD_INSTRUCTIONS}
                            ariaDescribedby = {"pwdnote"}
                        >
                            Password
                        </Input>
                    </div>
                    <div className="buttons-container">
                        <button type="button"><Link to={"/register"}>Sign up instead</Link></button>
                        <button type="submit">Sign in</button>
                    </div>
                </form>
            </section>
        </div>
    );
}
