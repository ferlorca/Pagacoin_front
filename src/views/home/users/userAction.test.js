import React from "react";
import Actions from "./userActions";
import { render ,fireEvent,screen  } from "@testing-library/react";


const updateMock = jest.fn();
const setSelectedMock = jest.fn();

test("Action page intitial render", () => {
    const { getAllByRole } = render(
        <Actions update={updateMock} setSelected={setSelectedMock}/>
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
});


test("Action page click in select user", () => {
    const { getAllByRole } = render(
        <Actions update={updateMock} setSelected={setSelectedMock}/>
    );

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    expect(setSelectedMock).toBeCalledTimes(1);
});


test("Action page click in update", () => {
    const { getAllByRole } = render(
        <Actions update={updateMock} setSelected={setSelectedMock}/>
    );

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[1]);
    expect(updateMock).toBeCalledTimes(1);
});





