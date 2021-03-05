import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { theme } from "../../Assets/theme";
import styled from "styled-components";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setUser: (data) => dispatch({ type: "UPDATE_USER_INFO", payload: data }),
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

function Suggestions(props) {
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async () => {
    try {
      const response = await fetch("http://localhost:5555/api/users/suggestions", { credentials: "include" });
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.log(error);
    }
  };

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
    fetchSuggestions();
  }, []);

  return (
    <SuggestionsMainContainer>
      <TitleContainer>
        <p>Suggestions For You</p>
        <Link to="#">See All</Link>
      </TitleContainer>
      <Content>
        {suggestions.map((suggestion, index) => (
          <Profile key={index}>
            <div className="profile-icon">
              <img src={suggestion.image} alt="user" />
            </div>
            <div>
              <div className="user-info">
                <Link to="#">{suggestion.username.toLowerCase()}</Link>
                <p>Suggested for you</p>
              </div>
              {props.user.following.findIndex(
                (followedUser) => followedUser.toString() === suggestion._id.toString()
              ) === -1 ? (
                <button onClick={() => followHandler(suggestion._id)}>Follow</button>
              ) : (
                <button onClick={() => followHandler(suggestion._id)}>Unfollow</button>
              )}
            </div>
          </Profile>
        ))}
      </Content>
    </SuggestionsMainContainer>
  );
}

const SuggestionsMainContainer = styled.div`
  margin-top: 16px;
  padding: 4px 0px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  padding-right: 3px;
  > p {
    font-size: 14px;
    color: ${theme.a.light};
    margin: 0;
    ~ a {
      font-size: 12px;
      color: ${theme.main.darkgrey};
    }
  }
`;

const Content = styled.div``;

const Profile = styled.div`
  padding: 8px 3px 8px 0px;
  display: flex;
  align-items: center;

  .profile-icon {
    margin-right: 12px;
    min-height: 32px;
    min-width: 32px;
    background-color: ${theme.main.grey};
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    > img {
      width: 32px;
      height: 32px;
    }

    ~ div {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .user-info {
        display: flex;
        flex-direction: column;
        p {
          font-size: 12px;
          color: ${theme.a.light};
        }
        a {
          font-size: 14px;
          color: ${theme.main.darkgrey};
          :hover {
            text-decoration: underline;
          }
        }
      }
      p {
        margin: 0;
      }
      button {
        background-color: transparent;
        border: none;
        color: ${theme.main.lightblue};
        font-weight: 600;
        font-size: 12px;
        padding: 0;
      }
    }
  }
  a {
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    color: ${theme.main.lightblue};
    color: rgb(0, 149, 246);
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions);
