import React from 'react';
import { ValidationForm, Checkbox } from '../lib'
import { shallow, render, mount } from 'enzyme';
import toJson from "enzyme-to-json";

describe("<CheckBox />", () => {
    let domProps = {
        id: "acknowledge",
        name:"acknowledge",
        "data-custom": 5,
        style: {
            color: "red",
            fontSize: 16
        },
        required:true
    }

    it('should match snapshot', () => {
        const wrapper = render(<Checkbox {...domProps} containerStyle={{width:100}}/>)
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should display error message correctly when submit', () => {
        const wrapper = mount(
        <ValidationForm onSubmit={doNothing}>
            <Checkbox {...domProps} required/>
        </ValidationForm>)

        let errorMessage = <div className="invalid-feedback">{defaultErrorMessage.required}</div>
        wrapper.find('form').simulate('submit');
        expect(wrapper.containsMatchingElement(errorMessage)).toBe(true);
    });

    it('should display error message correctly when uncheck', () => {
        const wrapper = mount(
        <ValidationForm onSubmit={doNothing}>
            <Checkbox {...domProps} required/>
        </ValidationForm>)

        let errorMessage = <div className="invalid-feedback">{defaultErrorMessage.required}</div>
        wrapper.find('input').simulate('change');
        wrapper.find('input').simulate('change');
        expect(wrapper.containsMatchingElement(errorMessage)).toBe(true);
    });
})