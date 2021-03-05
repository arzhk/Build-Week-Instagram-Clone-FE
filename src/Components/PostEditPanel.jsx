import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { theme } from "../Assets/theme";
import styled, { keyframes } from "styled-components";
import CheckIcon from "@material-ui/icons/Check";
import Spinner from "./Loaders/Spinner";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setUser: (data) => dispatch({ type: "UPDATE_USER_INFO", payload: data }),
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const PostEditPanel = (props) => {
  const [loading, setLoading] = useState(false);
  const [locationInput, setLocationInput] = useState(props.post.location);
  const [textInput, setTextInput] = useState(props.post.text);
  const [enableSubmit, setEnableSubmit] = useState(false);

  const updatePostDetails = async (imagepath) => {
    try {
      setLoading(true);
      const updatedInfo = {
        location: locationInput,
        text: textInput,
      };

      const response = await fetch(`http://localhost:5555/api/posts/${props.post._id}`, {
        method: "PUT",
        body: JSON.stringify(updatedInfo),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (data._id) {
        setTimeout(() => {
          resetHandler();
          props.fetchPosts();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [props.post.text, props.post.location]);

  const submitUpdatedInfoHandler = async () => {
    updatePostDetails();
  };

  const locationInputHandler = (event) => {
    setLocationInput(event.target.value);
  };

  const textInputHandler = (event) => {
    setTextInput(event.target.value);
  };

  const resetHandler = () => {
    setLocationInput(props.post.location);
    setTextInput(props.post.text);
    setEnableSubmit(false);
    props.toggleEditPanel();
  };

  useEffect(() => {
    if (locationInput !== props.post.location || textInput !== props.post.text) {
      setEnableSubmit(true);
    } else {
      setEnableSubmit(false);
    }
  }, [locationInput, textInput]);

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
            <h5>Location</h5>
            <input type="text" placeholder="Location..." value={locationInput} onChange={locationInputHandler} />
            <h5>Text</h5>
            <textarea type="text" placeholder="Text..." value={textInput} onChange={textInputHandler}></textarea>
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
  position: fixed;
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

export default connect(mapStateToProps, mapDispatchToProps)(PostEditPanel);
