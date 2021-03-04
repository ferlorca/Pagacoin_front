import * as actionTypes from '../action_types';
import { updateObject,getTotal  } from '../utility';

export const initialState = {     
    transactions:null,
    totalIncoming:0,
    totalOutcoming:0,
    error:null,
    loading:false
};

const getAll = (state, action) => {
    return updateObject(state, { 
        transactions: action.payload, 
        totalIncoming:getTotal(action.payload.received,"amount"),
        totalOutcoming:getTotal(action.payload.delivered,"amount"),
        loading: false
    });
};

const reset = (state, action) => {
    return updateObject(state, initialState);
};

const addTransaction = (state, action) => {
    let duplicate = {...state.transactions};
    duplicate.delivered.push(action.payload.transaction);
    if(action.payload.transaction.wallet.ownerId === action.payload.destiny.ownerId)
        duplicate.received.concat(action.payload.transaction);
    return updateObject(state, { 
        transactions: duplicate,  
        totalIncoming:getTotal(duplicate.received,"amount"),
        totalOutcoming:getTotal(duplicate.delivered,"amount"),
    });
};


const loading = (state, action) => {
    return updateObject(state, { 
        loading: true       
     });
};


const handleError = (state, action) => {
    return updateObject( state, {
        error: action.payload,
        loading: false,
    });
};


const reducer = ( state = {...initialState}, action ) => {
    switch ( action.type ) {        
        case actionTypes.TRANSACTION_LOADING: return loading(state, action);
        case actionTypes.TRANSACTION_ERROR: return handleError(state, action);
        case actionTypes.TRANSACTION_ALL: return getAll(state, action); 
        case actionTypes.TRANSACTION_ADD: return addTransaction(state, action); 
        case actionTypes.TRANSACTION_RESET: return reset(state, action); 
        default:
            return state;
    }
};

export default reducer;

