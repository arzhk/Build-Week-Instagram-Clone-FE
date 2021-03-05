import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { authorise } from "./Auth";
import Login from "./Components/Login_Register/Login";
import Register from "./Components/Login_Register/Register";
import ForgotPassword from "./Components/Login_Register/ForgotPassword";
import ProfilePage from "./Components/Profile_Page/ProfilePage";
import NavBar from "./Components/NavBar/NavBar";
import Feed from "./Components/Feed/Feed";
import Explore from "./Components/Explore";
import Direct from "./Components/Direct";
import FullPageLoader from "./Components/Loaders/FullPageLoader";

const Main = (props) => {
  const start = async () => {
    await authorise(props.setUser);
    setTimeout(() => {
      props.setLoading(false);
    }, 1300);
  };

  useEffect(() => {
    props.setLoading(true);
    start();
  }, []);

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
        <>
          <Route path="/" component={NavBar} />
          <Switch>
            <Route exact path="/" component={Feed} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/explore" component={Explore} />
            <Route exact path="/direct/inbox/" component={Direct} />
            <Redirect to="/" />
          </Switch>
        </>
      )}
      {props.app.isLoading && <FullPageLoader />}
    </Router>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setUser: (data) => dispatch({ type: "UPDATE_USER_INFO", payload: data }),
  setLoading: (boolean) => dispatch({ type: "SET_LOADING", payload: boolean }),
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
