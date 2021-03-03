import React, { useState } from "react";
import {Modal, Container, Row, Col} from 'react-bootstrap';
import styled from "styled-components";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { LikeIcon, UnlikeIcon, CommentIcon, ShareIcon, SaveIcon, EmojiIcon } from "../../Assets/PostIcons";
import { Link } from "react-router-dom";
import { theme } from "../../Assets/theme";


function PostModal(props) {
    const [isLiked, setIsLiked] = useState(false);

    const likePostToggler = () => {
      setIsLiked(!isLiked);
    };
  
  
    return (
    <Modal {...props} size="lg" className="p-0 m-0" aria-labelledby="contained-modal-title-vcenter" centered>
      <div className="p-0 m-0" >
      <Container fluid>
          <Row>
              <Col md={8} className="p-0 m-0"><Post src="https://www.itl.cat/pngfile/big/46-461695_full-pinterest-beautiful-wallpapers-hd-nice-wallpapers-for.jpg"/></Col>
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
                  <PostFooter>
                    <PostIconBar className="p-0 m-0">
                        <div className="left p-0 m-0">
                         <button className="like-button m-0 p-0" onClick={likePostToggler}>
                            {isLiked ? UnlikeIcon() : LikeIcon()}
                        </button>
                        <button>{CommentIcon()}</button>
                        <button>{ShareIcon()}</button>
                        </div>
                        <div className="right">
                          <button>{SaveIcon()}</button>
                        </div>
                    </PostIconBar>
                <PostCaption className="ml-2">
                  <Link to="#" className="number-of-likes m-0 p-0">
                    11 likes
                  </Link>
                  <p>5 HOURS AGO</p>
                </PostCaption>
                <PostComment>
                    <div className="left m-0 p-0">
                      <button>{EmojiIcon()}</button>
                     <input type="text" placeholder="Add a comment..." className="ml-2" />
                    </div>
                    <div className="right">
                      <button>Post</button>
                    </div>
                </PostComment>
                </PostFooter>
              </Col>
          </Row>
      </Container>
        </div>
      </Modal>
    )
}

const Post = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
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
const PostFooter = styled.div``;

const PostIconBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
  .like-button {
    transition: transform 0.25s ease;
    :active {
      transform: scale(1.2);
    }
  }

  button {
    border: none;
    background-color: transparent;
    height: 40px;
    width: 40px;
  }
`;

const PostCaption = styled.div`
  color: ${theme.main.darkgrey};
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
  .number-of-likes {
    color: ${theme.main.darkgrey};
    margin-bottom: 8px;
  }
  > div {
    margin-bottom: 4px;

    a {
      color: ${theme.main.darkgrey};
      margin-right: 15px;
      :hover {
        text-decoration: underline;
      }
    }
    p {
      font-weight: 400;
      a {
        color: ${theme.a.primary};
      }
    }
  }
  p {
    color: ${theme.a.light};
    font-size: 9px;
  }
`;

const PostComment = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px;
  height: 56px;
  border-top: 1px solid ${theme.main.grey};
  button {
    border: none;
    background-color: transparent;
    padding: 0;
  }
  > .left > button {
    margin-right: 0px;
  }
  > .right > button {
    color: ${theme.main.lightblue};
    font-weight: 600;
    font-size: 14px;
  }
  input {
    border: none;
    font-size: 14px;
    color: ${theme.main.darkgrey};
    :focus {
      outline: none;
    }
    ::placeholder {
      font-size: 14px;
      font-weight: 400;
      color: ${theme.a.light};
    }
  }
`;

export default PostModal;
