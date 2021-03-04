export default function (state = {}, action) {
  switch (action.type) {
    case "UPDATE_USER_INFO":
      return {
        ...state,
        ...action.payload,
      };
    case "CLEAR_USER_INFO":
      return {
        ...state,
        name: "",
        surname: "",
        username: "",
        img: "",
        searchHistory: [],
        following: [],
        followers: [],
      };
    default:
      return state;
  }
}
