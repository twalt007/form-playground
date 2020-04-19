//replace "components/admin/general/form/form.js" with this content

import React, { Component } from 'react';
import * as yup from 'yup';
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
        this.handleChangeBlur = this.handleChangeBlur.bind(this);
    }
//-------------
    // async validateField(input){

    //     console.log("testing validate property function");
        
    //     const {name, value} = input;
    //     const fieldValues = { [name]: value };
    //     console.log("fieldValues: ", fieldValues, "schema: ", this.schema);
    //     const fieldSchema = { [name]: this.schema[name] };

    //     //partway stop;
    //     const response = await this.schema.isValid(fieldValues, {abortEarly: true});;
    //     console.log("validateField yup response: ", response);
    //     // const { error } = Joi.validate(obj, schema);
    //     // return error ? error.details[0].message : null;
    // };

    reroute(){
        this.props.history.goBack();
    };

    async validateForm(){
        const schema = yup.object().shape(this.props.validSchema);

        let errors = [];
        await schema.validate(this.state.data, {abortEarly:false}).catch(errs => {
            errs.inner.map(err=>{
                errors.push({
                    name: err.path,
                    message: err.message
                });
            });            
        });
        console.log("form errors: ", errors);
        return errors;
    };

    async validateField({name, value }){
        const schema = yup.object().shape({ [name]: this.validSchema[name] });
        let obj = {[name]:value};
        let errorMessage = await schema.validate(obj).catch(errs => errs);
        if (errorMessage.message) {
            return errorMessage.message
        } else return null;
    };

    async handleSubmit(e){
        e.preventDefault();
        const errors = {...this.state.errors};

        const [allErrors] = await this.validateForm();
        console.log("handlesubmit returned errors: ", errors);
        this.setState({errors : allErrors});
        console.log("state in handle submit: ", this.state);
        if (errors) return;
        this.props.submitForm();
        this.props.submitForm(this.state.data);
    };

    async handleChangeBlur({currentTarget: input}){

        const errors = {...this.state.errors};
        let errorMessage = await this.validateField(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, errors });
    };
 
    render(){
        return (
        <form className="form" encType="multipart/form-data" onSubmit={this.handleSubmit}>
            {this.props.children}
        </form>
        )
    }
}

export default Form;






// const valid = await checkoutAddressSchema.isValid(addressFormData);
// OR
// checkoutAddressSchema
//   .isValid(addressFormData)
//   .then(function(valid) {
      
//      //valid - true or false
//   });
