import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { theme } from "../../Assets/theme";
import styled, { keyframes } from "styled-components";
import { authorise } from "../../Auth";
import CheckIcon from "@material-ui/icons/Check";
import ImageUploader from "react-images-upload";
import Spinner from "../Loaders/Spinner";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setUser: (data) => dispatch({ type: "UPDATE_USER_INFO", payload: data }),
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const EditPanel = (props) => {
  const [newProfilePicture, setProfilePicture] = useState({});
  const [loading, setLoading] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [usernameInput, setUsernameInput] = useState(props.user.username);
  const [enableSubmit, setEnableSubmit] = useState(false);

  const uploadPictureHandler = async () => {
    try {
      setLoading(true);
      let formData = new FormData();
      let blob = new Blob([newProfilePicture.picture[0]], { type: "img/jpeg" });
      formData.append("image", blob);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/picture`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.path) {
        return data.path;
      }
    } catch (er) {
      console.log(er);
    }
  };

  const updateUserProfile = async (imagepath) => {
    try {
      setLoading(true);
      const updatedInfo = {
        username: usernameInput,
        image: imagepath || props.user.image,
      };

      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/updateInfo`, {
        method: "PUT",
        body: JSON.stringify(updatedInfo),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (data._id) {
        resetHandler();
        authorise(props.setUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [props.user.image, props.user.username]);

  const newProfileImageUploadHandler = (picture) => {
    setProfilePicture({ picture });
    setIsImageSelected(true);
  };

  const submitUpdatedInfoHandler = async () => {
    if (isImageSelected) {
      const path = await uploadPictureHandler();
      updateUserProfile(path);
    } else {
      updateUserProfile(props.user.image);
    }
  };

  const usernameInputHandler = (event) => {
    setUsernameInput(event.target.value);
    if (event.target.value.length > 0 && event.target.value.startsWith(" ")) {
    }
  };

  const resetHandler = () => {
    setProfilePicture({});
    setIsImageSelected(false);
    setUsernameInput(props.user.username);
    props.showEditPanelHandler();
  };

  useEffect(() => {
    if (isImageSelected || usernameInput !== props.user.username) {
      setEnableSubmit(true);
    } else {
      setEnableSubmit(false);
    }
  }, [usernameInput, isImageSelected]);

  return (
    <>
      <EditPanelContainer>
        {loading ? (
          <>
            <h5>Updating...</h5>
            <div className="loading-spinner">
              <Spinner />
            </div>
          </>
        ) : (
          <>
            <h5>Username</h5>
            <input type="text" placeholder="Username..." value={usernameInput} onChange={usernameInputHandler} />
            <h5>Profile Picture</h5>
            <ImageUploader
              withIcon={false}
              buttonText="Select Image"
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
              singleImage={true}
              withPreview={true}
              withLabel={false}
              onChange={newProfileImageUploadHandler}
            />
            <div className="button-row">
              <button disabled={!enableSubmit} onClick={submitUpdatedInfoHandler}>
                <CheckIcon />
                Submit
              </button>
              <button className="cancel-button" onClick={resetHandler}>
                Cancel
              </button>
            </div>
          </>
        )}
      </EditPanelContainer>
      <FullPageWrap onClick={!loading && resetHandler} />
    </>
  );
};

const slideInFwdCenter = keyframes`
    0% { opacity: 0; transform: scale(1.5); }
    15% { opacity: 1; transform: scale(1); }
    100% { opacity: 1; transform: scale(1); }
`;

const FullPageWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const EditPanelContainer = styled.div`
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0px 0px 10px -1px rgba(0, 0, 0, 0.05);
  width: 400px;
  text-align: left;
  animation: ${slideInFwdCenter} 2s ease;
  padding: 0 20px 20px;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 999;
  margin: 0 auto;

  .loading-spinner {
    padding: 16px;
    margin: 30px 0;
    transform: scale(1.5);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50%;
    width: 100%;
  }
  h5 {
    font-weight: 700;
    margin: 20px 0 10px;
    color: ${theme.main.darkgrey};
  }
  input {
    width: 100%;
    border: 1px solid ${theme.main.grey};
    background-color: white;
    color: ${theme.main.darkgrey};
    padding: 10px;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 10px;
    :focus {
      outline: none;
    }
  }
  textarea {
    width: 100%;
    min-height: 200px;
    border: 1px solid ${theme.main.grey};
    background-color: white;
    color: ${theme.main.darkgrey};
    padding: 10px;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 10px;
    :focus {
      outline: none;
    }
  }
  .fileUploader {
    .fileContainer {
      box-shadow: none;
      padding: 0;
      margin: 0;
      align-items: flex-start;

      button {
        font-size: 14px;
        font-weight: 600;
        background: linear-gradient(45deg, #df853d, #ee428f);
        padding: 10px 20px;
        width: 50%;
        margin: 0;
      }

      .uploadPicturesWrapper {
        align-items: flex-start;
        justify-content: flex-start;
        div {
          justify-content: flex-start !important;
          align-items: flex-start !important;
        }
        .uploadPictureContainer {
          justify-content: flex-start;
          align-items: flex-start;
          border: none;
          background-color: ${theme.main.grey};
          border-radius: 0.5rem;
          width: 100%;
          margin: 10px 0;
          .deleteImage {
            /*             background: linear-gradient(45deg, #df853d, #ee428f);
            width: 40px;
            height: 40px;
            line-height: 40px; */
            display: none;
          }
        }
      }
    }
  }

  .button-row {
    display: flex;
    margin-top: 50px;

    button {
      font-size: 14px;
      font-weight: 600;
      background: linear-gradient(45deg, #df853d, #ee428f);
      padding: 8px 20px;
      width: 50%;
      border-radius: 25rem;
      border: none;
      color: white;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      :disabled {
        opacity: 0.5;
      }
      svg {
        margin-right: 6px;
      }
    }
  }
  .cancel-button {
    background: ${theme.main.darkgrey} !important;
    width: 30% !important;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(EditPanel);
