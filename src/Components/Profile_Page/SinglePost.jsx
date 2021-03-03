import React from 'react';
import {Col} from 'react-bootstrap';
import styled from "styled-components";
import PostModal from './PostModal';

function SinglePost() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
        <Col md={4} style={{position: 'relative'}}>
        <Post src="http://placehold.it/50x50"  onClick={() => setModalShow(true)}/>
        <Overlay/>
        </Col>
        <PostModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        </>
    )
}
const Post = styled.img`
    width: 100%;
`;

const Overlay = styled.div`
    width: 100%;
    position: absolute;
    top:0;
    bottom:0;
    right:0;
    left:0;
    z-index: 221;
    background-color:red;
    display: none;
`;
export default SinglePost
