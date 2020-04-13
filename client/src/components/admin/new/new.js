//replace 'components/admin/new/new.js with this content.


import React, { Component } from 'react'
import AdminHeader from '../general/header/adminHeader'
import NavButton from '../../general/navButton'
import Form from '../general/form'
import { Field, FormButton } from '../general/form/formComponents'
import axios from 'axios';

//will want to turnn this into a full class
//whenn the form is working, I'll need to get the values pushed to state; these values will then later be pulled out of state

class NewPost extends Form {
    constructor(props){
        super(props)

        this.state = {
            data: {},
            errors: {},
            initVal: {}
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

    }

    render(){
        const initVal = this.state.initVal;
        return (
            <div className="admin section-container center">
                <div className="admin-background">
                    <AdminHeader mainHistory={history}/>
                    <NavButton text="Create New Post" buttonClasses = "title" onClick="null"/>
                    <Form submitForm={this.submitForm} handleSubmit={this.handleSubmit} mainHistory={this.props.history} >
                        <Field name='postTitle' label="Post Title" onChange={this.handleChange} max="60" min="1" initVal={initVal} />
                        <Field name="postContent" label="Post Content" fieldClass="textarea" onChange={this.handleChange} initVal={initVal} min="1"/>
                        <Field name="postQuote" label="Post Quote" onChange={this.handleChange} initVal={initVal} max="255" min="1"/>
                        <Field name="postImage" label="Post Image" type="file" accept="image/*" onChange={this.handleChange} initVal={initVal}/>
                        <FormButton text="Post" reroute={this.reroute}/>
                    </Form>
                    <div className="bottom-space"></div>
                </div>
            </div>
        )
    };
}

export default NewPost;