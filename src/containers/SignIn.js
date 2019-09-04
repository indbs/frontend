import   React, 
       { Component }                              from 'react';
import { Formik, Form, Field, ErrorMessage }      from 'formik';
import                                                 '../bootstrap.min.css';
import { authenticationService }                  from '../services/authentication';
import { connect }                                from 'react-redux';
import { login_action }                           from '../actions/user_actions';
import { validateForm }                           from './FormFunctions'
import { RegisterRememberButtons, SubmitButton }  from './Buttons'
//import jwt from 'jsonwebtoken';

class SignIn extends Component {
  constructor(props) {
    super(props);

    if (authenticationService.currentUserValue) { 
        this.props.history.push('/generalTimeLine');
    }
  }

  /*
  //var hashedPassword = pbkdf2("password",crypto.lib.WordArray.random(128/8),{ keySize: 512/32, iterations: 1000 }).toString();
  var hashedPassword = pbkdf2("password",'ferropriborsalt',{ keySize: 512/32, iterations: 1000 }).toString();
  var tokenHashedPassword = jwt.sign({hash: hashedPassword}, 'signature');
  var untokenHashedPassword = jwt.verify(tokenHashedPassword, 'signature');
  */
  //email - test@test.ru
  //password:
  //password
  //salt:
  //ferropriborsalt
  //hash:
  //b11970e7f116120d7fdf4bfb7b5d2b6500fd64b7986e58b1a2fd1b3cece5b65dd4e1ffcee349ddd64f11aec2f0caed534773e34c0ea832e478f3317709e67092      //length - 128

  render() {
    console.log('this.props.user_behavior.registered: ', this.props.user_behavior.registered);
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
          validate={(values) => validateForm(values, 'signIn')}

          onSubmit={({ email, password }, { setStatus, setSubmitting }) => {
            setStatus();
            authenticationService.login(email, password)
                .then(
                    user => {
                      this.props.dispatch(user.NAME);
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
            {this.props.user_behavior.registered&&<h5>Успешно! Регистрация закончена<span class="badge badge-secondary">Можно войти</span></h5>}
            <div className="form-group">
              <label htmlFor="email">email</label>
              <Field className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} name="email" type="email" /*onChange={handleChange}*/ />
              <ErrorMessage name="email" component="div" className="invalid-feedback" />
            </div>
            {/*{errors.email && touched.email && errors.email}*/}
            
            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <Field  className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} name="password" type="password" /*onChange={handleChange}*/ />
              <ErrorMessage name="password" component="div" className="invalid-feedback" />
            </div>
            {/*{errors.password && touched.password && errors.password}*/}

            <SubmitButton isSubmitting={isSubmitting} errors={errors}/>
            <RegisterRememberButtons history={this.props.history}/>

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
const mapStateToProps = state => ({
  user_behavior: state.user_behavior
})

const mapDispatchToProps = dispatch => ({
  dispatch(user_name){
    dispatch(login_action(user_name));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);