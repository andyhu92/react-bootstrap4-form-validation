import React from "react";
import { render } from "react-dom";
import { ValidationForm, TextInput } from "../../lib";
import './index.css';

class Demo extends React.Component{
  state = {
    isShow:true
  }

  componentDidMount() {
    this.initCodeSyntaxHighlight();
  }

  initCodeSyntaxHighlight(){
    let codes = document.getElementsByTagName("code");
    for(let i = 0; i < codes.length; i++){
      hljs.highlightBlock(codes[i]);  
    }
  }

  handleSubmit = (e, formData) => {
    e.preventDefault();
    console.log(formData);
  }

  render () {
    return (
      <section className="my-3 container">
        <div className="row">
          <div className="col-md-5">
            <ValidationForm onSubmit={this.handleSubmit} >
              <h4>React Bootstrap4 Form Validation</h4>
              <div className="form-group">
                <label htmlFor="firstName">First name</label>
                <TextInput name="firstName" id="firstName" required/>
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
    <TextInput name="firstName" id="firstName" required/>
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
    
    );
  }
}

render(<Demo />, document.getElementById("app"));