import * as actionTypes from '../action_types';
import reducer , { initialState } from "./wallet_reducer";


describe("wallet reducer", () => {
	
	let wallet;
	let walletsDestinyUser;
	beforeEach(()=>{      
		wallet = {			
			ownerId:"HVx80fG6t0P9saOhyPIpdT9yvIQ2",
			alias:"New wallet my name",
			balance:200,
			id:"3VEAt7vww1FvPFey4ElP"			
		}
		walletsDestinyUser=[
			{			
				ownerId:"1w00YeocS7NVkeThYzzZ6CKhz2i2",
				alias:"Final Wallet",
				balance:200,
				id:"KFlANjvgd5EF5cHIZMGR"			
			},
			{			
				ownerId:"1w00YeocS7NVkeThYzzZ6CKhz2i2",
				alias:"Other pocket",
				balance:350,
				id:"KFlANjvgd5EF5cHIsddGR"			
			}
		]
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
			type: actionTypes.WALLET_LOADING,
		})).toEqual(
            {
                ...initialState,
                loading: true
            }
		)
	})

	it("should reset Wallet", () => {		
        expect(reducer({			
			...initialState,
			wallets:[wallet],
			walletsDestiny:[...walletsDestinyUser],
			totalBalance:wallet.balance,
			selected:wallet,
		}, {
			type: actionTypes.WALLET_RESET,
		})).toEqual(
            initialState
		)
	})

	it("should change error when fails", () => {	
        const error = { code: "500", message: "" };
        expect(reducer({			
			...initialState
		}, {
			type: actionTypes.WALLET_ERROR,
            payload: error
		})).toEqual(
            {
                ...initialState,
                error
            }
		)
	})	


	it("should Get all Wallets", () => {	 		
		expect(reducer({			
			...initialState,
		}, {
			type: actionTypes.WALLET_ALL,
            payload:{ wallets:[wallet]}
		})).toEqual(
            {
                ...initialState,
				wallets:[wallet],
				totalBalance:wallet.balance
            }
		)
	})

	it("should Get all Wallets destinations", () => {	 		
		expect(reducer({			
			...initialState,
		}, {
			type: actionTypes.WALLET_ALL_DESTINATION,
            payload:{ wallets:[walletsDestinyUser]}
		})).toEqual(
            {
                ...initialState,
				walletsDestiny:[walletsDestinyUser]
            }
		)
	})


	it("should add a new  Wallet", () => {	 	
		const newwallet ={
			ownerId:"HVx80fG6t0P9saOhyPIpdT9yvIQ2",
			alias:"New one",
			balance:200,
			id:"ascascsacacs"	
		}	
		expect(reducer({			
			...initialState,
			wallets:[wallet],
			totalBalance:wallet.balance
		}, {
			type: actionTypes.WALLET_ADD,
            payload:{ wallet : newwallet}
		})).toEqual(
            {
                ...initialState,
				wallets:[wallet,newwallet],
				totalBalance:wallet.balance + newwallet.balance
            }
		)
	})

	it("should update an existing  Wallet", () => {	 	
		const alterwallet = {...wallet};
		alterwallet.balance = 1500;
		expect(reducer({			
			...initialState,
			wallets:[wallet],
			totalBalance:wallet.balance
		}, {
			type: actionTypes.WALLET_UPDATE,
            payload:{ wallet : alterwallet}
		})).toEqual(
            {
                ...initialState,
				wallets:[alterwallet],
				totalBalance:alterwallet.balance
            }
		)
	})

	
	it("should delete an existing  Wallet", () => {	 	
		expect(reducer({			
			...initialState,
			wallets:[wallet],
		}, {
			type: actionTypes.WALLET_DELETE,
            payload:wallet.id
		})).toEqual(
            {
                ...initialState,
				wallets:[]
            }
		)
	})

})
