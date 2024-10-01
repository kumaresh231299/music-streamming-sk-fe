import React, { useState } from 'react'
import LoginPage from '../Pages/LoginPage';
import ForgotPassword from '../Pages/ForgotPassword';
import RegistraionPage from '../Pages/RegistraionPage';

const Auth = ({setUser}) => {
    const [from, setFrom] = useState("Login");

    return (
        <div>
            {from === "Login" ? (
                <LoginPage setFrom={setFrom} setUser={setUser} />
            ) : from === "Forgot" ? (
                <ForgotPassword setFrom={setFrom} />
            ) : (
                <RegistraionPage setFrom={setFrom} />
            )}
        </div>
    )
}

export default Auth