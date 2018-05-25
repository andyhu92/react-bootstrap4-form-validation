import React from 'react';
import { ValidationForm, TextInput, SelectGroup, Checkbox, RadioGroup } from "../../../lib";
import { initCodeSyntaxHighlight } from '../index'

export default class BasicUsage extends React.Component {
    componentDidMount() {
        initCodeSyntaxHighlight();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-5">
                    <ValidationForm onSubmit={this.handleSubmit} >
                        <h4>Basic Usage</h4>
                        <p></p>
                        <div className="form-group">
                            <label htmlFor="firstName">First name</label>
                            <TextInput name="firstName" id="firstName"
                                required
                                successMessage="Looks good!"
                            />
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </ValidationForm>
                </div>
                <div className="col-md-7">
                    <pre>
                        <code className="lang-javascript">
                            {`import { ValidationForm, TextInput } from "react-bootstrap4-form-validation"
...
<ValidationForm onSubmit={this.handleSubmit} >
  <h4>React Bootstrap4 Form Validation</h4>
  <div className="form-group">
    <label for="firstName">First name</label>
    <TextInput name="firstName" id="firstName"
      required
      successMessage="Looks good!"
      errorMessage="You don't have a first name?"
    />
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