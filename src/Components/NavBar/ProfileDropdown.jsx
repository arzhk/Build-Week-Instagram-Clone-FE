import React from "react";
import { connect } from "react-redux";
import { theme } from "../../Assets/theme";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { ProfileIcon, SavedIcon, SettingsIcon, SwitchAccountIcon } from "../../Assets/NavIcons";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const ProfileDropdown = (props) => {
  return (
    <ProfileDropdownMainContainer className={props.hide ? "hide" : ""}>
      <ul>
        <li>
          <Link to="/">{ProfileIcon()}Profile</Link>
        </li>
        <li>
          <Link to="/">{SavedIcon()}Saved</Link>
        </li>
        <li>
          <Link to="/">{SettingsIcon()}Settings</Link>
        </li>
        <li>
          <Link to="/">{SwitchAccountIcon()}Switch Accounts</Link>
        </li>
        <li>
          <a href="http://localhost:5555/api/users/logout">Log Out</a>
        </li>
      </ul>
    </ProfileDropdownMainContainer>
  );
};

const slideOutTop = keyframes`
0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
100% {
    -webkit-transform: translateY(-20px);
    transform: translateY(-20px);
    opacity: 0;
  }`;

const ProfileDropdownMainContainer = styled.div`
  height: 194px;
  min-width: 230px;
  text-align: center;
  position: absolute;
  z-index: 9999;
  background-color: white;
  top: 38px;
  right: 0;
  box-shadow: rgba(0, 0, 0, 0.098) 0px 0px 5px 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  text-align: left;

  &.hide {
    animation: ${slideOutTop} 0.15s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  }

  > ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;

    li {
      width: 100%;
      padding: 8px 16px;

      a {
        display: block;
        color: ${theme.a.dark};
        font-size: 14px;
        display: flex;
        align-items: center;
      }
      svg {
        margin-right: 10px;
      }

      :hover {
        background-color: rgba(0, 0, 0, 0.03);
      }
      :last-of-type {
        border-top: 1px solid ${theme.main.grey};
      }
    }
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDropdown);
