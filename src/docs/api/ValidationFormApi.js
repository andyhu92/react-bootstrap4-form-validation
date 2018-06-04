import React, { Component } from 'react'
import { ValidationForm, TextInput, TextInputGroup, FileInput, SelectGroup, Checkbox } from "../../../lib";
import { initCodeSyntaxHighlight, InfoBox, PropertiesTable } from '../index'
import { Link } from 'react-router-dom';

export default class ValidationFormApi extends Component{
    constructor(props){
        super(props);
        // If you want to use the reset state function, you need to have a reference to the ValidationForm component
        //If your React < 16.3, check https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
        this.formRef = React.createRef();
        this.state = {
            immediate:true,
            setFocusOnError:true,
            clearInputOnReset:false
        }
    }
   
    properties = [
        {
            name:"onSubmit",
            type:"function",
            default:"",
            description:<div>
                            <p>Callback function evoked when the form is submitted without error.</p>
                            Signature: <code>(event, formData, formControls) => void</code>
                            <ul>
                                <li><i>event:</i> Submit event targeting the form</li>
                                <li><i>formData:</i> Serialized form data object. The object key will be the input name.</li>
                                <li><i>formControls:</i> Form controls reference inside the form.</li>
                            </ul>
                        </div>,
            required:true
        },
        {
            name:"onErrorSubmit",
            type:"function",
            default:"",
            description:<div>
                            <p>Callback function evoked when the form is submitted with error.</p>
                            Signature: <code>(event, formData, errorInputs) => void</code>
                            <ul>
                                <li><i>event:</i> Submit event targeting the form <b>(preventDefault and stopPropagation has been called)</b></li>
                                <li><i>formData:</i> Serialized form data object. Key will be the input name.</li>
                                <li><i>errorInputs:</i> Object contains input with error. Useful when building validation summary.<br/>
                                    <b>key:</b> input name. <b>value:</b> Reference to the wrapper form control component. 
                                        You can get error message from <code>(control).state.errorMessage</code>
                                </li>
                            </ul>
                        </div>
        },
        {
            name:"className",
            type:"string",
            default:"needs-validation",
            description:<p><a href='https://getbootstrap.com/docs/4.0/components/forms/#validation' target='_blank'>Default form class name.</a></p>
        },
        {
            name:"immediate",
            type:"boolean",
            default:"true",
            description:<p>Whether to validate input on <code>change</code> event or <code>blur</code> event. Try to toggle this property in sample form above.</p>
        },
        {
            name:"setFocusOnError",
            type:"boolean",
            default:"true",
            description:"Whether to focus on first error input when submit. Try to toggle this property in sample form above."
        },
        {
            name:"defaultErrorMessage",
            type:"object",
            default:"{}",
            description:<p>Default error message for the current instance of <code>ValidationForm</code>. See <Link to="/example/error-message">detailed explanation here.</Link></p>
        }
    ]

    componentDidMount() {
        initCodeSyntaxHighlight();
    }

    handleSubmit = (e, formData, inputs) => {
        e.preventDefault();
        console.log(formData);
        alert(JSON.stringify(formData, null, 2));
    }

    handleErrorSubmit = (e,formData, errorInputs) => {
        console.log(e,formData, errorInputs)
    }

    handleCheck = (e) => {
        let name = e.target.name;
        this.setState({ [name]: e.target.checked })
    }

    resetForm = () => {
        let formRef = this.formRef.current;
        formRef.resetValidationState(this.state.clearInputOnReset);
    }

    render () {
        return (
            <div className="row">
                <div className="col-md-5">
                    <h4>ValidationForm</h4>
                    <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit} 
                        ref={this.formRef}
                        immediate={this.state.immediate} 
                        setFocusOnError={this.state.setFocusOnError}
                        defaultErrorMessage={{ required: "Please enter something."}}
                    >
                        <div className="form-group">
                            <label htmlFor="fullName">Full name</label>
                            <TextInput name="fullName" id="fullName" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <TextInputGroup name="email" id="email" type="email" 
                                prepend={<span className="input-group-text">@</span>}
                                successMessage="Looks good!"
                                required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="attachment">Attachment</label>
                            <FileInput name="attachment" id="attachment" required
                                errorMessage="Please upload a file"
                                fileType={["pdf"]} maxFileSize="120 kb"/>
                        </div>

                        <Checkbox id="isSubscribe" name="isSubscribe" label="Subscribe to newsletter" 
                            required errorMessage="Please check this..." />

                        <div className="form-group mt-3">
                            <button className="btn btn-primary">Submit</button>
                            <button className="btn btn-default ml-2" type="button"
                                onClick={this.resetForm}>Reset</button>
                        </div>
                    </ValidationForm>

                    <div className="border px-3 py-3">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="immediate" name="immediate"
                                onChange={this.handleCheck} checked={this.state.immediate}/>
                            <label className="form-check-label" htmlFor="immediate">Toggle <b>immediate</b></label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="setFocusOnError" name="setFocusOnError"
                                onChange={this.handleCheck} checked={this.state.setFocusOnError}/>
                            <label className="form-check-label" htmlFor="setFocusOnError">Toggle <b>setFocusOnError</b></label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="clearInputOnReset" name="clearInputOnReset"
                                onChange={this.handleCheck} checked={this.state.clearInputOnReset}/>
                            <label className="form-check-label" htmlFor="clearInputOnReset">Toggle <b>clearInputOnReset</b></label>
                        </div>
                    </div>

                    <InfoBox>
                            To make <code>ValidationForm</code> to work, the <code>name</code> attribute is required for all form controls.
                    </InfoBox>

                    <h5>Reset form</h5>
                    <p>There is a method <code>resetValidationState</code> in the instance of <code>ValidationForm</code>.
                    By default this function only reset the <b>validation state</b> (error message, classes...), since most of the time
                    you have controlled form components and you can reset the state to reset the values.</p>

                    <p className="mt-2">However, you can pass a boolean flag to <code>resetValidationState</code> to also reset the <b>DOM node</b> value for uncontrolled components.</p>
                    <p>Check the code at right to see how to reset the form validation state.</p>
                  
                </div>
                <div className="col-md-7">
                    <pre>
                        <code className="lang-javascript" style={{height:800}}>
{`
import React, { Component } from 'react'
import { ValidationForm, TextInput, TextInputGroup, FileInput, SelectGroup, Checkbox } from "react-bootstrap4-form-validation";

class ValidationFormDemo extends Component {
    constructor(props){
        super(props);
        // If you want to use the reset state function, you need to have a reference to the ValidationForm component
        //If your React < 16.3, check https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
        this.formRef = React.createRef();
        this.state = {
            immediate:true,
            setFocusOnError:true,
            clearInputOnReset:false
        }
    }

    handleSubmit = (e, formData, inputs) => {
        e.preventDefault();
        console.log(formData);
        alert(JSON.stringify(formData, null, 2));
    }

    handleErrorSubmit = (e,formData, errorInputs) => {
        console.log(e,formData, inputs)
    }

    resetForm = () => {
        let formRef = this.formRef.current;
        formRef.resetValidationState(this.state.clearInputOnReset);
    }

    render () {
        return (
            <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit} 
                        ref={this.formRef}
                        immediate={this.state.immediate} 
                        setFocusOnError={this.state.setFocusOnError}
                        defaultErrorMessage={{ required: "Please enter something."}} >
                <div className="form-group">
                    <label htmlFor="fullName">Full name</label>
                    <TextInput name="fullName" id="fullName" required/>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <TextInputGroup name="email" id="email" type="email" 
                                prepend={<span className="input-group-text">@</span>}
                                successMessage="Looks good!"
                                required />
                </div>

                <div className="form-group">
                    <label htmlFor="attachment">Attachment</label>
                    <FileInput name="attachment" id="attachment" required
                            errorMessage="Please upload a file"
                            fileType={["pdf"]} maxFileSize="120 kb"/>
                </div>

                <Checkbox id="isSubscribe" name="isSubscribe" label="Subscribe to newsletter" 
                    required errorMessage="Please check this..." />

                <div className="form-group mt-3">
                    <button className="btn btn-primary">Submit</button>
                    <button className="btn btn-default ml-2" type="button" onClick={this.resetForm}>Reset</button>
                </div>
            </ValidationForm>
        )
    }
`}
                        </code>
                    </pre>
                </div>

                <PropertiesTable properties={this.properties}/>
            </div>
        )
    }
}