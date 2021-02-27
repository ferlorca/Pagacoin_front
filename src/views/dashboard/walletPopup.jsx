import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import FormField from "../../components/formField";
import { setWallet } from "../../store/actions/wallet_action";
import { typesElements } from "../../components/formField";
import { updateFormData } from "../../config/utilities";


function AddOrUpdatePopupWallet({item,handleClose,open}) {
	const error = useSelector(state => state.user.error);
	const formDataInit = {
		alias: {
			element: typesElements.INPUT,
			value: '',
			validation: {
				required: true,
			},
			label: "Alias",
			config: {
				id: "alias", name: "alias",
			},
			valid: false,
			touched: false,
			validationMessage: ''
		},
		balance: {
			element: typesElements.INPUT_NUMBER,
			value: '',
			label: "Balance",
			config: {
				id: "balance", name: "balance"
			},
			validation: {
				required: true,
				number:true
			},
			valid: true,
			touched: false,
			validationMessage: ''
		}		
	}
	const [formData, setFormData] = useState(formDataInit);
	const dispatch = useDispatch();


	useEffect(() => {
		if (item) {
			const newFormData = {
				...formData
			}
			newFormData.alias.value = item.alias;
			newFormData.balance.value =  item.balance;
			setFormData(newFormData);
		} else {
			setFormData(formDataInit);
		}
	}, [item])


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
			dispatch(setWallet(dataToSubmit, item ? item : null));
			setFormData(formDataInit);
			resetAndClose();
		}
	}

	const resetAndClose = () => {
		let newFormData = {
			...formData
		}
		for (const key of Object.keys(newFormData)) {
			newFormData[key].valid = formDataInit[key].valid;
			newFormData[key].touched = formDataInit[key].touched;
		}
		setFormData(newFormData);
		handleClose();
	}

	return (
		<Dialog open={open}
			onClose={resetAndClose}
			fullWidth={true}
			maxWidth="md"
			aria-labelledby="form-dialog-product">
			<DialogTitle id="form-dialog-title"> {item ? "Update " : "Add "} Wallet</DialogTitle>
			<DialogTitle id="form-dialog-title">{showError()}</DialogTitle>
			<DialogContent>
				<form>
					<Grid container justify="center">
						<Grid item xs={12}>
							<Grid container justify="center" spacing={4}>
								<Grid item xs={12}>
									<FormField formdata={formData.alias}
										change={(element) => updateForm(element)} />
								</Grid>
								<Grid item xs={12}>
									<FormField formdata={formData.balance}
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
					{item ? "Update" : "Add"}
				</Button>
			</DialogActions>
		</Dialog >
	)
}

export default AddOrUpdatePopupWallet
