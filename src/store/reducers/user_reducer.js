import * as actionTypes from '../action_types';
import { updateObject } from '../utility';

export const initialState = { 
    userSelected: null,  
    myUser:null, 
    users:[],
    error:null,
    loading:false
};

const getAll = (state, action) => {
    return updateObject(state, { 
        users: action.payload.users,      
        loading:false
    });
};

const getUser = (state, action) => {
    let user =  action.payload;
    user.avatar ='./assets/default-avatar.jpg';    
    return updateObject(state, { 
        myUser: user,
        userSelected: user
    });
};

const setSelectedUser = (state, action) => {
    let user =  action.payload;
    user.avatar ='./assets/default-avatar.jpg';    
    return updateObject(state, { 
        userSelected: user
    });
};

const addUser = (state, action) => {
    return updateObject(state, { 
        users: state.users.concat(action.payload.user),  
    });
};

const updateUser = (state, action) => {    
    let duplicate = [...state.users];
    let index = duplicate.findIndex(item => item.id === action.payload.user.id);
    duplicate[index] = action.payload.user;        
    return updateObject(state, { 
        users: duplicate
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
        case actionTypes.USER_LOADING: return loading(state, action);
        case actionTypes.USER_ERROR: return handleError(state, action);
        case actionTypes.USER_ALL: return getAll(state, action); 
        case actionTypes.USER_GET: return getUser(state, action); 
        case actionTypes.USER_SET_SELECTED: return setSelectedUser(state, action); 
        case actionTypes.USER_ADD: return addUser(state, action); 
        case actionTypes.USER_UPDATE: return updateUser(state, action); 
        default:
            return state;
    }
};

export default reducer;

