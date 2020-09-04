import React from "react";
import "./shortlink-container.style.scss";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserShortlinks } from "../../redux/dashboard/dashboard.selector";
import {
  getUserShortlinks,
  deleteUserShortlinks,
  showLoaderOnTargetlink,
} from "../../redux/dashboard/dashboard.action";
import { Result, Spin, Button } from "antd";
import "antd/dist/antd.css";
import {
  selectCurrentUser,
  SelectIdToken,
} from "../../redux/user/user.selector";
import ShortLink from "../shortlink-item/shortlink-item.component";
import { SmileOutlined } from "@ant-design/icons";

class ShortLinkContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const { getUserShortlinks, idToken } = this.props;
      console.log("i get called");
      console.log({ id: idToken });
      getUserShortlinks(idToken);
    }, 3000);
  }

  deleteLink = (shortlink) => {
    //call a function
    const {
      deleteUserShortlinks,
      idToken,
      showLoaderOnTargetLink,
    } = this.props;

    console.log(shortlink);
    showLoaderOnTargetLink(shortlink);
    deleteUserShortlinks({ shortlink: shortlink, idToken: idToken });
  };

  render() {
    const { userShortlinks } = this.props;
    var shortLink;

    if (userShortlinks != null) {
      if (userShortlinks.length != 0 && userShortlinks != "error") {
        shortLink = <ShortLink></ShortLink>;
      } else if (userShortlinks.length == 0) {
        shortLink = (
          <div>
            <Result
              icon={<SmileOutlined />}
              title="No Shortlink Created! create one"
            />
          </div>
        );
      } else if (userShortlinks == "error") {
        shortLink = (
          <div className="error">
            <Result
              status="error"
              title="Something Went wrong"
              subTitle="Server is not responding try again "
              extra={[<Button key="buy">Try Again</Button>]}
            ></Result>
          </div>
        );
      }
    } else {
      console.log("i m here");
      shortLink = (
        <div className="loading">
          <Spin tip="loading" />
        </div>
      );
    }

    return (
      <div className="ShortLinkContainer">
        {userShortlinks != 0 &&
        userShortlinks != null &&
        userShortlinks != "error"
          ? userShortlinks.map((el) => (
              <ShortLink
                Key={el.ShortLink}
                originalLink={el.originalLink}
                shortLink={el.shortLink}
                isSpinning={el.isSpinning}
                deleteLink={this.deleteLink}
              ></ShortLink>
            ))
          : shortLink}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  idToken: SelectIdToken,
  userShortlinks: selectUserShortlinks,
});

const mapDispatchToProps = (dispatch) => ({
  getUserShortlinks: (idToken) => dispatch(getUserShortlinks(idToken)),
  deleteUserShortlinks: (key) => dispatch(deleteUserShortlinks(key)),
  showLoaderOnTargetLink: (key) => dispatch(showLoaderOnTargetlink(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShortLinkContainer);
