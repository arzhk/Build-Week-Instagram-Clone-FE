import React from "react";
import { connect } from "react-redux";
import { theme } from "../Assets/theme";
import styled from "styled-components";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const Direct = (props) => {
  return <div></div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(Direct);
