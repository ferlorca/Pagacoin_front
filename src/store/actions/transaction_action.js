import * as types from '../action_types';
import config from "../../config/config";
import { handleError } from './common_action';
import { updateWallet } from './wallet_action';

const axios = config.AXIOS;
const route = "/transaction";

export const getAllTransactions = ({wallets}) => {
    return async (dispatch)  =>  {
        dispatch(loading())  
        try {
            let auxTransactions = {
                received: [],
                delivered: []
            }
            for (const iterator of wallets) {
                let {transactions} = await getTransactions(iterator.id);                
                transactions.received.length > 0 && auxTransactions.received.push(...completeArrayWithDataInfo([...transactions.received],iterator,"wallet")) ;
                transactions.delivered.length > 0 && auxTransactions.delivered.push(...completeArrayWithDataInfo([...transactions.delivered],iterator,"wallet"));
            }
            dispatch({
                type: types.TRANSACTION_ALL,
                payload:auxTransactions
            })
        }catch(ex){
            dispatch(handleError(ex, types.TRANSACTION_ERROR));
        }
    };
};

const completeArrayWithDataInfo=(array,data,name)=>{
    for (let iterator of array) {
         iterator[name]=data;
    }
    return array;
}

export const addTransaction = (transaction) => {
    return (dispatch,getState) => {       
        let origin =  getState().wallet.selected;
        origin.balance -= transaction.amount;
        let destiny =  getState().wallet.walletsDestiny.find(item=>item.id ===transaction.destiny );
        destiny.balance += transaction.amount;
        axios.post(`${route}/add`, transaction)
            .then((response) => {
                dispatch(updateWallet(origin));
                dispatch(updateWallet(destiny));
                dispatch({
                    type: types.TRANSACTION_ADD,
                    payload: {
                        origin,
                        destiny,
                        transaction
                    }
                });
            }).catch((err) => {
                dispatch(handleError(err, types.TRANSACTION_ERROR));
            })
    }
}

const getTransactions = async (walledId)=>{
    try {
        const transactionsResponse  =  await axios.get(`${route}/all`,{params: {walledId}})
        return transactionsResponse.data;
    }catch(ex){
        throw ex
    }
}

export const reset = () => {
    return {
        type: types.TRANSACTION_RESET
    };
};


export const loading = () => {
    return {
        type: types.TRANSACTION_LOADING
    };
};
