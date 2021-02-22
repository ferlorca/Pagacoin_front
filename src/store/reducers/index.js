import {combineReducers} from "redux";
import auth from "./auth_reducer";
import notification from "./notifications_reducer";
// import wallet from "./wallet_reducer";
// import user from "./user_reducer";


const rootReducer = combineReducers({
    auth,
    notification,
    // wallet,
    // user
});

export default rootReducer;