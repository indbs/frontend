import React, { Component } from 'react';
import pbkdf2 from 'crypto-js/pbkdf2';
import crypto from 'crypto-js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import  '../bootstrap.min.css';
import { authenticationService } from '../services/authentication';
//import jwt from 'jsonwebtoken';

class SignIn extends Component {
  state = {
    user: '',
    rememberMe: false
  };

  componentDidMount() {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    const user = rememberMe ? localStorage.getItem('user') : '';
    this.setState({ user, rememberMe });
    
    /*
    //var hashedPassword = pbkdf2("password",crypto.lib.WordArray.random(128/8),{ keySize: 512/32, iterations: 1000 }).toString();
    var hashedPassword = pbkdf2("password",'ferropriborsalt',{ keySize: 512/32, iterations: 1000 }).toString();
    console.log('test pbkdf2 password:',"password");
    console.log('test pbkdf2 hashedPassword:', hashedPassword);                     //length 128
    console.log('pbkdf2 hashedPassword lenght:',hashedPassword.length);
    var tokenHashedPassword = jwt.sign({hash: hashedPassword}, 'signature');
    console.log('pbkdf2 token for hashedPassword :',tokenHashedPassword);
    var untokenHashedPassword = jwt.verify(tokenHashedPassword, 'signature');
    console.log('pbkdf2 untoken for hashedPassword :',untokenHashedPassword);
    */
    //email - test@test.ru
    //password:
    //password
    //salt:
    //ferropriborsalt
    //hash:
    //b11970e7f116120d7fdf4bfb7b5d2b6500fd64b7986e58b1a2fd1b3cece5b65dd4e1ffcee349ddd64f11aec2f0caed534773e34c0ea832e478f3317709e67092
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
        /*
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
        */
        onSubmit={({ email, password }, { setStatus, setSubmitting }) => {
          setStatus();
          console.log('authenticationService: ', email+' '+password);

          authenticationService.login(email, password)
              .then(
                  user => {
                      const { from } = this.props.location.state || { from: { pathname: "/" } };
                      this.props.history.push(from);
                  },
                  error => {
                      setSubmitting(false);
                      setStatus(error);
                  }
              );
        }}
      >
      {({ values, handleChange, isSubmitting, errors, touched }) => (        
        <Form>

          <div className="form-group">
            <label htmlFor="email">email</label>
            <Field className={'form-control'} name="email" type="email" onChange={handleChange} />
            <ErrorMessage name="email" component="div" className="invalid-feedback" />
          </div>
          {errors.email && touched.email && errors.email}
          
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <Field  className={'form-control'} name="password" type="password" onChange={handleChange} />
            <ErrorMessage name="password" component="div" className="invalid-feedback" />
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