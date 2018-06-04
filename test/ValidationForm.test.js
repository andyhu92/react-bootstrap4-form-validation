import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { ValidationForm, TextInput, Checkbox, SelectGroup, Radio } from '../lib'
import toJson from "enzyme-to-json";


describe('<ValidationForm />', () => {
    it('should has default class: needs-validation', () => {
        const wrapper = render(<ValidationForm onSubmit={doNothing} />)
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
        const wrapper = render(<ValidationForm onSubmit={doNothing} {...domProps} />)
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should focus on first error input when submit', () => {
        const wrapper = mount(
            <ValidationForm onSubmit={doNothing} >
                <TextInput name="age"/>
                <TextInput name="firstName" required id="firstName"/>
            </ValidationForm>)

        let fakeFocus = jest.fn();
        wrapper.find("#firstName").at(1).getDOMNode().focus = fakeFocus
        wrapper.find("form").simulate("submit");

        expect(fakeFocus).toHaveBeenCalled();
    })

    it('should not focus on first error input when submit if disable this feature', () => {
        const wrapper = mount(
            <ValidationForm onSubmit={doNothing} setFocusOnError={false}>
                <TextInput name="age"/>
                <TextInput name="firstName" required id="firstName"/>
            </ValidationForm>)

        let fakeFocus = jest.fn();
        wrapper.find("#firstName").at(1).getDOMNode().focus = fakeFocus
        wrapper.find("form").simulate("submit");
        expect(fakeFocus).not.toHaveBeenCalled();
    })

    it('should serialize form data correctly', (done) => {
        const mockCallback = jest.fn();
        const wrapper = mount(
            <ValidationForm onSubmit={(e, formData) => mockCallback(formData)}>
                <TextInput name="age" value="16" type="number"/>
                <TextInput name="firstName" value="john" id="firstName"/>
                <Checkbox name="isSubscribe" label="isSubscribe" id="isSubscribe" defaultChecked={true}/>
                <SelectGroup name="color" value="red">
                    <option value="red">Red</option>
                </SelectGroup>
            </ValidationForm>)

        wrapper.find("form").simulate("submit");
        mockCallback({});
        expect(mockCallback.mock.calls[0][0]).toEqual(
            {
                age: "16",
                firstName: "john",
                isSubscribe: true,
                color: "red",
            });
        done();
    })
});
