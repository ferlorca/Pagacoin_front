import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import FormField from "../../components/formField";
import { addTransaction } from "../../store/actions/transaction_action";
import { getAllUser } from "../../store/actions/user_action";

import { typesElements } from "../../components/formField";
import { updateFormData } from "../../config/utilities";
import { getAllWalletsForDestiny ,setSelectedWallet} from '../../store/actions/wallet_action';


function TransactionPopup({handleClose,open,myWallet}) {
	const error = useSelector(state => state.user.error);
    const users = useSelector(state => state.user.users);
    const walletsDestiny = useSelector(state => state.wallet.walletsDestiny);

	const formDataInit = {		
		user: {
			element: typesElements.AUTOCOMPLETE,
			value: null,
			label: "Destiny User",
			childElements: users.map(item => ({ id: item.id, name: item.email })),
			config: {
				id: "user", name: "user"
			},
			validation: {
				required: true,
				number:true
			},
			valid: true,
			touched: false,
			validationMessage: ''
		},
		destiny: {
			element: typesElements.AUTOCOMPLETE,
			value: null,
			label: "Destiny Wallet",
			childElements: walletsDestiny.map(item => ({ id: item.id, name: item.alias })),
			config: {
				id: "destiny", name: "destiny" ,disabled:true
			},
			validation: {
				required: true,
				number:true
			},
			valid: true,
			touched: false,
			validationMessage: ''
		},
		amount: {
			element: typesElements.INPUT_NUMBER,
			value: '',
			label: "Amount",
			config: {
				id: "amount", name: "amount"
			},
			validation: {
				required: true,
				moreThan: myWallet ? myWallet.balance : 0
			},
			valid: true,
			touched: false,
			validationMessage: ''
		}	
	}
	const [formData, setFormData] = useState(formDataInit);
	const dispatch = useDispatch();


	useEffect(() => {			
		if (users && users.length > 0) {
			const newFormData = {
			...formData
			}
			const newElement = {
			...newFormData["user"]
			}
			newElement.childElements = users.map(item => ({ id: item.id, name: item.email }));
			newFormData["user"] = newElement;
			setFormData(newFormData);
		} else {
			dispatch(getAllUser());
		}	
	}, [users])

	useEffect(() => {
		if(open){
			const newFormData = {
				...formData
			}  
			const newElement = {
			...newFormData.amount
			}
			newElement.validation.moreThan= myWallet.balance;
			newFormData.amount =newElement;
			setFormData(newFormData);
		}
	}, [open])
	

	
	useEffect(() => {			
		if (walletsDestiny && walletsDestiny.length > 0) {
			const newFormData = {
			...formData
			}
			const newElement = {
			...newFormData["destiny"]
			}
			newElement.childElements = walletsDestiny.map(item => ({ id: item.id, name: item.alias }));
			newFormData["destiny"] = newElement;
			setFormData(newFormData);
		} else {
			dispatch(getAllUser());
		}	
	}, [walletsDestiny])


	useEffect(() => {			
		if (users && users.length > 0) {
			const newFormData = {
			...formData
			}
			const newElement = {
			...newFormData["user"]
			}
			newElement.childElements = users.map(item => ({ id: item.id, name: item.email }));
			newFormData["user"] = newElement;
			setFormData(newFormData);
		} else {
			dispatch(getAllUser());
		}	
	}, [users])


	useEffect(() => {
		if(formData.user.value){
			setEnableDestiny();
			dispatch(getAllWalletsForDestiny(formData.user.value.id));
		}
	}, [formData.user]);


	const setEnableDestiny =()=>{
		const newFormData = {
			...formData
		}  
		const newElement = {
		...newFormData.destiny
		}
		newElement.config.disabled= false;
		newFormData.destiny =newElement;
		setFormData(newFormData);
	}


	const showError = () => {
		if (error) {
			return <div> The action cannot be done.</div>
		}
		else return null
	}

	const updateForm = (element) => {
		setFormData(updateFormData(element, formData))
	}

	const submitForm = (event) => {
		event.preventDefault();
		let dataToSubmit = {};
		let formIsValid = true;

		var newFormData = { ...formData };
		for (let key in formData) {
			newFormData = updateFormData({ value: formData[key].value, id: key, blur: true }, newFormData);
			dataToSubmit[key] = newFormData[key].value;
			formIsValid = newFormData[key].valid && formIsValid;
		}
		setFormData(newFormData);
		if (formIsValid) {
			dispatch(addTransaction(getData(dataToSubmit)));
			setFormData(formDataInit);
			resetAndClose();
		}
	}

	const getData =(data)=>{
		return {
			origin:myWallet.id,
			destiny:data.destiny.id,
			amount:parseInt(data.amount)
		}
	}

	const resetAndClose = () => {
		let newFormData = {
			...formDataInit
		}
		for (const key of Object.keys(newFormData)) {
			newFormData[key].valid = formDataInit[key].valid;
			newFormData[key].touched = formDataInit[key].touched;
		}
		setFormData(newFormData);
		dispatch(setSelectedWallet(null));
		handleClose();
	}

	return (
		myWallet ? 
		<Dialog open={open}
			onClose={resetAndClose}
			fullWidth={true}
			maxWidth="md"
			aria-labelledby="form-dialog-product">
			<DialogTitle id="form-dialog-title"> Add Transaction from {myWallet.alias}. Total balance {myWallet.balance}</DialogTitle>
			<DialogTitle id="form-dialog-title">{showError()}</DialogTitle>
			<DialogContent>
				<form>
					<Grid container justify="center">
						<Grid item xs={12}>
							<Grid container justify="center" spacing={4}>
								<Grid item xs={12}>
									<FormField formdata={formData.user}
										change={(element) => updateForm(element)} />
								</Grid>
								<Grid item xs={12}>
									<FormField formdata={formData.destiny}
										change={(element) => updateForm(element)} />
								</Grid>		
								<Grid item xs={12}>
									<FormField formdata={formData.amount}
										change={(element) => updateForm(element)} />
								</Grid>							
							</Grid>
						</Grid>
					</Grid>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={resetAndClose} color="primary">
					Cancel
         		 </Button>
				<Button onClick={(event) => { submitForm(event) }} color="primary">
					Add
				</Button>
			</DialogActions>
		</Dialog > 
		: null
	)
}

export default TransactionPopup
