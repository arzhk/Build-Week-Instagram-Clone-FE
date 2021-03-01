import React from "react";
import { connect } from "react-redux";
import { theme } from "../Assets/theme";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const Feed = (props) => {
  return <div></div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
