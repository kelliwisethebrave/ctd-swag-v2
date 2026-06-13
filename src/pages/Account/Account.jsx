import { Link } from "react-router";

function Account({ user, handleLogOut }) {
  return (
    <div className="account">
      <h2>Your Account</h2>
      <div className="accountDetails">
        <p>First Name: {user.firstName}</p>
        <p>Last Name: {user.lastName} </p>
        <p>Email: {user.email}</p>
      </div>
      <div className="buttonGroup">
        <Link className="linkButton">Go back</Link>
        <button onClick={handleLogOut}>Log Out</button>
      </div>
    </div>
  );
}

export default Account;
