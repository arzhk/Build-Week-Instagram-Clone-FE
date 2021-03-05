import React from "react";
import { connect } from "react-redux";
import { theme } from "../../Assets/theme";
import styled from "styled-components";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

function Profile(props) {
  return (
    <ProfileMainContainer>
      <div>
        <div className="profile-picture">
          <img src={props.user.image} alt="user-profile" />
        </div>
        <div>
          <Link to="/profile">{props.user.username.toLowerCase()}</Link>
          <p>{props.user.name}</p>
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
    .profile-picture {
      margin-right: 12px;
      height: 56px;
      width: 56px;
      border-radius: 50%;
      background-color: ${theme.main.grey};
      overflow: hidden;
      img {
        height: 56px;
        width: 56px;
      }
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
