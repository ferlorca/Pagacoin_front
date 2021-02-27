import * as actionTypes from '../action_types';
import { updateObject } from '../utility';

export const initialState = { 
    logs: [],     
    loading:false
};

const getAll = (state, action) => {
    return updateObject(state, { 
        logs: [...action.payload],      
        loading:false
    });
};

const loading = (state, action) => {
    return updateObject(state, { 
        loading: true       
     });
};

const reducer = ( state = {...initialState}, action ) => {
    switch ( action.type ) {        
        case actionTypes.LOG_LOADING: return loading(state, action);
        case actionTypes.LOG_ALL: return getAll(state, action);        
        default:
            return state;
    }
};

export default reducer;

