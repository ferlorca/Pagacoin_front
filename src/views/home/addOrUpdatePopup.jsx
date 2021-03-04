import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import FormField from "../../components/formField";
import { setUser } from "../../store/actions/user_action";
import { typesElements } from "../../components/formField";
import { updateFormData } from "../../config/utilities";


function AddUserPopup({item,handleClose,open}) {
	const error = useSelector(state => state.user.error);

	const formDataInit = {
		name: {
			element: typesElements.INPUT,
			value: '',
			validation: {
				required: true,
			},
			label: "Name",
			config: {
				id: "name", name: "name",
			},
			valid: false,
			touched: false,
			validationMessage: ''
		},
		email: {
			element: typesElements.INPUT,
			value: '',
			label: "Email",
			config: {
				id: "email", name: "email"
			},
			validation: {
				required: true,
				email: true,
			},
			valid: true,
			touched: false,
			validationMessage: ''
		},
		phone: {
			element: typesElements.INPUT,
			value: "",
			label: "Phone number",
			config: {
				id: "phone", name: "phone"
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
			newFormData.name.value = item.name;
			newFormData.email.value =  item.email;
			newFormData.phone.value = item.phone;
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
			dispatch(setUser(dataToSubmit, item ? item.id : null));
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
			<DialogTitle id="form-dialog-title"> {item ? "Update " : "Add "} user</DialogTitle>
			<DialogTitle id="form-dialog-title">{showError()}</DialogTitle>
			<DialogContent>
				<form>
					<Grid container justify="center">
						<Grid item xs={12}>
							<Grid container justify="center" spacing={4}>
								<Grid item xs={12}>
									<FormField formdata={formData.name}
										change={(element) => updateForm(element)} />
								</Grid>
								<Grid item xs={12}>
									<FormField formdata={formData.email}
										change={(element) => updateForm(element)} />
								</Grid>
								<Grid item xs={12}>
									<FormField formdata={formData.phone}
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
				<Button id="settingUser" onClick={(event) => { submitForm(event) }} color="primary">
					{item ? "Update" : "Add"}
				</Button>
			</DialogActions>
		</Dialog >
	)
}

export default AddUserPopup
