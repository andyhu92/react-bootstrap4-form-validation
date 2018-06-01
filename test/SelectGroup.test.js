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
})