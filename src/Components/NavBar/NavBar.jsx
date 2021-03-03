import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { theme } from "../../Assets/theme";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
import Logo from "../../Assets/logo.png";
import SpriteSheet from "../../Assets/spritesheet.png";
import {
  HomeIcon,
  HomeIconFilled,
  MessagesIcon,
  MessagesIconFilled,
  CompassIcon,
  CompassIconFilled,
  HeartIcon,
  HeartIconFilled,
} from "../../Assets/NavIcons/index";
import Activity from "./Activity";
import ProfileDropdown from "./ProfileDropdown";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const navLinks = [
  { link: "/", icon: HomeIcon, iconFilled: HomeIconFilled },
  { link: "/direct/inbox", icon: MessagesIcon, iconFilled: MessagesIconFilled },
  { link: "/explore", icon: CompassIcon, iconFilled: CompassIconFilled },
  { icon: HeartIcon, iconFilled: HeartIconFilled },
];

const NavBar = (props) => {
  const [showActivity, setShowActivity] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [animatePanel, setAnimatePanel] = useState(false);
  const [currentPage, setCurrentPage] = useState(props.location.pathname);
  const [searchInput, setSearchInput] = useState("");

  const toggleActivityHandler = () => {
    if (showActivity) {
      setAnimatePanel(true);
      setTimeout(() => {
        setCurrentPage(props.location.pathname);
        setShowActivity(false);
        setAnimatePanel(false);
      }, 200);
    } else {
      setCurrentPage(undefined);
      setShowActivity(true);
    }
  };

  const toggleProfileDropdownHandler = () => {
    if (showProfileDropdown) {
      setAnimatePanel(true);
      setTimeout(() => {
        setCurrentPage(props.location.pathname);
        setShowProfileDropdown(false);
        setAnimatePanel(false);
      }, 200);
    } else {
      setCurrentPage(undefined);
      setShowProfileDropdown(true);
    }
  };

  const clearInput = async () => {
    await setSearchInput("");
  };

  const searchInputHandler = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    setCurrentPage(props.location.pathname);
  }, [props.location.pathname]);

  return (
    <NavBarMainWrapper>
      <NavBarMainContainer>
        <Left>
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </Left>
        <Middle>
          <input type="text" placeholder="Search" value={searchInput} onChange={searchInputHandler} />
          <SearchIcon searchInput={searchInput} />
          <button onClick={() => clearInput()}>
            <CloseIcon />
          </button>
        </Middle>
        <Right>
          <ul>
            {navLinks.map((link) => (
              <li>
                {link.link ? (
                  <Link to={`${link.link}`}>{currentPage === link.link ? link.iconFilled() : link.icon()}</Link>
                ) : (
                  <span onClick={toggleActivityHandler}>{showActivity ? link.iconFilled() : link.icon()}</span>
                )}
              </li>
            ))}
            <li onClick={toggleProfileDropdownHandler}></li>
          </ul>
          {showActivity && <Activity hide={animatePanel} />}
          {showProfileDropdown && <ProfileDropdown hide={animatePanel} />}
        </Right>
        {showActivity && <FullWrap onClick={toggleActivityHandler}></FullWrap>}
        {showProfileDropdown && <FullWrap onClick={toggleProfileDropdownHandler}></FullWrap>}
      </NavBarMainContainer>
    </NavBarMainWrapper>
  );
};

const NavBarMainWrapper = styled.div`
  width: 100%;
  height: 54px;
  border-bottom: 1px solid ${theme.main.grey};
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 10;
`;

const NavBarMainContainer = styled.div`
  max-width: 975px;
  padding: 0 20px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  width: 360px;
  transition: width 0.25s ease;
  @media (max-width: 975px) {
    width: 139px;
  }
  > a > img {
    height: 29px;
    margin-top: 7px;
  }
`;

const SearchIcon = styled.div`
  background-repeat: no-repeat;
  background-position: -399px -321px;
  height: 10px;
  width: 10px;
  left: 78px;
  position: absolute;
  top: 9px;
  z-index: 2;
  background-image: url(${SpriteSheet});
  ${({ searchInput }) => searchInput.length !== 0 && `left: 11px`}
`;

const CloseIcon = styled.div`
  background-position: -318px -333px;
  height: 20px;
  width: 20px;
  z-index: 3;
  background-image: url(${SpriteSheet});
  opacity: 0;
`;

const Middle = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  > button {
    position: absolute;
    right: 3px;
    top: 3px;
    z-index: 99;
    border: none;
    background-color: transparent;
    cursor: default;
  }
  > input {
    width: 215px;
    height: 28px;
    border: 1px solid ${theme.main.grey};
    border-radius: 3px;
    background-color: ${theme.main.secondarywhite};
    padding: 3px 10px 3px 26px;
    color: ${theme.main.darkgrey};
    font-size: 14px;

    ::placeholder {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.35);
      text-align: center;
    }
    :focus {
      outline: none;
    }
    :focus ~ button > ${CloseIcon} {
      opacity: 1;
      cursor: pointer;
    }
    :focus ~ ${SearchIcon} {
      left: 11px;
    }
    :focus::placeholder {
      text-align: left;
    }
  }
`;

const Right = styled.div`
  width: 360px;
  transition: width 0.25s ease;
  position: relative;
  @media (max-width: 975px) {
    width: 222px;
  }
  > ul {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin: 0 10px;
    }

    li:last-of-type {
      height: 22px;
      width: 22px;
      background-color: blue;
      border-radius: 50%;
      cursor: pointer;
    }
  }
  span {
    cursor: pointer;
  }
`;

const FullWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 100vh;
  width: 100%;
`;

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
