import React from "react";
import styled from "styled-components";
import GetAppStoreIMG from "../../Assets/getappstore.png";
import GetGooglePlayIMG from "../../Assets/getgoogleplay.png";

function GetAppContainer() {
  return (
    <GetApp>
      <p>Get the app.</p>
      <div>
        <img src={GetAppStoreIMG} alt="get-app-on-appstore" />
        <img src={GetGooglePlayIMG} alt="get-app-on-googleplay" />
      </div>
    </GetApp>
  );
}

const GetApp = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 14px;
  font-size: 14px;
  text-align: center;
  > div > img {
    height: 40px;
    margin: 0 5px;
  }
`;

export default GetAppContainer;
