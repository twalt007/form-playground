import React, { Component } from 'react'
import AdminHeader from '../general/header/adminHeader'
import NavButton from '../../general/navButton'
import { Field, FormButton } from '../general/form/formComponents'
import * as yup from 'yup'
import axios from 'axios';

class NewPost extends Component {
    constructor(props){
        super(props)

        this.state = {
            data: {},
            errors: {},
            initVal: {}
        }

        this.validSchema = {
            postTitle: yup.string()
            .required('Please provide a title. Don\'t forget to name your latest brainchild!')
            .max(60,'Title too long; will not fit on tile.  Please limit to 60 characters.')
            .trim(),
            postContent: yup.string()
            .required('Please provide content. Your audience awaits!')
            .trim(),
            postQuote: yup.string()
            .required('Please provide a quote to spark readers\' interest - preferably something witty.')
            .max(255,'Sorry - too long!  There is a difference between a quote and a post you know!')
            .trim()
        }

        this.reroute = this.reroute.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.validateField = this.validateField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeBlur = this.handleChangeBlur.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }        

    reroute(){
        this.props.history.goBack();
    };

    async validateForm(){
        const data = {...this.state};
        const schema = yup.object().shape(this.validSchema);
        console.log("validateForm starting state: ", data)
        let errors = {};
        await schema.validate(this.state.data, {abortEarly:false}).catch(errs => {
            errs.inner.map(err=>{
                errors[err.path] = err.message;
            });            
        });
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

        let allErrors = await this.validateForm();
        this.setState({errors : allErrors });

        if (Object.keys(allErrors).length !== 0) {
            return;
        };

        this.submitForm(this.state.data);
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

    submitForm = async(values) => {
        const {history, userId='a9ec5c8d-455a-11ea-8fd0-a4db300c2566'} = this.props;
        console.log("newPost handleSubmit form Values: ", values)
        const data = {
            userId: userId,
            post: values 
        }
        console.log("handleSubmit new post data: ", data);
        let resultMessageState;
        try{
            const resp = await axios.post(`/api/admin/new-post`, data);
            console.log("hanleSubmit resp from axios call: ", resp);
            if (resp.data.code===200){
                resultMessageState = 'success';         
            }
            history.push('/result-message', resultMessageState);
            return;
        }
        catch (error){
            console.log("Error submitting content to be posted. ", error);
            history.push('/result-message');
        }
        
        
    }

    render(){
        let oCB = this.handleChangeBlur;
        let err = this.state.errors;
        return (
            <div className="admin section-container center">
                <div className="admin-background">
                    <AdminHeader mainHistory={history}/>
                    <NavButton text="Create New Post" buttonClasses = "title" onClick="null"/>
                    <form className="form" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                        <Field name='postTitle' label="Post Title" max="60" min="1" error={err} onChange={oCB} onBlur={oCB} />
                        <Field name="postContent" label="Post Content" fieldClass="textarea" min="1" error={err} onChange={oCB} onBlur={oCB}/>
                        <Field name="postQuote" label="Post Quote" max="255" min="1" error={err} onChange={oCB} onBlur={oCB} />
                        <Field name="postImage" label="Post Image" type="file" accept="image/*" error={err} onChange={oCB} onBlur={oCB} />
                        <FormButton text="Post" reroute={this.reroute}/>
                    </form>
                    <div className="bottom-space"></div>
                </div>
            </div>
        )
    };
}

export default NewPost;