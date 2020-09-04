import React from "react";
//import logo from './logo.svg';
import Header from "./components/header/header.component";
import { createStructuredSelector } from "reselect";
import { setCurrentUser, checkUserSession } from "./redux/user/user.sction";
import { selectCurrentUser } from "./redux/user/user.selector";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import DashBoard from "./pages/DashBoard/dashBoard.component";
import "./App.css";

class App extends React.Component {
  unSubscribeFromAuth = null;

  componentWillMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  render() {
    return (
      <div className="App">
        <Header></Header>
        <Switch>
          <Route
            exact
            path="/signIn"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
          <Route exact path="/dashBoard" component={DashBoard} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
