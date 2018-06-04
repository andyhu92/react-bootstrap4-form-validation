import React, { Component } from 'react'
import { ValidationForm, Checkbox } from '../../lib';
import { initCodeSyntaxHighlight, InfoBox, PropertiesTable } from '../index'

export default class CheckBoxApi extends Component {
    state = {
        check1:false,
        check2:true,
        check3:false,
        check4:true,
        check5:true
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
            name:"inline",
            type:"boolean",
            default:<code>true</code>,
            description:"Display check box inline or stacked."
        },
        {
            name:"containerStyle",
            type:"object",
            default:<code>{`{}`}</code>,
            description:<p>Style object for the wrapper <code>div</code>.</p>
        },
        {
            name:"value",
            type:"boolean",
            default:"",
            description:<p>The value of underlying input checkbox, used for controlled component.</p>
        },
        {
            name:"defaultChecked",
            type:"boolean",
            default:<code>false</code>,
            description:<p>The default checked value for underlying input checkbox, used for uncontrolled component.</p>,
        },
        {
            name:"name",
            type:"string",
            default:"",
            description:<p>The <code>name</code> attribute for the input.</p>,
            required:true
        },
        {
            name:"id",
            type:"string",
            default:"",
            description:"The id for the checkbox input",
            required:true
        },
        {
            name:"label",
            type:"string",
            default:"",
            description:"The label for the checkbox input",
            required:true
        },
        {
            name:"onChange",
            type:"function",
            default:"",
            description:<div>
                            <p>Callback function evoked when the checkbox value changed</p>
                            Signature: <code>(event, value) => void</code>
                            <ul>
                                <li><i>event:</i> Change event targeting the checkbox </li>
                                <li><i>value:</i> The value of checkbox</li>
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
                    <h4>Checkbox</h4>
                    <hr/>
                    <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}>
                        <h5 className="mt-2">Stacked</h5>
                        <div className="form-group">
                            <Checkbox name="check1" label="Check #1" id="check1" 
                                required errorMessage="Please check this box"
                                value={this.state.check1}
                                onChange={this.handleChange}
                            />
                            <Checkbox name="check2" label="Check #2" id="check2"
                                 required successMessage="Looks Good!"
                                 value={this.state.check2}
                                 onChange={this.handleChange}
                            />
                        </div>
                        <h5 className="mt-5">Inline</h5>
                        <div className="form-group">
                            <Checkbox name="check3" label="Check #3" id="check3" 
                                value={this.state.check3}
                                required inline onChange={this.handleChange} />
                            <Checkbox name="check4" label="Check #4" id="check4" 
                                value={this.state.check4}
                                required inline onChange={this.handleChange} />
                            <Checkbox name="check5" label="Check #5" id="check5" 
                                value={this.state.check5}
                                required inline disabled />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </ValidationForm>
                    <InfoBox><strong>All</strong>  the other properties not mentioned at below will also be passed into the underlying <code>input</code> tag.
                    <br/>For example: <code>{`<Checkbox name="something" label="something" id="something" disabled />`}</code> will render a disabled checkbox.</InfoBox>
                </div>
                <div className="col-md-7">
                    <pre>
                        <code className="lang-javascript" style={{height:800}}>
                            {`
import React, { Component } from 'react'
import { ValidationForm, Checkbox } from 'react-bootstrap4-form-validation';

class CheckBoxDemo extends Component {
    state = {
        check1:false,
        check2:true,
        check3:false,
        check4:true,
        check5:true
    }

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
            <section>
                //Controlled Components
                <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}>
                    //Stacked
                    <div className="form-group">
                        <Checkbox name="check1" label="Check #1" id="check1" 
                            required errorMessage="Please check this box"
                            value={this.state.check1}
                            onChange={this.handleChange}
                        />
                        <Checkbox name="check2" label="Check #2" id="check2"
                            required successMessage="Looks Good!"
                            value={this.state.check2}
                            onChange={this.handleChange}
                        />
                    </div>
                    //Inline
                    <div className="form-group">
                        <Checkbox name="check3" label="Check #3" id="check3" 
                            value={this.state.check3}
                            required inline onChange={this.handleChange} />
                        <Checkbox name="check4" label="Check #4" id="check4" 
                            value={this.state.check4}
                            required inline onChange={this.handleChange} />
                        <Checkbox name="check5" label="Check #5" id="check5" 
                            value={this.state.check5}
                            required inline disabled />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Submit</button>
                    </div>
                </ValidationForm>
            </section>
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