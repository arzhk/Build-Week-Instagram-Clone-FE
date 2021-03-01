import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "./Components/Login_Register/Login";
import Register from "./Components/Login_Register/Register";
import ForgotPassword from "./Components/Login_Register/ForgotPassword";

const Main = (props) => {
  return (
    <Router>
      {!props.app.isLoggedIn && !props.user.username ? (
        <>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Redirect to="/login" />
          </Switch>
        </>
      ) : (
        <></>
        /*  <Route exact path="/" component={Feed} /> */
      )}
    </Router>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
