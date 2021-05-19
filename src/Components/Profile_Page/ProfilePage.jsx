import React, { useState, useEffect } from "react";
import ProfileInfo from "./ProfileInfo";
import ProfilePosts from "./ProfilePosts";
import styled from "styled-components";

export default function ProfilePage() {
  const [myPosts, setMyPosts] = useState([]);

  const fetchMyPosts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/me`, { credentials: "include" });
      const data = await response.json();
      console.log(data);
      setMyPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  return (
    <Container fluid>
      <ProfileInfo myPosts={myPosts} />
      <ProfilePosts myPosts={myPosts} />
    </Container>
  );
}

const Container = styled.div`
  overflow-y: scroll;
  max-height: 100vh;
`;
