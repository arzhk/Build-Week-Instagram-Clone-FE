import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const links = [
  "About",
  "Help",
  "Press",
  "API",
  "Jobs",
  "Privacy",
  "Terms",
  "Locations",
  "Top Accounts",
  "Hashtags",
  "Language",
];

function Footer() {
  return (
    <FeedFooterMainContainer>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link to="#">{link}</Link>
          </li>
        ))}
      </ul>
      <p>© 2021 INSTAGRAM CLONE FROM STRIVE</p>
    </FeedFooterMainContainer>
  );
}

const FeedFooterMainContainer = styled.div`
  margin-top: 16px;
  > ul {
    list-style: none;
    padding: 0;
    margin: 0;
    margin-bottom: 16px;
    li {
      margin: 0px 5px;
      display: inline-block;
      font-size: 11px;
      font-weight: 400;
      line-height: 13px;
      text-transform: none;
      a {
        color: rgba(199, 199, 199);
      }
    }
  }
  p {
    font-size: 11px;
    color: rgba(199, 199, 199);
  }
`;
export default Footer;
