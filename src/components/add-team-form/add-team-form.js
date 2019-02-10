import React, {Component} from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { string as yupString, object as yupObject } from 'yup'
import { Link } from 'react-router-dom'
import { ADD_TEAM_FORM_FIELDS }  from '../../constants/index'
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


const inputGroups = () => ADD_TEAM_FORM_FIELDS.map( 
        (item,index) => {
           return (
            <div className="addTeamForm__inputGroup" key={index}>
                <label htmlFor={item.field} className={`addTeamForm__inputGroup__label addTeamForm__inputGroup__label--${item.field}`}>{item.label}</label>
                <Field name={item.field} type={item.type} id={item.field} placeholder={item.placeholder} className={`addTeamForm__inputGroup__input addTeamForm__inputGroup__input--${item.field}`}/>
                <ErrorMessage name={item.field}>{msg => <div className="addTeamForm__inputGroup__error">{msg}</div>}</ErrorMessage>
            </div>
           )
        }
    )

const addTeamForm = () => (
    <div className="addTeamFormContainer">
       <Formik
            initialValues={initialValues}
            validationSchema={teamSchema}
            onSubmit={ values=>{
                alert(JSON.stringify(values,null,2));
            }}
            render={props=>{
                return (
                    <Form className="addTeamForm">
                        { inputGroups() }
                        {/* <div className="addTeamForm__inputGroup">
                            <label htmlFor="file" className="addTeamForm__inputGroup__label">Upload your files</label>
                            <Field name="file" type="file" id="file" placeholder={item.placeholder} className="addTeamForm__inputGroup__input"/>
                            <ErrorMessage name="file">{msg => <div className="addTeamForm__inputGroup__error">{msg}</div>}</ErrorMessage>
                        </div> */}
                        <div className="addTeamForm__buttonGroup">
                            <button type="submit" disabled={props.isSubmitting} className="addTeamForm__button addTeamForm__button--create">Create the team!</button>
                            <button type="button" disabled={props.isSubmitting} className="addTeamForm__button addTeamForm__button--backHome">
                                { !props.isSubmitting ? <Link to="/" className="addTeamForm__link">Go back to home</Link> : 'Go back to home' }
                            </button>
                        </div>
                    </Form>
                )
            }}
       />
    </div>
)

export default addTeamForm;