//replace "components/admin/general/form/form.js" with this content

import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './form.scss'


const Form = (props) => {
    const {initialValues, text='Ok', mainHistory, handleSubmit, returnUrl='/'} = props;
    function reroute(){
        mainHistory.push(returnUrl);
    }
    return (
        <Formik 
            initialValues={initialValues}
            
            validationSchema={Yup.object({
                postTitle: Yup.string()
                    .required('Please provide a title. Don\'t forget to name your latest brainchild!')
                    .max(60,'Title too long; will not fit on tile.  Please limit to 60 characters.'),
                postContent: Yup.string()
                    .required('Please provide content. You\'ve got readers chomping at the bit to see what you have to say - c\'mon, thow them a bone!'),
                postQuote: Yup.string()
                    .required('Please provide a quote to spark readers\' interest - preferably something witty.')
                    .max(255,'Sorry - too long!  There is a difference between a quote and a post you know!')
            })}
            
            onSubmit = {(values, {setSubmitting})=>{
                handleSubmit(values);
                setSubmitting(false);
                console.log("formvalues on Form: ", values);
            }}
        >
            <Form className="form" enctype="multipart/form-data">
                <label className="form-label" htmlFor="postTitle">Post Title</label>
                <Field className="fat-border form-input" name="postTitle" type="text" />
                <ErrorMessage className="form-error" name="postTitle" />
                <label className="form-label" htmlFor="postContent">Post Content</label>
                <Field className="fat-border form-textarea" name="postContent" type="text" component="textarea" />
                <ErrorMessage className="form-error" name="postContent" />
                <label className="form-label" htmlFor="postQuote">Post Quote</label>
                <Field className="fat-border form-input" name="postQuote" type="text" />
                <ErrorMessage className="form-error" name="postQuote" />
                <label className="form-label" htmlFor="postImage">Upload Image</label>
                <Field className="fat-border form-input" id="t1" name="postImage" type="file" accept="image/*"></Field>
                {/* <input className="fat-border form-input" name="postImage" type="file" accept="image/*" /> */}
                <ErrorMessage className="form-error" name="postImage" />
                <div className="xlrg-flx-container flex-right">
                    <div className="lrg-container align-right top-space">
                        <div className = 'small-button fat-border after-space' onClick={reroute} >Return</div>                
                        <button className='text small-button fat-border' type='submit'>{text}</button>
                    </div>
                </div>
            </Form>
        </Formik>
    )
}


export default Form;



