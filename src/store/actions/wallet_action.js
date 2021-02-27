import * as types from '../action_types';
import config from "../../config/config";
import { handleError } from "./common_action";
import {getAllTransactions} from "./transaction_action";

const axios = config.AXIOS;
const route = "/wallet";


export const getAllWallets = (ownerId) => {
    return (dispatch, getState) => {
        if (getState().auth.isAuthenticate) {
            if(ownerId){
                dispatch(loading())
                axios.get(`${route}/all`,{
                    params: {ownerId}
                  })
                    .then((response) => {  
                        dispatch(getAllTransactions(response.data))      
                        dispatch({
                            type: types.WALLET_ALL,
                            payload: response.data
                        });
                    }).catch((err) => {
                        dispatch(handleError(err, types.WALLET_ERROR));
                    })
            }else{
                throw "No Owner Id was specified"
            }
        }
    };
};

export const getAllWalletsForDestiny = (ownerId) => {
    return (dispatch) => {       
        if(ownerId){
            axios.get(`${route}/all`,{
                params: {ownerId}
                })
                .then((response) => {   
                    dispatch({
                        type: types.WALLET_ALL_DESTINATION,
                        payload: response.data
                    });
                }).catch((err) => {
                    dispatch(handleError(err, types.WALLET_ERROR));
                })
        }else{
            throw "No Owner Id was specified"
        }        
    };
};


export const setSelectedWallet =(wallet)=>{
    return dispatch =>{         
        dispatch({
            type: types.WALLET_SET_SELECTED,
            payload: wallet
        })
    }
}


export const setWallet = (wallet, preWallet = null) => {
    return dispatch => {
        if (preWallet) {
            dispatch(updateWallet(wallet, preWallet))
        } else {
            dispatch(addWallet(wallet))
        }
    };
}

export const updateWallet = (wallet, preWallet=null) => {
    return dispatch => {
        if(preWallet){
            wallet.id = preWallet.id;
            wallet.ownerId = preWallet.ownerId;
        }
        axios.patch(`${route}/update`, { ...wallet })
            .then((response) => {
                dispatch({
                    type: types.WALLET_UPDATE,
                    payload: response.data
                });
            }).catch((err) => {
                dispatch(handleError(err, types.WALLET_ERROR));
            })
    }
}

const addWallet = (wallet) => {
    return (dispatch,getState) => {
        const user  = getState().user.userSelected;
        wallet.ownerId = user.id;
        axios.post(`${route}/add`, { ...wallet })
            .then((response) => {
                dispatch({
                    type: types.WALLET_ADD,
                    payload: response.data
                });
            }).catch((err) => {
                dispatch(handleError(err, types.WALLET_ERROR));
            })
    }
}

export const removeWallet = (wallet) => {
    return dispatch => {
        if(wallet.balance === 0){
            axios.delete(`${route}/delete`,{
                params: {id:wallet.id}
              })
                .then((response) => {
                    dispatch({
                        type: types.WALLET_DELETE  ,
                        payload:  wallet.id                
                    });
                }).catch((err) => {
                    dispatch(handleError(err, types.WALLET_ERROR));
                })
        }else{
            dispatch(handleError("This Wallet must have a balance of 0", types.WALLET_ERROR));
        }
    }
}




export const reset = () => {
    return {
        type: types.WALLET_RESET
    };
};


export const loading = () => {
    return {
        type: types.WALLET_LOADING
    };
};
