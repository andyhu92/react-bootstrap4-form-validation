import React from 'react';
import { ValidationForm, BaseFormControl } from "../../../lib";
import { initCodeSyntaxHighlight, InfoBox } from '../index'
import MaskedInput from 'react-text-mask'

class MaskWithValidation extends BaseFormControl{
    constructor(props){
        super(props);
        this.inputRef = React.createRef();
    }

    //Need to implement this method to get the underying input reference
    getInputRef(){
        return this.inputRef.current.inputElement;
    }

    handleChange = (e) => {
        //Call this.checkError to validate the input
        this.checkError();
        //Pass along the event object for controlled component
        if(this.props.onChange) this.props.onChange(e);
    }

    render () {
        return (
            <React.Fragment>
                <MaskedInput ref={this.inputRef} {...this.filterProps()} onChange={this.handleChange}/>
                {/* Call this.displayErrorMessage() to render the error message div if error */}
                { this.displayErrorMessage() }
                {/* Call this.displaySuccessMessage() to render the success message div if no error*/}
                { this.displaySuccessMessage() }
            </React.Fragment>
        )
    }
}

export default class CustomValidation extends React.Component{
    state = {
        phone:""
    }

    componentDidMount() {
        initCodeSyntaxHighlight();
    }

    handleSubmit = (e, formData) => {
        e.preventDefault();
        alert(JSON.stringify(this.state, null, 2));
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render () {
        return (
            <div className="row">
                <div className="col-md-5">
                    <h4>Custom Validation Control</h4>
                    <p>Example: integrate with <a href="https://github.com/text-mask/text-mask/tree/master/react#readme" target="_blank">React input mask</a></p>
                    <ValidationForm onSubmit={this.handleSubmit} >
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <MaskWithValidation name="phone" className="form-control" required 
                                validator={(value) => value === "(123) 456-7890"}
                                value={this.state.phone}
                                onChange={this.handleChange}
                                successMessage="Looks good!"
                                errorMessage={{validator: "Please enter (123) 456-7890"}}
                                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                             />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </ValidationForm>

                    <ul className="list-group">
                        <li className="list-group-item">1. Import <code>BaseFormControl</code></li>
                        <li className="list-group-item">2. Create your custom component and <code>extends BaseFormControl</code></li>
                        <li className="list-group-item">3. Implement <code>getInputRef</code> method and return the <b>HTML reference</b> for the underlying input.</li>
                        <li className="list-group-item">4. When listen to <code>onChange</code> event, call <code>this.checkError()</code> to validate the input.</li>
                        <li className="list-group-item">5. In your view, render <code>this.displaySuccessMessage() </code> will render the success message if input has no error.</li>
                        <li className="list-group-item">5. In your view, render <code>this.displayErrorMessage() </code> will render the error message if input has error.</li>
                    </ul>
                    <h4>See code at right for details.</h4>
                </div>
                <div className="col-md-7">
                    <pre>
                        <code className="lang-javascript">
{`import { ValidationForm, BaseFormControl } from "react-bootstrap4-form-validation"
import MaskedInput from 'react-text-mask'

//Need to extends BaseFormControl to have the validation feature
class MaskWithValidation extends BaseFormControl{
    constructor(props){
        super(props);
        this.inputRef = React.createRef();
    }

    //Need to implement this method to get the underying input reference
    getInputRef(){
        return this.inputRef.current.inputElement;
    }

    handleChange = (e) => {
        //Call this.checkError to validate the input
        this.checkError();
        //Pass along the event object for controlled component
        if(this.props.onChange) this.props.onChange(e);
    }

    render () {
        return (
            <React.Fragment>
                <MaskedInput ref={this.inputRef} {...this.filterProps()} onChange={this.handleChange}/>
                {/* Call this.displayErrorMessage() to render the error message div if error */}
                { this.displayErrorMessage() }
                {/* Call this.displaySuccessMessage() to render the success message div if no error*/}
                { this.displaySuccessMessage() }
            </React.Fragment>
        )
    }
}

export default class CustomValidation extends React.Component{
    state = {
        phone:""
    }
  
    handleSubmit = (e, formData) => {
        e.preventDefault();
        alert(JSON.stringify(this.state, null, 2));
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render () {
        return (
            <ValidationForm onSubmit={this.handleSubmit} >
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <MaskWithValidation name="phone" className="form-control" required 
                        validator={(value) => value === "(123) 456-7890"}
                        value={this.state.phone}
                        onChange={this.handleChange}
                        successMessage="Looks good!"
                        errorMessage={{validator: "Please enter (123) 456-7890"}}
                        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">Submit</button>
                </div>
            </ValidationForm>
        )
    }
`}
                        </code>
                    </pre>
                </div>
               
            </div>
        )
    }
}