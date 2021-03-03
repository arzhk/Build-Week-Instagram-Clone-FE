import React from "react";
import { theme } from "../../Assets/theme";
import styled from "styled-components";
import { Link } from "react-router-dom";

const suggestions = ["1", "2", "3", "4", "5"];

function Suggestions() {
  return (
    <SuggestionsMainContainer>
      <TitleContainer>
        <p>Suggestions For You</p>
        <Link to="#">See All</Link>
      </TitleContainer>
      <Content>
        {suggestions.map((suggestion) => (
          <Profile>
            <div className="profile-icon"></div>
            <div>
              <div className="user-info">
                <Link to="#">Username</Link>
                <p>Suggested for you</p>
              </div>
              <Link to="#">Follow</Link>
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
    margin-right: 8px;
    min-height: 32px;
    min-width: 32px;
    background-color: blue;
    border-radius: 50%;

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

export default Suggestions;
