
import React, { Component } from 'react'
import { ValidationForm, TextInput } from '../../lib';
import { initCodeSyntaxHighlight, InfoBox, PropertiesTable } from '../index'
import validator from 'validator';

export default class TextInputApi extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        description: "",
        password: "",
        confirmPassword: "",
    }

    componentDidMount (){
        initCodeSyntaxHighlight();
    }

    TextInputProperties = [
        {
            name:"required",
            type:"boolean",
            default:<code>false</code>,
            description:"Whether the field is required"
        },
        {
            name:"minLength",
            type:"number | string",
            default:"",
            description:"Minlength for the input value"
        },
        {
            name:"maxLength",
            type:"number | string",
            default:"",
            description:"Maxlength for the input value"
        },
        {
            name:"pattern",
            type:"string",
            default:"",
            description:"Regex pattern for the input"
        },
        {
            name:"validator",
            type:"function",
            default:"",
            description:<p>A custom validator function. Signature: <code>(value) => boolean</code>
                <br/>See code above for sample.
            </p>
        },
        {
            name:"name",
            type:"string",
            default:"",
            description:<p>The <code>name</code> attribute of underlying input.</p>,
            required:true
        },
        {
            name:"multiline",
            type:"boolean",
            default:<code>false</code>,
            description:<p><code>textarea</code> or <code>input</code></p>
        },
        {
            name:"errorMessage",
            type:"string | object",
            default:"",
            description:<div>The error message for the input. 
                <p>If pass as <code>string</code>, the message will be used for <code>required </code>
             validation rule.</p>
                <p>If pass as <code>object</code>, the <i>key</i> will be the validation attribute name and the <i>value</i> will be the error message.
                    See the code for example.
                </p>
             </div>
        },
        {
            name:"successMessage",
            type:"string",
            default:"",
            description:<p>The success message when the input value passed all validation rules.</p>
        },
        {
            name:"className",
            type:"string",
            default:<code>form-control</code>,
            description:<p>class name for the input</p>
        },
        {
            name:"value",
            type:"string",
            default:"",
            description:"The value of input"
        },
        {
            name:"onChange",
            type:"function",
            default:"",
            description:<div>
                            <p>Callback function evoked when the input value changed</p>
                            Signature: <code>(event) => void</code>
                            <ul>
                                <li><i>event:</i> Change event targeting the input </li>
                            </ul>
                        </div>
        },
    ]


    handleSubmit = (e, formData, inputs) => {
        e.preventDefault();
        alert(JSON.stringify(formData, null, 2));
    }

    handleErrorSubmit = (e, formData, errorInputs) => {
        console.error(errorInputs)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    matchPassword = (value) => {
        return value && value === this.state.password;   
    }

    render () {
        return (
            <div className="row">
                <div className="col-md-5">
                    <h4>TextInput</h4>
                    <hr/>
                    <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstName">First name</label>
                            <TextInput name="firstName" id="firstName" required
                                value={this.state.firstName}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last name</label>
                            <TextInput name="lastName" id="lastName" minLength="4"
                                value={this.state.lastName}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <TextInput name="email" id="email" type="email" 
                                validator={validator.isEmail} 
                                errorMessage={{validator:"Please enter a valid email"}}
                                value={this.state.email}
                                onChange={this.handleChange}
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <TextInput name="description" id="description" multiline required
                                value={this.state.description}
                                onChange={this.handleChange}
                                rows="5"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <TextInput name="password" id="password" type="password" required 
                                pattern="(?=.*[A-Z]).{6,}"
                                errorMessage={{required:"Password is required", pattern: "Password should be at least 6 characters and contains at least one upper case letter"}}
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <TextInput name="confirmPassword" id="confirmPassword" type="password" required 
                                validator={this.matchPassword}
                                errorMessage={{required:"Confirm password is required", validator: "Password does not match"}}
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </ValidationForm>
                    <InfoBox><strong>All</strong>  the other properties not mentioned at below will also be passed into the underlying <code>input</code> tag.
                    <br/>For example: <code>{`<TextInput name="something" disabled />`}</code> will render a disabled input.</InfoBox>
                </div>
                <div className="col-md-7">
                    <pre>
                        <code className="lang-javascript" style={{height:800}}>
                            {`
import React, { Component } from 'react'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import validator from 'validator'

class TextInputDemo extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        description: "",
        password: "",
        confirmPassword: "",
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e, formData, inputs) => {
        e.preventDefault();
        alert(JSON.stringify(formData, null, 2));
    }

    handleErrorSubmit = (e, formData, errorInputs) => {
        console.error(errorInputs)
    }

    matchPassword = (value) => {
        return value && value === this.state.password;   
    }

    render () {
        return (
            //Controlled Components
            <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First name</label>
                    <TextInput name="firstName" id="firstName" required
                        value={this.state.firstName}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last name</label>
                    <TextInput name="lastName" id="lastName" minLength="4"
                        value={this.state.lastName}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <TextInput name="email" id="email" type="email" 
                        validator={validator.isEmail} 
                        errorMessage={{validator:"Please enter a valid email"}}
                        value={this.state.email}
                        onChange={this.handleChange}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <TextInput name="description" id="description" multiline required
                        value={this.state.description}
                        onChange={this.handleChange}
                        rows="5"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <TextInput name="password" id="password" type="password" required 
                        pattern="(?=.*[A-Z]).{6,}"
                        errorMessage={{required:"Password is required", pattern: "Password should be at least 6 characters and contains at least one upper case letter"}}
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <TextInput name="confirmPassword" id="confirmPassword" type="password" required 
                        validator={this.matchPassword}
                        errorMessage={{required:"Confirm password is required", validator: "Password does not match"}}
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">Submit</button>
                </div>
            </ValidationForm>
        )
    }
}

                            `}
                        </code>
                    </pre>
                </div>
                <PropertiesTable properties={this.TextInputProperties}/>
            </div>
       )
    }
}