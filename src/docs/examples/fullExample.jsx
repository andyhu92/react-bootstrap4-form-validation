import React from 'react';
import { ValidationForm, TextInput, TextInputGroup } from "../../../lib";
import validator from 'validator';
import { initCodeSyntaxHighlight } from '../index'
export default class FullExample extends React.Component{
    componentDidMount() {
        initCodeSyntaxHighlight();
    }

    handleSubmit = (formData) => {

    }

    render () {
        return (
            <div className="row">
                <div className="col-md-5">
                    <h4>Full example</h4>
                    <ValidationForm onSubmit={this.handleSubmit} defaultErrorMessage={{required:"Is it required?"}}>
                        <div className="form-group">
                            <label htmlFor="firstName">First name</label>
                            <TextInput name="firstName" id="firstName"
                                placeholder="Your first name." 
                                required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last name</label>
                            <TextInput name="lastName" id="lastName"
                                errorMessage="Last name is required"
                                required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <TextInputGroup name="email" id="email"
                                errorMessage={{validator:"Please enter a valid email"}}
                                prepend={<span className="input-group-text">@</span>}
                                validator={validator.isEmail}
                                required/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </ValidationForm>
                </div>
                <div className="col-md-7">
                    <pre>
                        <code className="lang-javascript">
{`import { ValidationForm, TextInput, TextInputGroup } from "react-bootstrap4-form-validation"
...
<ValidationForm onSubmit={this.handleSubmit} defaultErrorMessage={{required:"Is it required?"}}>
    <div className="form-group">
        <label htmlFor="firstName">First name</label>
        <TextInput name="firstName" id="firstName"
            placeholder="Your first name." 
            required/>
    </div>
    <div className="form-group">
        <label htmlFor="lastName">Last name</label>
        <TextInput name="lastName" id="lastName"
            errorMessage="Last name is required"
            required/>
    </div>
    <div className="form-group">
        <label htmlFor="email">Email</label>
        <TextInputGroup name="email" id="email"
            errorMessage={{validator:"Please enter a valid email"}}
            prepend={<span className="input-group-text">@</span>}
            validator={validator.isEmail}
            required/>
    </div>
    <div className="form-group">
        <button className="btn btn-primary">Submit</button>
    </div>
</ValidationForm>`}
                        </code>
                    </pre>
                </div>
               
            </div>
        )
    }
}