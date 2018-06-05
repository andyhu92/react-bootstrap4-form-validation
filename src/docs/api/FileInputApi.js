import React, { Component } from 'react'
import { ValidationForm, FileInput } from '../../lib';
import { initCodeSyntaxHighlight, InfoBox, PropertiesTable } from '../index'

export default class FileInputDemo extends Component {
    componentDidMount (){
        initCodeSyntaxHighlight();
    }

    fileInputProperties = [
        {
            name:"required",
            type:"boolean",
            default:<code>false</code>,
            description:"Whether this field is required."
        },
        {
            name:"fileType",
            type:"array",
            default:"",
            description:<p>Allowed file extensions, no dot, case insensitive. For example <code>["pdf","xlsx","xls"]</code></p>
        },
        {
            name:"maxFileSize",
            type:"string",
            default:"",
            description:<div>Allowed maximum file size, case insensitive, space tolerance, support float number
                <p>Supported units: <b>b, kb, mb, gb</b></p>. For example:
                <ul className="list-inline">
                    <li className="list-inline-item">12b,</li>
                    <li className="list-inline-item">24.6 kb,</li>
                    <li className="list-inline-item">40 MB,</li>
                    <li className="list-inline-item">1.2gb</li>
                </ul>
            </div>
        },
        {
            name:"errorMessage",
            type:"string | object",
            default:"",
            description:<div>The error message for file input. 
                <p>If pass as <code>string</code>, the message will be used for <code>required </code>
             validation rule.</p>
                <p>If pass as <code>object</code>, the <i>key</i> will be the validation attribute name and the <i>value</i> will be the error message.
                    See the code for example.
                </p>
             </div>
        },
        {
            name:"successMessage",
            type:"string",
            default:"",
            description:<p>The success message when the file passed all validation rules.</p>
        },
        {
            name:"className",
            type:"string",
            default:<code>form-control</code>,
            description:"The class name of the underlying input tag"
        },
        {
            name:"name",
            type:"string",
            default:"",
            description:<p>The <code>name</code> attribute for the input.</p>,
            required:true
        },
        {
            name:"onChange",
            type:"function",
            default:"",
            description:<div>
                            <p>Callback function evoked when the file input changed</p>
                            Signature: <code>(event, file) => void</code>
                            <ul>
                                <li><i>event:</i> Change event targeting the file input.</li>
                                <li><i>file:</i> First <code>File</code> object of the file input. (multiple is not supported yet)</li>
                            </ul>
                        </div>
        },
    ]

    
    handleSubmit = (e, formData, inputs) => {
        e.preventDefault();
        alert(JSON.stringify(formData, null, 2));
    }

    handleErrorSubmit = (e, formData, errorInputs) => {
        console.error(errorInputs)
    }

    render () {
        return (
            <div className="row">
                <div className="col-md-5">
                    <h4>FileInput</h4>
                    <hr/>
                    <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}>
                        <div className="form-group">
                            <label htmlFor="attachment">Upload your file</label>
                            <FileInput name="attachment" id="attachment" required 
                                fileType={["pdf", "xls", "xlsx"]}
                                maxFileSize="150 kb"
                                errorMessage={
                                    { required: "Please upload a file", 
                                    fileType:"Only pdf and excel is allowed.", 
                                    maxFileSize: "Max file size is 150 kb"
                                    }
                                }
                                />
                        </div>
                      
                        <div className="form-group">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </ValidationForm>
                    <InfoBox> <code>multiple</code> attribute not supported right now.
                        <strong> All</strong>  the other properties not mentioned at below will also be passed into the underlying <code>input</code> tag.
                    <br/>For example: <code>{` <FileInput name="attachment" disabled />`}</code> will render a disabled file input.</InfoBox>
                </div>
                <div className="col-md-7">
                    <pre>
                        <code className="lang-javascript" style={{height:800}}>
                            {`
import React, { Component } from 'react'
import { ValidationForm, FileInput } from 'react-bootstrap4-form-validation';

class FileInputDemo extends Component {

    handleSubmit = (e, formData, inputs) => {
        e.preventDefault();
        alert(JSON.stringify(formData, null, 2));
    }

    handleErrorSubmit = (e, formData, errorInputs) => {
        console.error(errorInputs)
    }

    render () {
        return (
            <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}>
                <div className="form-group">
                    <label htmlFor="attachment">Upload your file</label>
                    <FileInput name="attachment" id="attachment" required 
                        fileType={["pdf", "xls", "xlsx"]}
                        maxFileSize="150 kb" 
                        errorMessage={
                            { required: "Please upload a file", 
                              fileType:"Only pdf and excel is allowed", 
                              maxFileSize: "Max file size is 150 kb"
                            }
                        }/>
                </div>
                
                <div className="form-group">
                    <button className="btn btn-primary">Submit</button>
                </div>
            </ValidationForm>
        )
    }
}

                            `}
                        </code>
                    </pre>
                </div>
                <PropertiesTable properties={this.fileInputProperties}/>
            </div>
       )
    }
}