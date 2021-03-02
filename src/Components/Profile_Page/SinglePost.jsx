import React from 'react';
import {Col} from 'react-bootstrap';
import styled from "styled-components";

function SinglePost() {
    return (
        <Col md={4}>
        <Post src="http://placehold.it/50x50"  />
        </Col>
    )
}
const Post = styled.img`
    width: 100%;
`;

export default SinglePost
