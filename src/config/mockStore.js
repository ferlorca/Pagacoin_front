
import { initialState as auth } from "../store/reducers/auth_reducer";
import { initialState as log } from "../store/reducers/log_reducer";
import { initialState as notification } from "../store/reducers/notifications_reducer";
import { initialState as transaction } from "../store/reducers/transaction_reducer";
import { initialState as user } from "../store/reducers/user_reducer";
import { initialState as wallet } from "../store/reducers/wallet_reducer";


const store = {
    auth ,
    log ,
    notification ,
    transaction ,
    user ,
    wallet
}

export default store;