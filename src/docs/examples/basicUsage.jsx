import React from 'react';
import { ValidationForm, TextInput, SelectGroup, Checkbox, RadioGroup } from "../../../lib";
import { initCodeSyntaxHighlight, InfoBox } from '../index'
import { Link } from 'react-router-dom';

export default class BasicUsage extends React.Component {
    componentDidMount() {
        initCodeSyntaxHighlight();
    }
    
    render() {
        return (
            <div className="row">
                <div className="col-md-5">
                    <ValidationForm onSubmit={(e, formData, inputs) => { e.preventDefault(); console.log(e, formData, inputs) }}>
                        <h4>Basic Usage 
                            <small className="ml-2">(<b>name</b> attribute is required for all form controls)</small>
                        </h4>

                        <div className="form-group">
                            <label htmlFor="organization">Organization</label>
                            <TextInput name="organization" id="organization"
                                required
                            />
                            <InfoBox>
                            Just give HTML5 <b>required</b> attribute and it's ready for use!
                            </InfoBox>
                        </div>

                        <div className="form-group mt-5">
                            <label htmlFor="firstName">First name</label>
                            <TextInput name="firstName" id="firstName"
                                required
                                successMessage="Looks good!"
                                errorMessage="You don't have a first name?"
                            />
                            <InfoBox>
                                You can also provide an optional success message and error message.
                                Click <Link to="/base-form-control#api">here</Link> for more details about how you can pass the error message.
                            </InfoBox>
                        </div>

                        <div className="form-group mt-5">
                            <label htmlFor="lastName">Last name</label>
                            <TextInput name="lastName" id="lastName"
                                minLength="4"
                                maxLength="8"
                                pattern="corgi"
                                errorMessage={{
                                    required:"Please enter your last name",
                                    minLength:"Minimum {minLength} characters is required",
                                    pattern:"Your lastname is not corgi!"
                                }}
                            />
                            <InfoBox>
                                You can also provide HTML5 attribute like <b>minLength</b>,<b>maxLength</b>,<b>pattern</b>... for validation.
                                Check <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation" target='_blank'>
                                    here</a> for more about validation-related attributes.
                            </InfoBox>
                        </div>

                        <div className="form-group mt-5">
                            <label htmlFor="color">Favoriate Color</label>
                            <SelectGroup name="color" id="color"
                                required>
                                <option value="">-- Select Color --</option>
                                <option value="red">Red</option>
                                <option value="green">Green</option>
                                <option value="blue">Blue</option>
                            </SelectGroup>
                            <InfoBox>
                                Just replace <b>select</b> with <b>SelectGroup</b> and pass <b>option</b> as children. 
                            </InfoBox>
                        </div>
                        
                        <Checkbox name="ackowledge"
                            id="ackowledge"
                            label="I acknowledge that the above information is correct" 
                            errorMessage="Please check to proceed"
                            containerClassName="form-check mt-5"
                            required/>
                            
                      
                        <div className="form-group mt-3">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </ValidationForm>
                </div>
                <div className="col-md-7">
                    <pre>
                        <code className="lang-javascript">
                            {`import { ValidationForm, TextInput } from "react-bootstrap4-form-validation"
...
<ValidationForm onSubmit={(e, formData, inputs) => { e.preventDefault(); console.log(e, formData, inputs) }}>
  <h4>Basic Usage</h4>

  <div className="form-group">
    <label htmlFor="organization">Organization</label>
    <TextInput name="organization" id="organization" required />
  </div>

  <div className="form-group">
    <label for="firstName">First name</label>
    <TextInput name="firstName" id="firstName"
      required
      successMessage="Looks good!"
      errorMessage="You don't have a first name?"
    />
  </div>

  <div className="form-group">
    <label htmlFor="lastName">Last name</label>
    <TextInput name="lastName" id="lastName"
        minLength="4"
        maxLength="8"
        pattern="corgi"
        errorMessage={{
            minLength:"Minimum {minLength} characters is required",
            pattern:"Your lastname is not corgi!"
        }}
    />
  </div>

  <div className="form-group">
        <label htmlFor="color">Favoriate Color</label>
        <SelectGroup name="color" id="color"
            defaultValue="red"
            required>
            <option value="">-- Select Color --</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
        </SelectGroup>
  </div>
                        

  <Checkbox name="ackowledge"
    id="ackowledge"
    label="I acknowledge that the above information is correct" 
    errorMessage="Please check to proceed"
    required />

  <div className="form-group">
    <button className="btn btn-primary">Submit</button>
  </div>
</ValidationForm>
`}
                        </code>
                    </pre>
                </div>
            </div>

        )
    }
}