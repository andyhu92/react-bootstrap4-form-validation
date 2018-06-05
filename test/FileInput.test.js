import React from 'react';
import { ValidationForm, FileInput, parseFileSize } from '../lib'
import { mount } from 'enzyme';

describe("parseFile function", () => {
    it("should parse file size correctly", () => {
        expect(parseFileSize("1b")).toBe(1);
        expect(parseFileSize("10 b")).toBe(10);
        expect(parseFileSize("12KB")).toBe(12*1024);
        expect(parseFileSize("50mb")).toBe(50*1024*1024);
        expect(parseFileSize("1gb")).toBe(1*1024*1024*1024);
        expect(parseFileSize("24.6gb")).toBe(24.6*1024*1024*1024);
    })

    it("should throw error when receiving unsupported unit", () => {
        expect(() => parseFileSize("1 tb")).toThrow();
        expect(() => wparseFileSize("10 bx")).toThrow();
    })

    
    it('should display error message correctly when submit', () => {
        const wrapper = mount(
        <ValidationForm onSubmit={doNothing}>
            <FileInput name="file" required fileType={["pdf", "XLSX"]} maxFileSize="8 b"/>
        </ValidationForm>)

        let errorMessage = <div className="invalid-feedback">{defaultErrorMessage.required}</div>
        wrapper.find('form').simulate('submit');
        expect(wrapper.containsMatchingElement(errorMessage)).toBe(true);
    });
})