import React from "react";
import Home from "./home";
import { render ,fireEvent,screen  } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import reducerObject from "../../config/mockStore";
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(reducerObject);


test("Home page intitial render", () => {
    const { getByText } = render(
        <Provider store={store}>
            <Home />
        </Provider>
    );

    getByText("User List");
    getByText("Add New user");
    screen.getByRole('table');

});



test("Home page user can add a new User", () => {
    const { getByText } = render(
        <Provider store={store}>
            <Home />
        </Provider>
    );

    const button = getByText("Add New user");
    fireEvent.click(button);
    
    screen.getByText("Add user");
    screen.getByLabelText("Name");
    screen.getByLabelText("Email");
    screen.getByLabelText("Phone number");    
    screen.getByText("Add");
    screen.getByText("Cancel");   

});



