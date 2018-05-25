import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import validator from 'validator';
import { ValidationForm, TextInput, TextInputGroup } from "../../lib";
import './index.css';
import Sidebar from './sideBar';

class Demo extends React.Component {
  state = {
    isShow: true
  }

  componentDidMount() {
    this.initCodeSyntaxHighlight();
  }

  initCodeSyntaxHighlight() {
    let codes = document.getElementsByTagName("code");
    for (let i = 0; i < codes.length; i++) {
      hljs.highlightBlock(codes[i]);
    }
  }

  handleSubmit = (e, formData) => {
    e.preventDefault();
    console.log(formData);
  }

  render() {
    return (
      <Router>
        <main>
          <Sidebar />
          <section className="my-3 container-fluid">
            <div className="row">
              <div className="col-md-5" style={{marginTop:40}}>
                <ValidationForm onSubmit={this.handleSubmit} >
                  <h4 className="mb-3">React Bootstrap4 Form Validation</h4>
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
                      errorMessage={{validator: "Please enter a valid email."}}
                      validator={validator.isEmail}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <button className="btn btn-primary">Submit</button>
                  </div>
                </ValidationForm>
              </div>
              <div className="col-md-7" style={{marginTop:115}}>
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

          </section>

        </main>
      </Router>
    );
  }
}

render(<Demo />, document.getElementById("app"));