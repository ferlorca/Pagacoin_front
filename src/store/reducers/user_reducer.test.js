import * as actionTypes from '../action_types';
import reducer , { initialState } from "./user_reducer";


describe("wallet reducer", () => {
	
	let userSelected;
	let users = [];
	beforeEach(()=>{      
		userSelected={id:"HVx80fG6t0P9saOhyPIpdT9yvIQ2",
		email:"prueba@prueba.com",
		name:"name1",
		phone:"-",
		avatar:"./assets/default-avatar.jpg"};

		users= [userSelected, {
			id:"1w00YeocS7NVkeThYzzZ6CKhz2i2",
			email:"fernando@prueba.com",
			name:"name 2",
			phone:"-",
			avatar:"./assets/default-avatar.jpg"
		}];
    })


	it("should return the initial state", () => {
		expect(reducer(undefined, {})).toEqual(
			initialState
		)
	})

    
	it("should change loading status", () => {		
        expect(reducer({			
			...initialState
		}, {
			type: actionTypes.USER_LOADING,
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
			type: actionTypes.USER_ERROR,
            payload: error
		})).toEqual(
            {
                ...initialState,
                error
            }
		)
	})	


	it("should Get all Users", () => {	 		
		expect(reducer({			
			...initialState,
		}, {
			type: actionTypes.USER_ALL,
            payload:{ users }
		})).toEqual(
            {
                ...initialState,
				users,
            }
		)
	})

	it("should get a user", () => {	 		
		expect(reducer({			
			...initialState,
		}, {
			type: actionTypes.USER_GET,
            payload: userSelected
		})).toEqual(
            {
                ...initialState,
				myUser: userSelected,
				userSelected: userSelected
            }
		)
	})


	it("should add a new User", () => {	 	
		const newuser ={
			id:"1w00YeocSsdsad7NVkeThYzweeezZ6CKhz2i2",
			email:"nEWSER@TEST.com",
			name:"test",
			phone:"-",
			avatar:"./assets/default-avatar.jpg"
		}	
		expect(reducer({			
			...initialState,
			users
		}, {
			type: actionTypes.USER_ADD,
            payload:{ user : newuser}
		})).toEqual(
            {
                ...initialState,
				users:[...users,newuser]
            }
		)
	})

	it("should update a new User", () => {	 	
		const alteruser = {...userSelected};
		alteruser.name="A nEw total different name"
		const duplicateArray = users.filter(item=> item.id !== alteruser.id);

		expect(reducer({			
			...initialState,
			users
		}, {
			type: actionTypes.USER_UPDATE,
            payload:{ user : alteruser}
		})).toEqual(
            {
                ...initialState,
				users:[alteruser,...duplicateArray]
            }
		)
	})

})
