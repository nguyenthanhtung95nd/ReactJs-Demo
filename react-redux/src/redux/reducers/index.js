import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";

// Remember: When you create a new reducer, you need to reference it here in your root reducer.
const rootReducer = combineReducers({
  courses,
  authors,
  apiCallsInProgress
});

export default rootReducer;