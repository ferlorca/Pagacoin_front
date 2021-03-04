import React from "react";
import Actions from "./walletActions";
import { render, fireEvent, screen } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import reducerObject from "../../../../config/mockStore";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(reducerObject);

const updateMock = jest.fn();
const removeMock = jest.fn();

test("Action page intitial render", () => {
    const { getAllByRole } = render(
        <Provider store={store}>
            <Actions update={updateMock} remove={removeMock} wallet={{alias:"A new Wallet"}} />
        </Provider>
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
});


test("Action page remove wallet cannot be clicked", () => {
    const { getAllByRole } = render(
        <Provider store={store}>
            <Actions update={updateMock} remove={removeMock} wallet={{}} />
        </Provider>);

    const buttons = screen.getAllByRole("button");
    expect(buttons[1]).toBeDisabled();
});


test("Action page click in update", () => {
    const { getAllByRole } = render(
        <Provider store={store}>
            <Actions update={updateMock} remove={removeMock} wallet={{}} />
        </Provider>);

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    expect(updateMock).toBeCalledTimes(1);
});





