import React from "react";
import { render } from "react-dom";
import { ValidationForm, TextInput } from "../../lib";
import "./styles.css";

class Demo extends React.Component{
  state = {
    isShow:true
  }
  handleSubmit = (e, formData) => {
    e.preventDefault();
    console.log(formData);
  }

  render () {
    return (
      <ValidationForm className="container" onSubmit={this.handleSubmit} >
        <h1>Demo Form</h1>
        <div className="form-group">
          <TextInput name="firstName" required/>
        </div>

        <div className="form-group">
          <button className="btn btn-primary">Submit</button>
        </div>
      </ValidationForm>
    );
  }
}

render(<Demo />, document.getElementById("app"));
