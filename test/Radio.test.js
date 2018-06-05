import React from 'react';
import { ValidationForm, Radio } from '../lib'
import { shallow, render, mount } from 'enzyme';
import toJson from "enzyme-to-json";

describe("<Radio />", () => {
    it('should match snapshot', () => {
        const wrapper = render(
            <Radio.RadioGroup containerStyle={{width:100}} containerClassName="test" required name="sample">
                <Radio.RadioItem id="a" label="a" value="a" />
                <Radio.RadioItem id="b" label="b" value="b" style={{margin:50}}/>
                <Radio.RadioItem id="c" label="c" value="c" disabled/>
            </Radio.RadioGroup>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    //getFormData not testable for radio
    // it('should display error message correctly when submit', () => {
    //     const wrapper = mount(
    //     <ValidationForm onSubmit={doNothing}>
    //         <Radio.RadioGroup required name="sample">
    //             <Radio.RadioItem id="a" label="a" value="a" />
    //             <Radio.RadioItem id="b" label="b" value="b" />
    //         </Radio.RadioGroup>
    //     </ValidationForm>)

    //     let errorMessage = <div className="invalid-feedback">{defaultErrorMessage.required}</div>
    //     wrapper.find('form').simulate('submit');
    //     expect(wrapper.containsMatchingElement(errorMessage)).toBe(true);
    // });
})