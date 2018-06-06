import React from 'react';
import { ValidationForm, TextInput, FileInput } from "../../../lib";
import { initCodeSyntaxHighlight, InfoBox } from '../index'

export default class ErrorMessage extends React.Component {
    componentDidMount() {
        initCodeSyntaxHighlight();
        ValidationForm.defaultErrorMessage.required = "Global Global Global";
    }

    componentWillUnmount(){
        ValidationForm.defaultErrorMessage.required = "This field is required";
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-5">
                    <h4>Error Message</h4>

                    <p>Basically, You can config error message in 3 different levels.</p>
                    <h5>1. Global level</h5>
                    <p>There is a static variable <code>defaultErrorMessage</code> on <code>ValidationForm</code> and all intance of <code>ValidationForm</code> will share the same default error message.</p>
                    <ValidationForm onSubmit={() => { }}>
                        <div className="form-group">
                            <label htmlFor="firstName">First name</label>
                            <TextInput id="firstName" name="firstName" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last name</label>
                            <TextInput id="lastName" name="lastName" required />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </ValidationForm>

                    <h5 className="mt-5">2. Instance level</h5>
                    <p>Provide default error message to an instance of <code>ValidationForm</code>. 
                        Will be merged with global <code>defaultErrorMessage</code> property.</p>
                    <ValidationForm onSubmit={() => { }} defaultErrorMessage={{required:"Instance Instance Instance" }}>
                    <div className="form-group">
                        <label htmlFor="firstName">First name</label>
                            <TextInput id="firstName" name="firstName" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last name</label>
                            <TextInput id="lastName" name="lastName" required />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </ValidationForm>

                    <h5 className="mt-5">3. Control level</h5>
                    <p>Provide error message to a single control inside <code>ValidationForm</code>. 
                        Will be merged with global and instance <code>defaultErrorMessage</code> property.</p>
                    <InfoBox>The <code>errorMessage</code> property expects an <b>object</b>, but you can also pass a <b>string</b> when the form 
                    control has only <b>required</b> as validation attribute. </InfoBox>
                    <ValidationForm onSubmit={() => { }}>
                        <div className="form-group">
                            <label htmlFor="firstName">First name</label>
                            <TextInput id="firstName" name="firstName" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last name</label>
                            <TextInput id="lastName" name="lastName" required 
                                errorMessage="Control control control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="attachment">Attachment</label>
                            <FileInput name="attachment" id="attachment" required
                                fileType={["pdf"]} maxFileSize="120 kb" errorMessage={
                                    { required:"Please upload attachment",
                                      maxFileSize:"Uploaded file size exceed 120 kb!",
                                      fileType: "Only pdf is allowed!" }
                                    }/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </ValidationForm>
                </div>
                <div className="col-md-7">
                    <pre>
                        <code className="lang-javascript">
                            {`
static defaultErrorMessage = {
    required: "This field is required",
    pattern: "Input value does not match the pattern",
    type: "Input value does not match the type",
    step: "Step mismatch",
    minLength: "Please enter at least {minLength} characters",
    min: "Number is too low",
    max: "Number is too high",
    fileType:"File type mismatch",
    maxFileSize:"File size exceed limit",
    validator: "Validator check failed"
}
...
componentDidMount () {
    ValidationForm.defaultErrorMessage.required = "Global Global Global";
}
...
//Global
<ValidationForm onSubmit={() => { }}>
    <div className="form-group">
        <label htmlFor="firstName">First name</label>
        <TextInput id="firstName" name="firstName" required />
    </div>
    <div className="form-group">
        <label htmlFor="lastName">Last name</label>
        <TextInput id="lastName" name="lastName" required />
    </div>
    <div className="form-group">
        <button className="btn btn-primary">Submit</button>
    </div>
</ValidationForm>

//Instance
<ValidationForm onSubmit={() => { }} defaultErrorMessage={{required:"Instance Instance Instance"}}>
    <div className="form-group">
        <label htmlFor="firstName">First name</label>
        <TextInput id="firstName" name="firstName" required />
    </div>
    <div className="form-group">
        <label htmlFor="lastName">Last name</label>
        <TextInput id="lastName" name="lastName" required />
    </div>
    <div className="form-group">
        <button className="btn btn-primary">Submit</button>
    </div>
</ValidationForm>

//Control
<ValidationForm onSubmit={() => { }}>
    <div className="form-group">
        <label htmlFor="firstName">First name</label>
        <TextInput id="firstName" name="firstName" required />
    </div>
    <div className="form-group">
        <label htmlFor="lastName">Last name</label>
        <TextInput id="lastName" name="lastName" required 
            errorMessage="Control control control" />
    </div>
    <div className="form-group">
        <label htmlFor="attachment">Attachment</label>
        <FileInput name="attachment" id="attachment" required
            fileType={["pdf"]} maxFileSize="120 kb" 
            errorMessage={
                { required:"Please upload attachment",
                  maxFileSize:"Uploaded file size exceed 120 kb!",
                  fileType: "Only pdf is allowed!" 
                }
            }/>
    </div>
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