import * as types from '../action_types';
import config from "../../config/config";
import { handleError } from "./common_action";
import { reset as walletReset } from "./wallet_action";
import { reset as TransactionReset} from "./transaction_action";

const axios = config.AXIOS;
const route = "/user";

export const getUser = (id) => {
    return dispatch => {
        axios.get(`${route}`, {
            params: {id}
          })
            .then((response) => {      
                dispatch({
                    type: types.USER_GET,
                    payload: response.data
                });
            }).catch((err) => {
                dispatch(handleError(err, types.USER_ERROR));
            })
    };
};

export const getAllUser = () => {
    return (dispatch, getState) => {
        if (getState().auth.isAuthenticate) {
            dispatch(loading())
            axios.get(`${route}/all`)
                .then((response) => {        
                    dispatch({
                        type: types.USER_ALL,
                        payload: response.data
                    });
                }).catch((err) => {
                    dispatch(handleError(err, types.USER_ERROR));
                })
        }
    };
};

export const selectUser = (user) => {
    return dispatch =>{
        dispatch(walletReset())  
        dispatch(TransactionReset())              
        dispatch({
            type: types.USER_SET_SELECTED,
            payload: user
        })
    }
    
}

export const setUser = (user, id = null) => {
    return dispatch => {
        if (id) {
            dispatch(updateUser(user, id))
        } else {
            dispatch(addUser(user))
        }
    };
}

const updateUser = (user, id) => {
    return dispatch => {
        user.id = id;
        axios.patch(`${route}/update`, { ...user })
            .then((response) => {
                dispatch({
                    type: types.USER_UPDATE,
                    payload: response.data
                });
            }).catch((err) => {
                dispatch(handleError(err, types.USER_ERROR));
            })
    }
}

const addUser = (user) => {
    return dispatch => {
        axios.post(`${route}/add`, { ...user })
            .then((response) => {
                dispatch({
                    type: types.USER_ADD,
                    payload: response.data
                });
            }).catch((err) => {
                dispatch(handleError(err, types.USER_ERROR));
            })
    }
}


export const loading = () => {
    return {
        type: types.USER_LOADING
    };
};
