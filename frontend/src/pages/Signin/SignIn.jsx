import './Form.css'
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../../components/Input/Input";
import { useLogin } from './hooks/useLogin';


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

    const { refetch } = useLogin(userEmail, pwd);


    const onLoginFormSubmit = async (e) => {
        e.preventDefault();
        const {isError, error} = await refetch();
        if (!isError) navigate('/', { replace: true });
        else console.log(error);
    }

    return (
        <div className="register-container">
            <div className="home-link"><Link to={"/"}>PREZOPHOPIA</Link></div>
            <section className="register">
                <h1>Sign In</h1>
                <form className="register-form" onSubmit={onLoginFormSubmit}>
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
