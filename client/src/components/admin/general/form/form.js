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
    // constructor?
    // getting to making this a class, where I can push props fromonChange into state to be stored so that I can test my onSubmit
    // remember to git add commit when I've done this, so that shows that I've 
    // const {initialValues, text='Ok', mainHistory, returnUrl='/'} = props;  //handleSubmit
    //   need to add in logic ==> onClick/other for "touched".  if already displaying error, then forget about it.  else diplay error.

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

    //partway store, is this ok, or will the other errors appear too, stopoing after we've worked thhrough ok on four feild but stopping at next not yet touched feild?
    //what response object is being returned?
    //if needed, can we get the props from yup?
    //keep this here, vs move to main class
    //isValid vs other?
    //validationsSchema ok to go into our state?
    reroute(){
        this.props.mainHistory.push(this.props.returnUrl);
    };

    async validateForm(){
        let errorForm = [];
        console.log("inside errorForm FALSE");
        await this.props.validSchema.validate(this.testInput, {abortEarly:false}).catch(errs => {
            console.log("inside catch errorForm: ", errs.inner);
            errs.inner.map(err=>{
                errorForm.push({
                    name: err.path,
                    message: err.message
                });
            });            
        });
        console.log("errorForm: ", errorForm);
    };

    async validateField({name, value }){
        const schema = yup.object().shape({ [name]: this.validSchema[name] });
        let obj = {[name]:value};
        let errorMessage = await schema.validate(obj).catch(errs => {
            return errs.message;
        });
        return errorMessage;
    };

    handleSubmit(e){
        e.preventDefault();
        //const errors = this.validateForm();
        // this.setState({ errors: errors || {} });
        // if (errors) return;
        console.log("inside form.js handleSubmit");
        this.props.submitForm(this.state.data);
    };

    async handleChangeBlur({currentTarget: input}){
        const errors = {...this.state.errors};
        let errorMessage = await this.validateField(input);
        console.log("error: ", errorMessage);
        if (errorMessage) {
            errors[input.name] = errorMessage;
        } else {
            delete errors[input.name];
        };

        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, errors });
        console.log("form.js state: ", this.state);
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
