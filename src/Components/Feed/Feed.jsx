import React from "react";
import { connect } from "react-redux";
import { theme } from "../../Assets/theme";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import Stories from "./Stories";
import Profile from "./Profile";
import Suggestions from "./Suggestions";
import Footer from "./Footer";
import Post from "../Post";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const Feed = (props) => {
  return (
    <MainFeedWrap>
      <MainFeedContainer>
        <Container>
          <Row>
            <Col xs={12} lg={8}>
              <Left>
                <Stories />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
              </Left>
            </Col>
            <Col xs={4} className="d-none d-lg-block">
              <Right>
                <Profile />
                <Suggestions />
                <Footer />
              </Right>
            </Col>
          </Row>
        </Container>
      </MainFeedContainer>
    </MainFeedWrap>
  );
};

const MainFeedWrap = styled.div`
  height: 100vh;
  width: 100%;
  padding: 86px 50px 0px 50px;
`;

const MainFeedContainer = styled.div`
  height: 100vh;
`;

const Left = styled.div`
  max-width: 614px;
  overflow: auto;
  height: 100vh;
  -ms-overflow-style: none;
  scrollbar-width: none;
  margin: 0 auto;
  position: relative;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Right = styled.div`
  max-width: 293px;
  padding: 0px 10px;
  min-height: 100vh;
`;

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
