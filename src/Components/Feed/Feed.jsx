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
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/following`, { credentials: "include" });
      const data = await response.json();
      if (!data.errors) {
        /*         const posts = [];
        data.forEach(async (post) => posts.push(post._doc)); */
        setPosts(data);
      }
      const response_me = await fetch(`${process.env.REACT_APP_API_URL}/posts/me`, { credentials: "include" });
      const data_me = await response_me.json();
      if (!data_me.errors) {
        setMyPosts(data_me);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  /*  const fetchPostsTest = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/following2`, { credentials: "include" });
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
    fetchPosts();
  }, []);

  return (
    <MainFeedWrap>
      <MainFeedContainer>
        <Container>
          <Row>
            <Col xs={12} lg={8}>
              <Left>
                <Stories />
                {myPosts.length > 0 || posts.length > 0 ? (
                  <>
                    {myPosts.map((post, index) => (
                      <Post key={index} post={post} fetchPosts={fetchPosts} />
                    ))}
                    {posts.map((post, index) => (
                      <Post key={index} post={post} fetchPosts={fetchPosts} />
                    ))}
                  </>
                ) : (
                  !loading && <p className="no-posts w-100 text-center">Follow more people to see posts/stories.</p>
                )}

                <div className="spacer" style={{ height: 100 }}></div>
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
        {showNewPostPanel && (
          <CreatePostPanel
            panelRight={newPostPanelRight}
            toggleNewPostPanel={toggleNewPostPanel}
            fetchPosts={fetchPosts}
          />
        )}
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
  .no-posts {
    color: white;
    font-weight: 500;
    background: linear-gradient(45deg, #f5852999, #dd2a7b99);
    padding: 10px;
    border-radius: 3px;
    font-size: 14px;
  }

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
