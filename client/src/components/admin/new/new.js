// //replace 'components/admin/new/new.js with this content.

// import React, {Component} from 'react'
// import AdminHeader from '../general/header/adminHeader'
// import NavButton from '../../general/navButton'
// import Form from '../general/form'
// import axios from 'axios';


// //idea - given that the extention of Form should share all of the same functionalities of form, it not that we need to pass stuff between it, if it passes once in the origional it hsoud=ld pass in the extention.  and the only diferentce is that the extension allows us to specify and customize parts
// //so, just need to make this into a class that extends everything, and we should be good to code...?


// class NewPost extends Component (){
//     constructor(props){
//         super(props);
        
//         this.state={
//             data: {},
//             errors: {},

//         }

//         this.handleSubmit = this.handleSubmit.bind(this);

//     }
//     // const initialValues = {postTitle:'', postContent: '', postQuote: ''}
//     // const {history, userId='a9ec5c8d-455a-11ea-8fd0-a4db300c2566'} = props;

//     handleSubmit = async(values) => {
//         console.log("inside 'new' handleSubmit");
//         // const data = {
//         //     userId: userId,
//         //     post: {
//         //         postType: values.postType,
//         //         contentType: values.contentType,
//         //         postTitle: values.postTitle,
//         //         postContent: values.postContent,
//         //         postQuote: values.postQuote,
//         //     }
//         // }
//         // console.log("handleSubmit new post data: ", data);
//         // let resultMessageState;
//         // try{
//         //     const resp = await axios.post(`/api/admin/new-post`, data);
//         //     console.log("hanleSubmit resp from axios call: ", resp);
//         //     if (resp.data.code===200){
//         //         resultMessageState = 'success';         
//         //     }
//         //     history.push('/result-message', resultMessageState);
//         //     return;
//         // }
//         // catch (error){
//         //     console.log("Error submitting content to be posted. ", error);
//         //     history.push('/result-message');
//         // }
        
        
//     }
    
//     render(){
//         return (
//             <div className="admin section-container center">
//                 <div className="admin-background">
//                     <AdminHeader mainHistory={history}/>
//                     <NavButton text="Create New Post" buttonClasses = "title" onClick="null"/>
//                     <Form handleSubmit={handleSubmit} mainHistory={history} text="Post" initialValues={initialValues}>
//                         <Field name="testingDefault" label="Testing Default" />
//                         <Field name="testingTextArea" label="testing Text Area" fieldClass="textarea" />
//                         <Field name="testingOnChange" label="testing On Change" onChange={this.statehandleChange} />
//                         <Field name="testingImage" label="testingimage" type="file" />
//                         <FormButton returnText="ReturnTest" text={text} reroute={reroute}/>
//                     </Form>
//                     <div className="bottom-space"></div>
//                 </div>
//             </div>
//         )
//     }
// }

// export default NewPost;










// inheritance
//replace 'components/admin/new/new.js with this content.

import React from 'react'
import AdminHeader from '../general/header/adminHeader'
import NavButton from '../../general/navButton'
import Form from '../general/form'
import axios from 'axios';


//idea - given that the extention of Form should share all of the same functionalities of form, it not that we need to pass stuff between it, if it passes once in the origional it hsoud=ld pass in the extention.  and the only diferentce is that the extension allows us to specify and customize parts
//so, just need to make this into a class that extends everything, and we should be good to code...?


class NewPost extends Form (){
    constructor(props){
        super(props);
        
        this.state={
            data: {},
            errors: {},

        }

        this.handleSubmit = this.handleSubmit.bind(this);

    }
    // const initialValues = {postTitle:'', postContent: '', postQuote: ''}
    // const {history, userId='a9ec5c8d-455a-11ea-8fd0-a4db300c2566'} = props;

    handleSubmit = async(values) => {
        console.log("inside 'new' handleSubmit");
        // const data = {
        //     userId: userId,
        //     post: {
        //         postType: values.postType,
        //         contentType: values.contentType,
        //         postTitle: values.postTitle,
        //         postContent: values.postContent,
        //         postQuote: values.postQuote,
        //     }
        // }
        // console.log("handleSubmit new post data: ", data);
        // let resultMessageState;
        // try{
        //     const resp = await axios.post(`/api/admin/new-post`, data);
        //     console.log("hanleSubmit resp from axios call: ", resp);
        //     if (resp.data.code===200){
        //         resultMessageState = 'success';         
        //     }
        //     history.push('/result-message', resultMessageState);
        //     return;
        // }
        // catch (error){
        //     console.log("Error submitting content to be posted. ", error);
        //     history.push('/result-message');
        // }
        
        
    }
    
    render(){
        return (
            <div className="admin section-container center">
                <div className="admin-background">
                    <AdminHeader mainHistory={history}/>
                    <NavButton text="Create New Post" buttonClasses = "title" onClick="null"/>
                    {/* <Form handleSubmit={this.handleSubmithandleSubmit} mainHistory={history} text="Post" initialValues={initialValues}> */}
                    <Form handleSubmit={this.handleSubmithandleSubmit} mainHistory={history} text="Post" initialValues={initialValues}>
                        <Field name="testingDefault" label="Testing Default" />
                        <Field name="testingTextArea" label="testing Text Area" fieldClass="textarea" />
                        <Field name="testingOnChange" label="testing On Change" onChange={this.statehandleChange} />
                        <Field name="testingImage" label="testingimage" type="file" />
                        <FormButton returnText="ReturnTest" text={text} reroute={reroute}/>
                    </Form>
                    <div className="bottom-space"></div>
                </div>
            </div>
        )
    }
}

export default NewPost;


//need functional co,ponent so that can pass props down in "Form", 
//need class co,ponent so that can wrap things in form?