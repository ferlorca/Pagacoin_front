import Notification, { SEVERITY_NOTIFICACION } from '../../models/Notification';
import * as actionTypes from '../action_types';
import reducer , { initialState } from "./notifications_reducer";


describe("notification reducer", () => {
	let notification
	beforeEach(()=>{
        notification = new Notification.fromObject({
			Id:"0",
			Description: "Im a description",
			Title: "Title",
			Severity:SEVERITY_NOTIFICACION.WARNING,
			Timeout:5000
		  });
    })

	it("should return the initial state", () => {
		expect(reducer(undefined, {})).toEqual(
			initialState
		)
	})

    
	it("should add a new notification", () => {        
		expect(reducer({			
			...initialState
		    }, {
            type: actionTypes.NOTIFICATIONS_ADD,
            payload:notification
        })).toEqual(
			{	
                ...initialState,
			    notifications:[notification],
               	count:1
			}
		)
	})

	it("should remove a notification", () => {		
		expect(reducer({
			...initialState,
			notifications:[notification],
			count:1
		}, {
			type: actionTypes.NOTIFICATIONS_DELETE,
			payload:"0"
		})).toEqual(
			{			
				...initialState,
				notifications:[],
				count:1
			}
		)
	})

})
