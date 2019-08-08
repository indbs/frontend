import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../helpers/handleResponse';
import pbkdf2 from 'crypto-js/pbkdf2';
import crypto from 'crypto-js';
import jwt from 'jsonwebtoken';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue () { return currentUserSubject.value }
};

function login(email, password) {
  //var hashedPassword = pbkdf2(password, crypto.lib.WordArray.random(128/8), { keySize: 512/32, iterations: 1000 }).toString();
  var hashedPassword = pbkdf2(password, 'ferropriborsalt', { keySize: 512/32, iterations: 1000 }).toString();
  var userDataPairToken = jwt.sign({email: email, hash: hashedPassword}, 'ferropribor');
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userDataPairToken})
  };

  //console.log('entered password: ', password);
  //console.log('hash: ', hashedPassword);
  //console.log('requestOptions.body: ', requestOptions.body);

  return fetch(`http://172.16.20.75:8060/`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      currentUserSubject.next(user);

      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
}