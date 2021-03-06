import { typesElements } from "./../components/formField";

export const VALIDATIONMESSAGE={
  validationEmail:"It must be a valid email format",
  validationMoreThanFive:"It must have more than five characters",
  validationMustBeEqualTo:"It must be equal to password",
  validationRequired:"Required",
  validationMoreThan:"Founds required",

}

const validate = (element, formData) => {
  let err = [true, ''];
  let valid = true;

  if (valid && element.validation && element.validation.email) {
    valid = /\w+@\S+\.\S+/.test(element.value);
    let message = `${!valid ? VALIDATIONMESSAGE.validationEmail : ''}`;
    err = !valid ? [valid, message] : err
  }

  if (valid && element.validation && element.validation.password) {
    valid = element.value.length >= 6;
    let message = `${!valid ? VALIDATIONMESSAGE.validationMoreThanFive : ''}`;
    err = !valid ? [valid, message] : err
  }

  if (valid && element.validation && element.validation.isEqualTo) {
    let otherElement = formData[element.validation.isEqualTo];
    valid = element.value === otherElement.value
    let message = `${!valid ? VALIDATIONMESSAGE.validationMustBeEqualTo  : ''}`;
    err = !valid ? [valid, message] : err
  }

  if (valid && element.validation && element.validation.moreThan) {
    valid = parseInt(element.value) <= element.validation.moreThan;
    let message = `${!valid ? VALIDATIONMESSAGE.validationMoreThan : ''}`;
    err = !valid ? [valid, message] : err
  }

  if (valid && element.validation && element.validation.required) {
    if (element.element === typesElements.SELECT_MULTIPLE || element.element === typesElements.AUTOCOMPLETE_MULTIPLE) {
      valid = element.value.length !== 0;
    } else {
      valid = (element.value !== null && element.value.toString().trim() !== '');
    }
    let message = `${!valid ? VALIDATIONMESSAGE.validationRequired : ''}`;
    err = !valid ? [valid, message] : err
  }

  return err;
}


export const updateFormData = (element, formData) => {
  const newFormData = {
    ...formData
  }  
  const newElement = {
    ...newFormData[element.id]
  }
  
  getValueInput(element,newElement);
  
  if (element.blur) {
    let validData = validate(newElement, formData);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
  }
  newElement.touched = element.blur ?? false;
  newFormData[element.id] = newElement;

  return newFormData;
}

export const getValueInput = (element,newElement) => {
  if(newElement){
    switch (element.id) {
      default: newElement.value = element.event ? element.event.target.value : element.value;
    }
  }else{
    return element.event ? element.event.target.value : element.value;
  }
}; 

//Returns true if it is a DOM node
export const isNode = (o) => (
  typeof Node === "object" ? o instanceof Node :
    o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
);

//Returns true if it is a DOM element    
export const isElement = (o) => (
  typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
);

export const isMajorAuthorized = (role) => (role && (role === "admin"));

export const isNullOrEmpty = (obj) => (obj === null || obj === undefined || obj.toString() === "");


