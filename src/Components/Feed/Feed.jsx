import React from "react";
import { connect } from "react-redux";
import { theme } from "../../Assets/theme";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import Profile from "./Profile";
import Suggestions from "./Suggestions";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const Feed = (props) => {
  return (
    <MainFeedWrap>
      <MainFeedContainer>
        <Row>
          <Col xs={12} lg={8} className="pl-0 pr-2">
            <Left></Left>
          </Col>
          <Col xs={4} className="pl-2 pr-0">
            <Right>
              <Profile />
              <Suggestions />
            </Right>
          </Col>
        </Row>
      </MainFeedContainer>
    </MainFeedWrap>
  );
};

const MainFeedWrap = styled.div`
  height: 100vh;
  width: 100%;
  padding: 86px 50px 0px 90px;
`;

const MainFeedContainer = styled.div`
  height: 100vh;
`;

const Left = styled.div`
  overflow: auto;
  height: 100vh;
  border: 1px solid ${theme.main.grey};
  background-color: white;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Right = styled.div`
  padding: 0px 10px;
  min-height: 100vh;
`;

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
