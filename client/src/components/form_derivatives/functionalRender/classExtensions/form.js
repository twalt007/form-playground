import React, { Component } from 'react';
import { Field, FormButton } from './formComponents'
import * as Yup from 'yup';
import './form.scss'


class Form extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: {},
            errors: {}
        }
        //is this state necessary??

        this.reroute = this.reroute.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.validateField = this.validateField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderButtons = this.renderButtons.bind(this);
        this.renderField = this.renderField.bind(this);
    }
    
    reroute(){
        mainHistory.push(returnUrl);
        //use just history??
    };

    validateForm(){
        console.log("testing validation function");
        if (!error) {
            return null;
        }
        //something to push error messages to variable
        return errors
    };
    
    validateField(){
        console.log("testing validate property function");
    };

    handleSubmit(e){
        e.preventDefault();
        console.log("testing submit functionality");
    };

    handleChange(e){
        const { value } = e.currentTarget;
        console.log("inside onchange event, e props", value);

    };



    renderButtons(text, returnText, componentDivClass, groupDivClass, buttonClass, errorClass, id){
        const { data, errors } = this.state;
        return (
            <FormButton
                text={text} 
                returnText={returnText} 
                reroute={reroute} 
                componentDivClass={componentDivClass}
                groupDivClass={groupDivClass}
                divClass={divClass}
                buttonClass={buttonClass}
                errorClass={errorClass}
                id={id}
                error={errors[name]}
            />
        )
        
    } 
    name, label, type, value, error, onChange, 
    divClass="input-group", 
    labelClass="form-label", 
    fieldClass="fat-border form-input", 
    errorClass="form-error", 
    id=null
    renderField(name, label, type, value, onChange, divClass, labelClass, fieldClass, errorClass,id){
        const { data, errors } = this.state;
        return(
            <Field
                name={name}
                label={label}
                type={type}
                value={value}
                onChange={this.handleChange}
                error={errors[name]}

                
        )

    }
}

<Field name="testingDefault" label="Testing Default" />
<Field name="testingTextArea" label="testing Text Area" fieldClass="textarea" />
<Field name="testingOnChange" label="testing On Change" onChange={handleChange} />
<Field name="testingImage" label="testingimage" type="file" />
<FormButton returnText="ReturnTest" text={text} reroute={reroute}/>


export default Form;

