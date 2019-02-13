import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { string as yupString, object as yupObject } from 'yup';
import { Link } from 'react-router-dom';
import {
  ADD_TEAM_FORM_FIELDS,
  FILE_TEAM_FROM_FIELD as logo
} from '../../constants/index';
import { TeamService } from '../../services/index';
import './add-team-form.scss';

const teamService = new TeamService();

const initialValues = {
  title: '',
  description: ''
};

const teamSchema = yupObject({
  title: yupString()
    .min(2, 'Your team name must contain at least 2 characters')
    .required('Your team name is required'),
  description: yupString()
    .min(10, 'Description must contain at least 10 characters')
    .required('Description is required')
});

const normalInputGroups = () =>
  ADD_TEAM_FORM_FIELDS.map((item, index) => (
    <div className="addTeamForm__inputGroup" key={index}>
      <label
        htmlFor={item.field}
        className={`addTeamForm__inputGroup__label addTeamForm__inputGroup__label--${
          item.field
        }`}
      >
        {item.label}
      </label>
      <Field
        name={item.field}
        type={item.type}
        id={item.field}
        placeholder={item.placeholder}
        className={`addTeamForm__inputGroup__input addTeamForm__inputGroup__input--${
          item.field
        }`}
      />
      <ErrorMessage name={item.field}>
        {msg => <div className="addTeamForm__inputGroup__error">{msg}</div>}
      </ErrorMessage>
    </div>
  ));

const fileInputGroup = (setFieldValue, logoFileObj) => (
  <div className="addTeamForm__inputGroup">
    <label
      htmlFor={logo.field}
      className={`addTeamForm__inputGroup__label addTeamForm__inputGroup__label--${
        logo.field
      }`}
    >
      {logoFileObj ? logoFileObj.name : logo.label}
    </label>
    <Field
      name={logo.field}
      type={logo.type}
      id={logo.field}
      placeholder={logo.placeholder}
      className={`addTeamForm__inputGroup__input addTeamForm__inputGroup__input--${
        logo.field
      }`}
      onChange={e =>
        e.currentTarget.files[0]
          ? setFieldValue('logo', e.currentTarget.files[0])
          : setFieldValue('logo', undefined)
      }
    />
  </div>
);

const AddTeamForm = props => (
  <div className="addTeamFormContainer">
    <Formik
      initialValues={initialValues}
      validationSchema={teamSchema}
      onSubmit={(values) => {
        console.log(props.history);
        (async () => {
          const response = await teamService.addTeam(values);
          if (response.status === 200) {
            // push means change the url bar directly
            props.history.push('/');
          }
        })();
      }}
      render={props => (
        <Form className="addTeamForm">
          {normalInputGroups()}
          {fileInputGroup(props.setFieldValue, props.values.logo)}
          <div className="addTeamForm__buttonGroup">
            <button
              type="submit"
              disabled={props.isSubmitting}
              className="addTeamForm__button addTeamForm__button--create"
            >
              Create the team!
            </button>
            <button
              type="button"
              disabled={props.isSubmitting}
              className="addTeamForm__button addTeamForm__button--backHome"
            >
              {!props.isSubmitting ? (
                <Link to="/" className="addTeamForm__link">
                  Go back to home
                </Link>
              ) : (
                'Go back to home'
              )}
            </button>
          </div>
        </Form>
      )}
    />
  </div>
);

export default AddTeamForm;
