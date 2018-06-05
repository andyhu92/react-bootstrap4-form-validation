
import React, { Component } from 'react'
import { ValidationForm, TextInputGroup } from '../../lib';
import { initCodeSyntaxHighlight, InfoBox, PropertiesTable } from '../index'

export default class TextInputGroupApi extends Component {
    componentDidMount (){
        initCodeSyntaxHighlight();
    }

    TextInputGroupProperties = [
        {
            name:"prepend",
            type:"React Element",
            default:"",
            description:"The prepended html for the input group. See code for sample."
        },
        {
            name:"append",
            type:"React Element",
            default:"",
            description:"The appended html for the input group. See code for sample."
        },
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
            name:"inputGroupClassName",
            type:"string",
            default:<code>input-group</code>,
            description:<p>class name for the wrapped input group <code>div</code>.</p>
        },
        {
            name:"inputGroupStyle",
            type:"object",
            default:"",
            description:<p>style object for the wrapped input group <code>div</code>.</p>
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

    handleChange = (e, value) => {
        this.setState({
            [e.target.name]: value
        })
    }

    render () {
        return (
            <div className="row">
                <div className="col-md-5">
                    <h4>TextInputGroup</h4>
                    <hr/>
                    <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}>
                        <div className="form-group">
                            <label htmlFor="percentagemail">Percentage</label>
                            <TextInputGroup name="percentage" id="percentage" required 
                                successMessage="Looks good!"
                                append={<span className="input-group-text">%</span>}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount">Amount</label>
                            <TextInputGroup name="amount" id="amount" required 
                                 prepend={<span className="input-group-text">$</span>}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="contractId">Contract Id</label>
                            <TextInputGroup name="contractId" id="contractId"  required 
                                 append={<button className="btn btn-outline-secondary" type="button" onClick={() => alert("Verified!")}>Verify</button>}/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </ValidationForm>
                </div>
                <div className="col-md-7">
                    <pre>
                        <code className="lang-javascript" style={{height:800}}>
                            {`
import React, { Component } from 'react'
import { ValidationForm, TextInputGroup } from 'react-bootstrap4-form-validation';

class TextInputGroupDemo extends Component {
    handleChange = (e, value) => {
        this.setState({
            [e.target.name]: value
        })
    }

    handleSubmit = (e, formData, inputs) => {
        e.preventDefault();
        alert(JSON.stringify(formData, null, 2));
    }

    handleErrorSubmit = (e, formData, errorInputs) => {
        console.error(errorInputs)
    }

    render () {
        return (
            <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}>
                <div className="form-group">
                    <label htmlFor="percentagemail">Percentage</label>
                    <TextInputGroup name="percentage" id="percentage" required 
                        successMessage="Looks good!"
                        append={<span className="input-group-text">%</span>}/>
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <TextInputGroup name="amount" id="amount" required 
                        prepend={<span className="input-group-text">$</span>}/>
                </div>
                <div className="form-group">
                    <label htmlFor="contractId">Contract Id</label>
                    <TextInputGroup name="contractId" id="contractId"  required 
                        append={<button className="btn btn-outline-secondary" type="button" onClick={() => alert("Verified!")}>Verify</button>}/>
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
                <PropertiesTable properties={this.TextInputGroupProperties}/>
            </div>
       )
    }
}