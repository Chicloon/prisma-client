import React from 'react';
import { withFormik } from 'formik';
import Yup from 'yup';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

class SignupForm extends React.Component {
  render() {
    const {
      dirty, values, errors, handleChange, handleBlur, handleSubmit,
    } = this.props;

    const errorsValues = Object.values(errors);

    return (
      <div className="login-form">
        <style>
          {`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;`}
        </style>
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Register new account
            </Header>
            <Form size="large" onSubmit={handleSubmit}>
              <Segment stacked>
                <Form.Input
                  id="email"
                  name="email"
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={!!errors.email}
                />

                <Form.Input
                  fluid
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  error={!!errors.name}
                  name="name"
                  icon="user"
                  iconPosition="left"
                  placeholder="name"
                />
                <Form.Input
                  fluid
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={!!errors.password}
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />
                <Button
                  disabled={!dirty || errorsValues.length !== 0}
                  color="teal"
                  fluid
                  size="large"
                  type="submit"
                >
                  SignUp
                </Button>
              </Segment>
            </Form>
            {errorsValues.length !== 0 && (
              <Message negative>
                <ul style={{ listStyle: 'none' }}>
                  {errorsValues.map(error => <li key={error}>{error}</li>)}
                </ul>
              </Message>
            )}
            <Message>
              Have account? <Link to="/login">Log In</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const reigsterMutation = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

export default compose(
  graphql(reigsterMutation),
  withFormik({
    mapPropsToValues: () => ({ email: '', password: '', name: '' }),
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required!'),
      password: Yup.string()
        .min(5)
        .max(100)
        .required('Password is required!'),
      name: Yup.string()
        /* eslint-disable no-template-curly-in-string */
        .min(3, 'Name must be a least ${min} chars long')
        .max(25, 'Name must less than ${max} chars long')
        .matches(/^[a-zA-Z0-9]*$/, 'The Name can only contain letters and numbers')
        .required('Name is required!'),
    }),

    handleSubmit: async (values, { props: { mutate, history }, setSubmitting, setErrors }) => {
      const response = await mutate({
        variables: { email: values.email, password: values.password, name: values.name },
      }).catch(({ message }) => {
        console.log(message);

        if (message.includes('Field name = name')) {
          setErrors({ username: 'Username taken' });
        }
        if (message.includes('Field name = email')) {
          setErrors({ email: 'Email taken' });
        }
      });
      setSubmitting(false);

      if (response) {
        localStorage.setItem('myapp/token', response.data.signup.token);
        history.push('/');
      }
      // const {
      //   ok, errors, token, refreshToken,
      // } = response.data.register;
      // if (ok) {
      //   localStorage.setItem('token', token);
      //   localStorage.setItem('refreshToken', refreshToken);
      //   setSubmitting(false);
      //   history.push('/');
      // } else {
      //   setErrors(normalizeErrors(errors));
      //   setSubmitting(false);
      // }
    },
  }),
)(SignupForm);
