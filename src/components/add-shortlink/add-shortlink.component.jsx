import React from "react";
//import DashBoard from '../../pages/DashBoard/dashBoard.component'
//import CustomButton from '../custom-button/custom-button.component'
import "./add-shortlink.style.scss";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import FormInput from "../form-input/form-input.component";
import { addNewShortLink } from "../../redux/user/user.sction";
import { createStructuredSelector } from "reselect";
import {
  SelectInvalidLink,
  SelectIdToken,
} from "../../redux/user/user.selector";
import { Button } from "antd";

class AddShortlink extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      urlLink: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ urlLink: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { addNewShortLink } = this.props;

    addNewShortLink({ link: this.state.urlLink, idToken: this.props.idToken });
  };

  render() {
    return (
      <div className="add-short-link">
        <h3>Add New Shortlink</h3>
        <form action="" className="add-link-form" onSubmit={this.handleSubmit}>
          <input
            className="add-link-input"
            type="text"
            onChange={this.handleChange}
            value={this.state.urlLink}
          />
          {this.props.invalidLink == true ? (
            <div>the link is invalid </div>
          ) : (
            ""
          )}
          <Button
            type="primary"
            onClick={this.handleSubmit}
            className="add-button"
            size="small"
            loading={false}
          >
            Add Link
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  invalidLink: SelectInvalidLink,
  idToken: SelectIdToken,
});

const mapDispatchToProps = (dispatch) => ({
  addNewShortLink: (link) => dispatch(addNewShortLink(link)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddShortlink);
