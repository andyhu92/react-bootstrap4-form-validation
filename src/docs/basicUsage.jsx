import React from 'react';
import validator from 'validator';
import { ValidationForm, TextInput, TextInputGroup } from "../../lib";
import { initCodeSyntaxHighlight } from './index'

export default class BasicUsage extends React.Component {
    componentDidMount() {
        initCodeSyntaxHighlight();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-5">
                    <ValidationForm onSubmit={this.handleSubmit} >
                        <h4 className="mb-3">Basic Usage</h4>
                        <div className="form-group">
                            <label htmlFor="firstName">First name</label>
                            <TextInput name="firstName" id="firstName"
                                required
                                successMessage="Looks good!"
                                errorMessage="You don't have a first name?"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <TextInputGroup name="email" id="email"
                                prepend={<span className="input-group-text" id="basic-addon1">@</span>}
                                errorMessage={{ validator: "Please enter a valid email." }}
                                validator={validator.isEmail}
                                required
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