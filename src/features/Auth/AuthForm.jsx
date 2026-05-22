import { useState } from "react";
import ctdLogo from "../../assets/icons/mono-blue-logo.svg";
import spinner from "../../assets/icons/spinner.svg";
import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";

function AuthForm({
  handleCloseAuthForm,
  handleAuthenticate,
  isAuthenticating,
  authError,
  isRegistering,
  handleRegister,
}) {
  return (
    <>
      {isAuthenticating ? (
        <div className="loadingScreen">
          <div className="spinnerWrapper">
            <img src={spinner} alt="code the dream logo" />
          </div>
          <p>Logging into CTD Swag...</p>
        </div>
      ) : isRegistering ? (
        <RegisterForm
          handleCloseAuthForm={handleCloseAuthForm}
          authError={authError}
          handleRegister={handleRegister}
        />
      ) : (
        <LoginForm
          handleAuthenticate={handleAuthenticate}
          handleCloseAuthForm={handleCloseAuthForm}
          authError={authError}
        />
      )}
    </>
  );
}

export default AuthForm;
