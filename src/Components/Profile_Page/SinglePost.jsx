import React from 'react';
import {Col} from 'react-bootstrap';
import styled from "styled-components";

function SinglePost() {

    return (
        <>
        <Col md={4} style={{position: 'relative'}}>
        <Post src="http://placehold.it/50x50"  />
        <Overlay/>
        </Col>
       
        </>
    )
}
const Post = styled.img`
    width: 100%;
    margin-top:25px;
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
