import React from "react";
import { Link } from "react-router-dom";
import "./header.styles.scss";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { signOutUser } from "../../redux/user/user.sction";

const Header = ({ currentUser, signOutUser }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <h2>Bittly</h2>
    </Link>
    <div className="options">
      {currentUser ? (
        <div className="nav-wrapper">
          <div className="option" onClick={() => signOutUser()}>
            Sign Out
          </div>
          <Link className="option nav-style" to="/dashBoard">
            DashBoard
          </Link>
        </div>
      ) : (
        <Link className="option nav-style" to="/signIn">
          Sign In{" "}
        </Link>
      )}
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  signOutUser: () => dispatch(signOutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
