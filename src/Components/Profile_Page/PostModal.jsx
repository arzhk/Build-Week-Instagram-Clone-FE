import React from 'react';
import {Modal, Button, Container, Row, Col} from 'react-bootstrap';
import styled from "styled-components";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

function PostModal(props) {
    return (
        <Modal
        {...props}
        size="lg"
        className="p-0 m-0"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
      <div className="p-0 m-0" >
      <Container fluid>
          <Row>
              <Col md={8} style={{backgroundColor:"red"}} className="p-0 m-0"><Post src="https://www.itl.cat/pngfile/big/46-461695_full-pinterest-beautiful-wallpapers-hd-nice-wallpapers-for.jpg"/></Col>
              <Col md={4}>
                  <Container className="d-flex align-items-center mt-3" fluid>
                      <Row className="d-flex align-items-center w-100">
                          <Col md={2} className="d-flex justify-content-start text-left align-items-start p-0 m-0">
                      <ProfilePic src="http://placehold.it/50x50"/>
                          </Col>
                          <Col md={8} className="d-flex justify-content-start text-left align-items-start p-0 m-0">
                      <ProfileName className="m-0 p-0 pl-3">simonacossai</ProfileName>
                          </Col>
                          <Col md={2} className="d-flex justify-content-end text-right align-items-end p-0 m-0"><MoreHorizIcon/></Col>
                      </Row>
                  </Container>
                  <hr></hr>
                  <Container className="d-flex align-items-center mt-3" fluid>
                      <Row className="d-flex w-100">
                          <Col md={2} className="d-flex justify-content-start text-left align-items-start p-0 m-0">
                      <ProfilePic src="http://placehold.it/50x50"/>
                          </Col>
                          <Col md={10} className="d-flex justify-content-start text-left align-items-start pl-3 m-0" style={{flexDirection:'column'}}>
                      <ProfileName className="m-0 p-0">simonacossai</ProfileName>             
                           <PostDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</PostDescription>
                           </Col>
                      </Row>
                  </Container>
              </Col>
          </Row>
      </Container>
        </div>
      </Modal>
    )
}

const Post = styled.img`
    width: 100%;
    height: 550px;
`;

const ProfilePic = styled.img`  
    border-radius:100%;
    width: 35px;
`;

const ProfileName = styled.span`  
    font-size:14px;
    font-weight:500;
`;
const PostDescription = styled.p`
    word-wrap: break-word;
    max-width: 100%;
    font-size: 13px;
    max-height:350px;
    overflow-y: scroll;
    -ms-overflow-style: none; 
    scrollbar-width: none;  
    ::-webkit-scrollbar {
    display: none;
}
`;


export default PostModal;
