import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";

const composeEnhancers = composeWithDevTools();

const store = createStore(rootReducer, composeEnhancers); // Phải có dòng này thì dev tool trên trình duyệt mới có thể sử dụng được

export default store;
