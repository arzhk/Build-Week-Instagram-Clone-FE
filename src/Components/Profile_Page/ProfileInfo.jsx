import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../Assets/theme";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { SettingsIcon } from "../../Assets/NavIcons";
import EditPanel from "./EditPanel";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setSearchResults: (searchResults) => dispatch({ type: "STORE_SEARCH_RESULTS", payload: searchResults }),
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

function ProfileInfo(props) {
  const [showEditPanel, setShowEditPanel] = useState(false);

  const showEditPanelHandler = () => {
    setShowEditPanel(!showEditPanel);
  };

  return (
    <>
      <Container className="mt-5 pt-5">
        <Row className="">
          <Col md={4} className="d-flex justify-content-center align-items-start text-center">
            <ProfilePic src={props.user.image} />
          </Col>
          <Col md={8}>
            <div className="d-flex align-items-center text-left justify-content-left">
              <ProfileNickname>{props.user.username}</ProfileNickname>
              <ModifyProfileButton className="mx-3" onClick={showEditPanelHandler}>
                Edit Profile
              </ModifyProfileButton>
              <SettingsIconDiv>
                <SettingsIcon />
              </SettingsIconDiv>
            </div>
            <div className="d-flex align-items-center text-left mt-2">
              <div className="d-flex">
                <strong className="mr-1">{props.myPosts.length}</strong>post
                {props.myPosts.length > 1 || (props.myPosts.length === 0 && "s")}
              </div>
              <div className="d-flex mx-4">
                <strong className="mr-1">{props.user.followers.length}</strong> followers
              </div>
              <div className="d-flex">
                <strong className="mr-1">{props.user.following.length}</strong> following
              </div>
            </div>
            <div className="align-items-center text-left mt-3">
              <ProfileUsername>{props.user.name + " " + props.user.surname}</ProfileUsername>
              <ProfileType>Personal blog</ProfileType>
              <ProfileDescription>
                🌱 Lorem ipsum dolor sit amet balballlalblabla<br></br>
                📝 Lorem ipsum blablabal<br></br>❔ Lorem ipsum blablabalblbala{" "}
              </ProfileDescription>
            </div>
          </Col>
        </Row>
      </Container>
      {showEditPanel && <EditPanel showEditPanelHandler={showEditPanelHandler} />}
    </>
  );
}
const ProfilePic = styled.img`
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 100%;
  background-color: ${theme.main.grey};
`;

const ProfileNickname = styled.h1`
  font-size: 1.7em;
  font-weight: 300;
`;
const ProfileUsername = styled.h2`
  font-size: 1em;
  font-weight: 500;
`;

const ProfileType = styled.h2`
  font-size: 1em;
  font-weight: 400;
  color: ${theme.main.mediumgrey};
`;

const ProfileDescription = styled.p`
  font-size: 1em;
  font-weight: 400;
`;

const ModifyProfileButton = styled.button`
  font-size: 0.8em;
  font-weight: 600;
  background-color: transparent;
  border-radius: 6px;
  border: 1px solid ${theme.main.grey};
  padding: 4px 12px;
`;

const SettingsIconDiv = styled.div`
  transform: scale(1.5);
  display: flex;
  align-items: center;
`;

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo);
