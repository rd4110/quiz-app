import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorNotice from '../ErrorNotice';
import UserContext from '../../contexts/UserContext';
import setAuthToken from '../../utils/setAuthToken';
import API from '../../utils/Api';
import { Link } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [error, setError] = useState('');
	const { setUserData } = useContext(UserContext);
	const history = useHistory();
	// handle submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const loginUser = { email, password };
			const loginRes = await API.postUser(loginUser);
			setUserData({
				token: loginRes.data.token,
				user: loginRes.data.user,
			});
			setAuthToken(loginRes.data.token);
			localStorage.setItem('auth-token', loginRes.data.token);
			history.push('/');
		} catch (err) {
			err.response.data.msg && setError(err.response.data.msg);
			console.log(err.response.data);
		}
	};
	return (
		<div className='page text-center'>
			<h4>Welcome back!</h4>
			<h2>Login</h2>
			{error && (
				<ErrorNotice message={error} clearError={() => setError(undefined)} />
			)}
			<div className='container mt-2'>
				<div className='row d-flex justify-content-center'>
					<div className='col-md-8 col-sm-12'>
						<form onSubmit={handleSubmit}>
							<div className='form-group'>
								<label className='mt-1' htmlFor='login-email'>Email</label>
								<input
									className='form-control mx-sm-3'
									id='login-email'
									type='email'
									onChange={(e) => setEmail(e.target.value)}
								/>
								<label className='mt-2' htmlFor='login-password'>Password</label>
								<input
									className='form-control mx-sm-3'
									id='login-password'
									type='password'
									onChange={(e) => setPassword(e.target.value)}
								/>
								<button className='btn-login mt-4' type='submit' value='Log in'>
									Login
								</button>
							</div>
						</form>
						<Link className='links' to='/register'>Make an account</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
