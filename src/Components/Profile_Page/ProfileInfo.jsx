import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "../../Assets/theme";
import { Container, Row, Col } from 'react-bootstrap';
import SettingsIcon from '@material-ui/icons/Settings';

function ProfileInfo() {
    const [data, setData] = useState([])

    return (
        <Container className="mt-5 pt-5">
            <Row className="">
                <Col md={4} className="d-flex justify-content-center align-items-start text-center">
                    <ProfilePic src={data.image ?? "https://scontent-mxp1-1.cdninstagram.com/v/t51.2885-19/s320x320/121000984_358942041879580_3222714557187018436_n.jpg?tp=1&_nc_ht=scontent-mxp1-1.cdninstagram.com&_nc_ohc=FM-p-Sqxf0IAX-g6QuJ&oh=9acfd8167113e47abca584dbd130534c&oe=60681570"} />
                </Col>
                <Col md={8} >
                    <div className="d-flex align-items-center text-left justify-content-left">
                        <ProfileNickname>Simona Cossai</ProfileNickname>
                        <ModifyProfileButton className="mx-3">Edit Profile</ModifyProfileButton>
                        <SettingsIcon />
                    </div>
                    <div className="d-flex align-items-center text-left mt-2">
                        <div className="d-flex"><strong className="mr-1">12 </strong>posts</div>
                        <div className="d-flex mx-4"><strong className="mr-1">5</strong> {" "} follower</div>
                        <div className="d-flex"><strong className="mr-1">750</strong>{" "}following</div>
                    </div>
                    <div className="align-items-center text-left mt-3">
                        <ProfileUsername>cossaisimona</ProfileUsername>
                        <ProfileType>Blog personale</ProfileType>
                        <ProfileDescription>🌱 Lorem ipsum dolor sit amet balballlalblabla<br></br> 
                        📝 Lorem ipsum blablabal<br></br> 
                        ❔ Lorem ipsum blablabalblbala </ProfileDescription>       
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
const ProfilePic = styled.img`
    width: 160px;
    border-radius:100%;
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
    color: ${theme.main.mediumgrey}
`;

const ProfileDescription = styled.p`
    font-size: 1em;
    font-weight: 400;
`;

const ModifyProfileButton = styled.button`
    font-size: 0.8em;
    font-weight: 600;
    background-color: transparent;
    border-radius:6px;
    border: 1px solid ${theme.main.grey};
    padding:4px 12px;
`;

export default ProfileInfo
