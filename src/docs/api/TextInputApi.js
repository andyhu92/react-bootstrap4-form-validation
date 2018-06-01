
import React, { Component } from 'react'
import { ValidationForm, TextInput } from '../../lib';
import { initCodeSyntaxHighlight, InfoBox, PropertiesTable } from '../index'

export default class TextInputApi extends Component {
    state = {
        firstName: "",
        lastName:""
    }

    componentDidMount (){
        initCodeSyntaxHighlight();
    }

    radioGroupProperties = [
        {
            name:"name",
            type:"string",
            default:"",
            description:<p>The <code>name</code> attribute of underlying radio buttons.</p>,
            required:true
        },
        {
            name:"inline",
            type:"boolean",
            default:<code>true</code>,
            description:"Display radio buttons inline or stacked."
        },
        {
            name:"containerStyle",
            type:"object",
            default:<code>{`{}`}</code>,
            description:<p>Style object for the wrapper <code>div</code>.</p>
        },
        {
            name:"valueSelected",
            type:"string",
            default:"",
            description:"The value of current selected radio button"
        },
        {
            name:"defaultValue",
            type:"string",
            default:"",
            description:"The default checked radio button value"
        },
        {
            name:"onChange",
            type:"function",
            default:"",
            description:<div>
                            <p>Callback function evoked when the radio button value changed</p>
                            Signature: <code>(event, value) => void</code>
                            <ul>
                                <li><i>event:</i> Change event targeting the checked radio button </li>
                                <li><i>value:</i> The value of checked radio button</li>
                            </ul>
                        </div>
        },
    ]

    radioItemProperties = [
        {
            name:"value",
            type:"string",
            default:"",
            description:<p>The <code>value</code> attribute for the radio button.</p>,
            required:true
        },
        {
            name:"id",
            type:"string",
            default:"",
            description:<p>The <code>id</code> attribute for the radio button. It is required to link your radio with the label.</p>,
            required:true
        },
        {
            name:"label",
            type:"string",
            default:"",
            description:<p>The label text for the radio button. And the <code>for</code> property will have the same value as <code>id</code>.</p>,
            required:true
        },
        {
            name:"containerStyle",
            type:"object",
            default:<code>{`{}`}</code>,
            description:<p>Style object for the wrapper <code>div</code>.</p>
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
                    <h4>Radio Group</h4>
                    <hr/>
                    <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}>
                        <h5>Controlled Components with one disabled option</h5>
                        <div className="form-group">
                            <label>Select your pet</label>
                            <Radio.RadioGroup name="pet" required errorMessage="Please select your pet" valueSelected={this.state.pet}
                                onChange={this.handleChange}>
                                <Radio.RadioItem id="dog" label="Dog" value="dog" />
                                <Radio.RadioItem id="cat" label="Cat" value="cat" />
                                <Radio.RadioItem id="fish" label="Fish" value="fish" />
                                <Radio.RadioItem id="tyrannosaurus" label="Tyrannosaurus" value="tyrannosaurus" disabled/>
                            </Radio.RadioGroup>
                        </div>
                        <h5 className="mt-5">Stacked layout</h5>
                        <div className="form-group">
                            <label>Choose your mode of transport</label>
                            <Radio.RadioGroup name="transport" required valueSelected={this.state.transport}
                                inline={false}
                                onChange={this.handleChange}>
                                <Radio.RadioItem id="air" label="Air" value="air" />
                                <Radio.RadioItem id="water" label="Water" value="water" />
                                <Radio.RadioItem id="land" label="Land" value="land" />
                            </Radio.RadioGroup>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </ValidationForm>

                    <h5 className="mt-5">Uncontrolled Components with default value</h5>
                    <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}>
                        <div className="form-group">
                            <label>Select your food</label>
                            <Radio.RadioGroup name="food" required errorMessage="Please select your food" 
                                defaultValue="pizza">
                                <Radio.RadioItem id="pizza" label="Pizza" value="pizza" />
                                <Radio.RadioItem id="hotdog" label="Hotdog" value="hotdog" />
                                <Radio.RadioItem id="rice" label="Rice" value="rice" />
                            </Radio.RadioGroup>
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
import { ValidationForm, Radio } from 'react-bootstrap4-form-validation';

class RadioGroupDemo extends Component {
    state = {
        pet: ""
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
                    <div className="form-group">
                        <label>Select your pet</label>
                        <Radio.RadioGroup name="pet" required errorMessage="Please select your pet" valueSelected={this.state.pet}
                            onChange={this.handleChange}>
                            <Radio.RadioItem id="dog" label="Dog" value="dog" />
                            <Radio.RadioItem id="cat" label="Cat" value="cat" />
                            <Radio.RadioItem id="fish" label="Fish" value="fish" />
                            <Radio.RadioItem id="tyrannosaurus" label="Tyrannosaurus" value="tyrannosaurus" disabled/>
                        </Radio.RadioGroup>
                    </div>
                    <div className="form-group">
                        <label>Choose your mode of transport</label>
                        <Radio.RadioGroup name="transport" required valueSelected={this.state.transport}
                            inline={false}
                            onChange={this.handleChange}>
                            <Radio.RadioItem id="air" label="Air" value="air" />
                            <Radio.RadioItem id="water" label="Water" value="water" />
                            <Radio.RadioItem id="land" label="Land" value="land" />
                        </Radio.RadioGroup>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Submit</button>
                    </div>
                </ValidationForm>

                //Uncontrolled Components
                <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}>
                    <div className="form-group">
                        <label>Select your food</label>
                        <Radio.RadioGroup name="food" required errorMessage="Please select your food" 
                            defaultValue="pizza">
                            <Radio.RadioItem id="pizza" label="Pizza" value="pizza" />
                            <Radio.RadioItem id="hotdog" label="Hotdog" value="hotdog" />
                            <Radio.RadioItem id="rice" label="Rice" value="rice" />
                        </Radio.RadioGroup>
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
                <PropertiesTable title="RadioGroup" properties={this.radioGroupProperties}/>
                <PropertiesTable title="RadioItem" properties={this.radioItemProperties}/>
            </div>
       )
    }
}