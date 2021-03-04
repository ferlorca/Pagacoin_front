import * as actionTypes from '../action_types';
import { getTotal } from '../utility';
import reducer , { initialState } from "./transaction_reducer";


describe("transaction reducer", () => {
	
	let transactions;
	beforeEach(()=>{
        const incoming = 	{
			destiny:"kXwAKDJD4O7Jq5Wmx3N7",
			origin:"KFlANjvgd5EF5cHIZMGR",
			amount:50,
			date:"2021-03-03T20:03:57.947Z",
			wallet:{
				ownerId:"1w00YeocS7NVkeThYzzZ6CKhz2i2",
				alias:"Another wallet",
				balance:1500,
				id:"kXwAKDJD4O7Jq5Wmx3N7"
			}
		};
		const outcoming = 	{
			destiny:"kXwAKDJD4O7Jq5Wmx3N7",
			origin:"KFlANjvgd5EF5cHIZMGR",
			amount:50,
			date:"2021-03-03T20:03:57.947Z",
			wallet:{
				ownerId:"1w00YeocS7NVkeThYzzZ6CKhz2i2",
				alias:"Final Wallet",
				balance:150,
				id:"KFlANjvgd5EF5cHIZMGR"
			}
		}
		transactions = {
			received:[incoming],
			delivered:[outcoming],
		}
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
			type: actionTypes.TRANSACTION_LOADING,
		})).toEqual(
            {
                ...initialState,
                loading: true
            }
		)
	})

	it("should reset Transitions", () => {		
        expect(reducer({			
			...initialState,
			transactions,
			totalIncoming:getTotal(transactions.received,"amount"),
			totalOutcoming:getTotal(transactions.delivered,"amount"),
		}, {
			type: actionTypes.TRANSACTION_RESET,
		})).toEqual(
            initialState
		)
	})

	it("should change error when fails", () => {	
        const error = { code: "500", message: "" };
        expect(reducer({			
			...initialState
		}, {
			type: actionTypes.TRANSACTION_ERROR,
            payload: error
		})).toEqual(
            {
                ...initialState,
                error
            }
		)
	})


	it("should Get all transactions", () => {	 		
		expect(reducer({			
			...initialState,
			transactions,
			totalIncoming:getTotal(transactions.received,"amount"),
			totalOutcoming:getTotal(transactions.delivered,"amount"),
		}, {
			type: actionTypes.TRANSACTION_ALL,
            payload: transactions
		})).toEqual(
            {
                ...initialState,
				transactions,
                totalIncoming:getTotal(transactions.received,"amount"),
        		totalOutcoming:getTotal(transactions.delivered,"amount"),
            }
		)
	})


	it("should add a new Transaction", () => {	 	
		const newTransaction = {
			destiny:"kXwAKDJD4O7Jq5Wmx3N7",
			origin:"KFlANjvgd5EF5cHIZMGR",
			amount:50,
			date:"2021-03-03T20:03:57.947Z",
			wallet:{
				ownerId:"1w00YeocS7NVkeThYzzZ6CKhz2i2",
				alias:"Another wallet",
				balance:1500,
				id:"kXwAKDJD4O7Jq5Wmx3N7"
			}
		}

		const destinyWallet = {
			ownerId:"HVx80fG6t0P9saOhyPIpdT9yvIQ2",
			alias:"only a test",
			balance:1200,
			id:"kXwAKDJD4O7Jq5Wmx3N7"
		}

		const newDelivered = [...transactions.delivered];
		const newTransactions= {received: [...transactions.received],
							delivered: newDelivered.concat(newTransaction)};
		
		expect(reducer({			
			...initialState,
			transactions,
			totalIncoming:transactions.received[0].amount,
			totalOutcoming:transactions.delivered[0].amount,
		}, {
			type: actionTypes.TRANSACTION_ADD,
            payload: {
				transaction:newTransaction,
				destiny:destinyWallet
			}
		})).toEqual(
            {
                ...initialState,			
				totalIncoming:transactions.received[0].amount,
				totalOutcoming:transactions.delivered[0].amount + newTransaction.amount,
				transactions: newTransactions,
            }
		)
	})


	

})
