import React from "react";
import Login from "./login";
import { render ,fireEvent  } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import reducerObject from "../../config/mockStore";


const mockStore = configureMockStore();
const store = mockStore(reducerObject);


test("Login page intitial render", () => {
    const { getByText, getByLabelText } = render(
        <Provider store={store}>
            <Login />
        </Provider>
    );

    getByText("Pagacoin");
    getByLabelText("Email");
    getByLabelText("Password");
    getByLabelText("Register");
    getByText("Sign in");
});


test("Login Page click in register and new render", () => {
    const { getByText, getByLabelText } = render(
        <Provider store={store}>
            <Login />
        </Provider>
    );

    const toggle = getByLabelText("Register");
    fireEvent.click(toggle);
    
    getByLabelText("Email");
    getByLabelText("Password");
    getByLabelText("Rewrite password");    
    getByText("Sign up");
});



