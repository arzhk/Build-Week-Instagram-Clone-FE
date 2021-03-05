import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const Explore = (props) => {
  return <div></div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
