import React, { Component }                       from 'react';
import                                                 '../bootstrap.min.css';
import { Formik, Form, Field, ErrorMessage }      from 'formik';
import { authenticationService }                  from '../services/authentication';
import { registeration_complete_action }          from '../actions/user_actions';
import { connect }                                from 'react-redux';
import { validateForm }                           from './FormFunctions'
import { RegisterButton }                         from './Buttons'

export class RegistrationForm extends Component {
  render(){
    return(
      <div id='registration' style = {{'margin-left': '10%','margin-right': '10%','margin-top': '15vh'}} >
				<div id='welcome_words' style = {{'text-align': 'center','margin-bottom': '2%', color: '#3560db', 'font-size': '15pt'}} >
					Добро пожаловать!
				</div> 
				<div id='welcome_describe' style = {{'margin-bottom': '4%','text-align': 'center', color: '#484848'}} >
					Введите все необходимые данные для регистрации!
				</div>
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirm_password: '',
          }} 
          validate={(values) => validateForm(values, 'registration')}

          onSubmit={({ email, password, name, surname }, { setStatus, setSubmitting }) => {
            setStatus();
            authenticationService.register(email, password, name, surname )
                .then(
                    user => {
                      console.log('congrats! user logged in! ', user);
                      this.props.dispatch(registeration_complete_action());
                      const { from } = this.props.location.state || { from: { pathname: "/welcomePage" } };
                      this.props.history.push(from);
                    },
                    error => {
                      console.log('ng ', error);
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
              <Field id='login_id' className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} name="email" type="text" />
              <ErrorMessage name="email" component="div" className="invalid-feedback" />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <Field  className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} name="password" type="password" />
              <ErrorMessage name="password" component="div" className="invalid-feedback" />
            </div>
            <div className="form-group">
              <label htmlFor="name">Имя</label>
              <Field  className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} name="name" type="text" />
              <ErrorMessage name="name" component="div" className="invalid-feedback" />
            </div>
            <div className="form-group">
              <label htmlFor="surname">Фамилия</label>
              <Field  className={'form-control' + (errors.surname && touched.surname ? ' is-invalid' : '')} name="surname" type="text" />
              <ErrorMessage name="surname" component="div" className="invalid-feedback" />
            </div>
            
            <RegisterButton isSubmitting={isSubmitting} errors={errors}/>

            {/*{status &&
              <div className={'alert alert-danger'}>{status}</div>
            }*/}
          </Form>      
        )}
        </Formik>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch(params){
    dispatch(params);
  }
})

export default connect(null, mapDispatchToProps)(RegistrationForm);