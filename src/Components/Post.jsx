import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { theme } from "../Assets/theme";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import styled, { keyframes } from "styled-components";
import { LikeIcon, UnlikeIcon, CommentIcon, ShareIcon, SaveIcon, MoreIcon, EmojiIcon } from "../Assets/PostIcons";
import SpriteSheet from "../Assets/spritesheet.png";
import MorePopup from "./MorePopup";
import PopupPost from "./PopupPost";
import PostEditPanel from "./PostEditPanel";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const Post = (props) => {
  const [showLargeHeart, setShowLargeHeart] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showPostOptions, setShowPostOptions] = useState(false);
  const [showPopupPost, setShowPopupPost] = useState(false);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const fetchComments = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${props.post._id}/comments`, {
        credentials: "include",
      });
      const data = await response.json();
      setComments(data);
    } catch (error) {}
  };

  const likeHandler = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/posts/${props.post._id}/like/${props.user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      props.fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const commentHandler = async () => {
    try {
      if (commentInput.length > 0 && !commentInput.startsWith(" ")) {
        const newComment = {
          user: props.user.username,
          text: commentInput,
        };

        await fetch(`${process.env.REACT_APP_API_URL}/posts/${props.post._id}/comments`, {
          method: "POST",
          body: JSON.stringify(newComment),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        setCommentInput("");
        props.fetchPosts();
        fetchComments();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const commentSubmitHandler = (event) => {
    if (event.keyCode === 13) {
      commentHandler();
    }
  };

  const toggleLargeHeart = () => {
    if (props.post.likes.findIndex((userId) => userId === props.user._id) === -1) {
      likeHandler();
    }
    setShowLargeHeart(true);
    setTimeout(() => {
      setShowLargeHeart(false);
    }, 2000);
  };

  const showMoreHandler = () => {
    setShowMore(true);
  };
  const showPostOptionsHandler = () => {
    setShowPostOptions(!showPostOptions);
  };

  const showPopupPostHandler = () => {
    setShowPopupPost(!showPopupPost);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <>
      {showPostOptions && (
        <MorePopup
          showPostOptions={showPostOptionsHandler}
          fetchPosts={() => props.fetchPosts()}
          postUserId={props.post.user._id}
          postId={props.post._id}
          toggleEditPanel={() => setShowEditPanel(!showEditPanel)}
        />
      )}
      {showEditPanel && (
        <PostEditPanel
          post={props.post}
          fetchPosts={() => props.fetchPosts()}
          toggleEditPanel={() => setShowEditPanel(!showEditPanel)}
        />
      )}
      {showPopupPost && (
        <PopupPost
          post={props.post}
          comments={comments}
          showPopupPost={showPopupPostHandler}
          showPostOptions={showPostOptionsHandler}
          fetchPosts={() => props.fetchPosts()}
          fetchComments={() => fetchComments()}
          commentSubmitHandler={() => commentSubmitHandler()}
        />
      )}
      <PostMainContainer>
        <PostHeader>
          <div className="left">
            <div className="post-profile-picture">
              <img src={props.post.user.image} alt="profile" />
            </div>
            <div>
              <Link to="#">{props.post.username.toLowerCase()}</Link>
              <small>{props.post.location}</small>
            </div>
          </div>
          <div className="right">
            <button onClick={setShowPostOptions}>{MoreIcon()}</button>
          </div>
        </PostHeader>
        <PostImage onDoubleClick={() => toggleLargeHeart()}>
          {showLargeHeart && <div className="liked-heart-large"></div>}
          <img src={props.post.image} alt="post" />
        </PostImage>

        <PostFooter>
          <PostIconBar>
            <div className="left">
              <button className="like-button" onClick={likeHandler}>
                {props.post.likes.findIndex((userId) => userId === props.user._id) !== -1 ? UnlikeIcon() : LikeIcon()}
              </button>
              <button>{CommentIcon()}</button>
              <button>{ShareIcon()}</button>
            </div>
            <div className="right">
              <button>{SaveIcon()}</button>
            </div>
          </PostIconBar>
          <PostCaption>
            <Link to="#" className="number-of-likes">
              {props.post.likes.length} likes
            </Link>
            <div>
              <Link to="#">{props.post.username.toLowerCase()}</Link>
              {showMore ? (
                <p>{props.post.text}</p>
              ) : (
                <p>
                  {props.post.text.split("").splice(0, 35).join("")}... <button onClick={showMoreHandler}>more</button>
                </p>
              )}
            </div>
            {comments.length > 0 && (
              <PostComments>
                {comments.length > 3 && (
                  <button onClick={showPopupPostHandler}>View all {props.post.comments.length} comments</button>
                )}
                {comments.slice(0, 3).map((comment, index) => (
                  <SingleComment key={index}>
                    <Link to="#">{comment.user}</Link>
                    <p>{comment.text}</p>
                  </SingleComment>
                ))}
              </PostComments>
            )}
            <small>
              <Moment fromNow ago>
                {props.post.createdAt}
              </Moment>{" "}
              ago
            </small>
          </PostCaption>
          <PostNewComment>
            <div className="left">
              <button>{EmojiIcon()}</button>
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentInput}
                onChange={(event) => setCommentInput(event.target.value)}
                onKeyDown={commentSubmitHandler}
              />
            </div>
            <div className="right">
              <button onClick={commentHandler}>Post</button>
            </div>
          </PostNewComment>
        </PostFooter>
      </PostMainContainer>
    </>
  );
};

const PostMainContainer = styled.div`
  margin-bottom: 60px;
  width: 100%;
  border: 1px solid ${theme.main.grey};
  border-radius: 3px;
`;

const PostHeader = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;

  .left {
    display: flex;
    align-items: center;

    > .post-profile-picture {
      height: 32px;
      width: 32px;
      background-color: black;
      border-radius: 50%;
      margin-right: 14px;
      overflow: hidden;
      img {
        height: 32px;
        width: 32px;
      }
    }
    > div {
      display: flex;
      flex-direction: column;
      > a {
        color: ${theme.main.darkgrey};
        font-weight: 600;
        font-size: 14px;

        :hover {
          text-decoration: underline;
        }
      }
      small {
        color: ${theme.a.light};
        font-size: 12px;
      }
    }
  }

  .right {
    > button {
      border: none;
      background-color: transparent;
    }
  }
`;

const slideInFwdCenter = keyframes`
    0% { opacity: 0; transform: scale(0); }
    15% { opacity: 1; transform: scale(1); }
    70% { opacity: 1; transform: scale(1); }
    90% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(0); }
`;

const PostImage = styled.div`
  width: 100%;
  max-height: 767px;
  overflow: hidden;
  border-top: 1px solid ${theme.main.grey};
  background-color: white;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
  }
  .liked-heart-large {
    position: absolute;
    background-image: url(${SpriteSheet});
    background-repeat: no-repeat;
    height: 100px;
    width: 100px;
    background-position: -14px -17px;
    z-index: 999;
    animation: ${slideInFwdCenter} 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
`;

const PostFooter = styled.div``;

const PostIconBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
  padding: 0px 6px;

  .like-button {
    transition: transform 0.25s ease;
    :active {
      transform: scale(1.2);
    }
  }

  button {
    border: none;
    background-color: transparent;
    height: 40px;
    width: 40px;
  }
`;

const PostCaption = styled.div`
  color: ${theme.main.darkgrey};
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  padding: 0px 16px;
  background-color: white;
  .number-of-likes {
    color: ${theme.main.darkgrey};
    margin-bottom: 8px;
  }
  > div {
    display: flex;
    margin-bottom: 4px;

    a {
      color: ${theme.main.darkgrey};
      margin-right: 6px;
      :hover {
        text-decoration: underline;
      }
    }
    p {
      font-weight: 400;
      max-width: 85%;
      a {
        color: ${theme.a.primary};
      }
      button {
        border: none;
        background-color: transparent;
        color: ${theme.a.light};
      }
    }
  }
  small {
    color: ${theme.a.light};
    text-transform: uppercase;
  }
`;

const PostComments = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  > button {
    background-color: transparent;
    border: none;
    color: ${theme.a.light};
    text-align: left;
    width: 160px;
    padding: 0;
  }
`;

const SingleComment = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  a {
    font-weight: 600;
  }
  > p {
    margin: 0;
  }
`;

const PostNewComment = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 56px;
  border-top: 1px solid ${theme.main.grey};
  background-color: white;
  button {
    border: none;
    background-color: transparent;
    padding: 0;
  }
  > .left {
    width: 100%;
    > button {
      margin-right: 10px;
    }
  }
  > .right > button {
    color: ${theme.main.lightblue};
    font-weight: 600;
    font-size: 14px;
  }
  input {
    border: none;
    font-size: 14px;
    color: ${theme.main.darkgrey};
    width: 75%;
    :focus {
      outline: none;
    }
    ::placeholder {
      font-size: 14px;
      font-weight: 400;
      color: ${theme.a.light};
    }
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(Post);
