import React, { useState } from "react";
import { connect } from "react-redux";
import { theme } from "../../Assets/theme";
import styled from "styled-components";
import ImageUploader from "react-images-upload";
import CheckIcon from "@material-ui/icons/Check";
import Spinner from "../Loaders/Spinner";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const CreatePostPanel = (props) => {
  const [newPostImage, setNewPostImage] = useState({});
  const [locationInput, setLocationInput] = useState("");
  const [captionInput, setCaptionInput] = useState("");
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isPostUploading, setIsPostUploading] = useState(false);

  const uploadPictureHandler = async () => {
    try {
      console.log(newPostImage);
      setIsPostUploading(true);
      let formData = new FormData();
      let blob = new Blob([newPostImage.picture[0]], { type: "img/jpeg" });
      formData.append("image", blob);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/picture`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.path) {
        createNewPost(data.path);
      }
    } catch (er) {
      console.log(er);
    }
  };

  const createNewPost = async (imagePath) => {
    try {
      const newPost = {
        username: props.user.username,
        user: props.user._id,
        image: imagePath,
        location: locationInput,
        text: captionInput,
      };

      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      if (data._id) {
        setTimeout(() => {
          resetHandler();
          setIsPostUploading(false);
          props.fetchPosts();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const newPostImageUploadHandler = (picture) => {
    setNewPostImage({ picture });
    setIsImageSelected(true);
  };

  const resetHandler = () => {
    setNewPostImage();
    setIsImageSelected(false);
    props.toggleNewPostPanel();
  };

  return (
    <>
      <CreatePostPanelContainer right={props.panelRight}>
        {isPostUploading ? <h2>Uploading</h2> : <h2>New Post</h2>}

        {isPostUploading ? (
          <div className="loading-spinner">
            <Spinner />
          </div>
        ) : (
          <>
            <p>Share a moment</p>
            <ImageUploader
              withIcon={false}
              buttonText="Select Image"
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
              singleImage={true}
              withPreview={true}
              withLabel={false}
              onChange={newPostImageUploadHandler}
            />
            <h5>Where?</h5>
            <input
              type="text"
              placeholder="Location..."
              value={locationInput}
              onChange={(event) => setLocationInput(event.target.value)}
            />
            <h5>Add a caption</h5>
            <textarea
              placeholder="Caption..."
              value={captionInput}
              onChange={(event) => setCaptionInput(event.target.value)}
            />
            <div className="button-row">
              <button disabled={!isImageSelected} onClick={uploadPictureHandler}>
                <CheckIcon />
                Submit
              </button>
              <button className="cancel-button" onClick={resetHandler}>
                Cancel
              </button>
            </div>
          </>
        )}
      </CreatePostPanelContainer>
      {props.panelRight !== -400 && <FullPageDimmer onClick={resetHandler} />}
    </>
  );
};

const CreatePostPanelContainer = styled.div`
  position: fixed;
  ${({ right }) => `right: ${right}px`};
  top: 0;
  bottom: 0;
  width: 400px;
  background-color: white;
  box-shadow: -3px 0px 20px -1px rgba(0, 0, 0, 0.05);
  padding: 100px 30px;
  transition: right 0.25s ease-in-out;
  z-index: 11;
  overflow: hidden;
  .loading-spinner {
    padding: 16px;
    transform: scale(2);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50%;
    width: 100%;
  }
  h2 {
    font-weight: 700;
    color: ${theme.main.darkgrey};
    margin: 0;
  }
  p {
    color: ${theme.a.light};
  }
  h5 {
    font-weight: 700;
    margin-top: 20px;
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

  .button-row {
    display: flex;

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
`;

const FullPageDimmer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostPanel);
