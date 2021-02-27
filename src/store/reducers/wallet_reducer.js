import * as actionTypes from '../action_types';
import { updateObject,getTotal  } from '../utility';

export const initialState = {     
    wallets:[],
    walletsDestiny:[],
    totalBalance:0,
    selected:null,
    error: null,
    loading:false
};


const selected = (state, action) => {
    return updateObject(state, { 
        selected: action.payload
    });
};


const getAll = (state, action) => {
    return updateObject(state, { 
        wallets: action.payload.wallets,  
        totalBalance: getTotal(action.payload.wallets,"balance"),    
        loading: false
    });
};

const getAllDestinyWallets = (state, action) => {
    return updateObject(state, { 
        walletsDestiny: action.payload.wallets,  
    });
};

const reset = (state, action) => {
    return updateObject(state, initialState);
};

const addWallet = (state, action) => {
    const duplicate = state.wallets.concat(action.payload.wallet);
    return updateObject(state, { 
        wallets: duplicate,  
        totalBalance: getTotal(duplicate,"balance"),
    });
};

const updateWallet = (state, action) => {    
    let duplicate = [...state.wallets];
    let index = duplicate.findIndex(item => item.id === action.payload.wallet.id);
    duplicate[index] = action.payload.wallet;        
    return updateObject(state, { 
        wallets: duplicate,
        totalBalance: getTotal(duplicate,"balance"),
    });
};

const loading = (state, action) => {
    return updateObject(state, { 
        loading: true       
     });
};

const remove =(state, action)=>{
    let duplicate = state.wallets.filter(item => item.id !== action.payload);
    return updateObject(state, { 
        wallets : duplicate,        
    });
}


const handleError = (state, action) => {
    return updateObject( state, {
        error: action.payload.error,
        loading: false,
    });
};


const reducer = ( state = {...initialState}, action ) => {
    switch ( action.type ) {        
        case actionTypes.WALLET_LOADING: return loading(state, action);
        case actionTypes.WALLET_ERROR: return handleError(state, action);
        case actionTypes.WALLET_ALL: return getAll(state, action); 
        case actionTypes.WALLET_ALL_DESTINATION: return getAllDestinyWallets(state, action); 
        case actionTypes.WALLET_ADD: return addWallet(state, action); 
        case actionTypes.WALLET_UPDATE: return updateWallet(state, action);
        case actionTypes.WALLET_RESET: return reset(state, action); 
        case actionTypes.WALLET_SET_SELECTED: return selected(state, action); 
        case actionTypes.WALLET_DELETE: return remove(state, action); 
        default:
            return state;
    }
};

export default reducer;

