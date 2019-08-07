import React, { Component } from 'react';
import pbkdf2 from 'crypto-js/pbkdf2';
import crypto from 'crypto-js';

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
      <form onSubmit={this.handleFormSubmit}>
        <label>
          Пользователь: <input name="user" value={this.state.user} onChange={this.handleChange} />
        </label>
        <label>
          <input name="rememberMe" checked={this.state.rememberMe} onChange={this.handleChange} type="checkbox" /> 
          Запомнить меня
        </label>
        <button type="submit">
          Войти
        </button>
      </form>
    );
  }
}

export default SignIn;