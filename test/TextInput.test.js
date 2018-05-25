import React from 'react';
import { ValidationForm, TextInput } from '../lib'
import { shallow, render, mount } from 'enzyme';
import toJson from "enzyme-to-json";

describe("<TextInput />", () => {
    let domProps = {
        id: "firstName",
        name:"firstName",
        className: "custom-class",
        "data-custom": 5,
        style: {
            color: "red",
            fontSize: 16
        },
        required:true
    }

    it('should match snapshot when render as input', () => {
        const wrapper = render(<TextInput {...domProps}/>)
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should match snapshot when render as textarea', () => {
        const wrapper = render(<TextInput {...domProps} multiline/>)
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should display success message correctly', (done) => {
        const wrapper = mount(
            <ValidationForm onSubmit={doNothing} immediate>
                <TextInput name="firstName" required
                successMessage="Looks Good!" />
            </ValidationForm>
        )
        let input = wrapper.find("input");
        input.instance().value="test";
        input.simulate('change');
        let successMessage = <div className="valid-feedback">Looks Good!</div>
        expect(wrapper.containsMatchingElement(successMessage)).toBe(true);
        done();
    })

    it('should display error message correctly', () => {
        const wrapper = mount(
        <ValidationForm onSubmit={doNothing} >
            <TextInput name="firstName" required />
        </ValidationForm>)
        wrapper.find("form").simulate("submit");
        let requiredMessage = <div className="invalid-feedback">{defaultErrorMessage.required}</div>
        expect(wrapper.containsMatchingElement(requiredMessage)).toBe(true);
    })

})