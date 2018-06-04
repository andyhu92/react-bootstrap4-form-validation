import React, { Component } from 'react'
import { ValidationForm, SelectGroup } from '../../lib';
import { initCodeSyntaxHighlight, InfoBox, PropertiesTable } from '../index'

export default class SelectGroupApi extends Component {
    state = {
        color: ""
    }

    componentDidMount (){
        initCodeSyntaxHighlight();
    }

    checkBoxProperties = [
        {
            name:"required",
            type:"boolean",
            default:<code>false</code>,
            description:"Whether this field is required."
        },
        {
            name:"errorMessage",
            type:"string",
            default:"",
            description:<p>The error message for the <code>required</code> validation rule.</p>
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
            description:"The class name of the underlying select tag"
        },
        {
            name:"name",
            type:"string",
            default:"",
            description:<p>The <code>name</code> attribute for the input.</p>,
            required:true
        },
        {
            name:"onChange",
            type:"function",
            default:"",
            description:<div>
                            <p>Callback function evoked when the select value changed</p>
                            Signature: <code>(event) => void</code>
                            <ul>
                                <li><i>event:</i> Change event targeting the select input.</li>
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

    render () {
        return (
            <div className="row">
                <div className="col-md-5">
                    <h4>SelectGroup</h4>
                    <hr/>
                    <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}>
                        <div className="form-group">
                            <label htmlFor="color">Select a color</label>
                            <SelectGroup name="color" id="color"
                                value={this.state.color} 
                                required errorMessage="Please select a color."
                                onChange={this.handleChange}>
                                <option value="">--- Please select ---</option>
                                <option value="red">Red</option>
                                <option value="green">Green</option>
                                <option value="blue">Blue</option>
                                <option value="yellow" disabled>Yellow</option>
                            </SelectGroup>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </ValidationForm>
                    <InfoBox><strong>All</strong>  the other properties not mentioned at below will also be passed into the underlying <code>select</code> tag.
                    <br/>For example: <code>{`<SelectGroup name="something" disabled >...</SelectGroup>`}</code> will render a disabled select tag.</InfoBox>
                </div>
                <div className="col-md-7">
                    <pre>
                        <code className="lang-javascript" style={{height:800}}>
                            {`
import React, { Component } from 'react'
import { ValidationForm, SelectGroup } from 'react-bootstrap4-form-validation';

class SelectGroupDemo extends Component {
    state = {
        color:""
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

    render () {
        return (
            <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}>
                <div className="form-group">
                    <label htmlFor="color">Select a color</label>
                    <SelectGroup name="color" id="color"
                        value={this.state.color} 
                        required errorMessage="Please select a color."
                        onChange={this.handleChange}>
                        <option value="">--- Please select ---</option>
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                        <option value="yellow" disabled>Yellow</option>
                    </SelectGroup>
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
                <PropertiesTable properties={this.checkBoxProperties}/>
            </div>
       )
    }
}