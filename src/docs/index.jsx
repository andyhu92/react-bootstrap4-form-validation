import React from "react";
import { render } from "react-dom";
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ValidationForm, TextInput, TextInputGroup, Radio, Checkbox, SelectGroup, FileInput } from '../lib/index';
import './index.css';
import './highlight/prism.css';
import './highlight/prism';
import Sidebar from './sideBar';
import BasicUsage from './examples/basicUsage';
import Routes from './routes';
import validator from 'validator';

class Home extends React.Component{
  constructor(props){
    super(props);
    this.formRef = React.createRef();
  }

  resetForm = () => {
    this.formRef.current.resetValidationState(true);
  }

  render () {
    return (
    <div className="my-5">
      <h1>React Bootstrap4 Form Validation</h1>
      <p>Simple React Components for form validation. Based on
        <a href='https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation' target="_blank"> HTML5 Constraint validation API</a> and
        <a href='https://getbootstrap.com/docs/4.0/components/forms/#validation' target="_blank"> Bootstrap4 style.</a></p>
      <ValidationForm onSubmit={(e, formData) => alert(JSON.stringify(formData, null, 2))} style={{maxWidth:800}} ref={this.formRef}>
          <div className="form-group row">
            <div className="col-md-6">
              <label htmlFor="firstName">First name</label>
              <TextInput name="firstName" id="firstName" required successMessage="Looks Good!" />
            </div>
            <div className="col-md-6">
                <label htmlFor="lastName">Last name</label>
                <TextInput name="lastName" id="lastName" required successMessage="Looks Good!"/>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-6">
              <label htmlFor="email">Email</label>
              <TextInput name="email" id="email" required
              validator={validator.isEmail} errorMessage={{validator: "Pleas enter a valid email"}}
              successMessage="Looks Good!" />
            </div>
            <div className="col-md-6">
                <label htmlFor="amount">Amount</label>
                <TextInputGroup name="amount" id="amount" type="number" required successMessage="Looks Good!"
                  prepend={<span className="input-group-text">$</span>}/>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-6">
              <label htmlFor="color">Color</label>
              <SelectGroup name="color" id="color" required>
                <option value="">-- Select color --</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
              </SelectGroup>
            </div>
            <div className="col-md-6">
              <label htmlFor="attachment">Attachment</label>
              <FileInput name="attachment" id="attachment" required
                errorMessage = {{required: "Please upload a file", fileType:"Only pdf or excel is allowed", maxFileSize: "Max file size is 120 kb"}}
                fileType={["pdf","xlsx","xls"]}
                maxFileSize="150 kb"/>
            </div>
          </div>
          <div className="form-group">
            <label>Gender</label>
            <Radio.RadioGroup name="gender" required>
              <Radio.RadioItem id="male" label="Male" value="male"/>
              <Radio.RadioItem id="female" label="Female" value="female"/>
            </Radio.RadioGroup>
          </div>
          <div className="form-group">
            <Checkbox label="Subscribe to newsletter" id="check"
            name="isSubscribe"
            required errorMessage="Oops...Please subscribe lol"/>
          </div>
          <div className="form-group">
            <button className="btn btn-primary mr-3">Submit</button>
            <button className="btn btn-secondary" type="button" onClick={this.resetForm}>Reset</button>
          </div>

      </ValidationForm>
    </div>
    )
  }
}

class Demo extends React.Component {
  state = {
    isShow: true
  }

  handleSubmit = (e, formData) => {
    e.preventDefault();
  }

  render() {
    return (
      <Router>
        <div>
          <Sidebar />
            <section className="container-fluid" >
              <Switch>
                <Route path="/" exact component={Home}/>
                {
                      Routes.example.routes.map(r => (
                        <Route path={`/${Routes.example.path}/${r.pathname}`} key={r.pathname} component={r.component} />
                      ))
                }
                {
                      Routes.api.routes.map(r => (
                        <Route path={`/${Routes.api.path}/${r.pathname}`} key={r.pathname} component={r.component} />
                      ))
                }
              </Switch>
            </section>
        </div>
      </Router>
    );
  }
}

render(<Demo />, document.getElementById("app"));

export function initCodeSyntaxHighlight() {
  // let codes = document.getElementsByTagName("code");
  // for (let i = 0; i < codes.length; i++) {
  //   if(codes[i].classList.contains("lang-javascript")) hljs.highlightBlock(codes[i]);
  // }
  Prism.highlightAll();
}

export function InfoBox({children}){
  return <div className="alert alert-info mt-2">{ children }</div>
}

export function PropertiesTable ( { title, properties = [] }){
  return (
     <div className="col-md-12">
          <h4>{title} Properties <small>(<span className="text-danger">*</span> indicates required property)</small></h4>
          <table className="table table-bordered table-striped">
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Default</th>
                      <th>Description</th>
                  </tr>
              </thead>
              <tbody>
                  { properties.map(r => (
                    <tr key={r.name}>
                      <td>{ r.name } {r.required && <span className="text-danger">*</span>}</td>
                      <td>{ r.type }</td>
                      <td>{ r.default }</td>
                      <td>{ r.description }</td>
                    </tr>
                  ))}
              </tbody>
          </table>
      </div>
  )
}
