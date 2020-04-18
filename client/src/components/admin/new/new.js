//replace 'components/admin/new/new.js with this content.


import React, { Component } from 'react'
import AdminHeader from '../general/header/adminHeader'
import NavButton from '../../general/navButton'
import Form from '../general/form'
import { Field, FormButton } from '../general/form/formComponents'
import * as yup from 'yup'
import axios from 'axios';

class NewPost extends Form {
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
            .required('Please provide content. You\'ve got readers chomping at the bit to see what you have to say - c\'mon, thow them a bone!')
            .trim(),
            postQuote: yup.string()
            .required('Please provide a quote to spark readers\' interest - preferably something witty.')
            .max(255,'Sorry - too long!  There is a difference between a quote and a post you know!')
            .trim()
        }

        this.submitForm = this.submitForm.bind(this);
    }
    // handleSubmit = async(values) => {
    //     const {history, userId='a9ec5c8d-455a-11ea-8fd0-a4db300c2566'} = this.props;
    //     console.log("inside newPost handleSubmit function")
    //     console.log("newPost handleSubmit form Values: ", values)
    //     const data = {
    //         userId: userId,
    //         post: {
    //             postType: values.postType,
    //             contentType: values.contentType,
    //             postTitle: values.postTitle,
    //             postContent: values.postContent,
    //             postQuote: values.postQuote,
    //         }
    //     }
    //     console.log("handleSubmit new post data: ", data);
    //     let resultMessageState;
    //     try{
    //         const resp = await axios.post(`/api/admin/new-post`, data);
    //         console.log("hanleSubmit resp from axios call: ", resp);
    //         if (resp.data.code===200){
    //             resultMessageState = 'success';         
    //         }
    //         history.push('/result-message', resultMessageState);
    //         return;
    //     }
    //     catch (error){
    //         console.log("Error submitting content to be posted. ", error);
    //         history.push('/result-message');
    //     }
        
        
    // }

    submitForm = (props)=>{
        console.log("inside submitForm, data recieved from child", this.props);
        console.log("new.js state errors: ", this.state);
    }

    render(){
        let err = this.state.errors;
        return (
            <div className="admin section-container center">
                <div className="admin-background">
                    <AdminHeader mainHistory={history}/>
                    <NavButton text="Create New Post" buttonClasses = "title" onClick="null"/>
                    <Form submitForm={this.submitForm} mainHistory={this.props.history} >
                        <Field name='postTitle' label="Post Title" max="60" min="1" error={err} onChange={this.handleChangeBlur} onBlur={this.handleChangeBlur} />
                        <Field name="postContent" label="Post Content" fieldClass="textarea" min="1" error={err} onChange={this.handleChangeBlur} onBlur={this.handleChangeBlur}/>
                        <Field name="postQuote" label="Post Quote" max="255" min="1" error={err} onChange={this.handleChangeBlur} onBlur={this.handleChangeBlur} />
                        <Field name="postImage" label="Post Image" type="file" accept="image/*" error={err} onChange={this.handleChangeBlur} onBlur={this.handleChangeBlur} />
                        <FormButton text="Post" reroute={this.reroute}/>
                    </Form>
                    <div className="bottom-space"></div>
                </div>
            </div>
        )
    };
}

export default NewPost;