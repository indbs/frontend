import React, { Component } from 'react';
import pbkdf2 from 'crypto-js/pbkdf2';
import crypto from 'crypto-js';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class SignIn extends Component {
  state = {
    user: '',
    rememberMe: false
  };

  componentDidMount() {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    const user = rememberMe ? localStorage.getItem('user') : '';
    this.setState({ user, rememberMe });
    console.log('pbkdf2 password:',"password");
    console.log('pbkdf2 hash:',pbkdf2("password",crypto.lib.WordArray.random(128/8),{ keySize: 512/32, iterations: 1000 }).toString());     //length 128
    console.log('pbkdf2 hash lenght:',pbkdf2("password",crypto.lib.WordArray.random(128/8),{ keySize: 512/32, iterations: 1000 }).toString().length);
  }

  handleChange = (event) => {
    const input = event.target;
    const value = input.type === 'checkbox' ? input.checked : input.value;

    this.setState({ [input.name]: value });
  };

  handleFormSubmit = () => {
    const { user, rememberMe } = this.state;
    localStorage.setItem('rememberMe', rememberMe);
    localStorage.setItem('user', rememberMe ? user : '');
  };

  render() {
    return (
      <Formik
        initialValues={{
          email: '',
          password: ''
        }} 
        validate={values => {
          let errors = {};
          if (!values.email) {
            errors.email = 'Введите email';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Неправильный email';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, handleChange, isSubmitting, errors, touched }) => (        
          <Form>

            <div className="form-group">
              <label htmlFor="email">email</label>
              <Field className={'form-control'} name="email" type="email" onChange={handleChange} />
              <ErrorMessage name="username" component="div" className="invalid-feedback" />
            </div>
            {errors.email && touched.email && errors.email}
            
            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <Field  className={'form-control'} name="password" type="password" onChange={handleChange} />
            </div>
            {errors.password && touched.password && errors.password}

            <div className="form-group">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                Войти
              </button>
            </div>

          </Form>      
        )}
      </Formik>
    );
  }
}

export default SignIn;