import React from "react";
import Dashboard from "./dashboard";
import { render ,fireEvent, waitFor } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import reducerObject from "../../config/mockStore";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const userMock ={
    email:"fernando@prueba.com",
    id:"1w00YeocS7NVkeThYzzZ6CKhz2i2",
    name:"My name",
    phone:"-",
    avatar:"./assets/default-avatar.jpg"
} 

const store = mockStore({...reducerObject,user:{
    userSelected: userMock,  
    myUser:userMock, 
    users:[userMock],
    error:null,
    loading:false
}});



test("Dashboard page intitial render", () => {
    const { getByText , getAllByRole ,asFragment} = render(
        <Provider store={store}>
            <Dashboard />
        </Provider>
    );

    const list = getAllByRole('listitem');
    const tables = getAllByRole('table');
    const BUDGED = getByText('TOTAL BUDGED');
    const INCOMING = getByText('TOTAL INCOMING');
    const OUTCOMING = getByText('TOTAL OUTCOMING');

    expect(tables).toHaveLength(3);

});

test("Dashboard selecting new wallet",async ()  => {
    const {getByLabelText,getByText, getAllByRole,getByTitle ,asFragment} = render(
        <Provider store={store}>
            <Dashboard />
        </Provider>
    );
    const firstRender = asFragment()

    const buttonNewWallet = getByTitle("Add new Wallet");
    fireEvent.click(buttonNewWallet);
    getByText("Add Wallet")
    const alias = getByLabelText("Alias");
    const balance =getByLabelText("Balance");

    fireEvent.change(alias, { target: { value: "New wallet master" } });
    fireEvent.change(balance, { target: { value: "1500" } });
    const buttons = getAllByRole('button');
    fireEvent.click(buttons[1])

    

});


