//replace "components/admin/general/form/form.js" with this content


import React, { Component } from 'react';
import { Field, FormButton } from './formComponents';
import * as yup from 'yup';
import './form.scss'


class Form extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: {},
            errors: {}
        }

        this.schema = yup.object().shape({
            postTitle: yup.string()
                .required('Please provide a title. Don\'t forget to name your latest brainchild!')
                .max(60,'Title too long; will not fit on tile.  Please limit to 60 characters.'),
                // .trim(),
            postContent: yup.string()
                .required('Please provide content. You\'ve got readers chomping at the bit to see what you have to say - c\'mon, thow them a bone!')
                .trim(),
            postQuote: yup.string()
                .required('Please provide a quote to spark readers\' interest - preferably something witty.')
                .max(255,'Sorry - too long!  There is a difference between a quote and a post you know!')
                .trim()
        });

        this.testInput = {
            postTitle: 'testing',
            postContent: "",
            postQuote: ""
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

    async validateForm(){
        console.log("testing validation function");
        // const { error } = Joi.validate(this.state.data, this.schema, options);
        // if (!error) return null;


        // const errors = {};
        // for (let item of error.details) errors[item.path[0]] = item.message;
        // return errors;
    };

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


    // validationSchema={Yup.object({
    //     postTitle: Yup.string()
    //         .required('Please provide a title. Don\'t forget to name your latest brainchild!')
    //         .max(60,'Title too long; will not fit on tile.  Please limit to 60 characters.'),
    //     postContent: Yup.string()
    //         .required('Please provide content. You\'ve got readers chomping at the bit to see what you have to say - c\'mon, thow them a bone!'),
    //     postQuote: Yup.string()
    //         .required('Please provide a quote to spark readers\' interest - preferably something witty.')
    //         .max(255,'Sorry - too long!  There is a difference between a quote and a post you know!')
    // })}

    async validateField(){
        let error = [];
        console.log("testing validate property function");
        await this.schema.validate(this.testInput, {abortEarly:false}).catch(errs => {
            console.log("eror inside try catch block: ", errs.inner);
            errs.inner.map(err=>{
                error.push({
                    name: err.path,
                    message: err.message
                });
            });            
        });
        console.log("validateField yup returned error: ", error);
        // const { error } = Joi.validate(obj, schema);
        // return error ? error.details[0].message : null;
    };

    handleSubmit(e){
        e.preventDefault();
        //const errors = this.validateForm();
        // this.setState({ errors: errors || {} });
        // if (errors) return;
        console.log("inside form.js handleSubmit");
        this.props.submitForm(this.state.data);
    };

    handleChange(e){
        const input = e.currentTarget;
        const errors = {...this.state.errors};
        this.validateField(input);
        // const errorMessage = this.validateField(input);
        // if (errorMessage) {
        //     errors[input.name] = errorMessage;
        // } else {
        //     delete errors[input.name]
        // };

        // const data = { ...this.state.data };
        // data[input.name] = input.value;
        // this.setState({ data, errors });
        // console.log("form.js state: ", this.state.data);
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




// yup example:

// raw data:

// { 
//     email_address: email <required>
//     full_name: string, <required>
//     house_no: int,
//     address_1: string <required>,
//     address_2: string,
//     post_code: string <required>
//     timestamp: date <required>
// }

// const checkoutAddressSchema = yup.object().shape({
//   email_address: yup
//       .string()
//       .email()
//       .required(),
//   full_name: yup
//       .string()
//       .required(),
//   house_no: yup
//       .number()
//       .required()
//       .positive()
//       .integer(),
//   address_1: yup
//       .string()
//       .required(),
//   address_2: yup
//       .string(),
//   post_code: yup
//       .string()
//       .required(),
//   timestamp: yup
//       .date()
//       .default(() => (new Date()),
//    }),
// });

// data recieved:
// let addressFormData = {
//    email_address: 'ross@jkrbinvestments.com',
//    full_name: 'Ross Bulat',
//    house_no: null,
//    address_1: 'My Street Name',
//    post_code: 'AB01 0AB',
// }

// const valid = await checkoutAddressSchema.isValid(addressFormData);
// OR
// checkoutAddressSchema
//   .isValid(addressFormData)
//   .then(function(valid) {
      
//      //valid - true or false
//   });

//   also validate the object  --> for instance if we had a time stamp or other to fill in here.  can't do that here though.  no default values to fill
//   abort early to stop after first error
//   await checkoutAddressSchema.validate(addressFormData, { abortEarly: false })


//   /</required>/need to add in logic ==> onClick/other for "touched".  if already displaying error, then forget about it.  else diplay error.



let schema = yup.object().shape({
    name: yup.string(),
    age: yup.number().min(18),
  });
   
  schema.validate({ name: 'jimmy', age: 11 }).catch(function(err) {
    err.name; // => 'ValidationError'
    err.errors; // => ['Deve ser maior que 18']
  });