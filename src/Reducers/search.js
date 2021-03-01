export default function (state = {}, action) {
  switch (action.type) {
    case "STORE_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
      };
    case "SET_SELECTED_LOCATION":
      return {
        ...state,
        selectedLocation: action.payload,
      };
    default:
      return state;
  }
}
