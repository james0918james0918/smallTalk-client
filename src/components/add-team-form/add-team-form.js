import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { string as yupString, object as yupObject } from 'yup';
import { Link } from 'react-router-dom';
import FormData from 'form-data';
import {
  ADD_TEAM_FORM_FIELDS,
  FILE_TEAM_FROM_FIELD as logo
} from '../../constants/index';
import { SpinnerContext, TeamService } from '../../services/index';
import './add-team-form.scss';

const teamService = new TeamService();

const initialValues = {
  name: '',
  description: '',
  logo: ''
};

const teamSchema = yupObject({
  name: yupString()
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

const getPathOfHome = (location) => {
  const { pathname } = location;
  return pathname.slice(0, pathname.lastIndexOf('/'));
};

const AddTeamForm = ({ history, location }) => (
  <SpinnerContext.Consumer>
    {/* variable spinnerContext is the context object of the SpinnerContext */}
    { spinnerContext => (
      <div className="addTeamFormContainer">
        <Formik
          initialValues={initialValues}
          validationSchema={teamSchema}
          onSubmit={(values) => {
            (async () => {
              try {
                // open spinner when the team creation starts
                spinnerContext.toggleSpinner();
                // construct the multipart stream
                const formData = new FormData();
                formData.append('logo', values.logo);
                // upload real logo
                const resOfLogoId = await teamService.uploadTeamLogo(formData);
                // upload the logoId instead of the real logo to TeamController.post('/')
                const { logo, ...rest } = values;
                await teamService.createTeam({ ...rest, logoId: resOfLogoId.data });
                // close spinner
                spinnerContext.toggleSpinner();
                // go back to home
                history.replace(getPathOfHome(location));
              } catch (err) {
                console.log(err);
              }
            })();
          }}
          render={props => (
            <Form className="addTeamForm" encType="multipart/form-data">
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
                    <Link to={getPathOfHome(location)} className="addTeamForm__link">
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
    )}
  </SpinnerContext.Consumer>
);

export default AddTeamForm;
