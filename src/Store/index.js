import { createStore, combineReducers, compose } from "redux";
import searchReducer from "../Reducers/search";
import errorsReducer from "../Reducers/errors";
import userReducer from "../Reducers/user";
import appReducer from "../Reducers/app";

const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  user: {
    name: "",
    surname: "",
    username: "",
    img: "",
    searchHistory: [],
    following: [],
    followers: [],
  },
  search: {
    searchResults: [],
    selectedLocation: [],
  },
  app: {
    isLoading: false,
    isSignedIn: false,
  },
  errors: {
    show: false,
    errors: [],
  },
};

const reducerMerge = combineReducers({
  user: userReducer,
  search: searchReducer,
  errors: errorsReducer,
  app: appReducer,
});

export default function configureStore() {
  return createStore(
    reducerMerge,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
