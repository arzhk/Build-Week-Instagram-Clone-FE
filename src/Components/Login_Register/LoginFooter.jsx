import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "../../Assets/theme";

const footerLinks = [
  "About",
  "Blog",
  "Jobs",
  "Help",
  "API",
  "Privacy",
  "Terms",
  "Top Accounts",
  "Hashtags",
  "Locations",
];

const languages = ["English", "English(UK)", "Francais", "Espanol", "Deutsch", "Italiano", "Nederlands", "Polski"];

function LoginFooter() {
  return (
    <LoginFooterContainer>
      <ul>
        {footerLinks.map((link) => (
          <Link>
            <li>{link}</li>
          </Link>
        ))}
      </ul>
      <div>
        <select>
          {languages.map((language) => (
            <option>{language}</option>
          ))}
        </select>
        <small>© 2021 Instagram from Facebook</small>
      </div>
    </LoginFooterContainer>
  );
}

const LoginFooterContainer = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > ul {
    display: flex;
    list-style: none;
  }
  > ul > a {
    margin: 0 10px;
    font-size: 12px;
    color: ${theme.a.light};
    text-decoration: none;
  }
  > div {
    display: flex;
  }
  > div > select {
    background-color: transparent;
    border: none;
    color: ${theme.a.light};
    font-size: 13.33px;
    margin: 0 10px;
  }
  > div > select:focus {
    outline: none;
  }
  > div > small {
    margin: 0 10px;
    color: ${theme.a.light};
  }
`;

export default LoginFooter;
