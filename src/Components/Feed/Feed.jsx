import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import Stories from "./Stories";
import Profile from "./Profile";
import Suggestions from "./Suggestions";
import Footer from "./Footer";
import Post from "../Post";
import CreatePost from "./CreatePost";
import CreatePostPanel from "./CreatePostPanel";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const Feed = (props) => {
  const [newPostPanelRight, setNewPostPanelRight] = useState(-400);
  const [showNewPostPanel, setShowNewPostPanel] = useState(false);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:5555/api/posts/following", { credentials: "include" });
      const data = await response.json();
      if (!data.errors) {
        /*         const posts = [];
        data.forEach(async (post) => posts.push(post._doc)); */
        setPosts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*  const fetchPostsTest = async () => {
    try {
      const response = await fetch("http://localhost:5555/api/posts/following2", { credentials: "include" });
      const data = await response.json();
      console.log(data);
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  }; */

  const toggleNewPostPanel = async () => {
    if (newPostPanelRight === -400) {
      await setShowNewPostPanel(false);
    }
    await setShowNewPostPanel(true);
    newPostPanelRight === 0 ? setNewPostPanelRight(-400) : setNewPostPanelRight(0);
  };

  useEffect(() => {
    /*    fetchPosts(); */
    fetchPosts();
  }, []);

  useEffect(() => {
    /*     console.log(posts); */
  }, [posts]);

  return (
    <MainFeedWrap>
      <MainFeedContainer>
        <Container>
          <Row>
            <Col xs={12} lg={8}>
              <Left>
                <Stories />
                {posts.map((post, index) => (
                  <Post key={index} post={post} />
                ))}
              </Left>
            </Col>
            <Col xs={4} className="d-none d-lg-block">
              <Right>
                <CreatePost toggleNewPostPanel={toggleNewPostPanel} />
                <Profile />
                <Suggestions />
                <Footer />
              </Right>
            </Col>
          </Row>
        </Container>
        {showNewPostPanel && <CreatePostPanel panelRight={newPostPanelRight} toggleNewPostPanel={toggleNewPostPanel} />}
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
