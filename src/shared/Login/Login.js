import React, { useReducer } from 'react';
import { NavLink, Redirect } from "react-router-dom";
import { useCookies, withCookies } from 'react-cookie';
import classnames from 'classnames';
import AppConstant from "../../constant/AppConstant.js";

const initialState = {
	loading: false,
	email: '',
	password: '',
	errors: {
		email: "",
		password: ""
	},
	is_remmeber_me: false,
	authenticationError: ""
};

function reducer(state, action) {
	switch (action.type) {
		case 'loading':
			return {
				...state,
				loading: action.payload
			};
		case 'email':
			return {
				...state,
				email: action.payload,
				errors: { email: '', password: state.errors.password }
			};
		case 'password':
			return {
				...state,
				password: action.payload,
				errors: { email: state.errors.email, password: '' }
			}
		case 'errors':
			return {
				...state,
				errors: action.payload
			}
		case 'authenticationErrors':
			return {
				...state,
				authenticationError: action.payload
			}
		case 'is_remmeber_me':
			return {
				...state,
				is_remmeber_me: action.payload
			}
		default:
			throw new Error();
	}
}

const Login = (prop) => {
	console.log("amir", prop)
	const [cookies, setCookie] = useCookies(['user']);
	const [state, dispatch] = useReducer(reducer, initialState);
	const handleChange = event => dispatch({ type: event.target.name, payload: event.target.value });

	const cookieExipry = () => {
		const COOKIE_EXIPRE_DAYS = 6;
		let exipryDate = new Date();
		exipryDate.setDate(exipryDate.getDate() + COOKIE_EXIPRE_DAYS);
		return {
			maxAge: COOKIE_EXIPRE_DAYS * 24 * 60 * 60,
			date: exipryDate
		};
	};

	const handleLogin = (event) => {
		if (state.email == "" && state.password == "") {
			dispatch({ type: 'errors', payload: { email: "Email field is required", password: "Password field is required" } })
		} else if (state.email == "") {
			dispatch({ type: 'errors', payload: { email: "Email field is required", password: state.errors.password } })
		} else if (state.password == "") {
			dispatch({ type: 'errors', payload: { password: "Password field is required", email: state.errors.email } })
		} else {
			dispatch({ type: 'loading', payload: true });

			let data = {
				"username":"hruday@gmail.com",
				"password" :'hruday123'
			}

			if (state.email != data.username && state.password != data.password) {
				dispatch({ type: 'authenticationErrors', payload: "Invalid Username/Password" })
				dispatch({ type: 'loading', payload: false });
				return false;
			}

			let expiry = new Date();
			expiry.setHours(expiry.getHours() + 1);

			setCookie('user', JSON.stringify({username: data.username}), {
				path: "/",
				maxAge: state.is_remmeber_me ? cookieExipry().maxAge : 60 * 60,
				expires: state.is_remmeber_me ? cookieExipry().date : expiry
			});
			prop.history.push('dashboard');
		}
	}
	return (
		<div className="container">
			<div className="account-wrap">
				<h3>React Test</h3>
				<div className="account-content">
					<div className="account-content-background">
						<div className="account-form-wrap">
							{state.authenticationError != "" && (<div className="error-container"><i className="fa fa-exclamation-triangle"></i>  {state.authenticationError}</div>)}
							<div className="card">
								<div className="card-body">
									<div className="form-group">
										<label className="font-size-22">
											<NavLink to="/"><i className="fa fa-arrow-left"></i> Log in:</NavLink>
										</label>
									</div>
									<div className="form-group">
										<label htmlFor="email">Email ID</label>
										<input
											type="email"
											className={classnames(state.errors.email != "" ? "form-control is-invalid" : "form-control")}
											name="email"
											value={state.email}
											onChange={handleChange}
											placeholder="Email ID"
										/>
										{state.errors.email != "" && (<div className="invalid-feedback">
											{state.errors.email}
										</div>)}
									</div>
									<div className="form-group">
										<label htmlFor="password">Password</label>
										<input
											type="password"
											className={classnames(state.errors.password != "" ? "form-control is-invalid" : "form-control")}
											placeholder="Password"
											name="password"
											value={state.password}
											onChange={handleChange}
										/>
										{state.errors.password != "" && (<div className="invalid-feedback">
											{state.errors.password}
										</div>)}
									</div>
									<div className="form-group">
										<div className="checkbox">
											<input
												type="checkbox"
												id="checkbox"
												name=""
												checked={state.is_remmeber_me}
												onChange={() => dispatch({ type: 'is_remmeber_me', payload: state.is_remmeber_me ? false : true })}
											/>
											<label htmlFor="checkbox"><span className="margin-top-3">Keep me logged in</span></label>
										</div>
									</div>
									<div className="form-group">
										<button
											className="btn btn-info btn-block"
											onClick={handleLogin}
											disabled={state.loading}
										>
											{state.loading ? (<div><i className="fa fa-refresh fa-spin"></i>  Loading</div>) : 'Login'}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};

export default withCookies(Login);
