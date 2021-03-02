export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const getTotal = (array,field)=>{
  return array.length>0 ? array.map(item=>item[field]).reduce((accumulator, currentValue) => accumulator + currentValue):0;
}



export const addCreatedByToCollection= (getState,collection)=>{
    let name =  getState().user.profile.name;
    let email =  getState().user.profile.email;
    collection.createdBy={
      name:name,
      email
    };
  }

export const updateArray = (array, action) => {
  if (array.length > 0) {
    let duplicate = [...array];
    let index = duplicate.findIndex(item => item.id === action.payload.id);
    duplicate[index] = action.payload;
    return duplicate
  }
  return []
}