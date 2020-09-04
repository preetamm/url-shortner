import React from "react";
import "./profile.style.scss";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
  SelectUserProfileLoadingState,
  selectCurrentUser,
} from "../../redux/user/user.selector";
import { toggleProfileLoadingState } from "../../redux/user/user.sction";
import { Card } from "antd";

const ProfileCard = ({ isUserProfileLoading, currentUser }) => {
  return (
    <Card loading={isUserProfileLoading}>
      {currentUser ? (
        <div className="profilex">
          <h3>Profile</h3>
          <div className="userinfo">
            <div className="displayname">
              <h4>{currentUser.displayName}</h4>
            </div>
            <div className="email">{currentUser.email}</div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </Card>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isUserProfileLoading: SelectUserProfileLoadingState,
});

const mapDispatchToProps = (dispatch) => ({
  toggleProfileLoadingState: () => dispatch(toggleProfileLoadingState),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard);
