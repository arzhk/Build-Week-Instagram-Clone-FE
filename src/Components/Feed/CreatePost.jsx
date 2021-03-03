import React from "react";
import { theme } from "../../Assets/theme";
import styled from "styled-components";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

function CreatePost(props) {
  return (
    <CreatePostButton>
      <button onClick={props.toggleNewPostPanel}>
        <AddAPhotoIcon className="mr-2" /> Create New Post
      </button>
    </CreatePostButton>
  );
}

const CreatePostButton = styled.div`
  button {
    border: none;
    border-radius: 25rem;
    padding: 10px 30px;
    color: white;
    font-weight: 600;
    font-size: 14px;
    background: linear-gradient(45deg, #f58529, #dd2a7b);
    display: flex;
    align-items: center;
    box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.25);
  }
`;

export default CreatePost;
