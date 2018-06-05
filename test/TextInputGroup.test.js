import React from 'react';
import { ValidationForm, TextInputGroup } from '../lib'
import { shallow, render, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import validator from 'validator';

describe("<TextInputGroup />", () => {
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

    it('should match snapshot', () => {
        const wrapper = render(<TextInputGroup {...domProps} prepend={<span className="input-group-text">$</span>}/>)
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should display success message correctly when submit', (done) => {
        const wrapper = mount(
            <ValidationForm onSubmit={doNothing} immediate>
                <TextInputGroup name="amount" required successMessage="Looks Good!" 
                    prepend={<span className="input-group-text">$</span>}/>
            </ValidationForm>
        )
        let input = wrapper.find("input");
        input.instance().value="test";
        wrapper.find('form').simulate('submit');
        let successMessage = <div className="valid-feedback">Looks Good!</div>
        expect(wrapper.containsMatchingElement(successMessage)).toBe(true);
        done();
    })

    it('should display success message correctly when typing', (done) => {
        const wrapper = mount(
            <ValidationForm onSubmit={doNothing} immediate>
                <TextInputGroup name="amount" required successMessage="Looks Good!" 
                prepend={<span className="input-group-text">$</span>}/>
            </ValidationForm>
        )
        let input = wrapper.find("input");
        input.instance().value="test";
        input.simulate('change');
        let successMessage = <div className="valid-feedback">Looks Good!</div>
        expect(wrapper.containsMatchingElement(successMessage)).toBe(true);
        done();
    })

    
    it('should display error message correctly when submit', (done) => {
        const wrapper = mount(
            <ValidationForm onSubmit={doNothing} immediate>
                <TextInputGroup name="amount" required successMessage="Looks Good!" 
                prepend={<span className="input-group-text">$</span>}/>
            </ValidationForm>
        )
        wrapper.find('form').simulate('submit');
        let errorMessage = <div className="invalid-feedback">{defaultErrorMessage.required}</div>
        expect(wrapper.containsMatchingElement(errorMessage)).toBe(true);
        done();
    })

    it('should display error message correctly (immediate)', (done) => {
        const wrapper = mount(
            <ValidationForm onSubmit={doNothing} immediate>
                <TextInputGroup name="amount" required successMessage="Looks Good!" 
                prepend={<span className="input-group-text">$</span>}/>
            </ValidationForm>
        )
        let input = wrapper.find("input");
        input.getDOMNode().value="test";
        input.simulate('change');
        input.getDOMNode().value="";
        input.simulate('change');
        let errorMessage = <div className="invalid-feedback">{defaultErrorMessage.required}</div>
        expect(wrapper.containsMatchingElement(errorMessage)).toBe(true);
        done();
    })

    it('should display error message correctly (not-immediate)', (done) => {
        const wrapper = mount(
            <ValidationForm onSubmit={doNothing} immediate={false}>
                <TextInputGroup name="amount" required successMessage="Looks Good!" 
                prepend={<span className="input-group-text">$</span>}/>
            </ValidationForm>
        )
        let errorMessage = <div className="invalid-feedback">{defaultErrorMessage.required}</div>
        let input = wrapper.find("input");
        input.getDOMNode().value="test";
        input.simulate('change');
        input.getDOMNode().value="";
        input.simulate('change');
        expect(wrapper.containsMatchingElement(errorMessage)).toBe(false);
        input.simulate('blur');
        expect(wrapper.containsMatchingElement(errorMessage)).toBe(true);
        done();
    })

    it('should display proper error message correctly when giving different validation attributes', (done) => {
        let minLength=4;
        const wrapper = mount(
            <ValidationForm onSubmit={doNothing}>
                <TextInputGroup name="amount" required successMessage="Looks Good!" 
                    minLength={minLength}
                    pattern="\d+"
                    prepend={<span className="input-group-text">$</span>}/>
            </ValidationForm>
        )
        let errorMessage = <div className="invalid-feedback">{defaultErrorMessage.minLength.replace("{minLength}", minLength)}</div>
        let input = wrapper.find("input");
        input.getDOMNode().value="a";
        input.simulate('change');
        expect(wrapper.containsMatchingElement(errorMessage)).toBe(true);

        errorMessage = <div className="invalid-feedback">{defaultErrorMessage.pattern}</div>
        input.getDOMNode().value="abcd";
        input.simulate('change');
        
        expect(wrapper.containsMatchingElement(errorMessage)).toBe(true);
        done();
    });

    it('should support custom validator', (done) => {
        let errMsg = "Please enter a valid email";
        const wrapper = mount(
            <ValidationForm onSubmit={doNothing}>
                <TextInputGroup name="email" type="email" 
                    validator={validator.isEmail}
                    errorMessage={{validator: errMsg}}
                  />
            </ValidationForm>
        )
        let errorMessage = <div className="invalid-feedback">{errMsg}</div>
        let input = wrapper.find("input");
        input.getDOMNode().value="a";
        input.simulate('change');
        expect(wrapper.containsMatchingElement(errorMessage)).toBe(true);

        input.getDOMNode().value="test@test.com";
        input.simulate('change');
        
        expect(wrapper.containsMatchingElement(errorMessage)).toBe(false);
        done();
    });

    it('should work properly for controlled component', () => {
        const mockOnChange = jest.fn();
        const wrapper = mount(
            <ValidationForm onSubmit={doNothing}>
                <TextInputGroup name="email" 
                onChange={mockOnChange}
            />
            </ValidationForm>
        )
        wrapper.find('input').simulate("change", { target: { value: "test@test.com" }});
        expect(mockOnChange.mock.calls.length).toBe(1);
        expect(mockOnChange.mock.calls[0][0].target.value).toBe("test@test.com");
    });

    it('should work properly for uncontrolled component', () => {
        const mockOnSubmit = jest.fn();
        const wrapper = mount(
            <ValidationForm onSubmit={mockOnSubmit}>
                <TextInputGroup name="email" 
                    value="test@test.com"
                />
            </ValidationForm>
        )
        wrapper.find('form').simulate("submit");
        expect(mockOnSubmit.mock.calls.length).toBe(1);
        expect(mockOnSubmit.mock.calls[0][1]).toEqual({ email: "test@test.com"});
    });
})