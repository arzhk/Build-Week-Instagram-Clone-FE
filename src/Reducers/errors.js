export default function (state = {}, action) {
  switch (action.type) {
    case "SET_ERROR":
      return {
        ...state,
        errors: action.payload,
      };
    case "DISPLAY_ERRORS":
      return {
        ...state,
        show: action.payload,
      };
    default:
      return state;
  }
}
