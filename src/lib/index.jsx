import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './polyfill';

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
                    if (prop === "customError") newErrorMessage = input.validationMessage;
                    else newErrorMessage = errorMessage[map[prop]];
                    break;
                }
            }

            //Add support for minLength attribute
            if (this.props.minLength) {
                if (input.value.length < +this.props.minLength) {
                    input.setCustomValidity(errorMessage["minLength"]);
                    newErrorMessage = errorMessage["minLength"].replace("{minLength}", this.props.minLength);
                } else {
                    if (newErrorMessage === errorMessage["minLength"]) {
                        input.setCustomValidity("");
                        newErrorMessage = "";
                    }
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

    //displayBlock for radio group structure
    displaySuccessMessage(displayBlock) {
        return (!this.state.isPristine && !this.state.errorMessage && this.props.successMessage) ?
            <div className={"valid-feedback " + (displayBlock?"d-block":"")}>{this.props.successMessage}</div> : null;
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
            attachToForm, detachFromForm, setFormDirty, label, immediate,
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
            <div>
                {multiline ?
                    <textarea className={this.props.className} {...domProps} ref={this.inputRef} onChange={this.handleChange} onBlur={this.handleBlur}></textarea> :
                    <input className={this.props.className} {...domProps} ref={this.inputRef} onChange={this.handleChange} onBlur={this.handleBlur} />
                }
                {this.displayErrorMessage()}
                {this.displaySuccessMessage()}
            </div>
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
            <div className="input-group">
                {prepend && <div className="input-group-prepend">{prepend}</div>}
                <input {...domProps} className={this.props.className} ref={this.inputRef} onChange={this.handleChange} onBlur={this.handleBlur} />
                {append && <div className="input-group-append">{append}</div>}
                {this.state.errorMessage && <div className="invalid-feedback d-block">{this.state.errorMessage}</div>}
                {this.displaySuccessMessage()}
            </div>
        )
    }
}


class RadioGroup extends BaseFormControl {
    static defaultProps = {
        inline: true,
        containerStyle: {}
    }
    static propTypes = {
        inline: PropTypes.bool,
        name: PropTypes.string.isRequired,
        containerStyle: PropTypes.object,
        containerClassName: PropTypes.string,
        defaultValue: PropTypes.string,
        valueSelected: PropTypes.string,
        onChange: PropTypes.func
    }

    getInputRef() {
        let inputRef = window.document.querySelectorAll(`[name=${this.props.name}]`)[0];
        return inputRef;
    }

    mapRadioItems() {
        return React.Children.map(this.props.children, (child) => {
            if (child.type !== RadioItem) throw new TypeError("Only RadioItem is allowed inside RadioGroup");
            return React.cloneElement(child, {
                ...child.props,
                inline: this.props.inline,
                name: this.props.name,
                required: this.props.required,
                defaultValue: this.props.defaultValue,
                onChange: this.props.onChange,
                valueSelected: this.props.valueSelected,
                checkError: this.checkError
            });
        });
    }

    render() {
        let props = this.filterProps();
        const { containerStyle, containerClassName } = props;
        return (
            <div style={containerStyle} className={containerClassName}>
                {this.mapRadioItems()}
                {this.state.errorMessage && <div className="invalid-feedback d-block">{this.state.errorMessage}</div>}
                {this.displaySuccessMessage(true)}
            </div>
        )
    }
}

class RadioItem extends Component {
    static defaultProps = {
        containerStyle: {},
        containerClassName: ""
    }

    static propTypes = {
        value: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        containerStyle: PropTypes.object,
        containerClassName: PropTypes.string
    }

    onChange = (e) => {
        this.props.onChange(e, e.target.value);
        this.props.checkError();
    }

    render() {
        let { checkError, containerStyle, containerClassName, label, inline, defaultValue, valueSelected, onChange, ...domProps } = this.props;
        let checkProps = defaultValue ? { defaultChecked: this.props.value === defaultValue }
            : { checked: this.props.value === valueSelected, onChange: this.onChange };
        return (
            <div className={containerClassName + " form-check " + (inline ? "form-check-inline" : "")} style={containerStyle}>
                <input className="form-check-input" type="radio"
                    {...checkProps }
                    {...domProps} />
                <label className="form-check-label" htmlFor={this.props.id}>
                    {label}
                </label>
            </div>
        )
    }
}

export const Radio = {
    RadioGroup,
    RadioItem
}


export class FileInput extends BaseFormControl {
    static propTypes = {
        fileType: PropTypes.array,
        maxFileSize: PropTypes.string
    }

    static defaultProps = {
        ...BaseFormControl.defaultProps,
        className: "form-control",
    }

    handleChange = () => {
        let { maxFileSize, fileType, errorMessage = {} } = this.props;
        errorMessage = Object.assign(ValidationForm.defaultErrorMessage, errorMessage);
        const inputRef = this.getInputRef();
        const file = inputRef.files[0];
        if (!file) return;
        let limit = maxFileSize ? parseFileSize(maxFileSize) : null;
        let newErrorMessage = "";
        let fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase().trim();
        if (fileType.length > 0 && !fileType.includes(fileExtension)) {
            newErrorMessage = errorMessage["fileType"];
        } else if (limit && file.size > limit) {
            newErrorMessage = errorMessage["maxFileSize"];
        } else {
            newErrorMessage = "";
        }
        inputRef.setCustomValidity(newErrorMessage);
        this.checkError();
    }

    render() {
        let props = this.filterProps();
        let {
            maxFileSize, fileType,
            ...domProps
            } = props;
        return (
            <div>
                <input {...domProps} ref={this.inputRef} type="file" onChange={this.handleChange} />
                {this.displayErrorMessage()}
                {this.displaySuccessMessage()}
            </div>
        )
    }
}

export class SelectGroup extends BaseFormControl {
    static defaultProps = {
        ...BaseFormControl.defaultProps,
        className: "form-control",
    }
    render() {
        let domProps = this.filterProps();
        return (
            <div>
                <select className={this.props.className} {...domProps} ref={this.inputRef} onChange={this.handleChange} onBlur={this.handleBlur}>
                    {this.props.children}
                </select>
                {this.displayErrorMessage()}
                {this.displaySuccessMessage()}
            </div>
        )
    }
}

export class Checkbox extends BaseFormControl {
    static defaultProps = {
        ...BaseFormControl.defaultProps,
        className: "form-check-input",
        containerStyle: {},
        label: "",
        inline: false
    }

    static propTypes = {
        label: PropTypes.string.isRequired,
        containerStyle: PropTypes.object,
        inline: PropTypes.bool,
        id: PropTypes.string.isRequired
    }

    handleChange = (e) => {
        let checked = e.target.checked;
        if (this.props.onChange) this.props.onChange(e, checked);
        this.checkError();
    }

    render() {
        let props = this.filterProps();
        let { label, inline, containerStyle, className, ...domProps } = props;
        return (
            <div className={"form-check " + (inline ? "form-check-inline" : "")} style={containerStyle}>
                <input type="checkbox" className={this.props.className} {...domProps} ref={this.inputRef} onChange={this.handleChange} checked={this.props.value} />
                <label className="form-check-label" htmlFor={domProps.id}>
                    {this.props.label}
                </label>
                {this.displayErrorMessage()}
                {this.displaySuccessMessage()}
            </div>
        )
    }
}

export class ValidationForm extends React.Component {
    static defaultProps = {
        className: "needs-validation",
        setFocusOnError: true,
        immediate: true,
        defaultErrorMessage: {}
    }

    static propTypes = {
        className: PropTypes.string,
        defaultErrorMessage: PropTypes.object,
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
        fileType: "File type mismatch",
        maxFileSize: "File size exceed limit",
        validator: "Validator check failed"
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
                case "radio":
                    let radios = document.querySelectorAll(`[name=${name}]`);
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
                    value = inputRef.value;
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

    getErrorInputs = (inputs) => {
        let map = {};
        inputs.forEach(input => {
            let inputRef = input.getInputRef();
            let validityState = inputRef.validity;
            if (!validityState.valid) map[inputRef.name] = input;
        })
        return map;
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
            if (this.props.onErrorSubmit) this.props.onErrorSubmit(event, formData, this.getErrorInputs(inputArr));
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

