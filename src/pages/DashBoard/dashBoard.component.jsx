import React from "react";
import "./dashBoard.style.scss";
import AddShortlink from "../../components/add-shortlink/add-shortlink.component";
import ShortLinkContainer from "../../components/shortlink-container/shortlink-container.component";
import ProfileCard from "../../components/profile/profile.component";

const DashBoard = () => (
  <div className="DashBoard">
    <div className="wrapper">
      <div className="profile">
        <ProfileCard></ProfileCard>
      </div>
      <div className="links-container">
        <div className="shortlinkx">
          <ShortLinkContainer></ShortLinkContainer>
        </div>
      </div>
      <div className="add-shortlink">
        <AddShortlink></AddShortlink>
      </div>
    </div>
  </div>
);

export default DashBoard;
