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

        // this.schema = yup.object().shape({
        //     postTitle: Yup.string()
        //         .required('Please provide a title. Don\'t forget to name your latest brainchild!')
        //         .max(60,'Title too long; will not fit on tile.  Please limit to 60 characters.'),
        //     postContent: Yup.string()
        //         .required('Please provide content. You\'ve got readers chomping at the bit to see what you have to say - c\'mon, thow them a bone!'),
        //     postQuote: Yup.string()
        //         .required('Please provide a quote to spark readers\' interest - preferably something witty.')
        //         .max(255,'Sorry - too long!  There is a difference between a quote and a post you know!')
        // });

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
        // const { error } = Joi.validate(this.state.data, this.schema, options);
        // if (!error) return null;

        // const errors = {};
        // for (let item of error.details) errors[item.path[0]] = item.message;
        // return errors;
    };

    validateField(input){
        console.log("testing validate property function");
        
        // const {name, value} = input;
        // const obj = { [name]: value };
        // const schema = { [name]: this.schema[name] };
        // const { error } = Joi.validate(obj, schema);
        // return error ? error.details[0].message : null;
    };

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
        const errorMessage = this.validateField(input);
        if (errorMessage) {
            errors[input.name] = errorMessage;
        } else {
            delete errors[input.name]
        };

        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, errors });
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


