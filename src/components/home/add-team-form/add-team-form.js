import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { string as yupString, object as yupObject } from 'yup';
import { Input, Button } from 'antd';
import FormData from 'form-data';
import {
  ADD_TEAM_FORM_FIELDS,
  FILE_TEAM_FROM_FIELD as logo
} from '../../../constants/index';
import { SpinnerContext } from '../../../services/index';
import {
  createTeam,
  uploadTeamLogo
} from '../../../services/team-service';

import './add-team-form.scss';

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
        // field contains the onChange, onBlur methods which are supposed to be passed to input
        render={({ field, form: { isSubmitting } }) => (
          <Input
            {...field}
            disabled={isSubmitting}
            placeholder={item.placeholder}
          />
        )}
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

const AddTeamForm = ({ history }) => (
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
                // spinnerContext.toggleSpinner();
                // construct the multipart stream
                const formData = new FormData();
                formData.append('logo', values.logo);
                // upload real logo
                const resOfLogoId = await uploadTeamLogo(formData);
                // upload the logoId instead of the real logo to TeamController.post('/')
                const { logo, ...rest } = values;
                await createTeam({
                  ...rest,
                  logoId: resOfLogoId.data
                });
                // close spinner
                // spinnerContext.toggleSpinner();
                history.push('/home');
              } catch (err) {
                // close spinner
                // spinnerContext.toggleSpinner();
                // go back to landing
                history.push('/landing');
              }
            })();
          }}
          render={props => (
            <Form className="addTeamForm" encType="multipart/form-data">
              {normalInputGroups()}
              {fileInputGroup(props.setFieldValue, props.values.logo)}
              <div className="addTeamForm__buttonGroup">
                <Button
                  size="large"
                  type="primary"
                  loading={props.isSubmitting}
                  // Formik bound onSubmit method to the button with type submit automatically
                  htmlType="submit"
                  ghost
                >
                  Create the team!
                </Button>
                <Button
                  size="large"
                  type="danger"
                  disabled={props.isSubmitting}
                  onClick={() => {
                    history.push('/home');
                  }}
                  ghost
                >
                  Back to home
                </Button>
              </div>
            </Form>
          )}
        />
      </div>
    )}
  </SpinnerContext.Consumer>
);

export default AddTeamForm;
