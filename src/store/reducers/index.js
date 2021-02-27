import {combineReducers} from "redux";
import auth from "./auth_reducer";
import notification from "./notifications_reducer";
import wallet from "./wallet_reducer";
import user from "./user_reducer";
import transaction from "./transaction_reducer";
import log from "./log_reducer";


const rootReducer = combineReducers({
    auth,
    notification,
    wallet,
    user,
    transaction,
    log
});

export default rootReducer;