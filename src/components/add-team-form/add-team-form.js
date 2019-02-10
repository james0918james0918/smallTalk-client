import React, {Component} from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { string as yupString, object as yupObject } from 'yup'
import { Link } from 'react-router-dom'
import './add-team-form.scss'

const initialValues = {
    title: '',
    description: '',
}

const teamSchema = yupObject({
    title: yupString()
    .min(2,'Your team name must contain at least 2 characters')
    .required('Your team name is required'),
    description: yupString()
    .min(10,'Description must contain at least 10 characters')
    .required('Description is required')
})


const addTeamForm = () => (
    <div className="addTeamForm">
       <Formik
            initialValues={initialValues}
            validationSchema={teamSchema}
            onSubmit={ values=>{
                alert(JSON.stringify(values,null,2));
            }}
            render={props=>{
                return (
                    <Form>
                        <div>
                            <label htmlFor="title">Team name</label>
                            <Field name="title" type="text" id="title"/>
                            <ErrorMessage name="title">{msg => <div>{msg}</div>}</ErrorMessage>
                        </div>
                        <div>
                            <label htmlFor="description">Team description</label>
                            <Field name="description" type="text" id="description"/>
                            <ErrorMessage name="description">{msg => <div>{msg}</div>}</ErrorMessage>
                        </div>
                        <div>
                            <button type="submit" disabled={props.isSubmitting}>Create the team!</button>
                            <button type="button" disabled={props.isSubmitting}>
                                { !props.isSubmitting ? <Link to="/">Go back to home</Link> : 'Go back to home' }
                            </button>
                        </div>
                    </Form>
                )
            }}
       />
    </div>
)

export default addTeamForm;