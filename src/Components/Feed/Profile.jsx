import React from "react";
import { theme } from "../../Assets/theme";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <ProfileMainContainer>
      <div>
        <div style={{ height: 56, width: 56, backgroundColor: "blue", borderRadius: "50%" }}></div>
        <div>
          <Link to="#">Username</Link>
          <p>Name</p>
        </div>
      </div>
      <Link to="#">Switch</Link>
    </ProfileMainContainer>
  );
}

const ProfileMainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  margin-bottom: 10px;
  margin-right: 4px;
  > div {
    display: flex;
    align-items: center;
    font-size: 14px;
    > div {
      margin-right: 12px;
      ~ div {
        margin-left: 8px;
      }
    }

    a {
      color: ${theme.main.darkgrey};
      font-weight: 600;
    }
    p {
      margin: 0;
      color: ${theme.a.light};
      font-weight: 400;
    }
  }
  a:last-child {
    color: ${theme.main.lightblue};
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    margin: -2px 0 -3px;
  }
`;

export default Profile;
