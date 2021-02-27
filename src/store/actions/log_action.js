import * as types from '../action_types';
import config from "../../config/config";

const axios = config.AXIOS;
const route = "/logs";


export const getAllLogs = () => {
    return (dispatch, getState) => {
        if (getState().auth.isAuthenticate) {
            dispatch(loading())
            axios.get(`${route}`)
                .then((response) => {        
                    dispatch({
                        type: types.LOG_ALL,
                        payload: response.data.errors
                        
                    });
                })
        }
    };
};


export const loading = () => {
    return {
        type: types.LOG_LOADING
    };
};
