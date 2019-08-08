import React from 'react';
import SignIn from './containers/localStorageTest.js'

class WelcomePage extends React.Component {
	render() {
		return(
			<div id='SignIn' style = {{'margin-left': '30%','margin-right': '30%','margin-top': '20%'}} >
				<div id='welcome_words' style = {{'text-align': 'center','margin-bottom': '2%', color: '#3560db', 'font-size': '15pt'}} >
					Добро пожаловать!
				</div> 
				<div id='welcome_describe' style = {{'margin-bottom': '4%','text-align': 'center', color: '#484848'}} >
					Для продолжения работы необходимо войти в систему!
				</div>
				<SignIn />
			</div>    
		);
	}
}           

export default WelcomePage;