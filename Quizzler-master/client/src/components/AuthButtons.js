import React, { useContext } from 'react';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const AuthButtons = () => {
	const { userData, setUserData } = useContext(UserContext);
	const history = useHistory();

	const register = () => {
		history.push('/register');
	};
	const login = () => {
		history.push('/login');
	};
	const home = () => {
		history.push('/');
	};
	// this will return userdata hook back to original state and remove token from local storage
	const logout = () => {
		setUserData({
			token: undefined,
			user: undefined,
		});
		localStorage.setItem('auth-token', '');
		history.push('/login');
	};
	return (
		<nav className='auth-buttons'>
			{userData.user ? (
				<div>
				<Button color='info' onClick={home}>
				Home
			    </Button>
				<Button color='warning' onClick={logout}>
					Log Out
				</Button>
				</div>
			) : (
				<div>
					<Button color='info' onClick={register}>
						Register
					</Button>
					<Button color='info' onClick={login}>
						Login
					</Button>
				</div>
			)}
		</nav>
	);
};

export default AuthButtons;
