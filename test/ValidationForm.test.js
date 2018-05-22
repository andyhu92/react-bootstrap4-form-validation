import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { ValidationForm, TextInput } from '../lib'
import toJson from "enzyme-to-json";

const doNoThing = () => { };

describe('<ValidationForm />', () => {
    it('should has default class: needs-validation', () => {
        const wrapper = render(<ValidationForm onSubmit={doNoThing} />)
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should accept dom properties and match previous snapshot', () => {
        let domProps = {
            id: "form",
            className: "custom-class",
            "data-custom": 5,
            style: {
                color: "red",
                fontSize: 16
            }
        }
        const wrapper = render(<ValidationForm onSubmit={doNoThing} {...domProps} />)
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should display default error message for fields', () => {
        let defaultErrorMessage = {
            required: "This field is required",
            pattern: "Input value does not match the pattern",
            type: "Input value does not match the type",
            minLength: "Please enter at least {minLength} characters",
            min: "Number is too low",
            max: "Number is too high"
        };
        const wrapper = mount(
            <ValidationForm className="container" onSubmit={doNoThing} >
                <div className="form-group">
                    <TextInput name="firstName" required />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">Submit</button>
                </div>
            </ValidationForm>)
        
       wrapper.find("form").simulate("submit");
       let requiredMEssage = <span className="invalid-feedback">{defaultErrorMessage.required}</span>
   
       expect(wrapper.containsMatchingElement(requiredMEssage)).toBe(true);
    })
});
