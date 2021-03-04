import * as actionTypes from '../action_types';
import reducer , { initialState } from "./auth_reducer";


describe("auth reducer", () => {
	it("should return the initial state", () => {
		expect(reducer(undefined, {})).toEqual(
			initialState
		)
	})

    
	it("should change authenticated by success login", () => {
        const token = "1a2s3d4f5g6789g12hj3fsd45sdf6sd7sdf89"
		expect(reducer({			
			...initialState
		    }, {
            type: actionTypes.AUTH_SUCCESS,
            payload: {
                token: token
            }
        })).toEqual(
			{	
                ...initialState,
			    token,
                isAuthenticate:true
			}
		)
	})

	it("should trigger loggout and change authentication", () => {
		expect(reducer({
            token: "a very large token",  
            isAuthenticate:true,    
            loading: false,     
            error: null,               
            authRedirectPath: '/',
            role: null,
            email: null  
		}, {
			type: actionTypes.AUTH_LOGOUT,
		})).toEqual(
			{			
				token: null, 
                isAuthenticate:false, 
                loading: false,                 
                error: null,               
                authRedirectPath: '/',
                role: null,
                email: null  
			}
		)
	})

	it("should change loading status", () => {		
        expect(reducer({			
			...initialState
		}, {
			type: actionTypes.AUTH_START,
		})).toEqual(
            {
                ...initialState,
                loading: true
            }
		)
	})


    it("should change error when fails", () => {	
        const error = { code: "500", message: "" };
        expect(reducer({			
			...initialState
		}, {
			type: actionTypes.AUTH_FAIL,
            payload: error
		})).toEqual(
            {
                ...initialState,
                error
            }
		)
	})


    it("should change redirect URL", () => {	
        const path ="www.google.com.ar";
        expect(reducer({			
			...initialState
		}, {
			type: actionTypes.SET_AUTH_REDIRECT_PATH,
            payload: path
		})).toEqual(
            {
                ...initialState,
                authRedirectPath:path
            }
		)
	})


})
