//replace "components/admin/general/form/form.js" with this content


import React, { Component } from 'react';
import { Field, FormButton } from './formComponents'
import './form.scss'


class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {},
            errors: {}
        }
        this.reroute = this.reroute.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.validateField = this.validateField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    // constructor?
    // getting to making this a class, where I can push props fromonChange into state to be stored so that I can test my onSubmit
    // remember to git add commit when I've done this, so that shows that I've 
    // const {initialValues, text='Ok', mainHistory, returnUrl='/'} = props;  //handleSubmit
    reroute(){
        this.props.mainHistory.push(this.props.returnUrl);
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
        const submitForm = this.props.submitForm;
        e.preventDefault();
        //const errors = this.validateForm();
        // this.setState({ errors: errors || {} });
        // if (errors) return;
        console.log("inside form.js handleSubmit");
        submitForm(this.state.data);
        
    };

    handleChange({currentTarget: input}){
        // const errors = {...this.state.errors};
        // const errorMessage = this.validateField(input);
        // if (errorMessage) errors[input.name] = errorMessage;
        // else delete errors[input.name];
        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({data});
        // this.setState({ data, errors });
        console.log("form.js state: ", this.state.data);
    };
 
    render(){
        console.log("form.js props: ", this.props);
        return (
        <form className="form" encType="multipart/form-data" onSubmit={this.handleSubmit}>
            {this.props.children}
        </form>
        )
    }
}

export default Form;


