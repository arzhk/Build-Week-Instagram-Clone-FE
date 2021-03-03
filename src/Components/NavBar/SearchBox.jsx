import React from "react";
import { connect } from "react-redux";
import { theme } from "../../Assets/theme";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const SearchBox = (props) => {
  return (
    <SearchBoxContainer>
      <SingleSearchResult>
        <div className="profile-picture"></div>
        <div className="user-info">
          <Link to="#">Username</Link>
          <p>Description</p>
        </div>
      </SingleSearchResult>
      <SingleSearchResult>
        <div className="profile-picture"></div>
        <div className="user-info">
          <Link to="#">Username</Link>
          <p>Description</p>
        </div>
      </SingleSearchResult>
      <SingleSearchResult>
        <div className="profile-picture"></div>
        <div className="user-info">
          <Link to="#">Username</Link>
          <p>Description</p>
        </div>
      </SingleSearchResult>
      <SingleSearchResult>
        <div className="profile-picture"></div>
        <div className="user-info">
          <Link to="#">Username</Link>
          <p>Description</p>
        </div>
      </SingleSearchResult>
      <SingleSearchResult>
        <div className="profile-picture"></div>
        <div className="user-info">
          <Link to="#">Username</Link>
          <p>Description</p>
        </div>
      </SingleSearchResult>
      <SingleSearchResult>
        <div className="profile-picture"></div>
        <div className="user-info">
          <Link to="#">Username</Link>
          <p>Description</p>
        </div>
      </SingleSearchResult>
      <SingleSearchResult>
        <div className="profile-picture"></div>
        <div className="user-info">
          <Link to="#">Username</Link>
          <p>Description</p>
        </div>
      </SingleSearchResult>
      <SingleSearchResult>
        <div className="profile-picture"></div>
        <div className="user-info">
          <Link to="#">Username</Link>
          <p>Description</p>
        </div>
      </SingleSearchResult>
    </SearchBoxContainer>
  );
};

const SearchBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  max-height: 375px;
  min-height: 100px;
  width: 362px;
  overflow-y: auto;
  position: absolute;
  z-index: 99;
  top: 38px;
  right: -30%;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 1px;
  border-radius: 0.3rem;
  padding: 6px 0;
`;

const SingleSearchResult = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  width: 100%;
  cursor: pointer;
  :active {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .profile-picture {
    height: 44px;
    width: 44px;
    border-radius: 50%;
    background-color: black;
    margin-right: 10px;
  }

  .user-info {
    font-size: 14px;
    line-height: 18px;
    a {
      color: ${theme.main.darkgrey};
      font-weight: 600;
    }
    p {
      margin: 0;
      color: ${theme.a.light};
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
