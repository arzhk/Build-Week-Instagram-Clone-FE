import React, { useState } from "react";
import { connect } from "react-redux";
import { theme } from "../Assets/theme";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { LikeIcon, UnlikeIcon, CommentIcon, ShareIcon, SaveIcon, MoreIcon, EmojiIcon } from "../Assets/PostIcons";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const PopupPost = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  return (
    <PopupPostWrapper>
      <PopupBackgroundDim onClick={props.showPopupPost} />
      <PopupPostContainer>
        <div className="left">
          <div className="post-image"></div>
        </div>
        <div className="right">
          <PopupPostHeader>
            <div className="left">
              <div className="profile-picture"></div>
              <div className="post-info">
                <Link to="#">Username</Link>
                <small>Location</small>
              </div>
            </div>
            <div className="right">
              <button>Follow</button>
              <button onClick={props.showPostOptions}>{MoreIcon()}</button>
            </div>
          </PopupPostHeader>
          <PopupPostCaption>
            <div className="profile-picture"></div>
            <div className="post-info">
              <div>
                <Link to="#">Username</Link>
                <p>Caption</p>
              </div>
              <small>1d</small>
            </div>
          </PopupPostCaption>
          <PopupPostComments>
            <SingleComment>
              <div className="profile-picture"></div>
              <div className="comment-content">
                <Link to="#">Username</Link>
                <p>Comment text akdmaskldmsaamdskla</p>
                <div>
                  <small>1d</small>
                  <button>3 likes</button>
                  <button>Reply</button>
                </div>
              </div>
            </SingleComment>
          </PopupPostComments>
          <PopupPostFooter>
            <PopupPostIconBar>
              <div className="left">
                <button className="like-button">{isLiked ? UnlikeIcon() : LikeIcon()}</button>
                <button>{CommentIcon()}</button>
                <button>{ShareIcon()}</button>
              </div>
              <div className="right">
                <button>{SaveIcon()}</button>
              </div>
            </PopupPostIconBar>
            <button className="number-of-likes">690 likes</button>
            <small>1 DAY AGO</small>
            <PopupPostNewComment>
              <div class="left">
                <button>{EmojiIcon()}</button>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentInput}
                  onChange={(event) => setCommentInput(event.target.value)}
                />
              </div>
              <div class="right">
                <button disabled={commentInput.length === 0}>Post</button>
              </div>
            </PopupPostNewComment>
          </PopupPostFooter>
        </div>
      </PopupPostContainer>
    </PopupPostWrapper>
  );
};

const PopupPostWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  padding: 0 50px;
`;

const PopupBackgroundDim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.55);
  z-index: 10;
`;

const PopupPostContainer = styled.div`
  background-color: white;
  box-shadow: 0px 0px 10px -1px rgba(0, 0, 0, 0.05);
  text-align: center;
  display: flex;
  min-height: 450px;
  max-height: 650px;
  position: relative;
  z-index: 99;
  .left {
    .post-image {
      height: 650px;
      width: 500px;
      background-color: red;
    }
  }

  .right {
    width: 335px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .profile-picture {
    height: 32px;
    width: 32px;
    background-color: black;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

const PopupPostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  border-bottom: 1px solid ${theme.main.grey};
  .left {
    display: flex;
    align-items: center;

    .post-info {
      display: flex;
      flex-direction: column;
      text-align: left;
      > a {
        color: ${theme.main.darkgrey};
        font-weight: 600;
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-end;
    text-align: right;
    button {
      border: none;
      background-color: transparent;
      font-weight: 600;
      :first-child {
        color: ${theme.main.lightblue};
      }
    }
  }
`;

const PopupPostCaption = styled.div`
  padding: 12px 16px 0px;
  font-size: 14px;
  display: flex;
  align-items: flex-start;

  .post-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${theme.main.darkgrey};
    text-align: left;

    > div {
      display: flex;
      align-items: center;
      > a {
        margin-right: 10px;
        font-weight: 600;
        color: ${theme.main.darkgrey};
      }
      > p {
        margin: 0;
      }
    }
    > small {
      color: ${theme.a.light};
      width: 100%;
      text-align: left;
      font-size: 12px;
      margin-top: 16px;
      margin-bottom: 4px;
    }
  }
`;

const PopupPostComments = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 400px;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const SingleComment = styled.div`
  display: flex;
  padding: 12px 16px;
  .comment-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 14px;
    > a {
      color: ${theme.main.darkgrey};
      font-weight: 600;
      margin-right: 10px;
    }
    div {
      small {
        font-size: 14px;
        color: ${theme.a.light};
      }

      button {
        border: none;
        background-color: transparent;
        color: ${theme.a.light};
        font-size: 14px;
        font-weight: 600;
        padding: 0;
        :first-of-type {
          margin: 0 10px;
        }
      }
    }
  }

  p {
    margin: 0;
    line-break: break-word;
    text-align: left;
  }
`;

const PopupPostFooter = styled.div`
  border-top: 1px solid ${theme.main.grey};
  margin-top: 4px;
  display: flex;
  flex-direction: column;

  .number-of-likes {
    background-color: transparent;
    border: none;
    color: ${theme.main.darkgrey};
    font-weight: 600;
    font-size: 14px;
    text-align: left;
    padding: 2px 16px;
    margin-top: -4px;
  }
  small {
    text-align: left;
    color: ${theme.a.light};
    font-size: 10px;
    padding: 0px 16px;
    margin-bottom: 8px;
  }
`;

const PopupPostIconBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
  padding: 2px 6px;

  .left {
    display: flex;
    align-items: center;
  }

  .right {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }

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

const PopupPostNewComment = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${theme.main.grey};
  padding: 12px 10px;

  .left {
    display: flex;
    align-items: center;

    input {
      border: none;
      margin-left: 10px;
      color: ${theme.main.darkgrey};
      :focus {
        outline: none;
      }
      ::placeholder {
        color: ${theme.a.light};
        font-size: 14px;
      }
    }
  }

  .right {
    button {
      text-align: right;
      :disabled {
        opacity: 0.4;
      }
    }
  }

  button {
    background-color: transparent;
    border: none;
    font-size: 14px;
    font-weight: 600;
    color: ${theme.main.lightblue};
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(PopupPost);
