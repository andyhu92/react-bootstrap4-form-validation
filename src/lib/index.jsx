import React, { Component } from 'react';
import PropTypes from 'prop-types'

export function parseFileSize(size) {
    let num = parseFloat(size, 10);
    let unit = size.match(/[a-zA-Z]+/)[0];
    unit = unit.toLowerCase();
    switch (unit) {
        case "b": return num;
        case "kb": return 1024 * num;
        case "mb": return 1024 * 1024 * num;
        case "gb": return 1024 * 1024 * 1024 * num;
        default:
            throw new Error("Unknown unit " + unit);
    }
}

export class BaseFormControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPristine: true,
            errorMessage: ""
        }
        if (!React.createRef) this.inputRef = React.createRef();
        else this.inputRef = (element) => {
            //Before React 16.3
            this.inputRefLegacy = element;
        }
    }

    static propTypes = {
        name: PropTypes.string.isRequired,
        errorMessage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    }

    componentDidMount() {
        this.props.attachToForm(this);
    }

    componentWillUnmount() {
        this.props.detachFromForm(this);
    }

    getInputRef() {
        return this.inputRefLegacy || this.inputRef.current;
    }

    setError = (errorMessage) => {
        this.getInputRef().setCustomValidity(errorMessage);
        this.setState({ errorMessage });
    }

    clearError = () => this.setError("");

    buildErrorMessage() {
        let map = {
            valueMissing: "required",
            customError: "",
            patternMismatch: "pattern",
            rangeUnderflow: "min",
            rangeOverflow: "max",
            typeMismatch: "type"
        }

        let { errorMessage } = this.props;
        let defaultErrorMessage = this.props.defaultErrorMessage || {};
        //If string was passed to errorMessage, default to required error Message
        if (typeof (errorMessage) === "string") errorMessage = { required: errorMessage };
        errorMessage = Object.assign({}, ValidationForm.defaultErrorMessage, defaultErrorMessage, errorMessage); 

        let input = this.getInputRef();
        if (input) {
            let validityState = input.validity;
            let newErrorMessage = "";
            for (let prop in validityState) {
                if (validityState[prop]) {
                    if ((prop === "rangeUnderflow" || prop === "rangeOverflow") && errorMessage["range"]) {
                        newErrorMessage = errorMessage["range"];
                    } else {
                        if (prop === "customError") newErrorMessage = input.validationMessage;
                        else newErrorMessage = errorMessage[map[prop]];
                    }
                    break;
                }
            }

            if (this.props.minLength) {
                if (input.value.length < +this.props.minLength) {
                    input.setCustomValidity(errorMessage["minLength"]);
                    newErrorMessage = errorMessage["minLength"].replace("{minLength}", this.props.minLength);
                } else {
                    input.setCustomValidity("");
                    newErrorMessage = "";
                }
            }

            if (typeof this.props.validator === "function") {
                let validatorFn = this.props.validator;
                let value = input.value;
                if (!validatorFn(value)) {
                    input.setCustomValidity(errorMessage.validator);
                    newErrorMessage = errorMessage.validator;
                } else {
                    input.setCustomValidity("");
                    newErrorMessage = "";
                }
            }


            this.setState({ errorMessage: newErrorMessage });
        }
    }

    displayErrorMessage() {
        return <div className="invalid-feedback">{this.state.errorMessage}</div>;
    }

    displaySuccessMessage() {
        return (!this.state.isPristine && !this.state.errorMessage && this.props.successMessage) ?
            <div className="valid-feedback">{this.props.successMessage}</div> : null;
    }

    checkError = (e) => {
        let isPristine = this.state.isPristine;
        if (isPristine) this.setDirty();
        this.buildErrorMessage();
        this.changeInputErrorClass();
    }

    changeInputErrorClass() {
        const inputRef = this.getInputRef();
        if (inputRef.type !== "radio") {
            if (!inputRef.validity.valid) {
                inputRef.classList.add("is-invalid")
                inputRef.classList.remove("is-valid");
            } else {
                inputRef.classList.remove("is-invalid")
                inputRef.classList.add("is-valid");
            }
        }
    }

    handleBlur = (e) => {
        if (this.props.immediate) return;
        this.checkError();
    }

    handleChange = (e) => {
        if (this.props.onChange) this.props.onChange(e);
        if (!this.props.immediate) return;
        this.checkError();
    }

    validateInput = () => {
        this.setDirty();
        this.buildErrorMessage();
    }

    setDirty = () => {
        this.setState({ isPristine: false });
    }

    //Filter out non-DOM attribute
    filterProps = () => {
        let {
           errorMessage, successMessage, validator, defaultErrorMessage,
            attachToForm, detachFromForm, setFormDirty, label, immediate, inline, buttonBody, onButtonClick,
            ...rest
       } = this.props;
        return rest;
    }
}

export class TextInput extends BaseFormControl {
    static defaultProps = {
        ...BaseFormControl.defaultProps,
        className: "form-control",
        multiline: false
    }
    render() {
        let props = this.filterProps();
        let { multiline, successMessage, ...domProps } = props;
        return (
            <React.Fragment>
                {multiline ?
                    <textarea className={this.props.className} {...domProps} ref={this.inputRef} onChange={this.handleChange} onBlur={this.handleBlur}></textarea> :
                    <input className={this.props.className} {...domProps} ref={this.inputRef} onChange={this.handleChange} onBlur={this.handleBlur} />
                }
                {this.displayErrorMessage()}
                {this.displaySuccessMessage()}
            </React.Fragment>
        )
    }
}

export class TextInputGroup extends BaseFormControl {
    static defaultProps = {
        ...BaseFormControl.defaultProps,
        className: "form-control",
    }
    render() {
        let props = this.filterProps();
        let { prepend, append, ...domProps } = props;
        return (
            <React.Fragment>
                <div className="input-group">
                    {prepend && <div className="input-group-prepend">{prepend}</div>}
                    <input {...domProps} className={this.props.className} ref={this.inputRef} onChange={this.handleChange} onBlur={this.handleBlur} />
                    {append && <div className="input-group-append">{append}</div>}
                </div>
                {this.state.errorMessage && <div className="invalid-feedback d-block">{this.state.errorMessage}</div>}
                {this.displaySuccessMessage()}
            </React.Fragment>
        )
    }
}


export class RadioGroup extends BaseFormControl {
    static defaultProps = {
        inline: true,
        defaultValue: ""
    }
    static propTypes = {
        inline: PropTypes.bool,
        defaultValue: PropTypes.string
    }

    render() {
        const { name, inline, required, defaultValue } = this.props;
        return (
            <React.Fragment>
                {labels.map((label, i) => (
                    <div className={'form-check ' + (inline ? "form-check-inline" : "")} key={i}>
                        <input className="form-check-input" type="radio"
                            name={name} id={ids[i]} value={values[i]} required={required} disabled={disabled}
                            onChange={this.handleChange}
                            defaultChecked={values[i] === defaultValue}
                            ref={this.inputRef} />
                        <label className="form-check-label" htmlFor={ids[i]}>
                            {label}
                        </label>
                    </div>
                ))}
                {this.state.errorMessage && <div className="invalid-feedback">{this.state.errorMessage}</div>}
            </React.Fragment>
        )
    }
}

export class RadioItem extends BaseFormControl{
    render () {
        return (
            <React.Fragment>
                <input className="form-check-input" type="radio"
                            onChange={this.handleChange}
                            defaultChecked={values[i] === defaultValue}
                            ref={this.inputRef} />
                <label className="form-check-label" htmlFor={ids[i]}>
                    {label}
                </label>
            </React.Fragment>
        )
    }
}


export class FileInput extends BaseFormControl {
    static propTypes = {
        fileType: PropTypes.array,
        maxFileSize: PropTypes.string
    }
    // Check file mime type here https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
    customfilterProps = () => {
        let props = this.filterProps();
        let {
           maxFileSize, fileType,
            ...rest
           } = props;
        return rest;
    }

    handleChange = () => {
        const { maxFileSize, fileType, errorMessage } = this.props;
        const inputRef = this.getInputRef();
        const file = inputRef.files[0];
        if (!file) return;
        let limit = maxFileSize ? parseFileSize(maxFileSize) : null;
        let newErrorMessage = "";
        let fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase().trim();
        if (fileType.length > 0 && !fileType.includes(fileExtension)) {
            newErrorMessage = errorMessage["fileType"] || `File type mismatch`;
        } else if (limit && file.size > limit) {
            newErrorMessage = errorMessage["size"] || `File size exeed limit ${maxFileSize}`;
        } else {
            newErrorMessage = "";
        }
        inputRef.setCustomValidity(newErrorMessage);
        this.checkError();
    }

    render() {
        let domProps = this.customfilterProps();
        return (
            <React.Fragment>
                <input {...domProps} ref={this.inputRef} type="file" onChange={this.handleChange} />
                {this.displayErrorMessage()}
            </React.Fragment>
        )
    }
}

export class SelectGroup extends BaseFormControl {
    render() {
        let domProps = this.filterProps();
        return (
            <React.Fragment>
                <select {...domProps} ref={this.inputRef} onChange={this.handleChange} onBlur={this.handleBlur}>
                    {this.props.children}
                </select>
                {this.displayErrorMessage()}
            </React.Fragment>
        )
    }
}

export class Checkbox extends BaseFormControl {
    static defaultProps = {
        ...BaseFormControl.defaultProps,
        label: ""
    }

    static propTypes = {
        label: PropTypes.string.isRequired
    }
    render() {
        let domProps = this.filterProps();
        let { label } = this.props;
        return (
            <React.Fragment>
                <input type="checkbox" {...domProps} ref={this.inputRef} onChange={this.handleChange} />

                <label className="form-check-label" htmlFor={domProps.id}>
                    {this.props.label}
                </label>

                {this.displayErrorMessage()}
            </React.Fragment>
        )
    }
}

export class ValidationForm extends React.Component {
    static defaultProps = {
        className: "needs-validation",
        setFocusOnError: true,
        immediate: true
    }

    static propTypes = {
        className: PropTypes.string,
        setFocusOnError: PropTypes.bool,
        immediate: PropTypes.bool,
        onSubmit: PropTypes.func.isRequired,
        onErrorSubmit: PropTypes.func
    }

    static defaultErrorMessage = {
        required: "This field is required",
        pattern: "Input value does not match the pattern",
        type: "Input value does not match the type",
        minLength: "Please enter at least {minLength} characters",
        min: "Number is too low",
        max: "Number is too high",
        validator: "Validator check failed"
    }

    componentDidMount() {

    }

    inputs = {}

    attachToForm = (component) => {
        this.inputs[component.props.name] = component;
    }

    detachFromForm = (component) => {
        delete this.inputs[component.props.name]
    }

    isBaseFormControl(element) {
        if (typeof element !== "function") return false;
        while (element.__proto__ !== Object.prototype) {
            if (element.__proto__ === BaseFormControl) return true;
            element = element.__proto__;
        }
        return false;
    }

    registerChildren(children) {
        let newChildren = React.Children.map(children, (child) => {
            //If child is our baseFormControl, then assign new props to it
            if (!child) return child;
            if (this.isBaseFormControl(child.type)) {
                return React.cloneElement(child, {
                    ...child.props,
                    attachToForm: this.attachToForm,
                    detachFromForm: this.detachFromForm,
                    immediate: this.props.immediate,
                    defaultErrorMessage: this.props.defaultErrorMessage
                });
            } else {
                if (typeof child === 'string') return child;
                return React.cloneElement(child, {
                    children: (typeof child.props.children === "string") ? child.props.children : this.registerChildren(child.props.children)
                });
            }
        });
        return newChildren;
    }

    validateInputs() {
        for (let prop in this.inputs) {
            this.inputs[prop].validateInput();
        }
    }

    setFormDiry = () => {
        let form = this.refs.form;
        if (!form.classList.contains('was-validated')) form.classList.add('was-validated');
    }


    getFormData() {
        let model = {};
        for (let name in this.inputs) {
            let inputRef = this.inputs[name].getInputRef();
            let value = null;
            switch (inputRef.type) {
                case "checkbox":
                    value = inputRef.checked;
                    break;
                case "text": case "email": case "select-one": case "password": case "textarea":
                    value = inputRef.value;
                    break;
                case "radio":
                    let radios = document.getElementsByName(name);
                    for (let i = 0; i < radios.length; i++) {
                        if (radios[i].checked) {
                            value = radios[i].value;
                            break;
                        }
                    }
                    break;
                case "file":
                    value = inputRef.files[0];
                    break;
                default:
                    value = null;
            }
            model[name] = value;
        };
        return model;
    }

    mapInputs = (inputs) => {
        let arr = Object.keys(inputs).map(prop => inputs[prop]);
        return arr;
    }

    findFirstErrorInput = (inputs) => {
        return inputs.find(input => !input.getInputRef().validity.valid);
    }

    handleSubmit = (event) => {
        let form = this.refs.form;
        let formData = this.getFormData();
        let inputArr = this.mapInputs(this.inputs);
        this.setFormDiry();
        this.validateInputs();

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();

            if (this.props.onErrorSubmit) this.props.onErrorSubmit(event, formData, inputArr)
            if (this.props.setFocusOnError) {
                let firstErrorInput = this.findFirstErrorInput(inputArr);
                firstErrorInput.getInputRef().focus();
            }
        }
        else {
            if (this.props.onSubmit) this.props.onSubmit(event, formData, inputArr);
        }
    }

    //By default only clear customError and class, if isClearValue is true, clear value also
    resetValidationState = (isClearValue) => {
        for (let prop in this.inputs) {
            this.inputs[prop].setState({ errorMessage: "", isPristine: true });
            let inputRef = this.inputs[prop].getInputRef();
            inputRef.classList.remove("is-valid");
            inputRef.classList.remove("is-invalid");
            inputRef.setCustomValidity("");
            if (isClearValue) {
                if (inputRef.type == "checkbox") inputRef.checked = false;
                inputRef.value = "";
            }
        }
        this.refs.form.classList.remove("was-validated");
    }

    render() {
        let { onSubmit, onErrorSubmit, immediate, setFocusOnError, defaultErrorMessage, ...domProps } = this.props;
        return (
            <form noValidate ref="form"
                { ...domProps }
                onSubmit={this.handleSubmit}>
                {this.registerChildren(this.props.children)}
            </form>
        )
    }
}

