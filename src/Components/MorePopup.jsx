import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { theme } from "../Assets/theme";
import styled, { keyframes } from "styled-components";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setUser: (data) => dispatch({ type: "UPDATE_USER_INFO", payload: data }),
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const MorePopup = (props) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const followHandler = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5555/api/users/follow/${userId}`, {
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

  useEffect(() => {
    if (props.user.following.findIndex((userId) => userId === props.postUserId) !== -1) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
    console.log(props);
  }, []);

  useEffect(() => {
    if (props.user.following.findIndex((userId) => userId === props.postUserId) !== -1) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [props.user.following]);

  return (
    <MorePopupWrapper onClick={props.showPostOptions}>
      <MorePopupContainer>
        <ul>
          <li className="conditional">
            <button>Report</button>
          </li>
          {isFollowing && (
            <>
              <li className="conditional">
                <button onClick={() => followHandler(props.postUserId)}>Unfollow</button>
              </li>
            </>
          )}
          <li>
            <button>Go to post</button>
          </li>
          <li>
            <button>Share to...</button>
          </li>
          <li>
            <button>Copy Link</button>
          </li>
          <li>
            <button>Embed</button>
          </li>
          <li>
            <button onClick={props.showPostOptions}>Cancel</button>
          </li>
        </ul>
      </MorePopupContainer>
    </MorePopupWrapper>
  );
};

const slideInFwdCenter = keyframes`
    0% { opacity: 0; transform: scale(1.5); }
    15% { opacity: 1; transform: scale(1); }
    100% { opacity: 1; transform: scale(1); }
`;

const MorePopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const MorePopupContainer = styled.div`
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0px 0px 10px -1px rgba(0, 0, 0, 0.05);
  width: 400px;
  text-align: center;
  animation: ${slideInFwdCenter} 2s ease;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      font-size: 14px;
      button {
        background-color: transparent;
        color: ${theme.main.darkgrey};
        border: none;
        padding: 16px;
        border-bottom: 1px solid ${theme.main.grey};
        width: 100%;
        :active {
          background-color: ${theme.main.grey};
        }
      }
      :first-child {
        button {
          border-top-left-radius: 1rem;
          border-top-right-radius: 1rem;
        }
      }
      :last-child {
        button {
          border: none;
          border-bottom-left-radius: 1rem;
          border-bottom-right-radius: 1rem;
        }
      }
      &.conditional {
        button {
          color: #ed4956;
          font-weight: 700;
        }
      }
    }
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(MorePopup);
