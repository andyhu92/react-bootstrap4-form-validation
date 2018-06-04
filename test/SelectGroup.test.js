import React from 'react';
import { ValidationForm, SelectGroup } from '../lib'
import { shallow, render, mount } from 'enzyme';
import toJson from "enzyme-to-json";

describe("<SelectGroup />", () => {
    let domProps = {
        id: "color",
        name:"color",
        "data-custom": 5,
        style: {
            color: "red",
            fontSize: 16
        },
        required:true
    }

    it('should match snapshot', () => {
        const wrapper = render(
        <SelectGroup {...domProps}>
            <option value="">-- Select Color --</option>
            <option value="red">Red</option>
        </SelectGroup>)
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should display error message correctly when submit', () => {
        const wrapper = mount(
        <ValidationForm onSubmit={doNothing}>
            <SelectGroup name="color" required>
            <option value="">-- Select Color -- </option>
            <option value="red">Red</option>
            </SelectGroup>
        </ValidationForm>
      )

        let errorMessage = <div className="invalid-feedback">{defaultErrorMessage.required}</div>
        wrapper.find('form').simulate('submit');
        expect(wrapper.containsMatchingElement(errorMessage)).toBe(true);
    });

    it('should display error message correctly when on Change', () => {
        const wrapper = mount(
        <ValidationForm onSubmit={doNothing}>
            <SelectGroup name="color" required>
                <option value="">-- Select Color -- </option>
                <option value="red">Red</option>
            </SelectGroup>
        </ValidationForm>
      )

        let errorMessage = <div className="invalid-feedback">{defaultErrorMessage.required}</div>
        wrapper.find('select').getDOMNode().value = "red";
        wrapper.find('select').simulate("change");
        expect(wrapper.containsMatchingElement(errorMessage)).toBe(false);

        wrapper.find('select').getDOMNode().value = "";
        wrapper.find('select').simulate("change");
        expect(wrapper.containsMatchingElement(errorMessage)).toBe(true);
    });

    it('should display success message correctly when on Change', () => {
        const wrapper = mount(
        <ValidationForm onSubmit={doNothing}>
            <SelectGroup name="color" required successMessage="Looks good!">
                <option value="">-- Select Color -- </option>
                <option value="red">Red</option>
            </SelectGroup>
        </ValidationForm>
      )

        let successMessage = <div className="valid-feedback">Looks good!</div>
        wrapper.find('select').getDOMNode().value = "red";
        wrapper.find('select').simulate("change");
        expect(wrapper.containsMatchingElement(successMessage)).toBe(true);
    });

    it('should work properly for controlled component', () => {
        const mockOnChange = jest.fn();
        const wrapper = mount(
            <ValidationForm onSubmit={doNothing}>
                <SelectGroup name="color" required successMessage="Looks good!" value="" onChange={mockOnChange}>
                    <option value="">-- Select Color -- </option>
                    <option value="red">Red</option>
                </SelectGroup>
            </ValidationForm>
        )
        wrapper.find('select').simulate("change", { target: { value: "red" }});
        expect(mockOnChange.mock.calls.length).toBe(1);
        expect(mockOnChange.mock.calls[0][0].target.value).toBe("red");
    });

    it('should work properly for uncontrolled component', () => {
        const mockOnSubmit = jest.fn();
        const wrapper = mount(
            <ValidationForm onSubmit={mockOnSubmit}>
                <SelectGroup name="color" required successMessage="Looks good!" defaultValue="red">
                    <option value="">-- Select Color -- </option>
                    <option value="red">Red</option>
                </SelectGroup>
            </ValidationForm>
        )
        wrapper.find('form').simulate("submit");
        expect(mockOnSubmit.mock.calls.length).toBe(1);
        expect(mockOnSubmit.mock.calls[0][1]).toEqual({ color: "red"});
    });
})