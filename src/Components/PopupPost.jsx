import React, { useEffect, useState, createRef } from "react";
import { connect } from "react-redux";
import { theme } from "../Assets/theme";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Moment from "react-moment";
import { LikeIcon, UnlikeIcon, CommentIcon, ShareIcon, SaveIcon, MoreIcon, EmojiIcon } from "../Assets/PostIcons";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setUser: (data) => dispatch({ type: "UPDATE_USER_INFO", payload: data }),
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const PopupPost = (props) => {
  const [commentInput, setCommentInput] = useState("");
  const commentsEnd = createRef();

  const followHandler = async (userId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/follow/${userId}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (data._id) {
        props.setUser(data);
      }
    } catch (error) {
      console.log(error);
    }
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
        props.fetchComments();
        props.fetchPosts();
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

  const scrollToBottom = () => {
    commentsEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [props.comments]);

  return (
    <PopupPostWrapper>
      <PopupBackgroundDim onClick={props.showPopupPost} />
      <PopupPostContainer>
        <div className="left">
          <div className="post-image">
            <img src={props.post.image} alt="post" />
          </div>
        </div>
        <div className="right">
          <div>
            <PopupPostHeader>
              <div className="left">
                <div className="profile-picture">
                  <img src={props.post.user.image} alt="profile" />
                </div>
                <div className="post-info">
                  <Link to="#">{props.post.username}</Link>
                  <small>{props.post.location}</small>
                </div>
              </div>
              <div className="right">
                {props.user.following.findIndex(
                  (followedUser) => followedUser.toString() === props.post.user._id.toString()
                ) === -1 ? (
                  <button onClick={() => followHandler(props.post.user._id)}>Follow</button>
                ) : (
                  <button onClick={() => followHandler(props.post.user._id)}>Unfollow</button>
                )}

                <button onClick={props.showPostOptions}>{MoreIcon()}</button>
              </div>
            </PopupPostHeader>
            <PopupPostCaption>
              <div className="profile-picture">
                <img src={props.post.user.image} alt="profile" />
              </div>
              <div className="post-info">
                <div>
                  <Link to="#">{props.post.username}</Link>
                  <p>{props.post.text}</p>
                </div>
                <small>
                  <Moment fromNow ago>
                    {props.post.createdAt}
                  </Moment>{" "}
                  ago
                </small>
              </div>
            </PopupPostCaption>
            <PopupPostComments>
              {props.comments.map((comment) => (
                <>
                  <SingleComment>
                    <div className="profile-picture"></div>
                    <div className="comment-content">
                      <Link to="#">{comment.user}</Link>
                      <p>{comment.text}</p>
                      <div>
                        <small>
                          <Moment fromNow ago>
                            {comment.createdAt}
                          </Moment>
                        </small>
                        <button>0 likes</button>
                        <button>Reply</button>
                      </div>
                    </div>
                  </SingleComment>
                  <div ref={commentsEnd}></div>
                </>
              ))}
            </PopupPostComments>
          </div>

          <PopupPostFooter>
            <PopupPostIconBar>
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
            </PopupPostIconBar>
            <button className="number-of-likes">{props.post.likes.length} likes</button>
            <small>
              <Moment fromNow ago>
                {props.post.createdAt}
              </Moment>{" "}
              ago
            </small>
            <PopupPostNewComment>
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
                <button disabled={commentInput.length === 0} onClick={commentHandler}>
                  Post
                </button>
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
  align-items: center;
  position: relative;
  z-index: 99;
  max-height: 612px;
  .left {
    /*    overflow: hidden; */
    .post-image {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        object-fit: cover;
        max-width: 630px;
        max-height: 612px;
      }

      background-color: ${theme.main.grey};
    }
  }

  .right {
    max-height: 612px;
    width: 335px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > div:first-child {
      height: 100%;
    }
  }

  .profile-picture {
    height: 32px;
    width: 32px;
    background-color: ${theme.main.grey};
    border-radius: 50%;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    img {
      height: 32px;
      width: 32px;
    }
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
      font-size: 10px;
      margin-top: 16px;
      margin-bottom: 4px;
      text-transform: uppercase;
    }
  }
`;

const PopupPostComments = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 338px;
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
    text-transform: uppercase;
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
