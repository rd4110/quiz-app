import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import ErrorNotice from '../ErrorNotice';
import setAuthToken from '../../utils/setAuthToken';
import API from '../../utils/Api';
import { Link } from 'react-router-dom';

const Register = () => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [passwordcheck, setPasswordcheck] = useState();
	const [displayName, setDisplayName] = useState();
	const [error, setError] = useState('');
	const { setUserData } = useContext(UserContext);
	const history = useHistory();
	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log('error', err.response.data.msg);
		try {
			const newUser = { email, password, passwordcheck, displayName };
			await API.postUserRegister(newUser);
			const loginRes = await API.postNewUser(email,password);
			setUserData({
				token: loginRes.data.token,
				user: loginRes.data.user,
			});
			setAuthToken(loginRes.data.token);
			localStorage.setItem('auth-token', loginRes.data.token);
			history.push('/');
			// catch block for handling sign-up/sign-in errors
		} catch (err) {
			err.response.data.msg && setError(err.response.data.msg);
			console.log(err.response.data);
		}
	};

	return (
		<div className='page text-center'>
			<h2>Sign up here</h2>
			{error && (
				<ErrorNotice message={error} clearError={() => setError(undefined)} />
			)}
			<div className='container'>
				<div className='row d-flex justify-content-center'>
					<div className='col-md-8 col-sm-12'>
						<form onSubmit={handleSubmit}>
							<div clasName='form-group'>
								<label className='mt-1' htmlFor='register-email'>Email</label>
								<input
									className='form-control mx-sm-3'
									id='register-email'
									type='email'
									onChange={(e) => setEmail(e.target.value)}
								/>
								<label className='mt-2 mb-n1' htmlFor='register-password'>Password</label><br></br>
								<small className='text-muted'>
								Must be at least 5 characters long.
								</small>
								<input
									className='form-control mx-sm-3 mb-3'
									id='register-password'
									type='password'
									onChange={(e) => setPassword(e.target.value)}
								/>
								
								<input
									className='form-control mx-sm-3'
									placeholder='verify password'
									type='password'
									onChange={(e) => setPasswordcheck(e.target.value)}
								/>
								<label className='mt-2' htmlFor='register-displayname'>Username</label>
								<input
									className='form-control mx-sm-3'
									id='register-displayname'
									type='text'
									onChange={(e) => setDisplayName(e.target.value)}
								/>
								<button className='btn-register' type='submit' value='register'>Register</button>
							</div>
						</form>
						<Link className='links' to='/login'>Back to login</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
