import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../helpers/handleResponse';
import pbkdf2 from 'crypto-js/pbkdf2';
import crypto from 'crypto-js';
import jwt from 'jsonwebtoken';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
  login,
  logout,
  register,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue () { return currentUserSubject.value }
};

function login(email, password) {
  var hashedPassword = pbkdf2(password, 'ferropriborsalt', { keySize: 512/32, iterations: 1000 }).toString();
  var userDataPairToken = jwt.sign({email: email, hash: hashedPassword}, 'ferropribor');
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userDataPairToken})
  };

  return fetch(`http://172.16.20.75:8060/`, requestOptions)
    .then(handleResponse)
    .then(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      currentUserSubject.next(user);

      return user;
    });
}

function logout() {
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
}

function register(email, password, name, surname){
  var hashedPassword = pbkdf2(password, 'ferropriborsalt', { keySize: 512/32, iterations: 1000 }).toString();
  var userDataQuartetToken = jwt.sign({email: email, hash: hashedPassword, name: name, surname: surname}, 'ferropribor');
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userDataQuartetToken})
  };

  return fetch(`http://172.16.20.75:8060/`, requestOptions)
    .then(handleResponse)
    .then(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      currentUserSubject.next(user);

      return user;
    });
}