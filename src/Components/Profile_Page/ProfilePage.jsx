import React, { useState, useEffect } from "react";
import { theme } from "../../Assets/theme";
import ProfileInfo from "./ProfileInfo";
import ProfilePosts from "./ProfilePosts";
import {Container} from 'react-bootstrap';

export default function ProfilePage() {
    return (
       <Container fluid>
               <ProfileInfo/>
               <ProfilePosts/>
       </Container>
    )
}
