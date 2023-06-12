export const USER_EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PWD_REGEX = /^(?=.*[a-z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}/;

export const formValidation = (email, pwd, confirmPwd) => {
    const isValidEmail = USER_EMAIL_REGEX.test(email);
    const isValidPassword = PWD_REGEX.test(pwd);
    const isValidMatch = pwd === confirmPwd;
    return isValidEmail && isValidMatch && isValidPassword;
};
