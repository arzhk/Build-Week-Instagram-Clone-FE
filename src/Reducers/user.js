export default function (state = {}, action) {
  switch (action.type) {
    case "UPDATE_USER_INFO":
      return {
        ...state,
        ...action.payload,
      };
    case "ADD_FAVOURITE":
      return {
        ...state,
        favourites: [...state.favourites, action.payload],
      };
    case "REMOVE_FAVOURITE":
      return {
        ...state,
        favourites: state.favourites.filter((favourite) => favourite.id !== action.payload.id),
      };
    default:
      return state;
  }
}
