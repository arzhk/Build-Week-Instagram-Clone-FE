import React, { useState, useEffect } from "react";
import { theme } from "../../Assets/theme";
import ProfileInfo from "./ProfileInfo";
import ProfilePosts from "./ProfilePosts";
import styled from "styled-components";

export default function ProfilePage() {
    return (
       <Container fluid>
               <ProfileInfo/>
               <ProfilePosts/>
       </Container>
    )
}



const Container = styled.div`  
    overflow-y: scroll;
    max-height:100vh;
`;