//replace "components/admin/general/form/form.js" with this content


import React from 'react';
import { Field, FormButton } from './formComponents'
import './form.scss'


const Form = (props) => {
    const {initialValues, text='Ok', mainHistory, returnUrl='/'} = props;  //handleSubmit
    function reroute(){
        mainHistory.push(returnUrl);
    };
    const validateForm = () => {
        console.log("testing validation function");
        if (!error) {
            return null;
        }
        //something to push error messages to variable
        return errors
    };
    const validateField = () => {
        console.log("testing validate property function");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("testing submit functionality");
    };

    const handleChange = (e) => {
        const { value } = e.currentTarget;
        console.log("inside onchange event, e props", value);

    };

    return (
       <form className="form" encType="multipart/form-data" onSubmit={handleSubmit}>
            <Field name="testingDefault" label="Testing Default" />
            <Field name="testingTextArea" label="testing Text Area" fieldClass="textarea" />
            <Field name="testingOnChange" label="testing On Change" onChange={handleChange} />
            <Field name="testingImage" label="testingimage" type="file" />
            <FormButton returnText="ReturnTest" text={text} reroute={reroute}/>
        </form>
    )
}

export default Form;

