import React, { useState } from "react";
import { connect } from "react-redux";
import { theme } from "../Assets/theme";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { LikeIcon, UnlikeIcon, CommentIcon, ShareIcon, SaveIcon, MoreIcon, EmojiIcon } from "../Assets/PostIcons";
import SpriteSheet from "../Assets/spritesheet.png";
import MorePopup from "./MorePopup";
import PopupPost from "./PopupPost";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const Post = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showLargeHeart, setShowLargeHeart] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showPostOptions, setShowPostOptions] = useState(false);
  const [showPopupPost, setShowPopupPost] = useState(false);
  const str = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo esse sed id quod nostrum, impedit, cum in
              incidunt, inventore fugiat ut et? Delectus culpa magnam test neque consequuntur
              ratione eum reiciendis.`;

  const likePostToggler = () => {
    setIsLiked(!isLiked);
  };

  const likePost = () => {
    setIsLiked(true);
    toggleLargeHeart();
  };

  const toggleLargeHeart = () => {
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

  return (
    <>
      {showPostOptions && <MorePopup showPostOptions={showPostOptionsHandler} />}
      {showPopupPost && <PopupPost showPopupPost={showPopupPostHandler} showPostOptions={showPostOptionsHandler} />}
      <PostMainContainer>
        <PostHeader>
          <div className="left">
            <div className="post-profile-picture"></div>
            <div>
              <Link to="#">Username</Link>
              <small>Location, Country</small>
            </div>
          </div>
          <div className="right">
            <button onClick={setShowPostOptions}>{MoreIcon()}</button>
          </div>
        </PostHeader>
        <PostImage onDoubleClick={() => likePost()}>
          {showLargeHeart && <div className="liked-heart-large"></div>}
        </PostImage>

        <PostFooter>
          <PostIconBar>
            <div className="left">
              <button className="like-button" onClick={likePostToggler}>
                {isLiked ? UnlikeIcon() : LikeIcon()}
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
              11 likes
            </Link>
            <div>
              <Link to="#">Username</Link>
              {showMore ? (
                <p>{str}</p>
              ) : (
                <p>
                  {str.split("").splice(0, 35).join("")}... <button onClick={showMoreHandler}>more</button>
                </p>
              )}
            </div>
            <PostComments>
              <button onClick={showPopupPostHandler}>View all 17 comments</button>
              <SingleComment>
                <Link to="#">Username</Link>
                <p>Comment</p>
              </SingleComment>
            </PostComments>
            <small>5 HOURS AGO</small>
          </PostCaption>
          <PostNewComment>
            <div className="left">
              <button>{EmojiIcon()}</button>
              <input type="text" placeholder="Add a comment..." />
            </div>
            <div className="right">
              <button>Post</button>
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
    100% { opacity: 0; transform: scale(1); }
`;

const PostImage = styled.div`
  width: 100%;
  height: 400px;
  border-top: 1px solid ${theme.main.grey};
  background-color: black;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .liked-heart-large {
    background-image: url(${SpriteSheet});
    background-repeat: no-repeat;
    height: 100px;
    width: 100px;
    background-position: -14px -17px;
    z-index: 99;
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
  button {
    border: none;
    background-color: transparent;
    padding: 0;
  }
  > .left > button {
    margin-right: 10px;
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
