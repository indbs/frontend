import React, { Component } from 'react';
import pbkdf2 from 'crypto-js/pbkdf2';
import crypto from 'crypto-js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import  '../bootstrap.min.css';
import { authenticationService } from '../services/authentication';
//import jwt from 'jsonwebtoken';

class SignIn extends Component {
  constructor(props) {
    super(props);

    // redirect to home if already logged in
    if (authenticationService.currentUserValue) { 
        this.props.history.push('/generalTimeLine');
    }
  }
  
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
			<div id='SignIn' style = {{'margin-left': '10%','margin-right': '10%','margin-top': '15vh'}} >
				<div id='welcome_words' style = {{'text-align': 'center','margin-bottom': '2%', color: '#3560db', 'font-size': '15pt'}} >
					Добро пожаловать!
				</div> 
				<div id='welcome_describe' style = {{'margin-bottom': '4%','text-align': 'center', color: '#484848'}} >
					Для продолжения работы необходимо войти в систему!
				</div>


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
          if (!values.password) {
            errors.password = 'Введите пароль';
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
                      const { from } = this.props.location.state || { from: { pathname: "/generalTimeLine" } };
                      this.props.history.push(from);
                  },
                  error => {
                      setSubmitting(false);
                      setStatus(error);
                  }
              );
        }}
      >
      {({ values, status, handleChange, isSubmitting, errors, touched }) => (        
        <Form>

          <div className="form-group">
            <label htmlFor="email">email</label>
            <Field className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} name="email" type="email" onChange={handleChange} />
            <ErrorMessage name="email" component="div" className="invalid-feedback" />
          </div>
          {errors.email && touched.email && errors.email}
          
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <Field  className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} name="password" type="password" onChange={handleChange} />
            <ErrorMessage name="password" component="div" className="invalid-feedback" />
          </div>
          {errors.password && touched.password && errors.password}

          <div className="form-group">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              Войти
            </button>
            {isSubmitting &&
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            }
          </div>

          {status &&
            <div className={'alert alert-danger'}>{status}</div>
          }

        </Form>      
      )}
      </Formik>
      </div>  
    );
  }
}

export default SignIn;