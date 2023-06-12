import './Form.css'
import { useState } from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from './hooks/useRegister';
import { formValidation, USER_EMAIL_REGEX, PWD_REGEX } from './utils/formValidation';



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
    const { refetch } = useRegister(userEmail, pwd, name);
        
    const onRegisterFormSubmit = async (e) => {
        e.preventDefault();
        const isValid = formValidation(userEmail, pwd, confirmPwd);
        if (isValid) {
            const { isError, error } = await refetch();
            if (!isError) navigate("/signin");
            else console.log(error);
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
