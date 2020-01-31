import React, { useReducer } from 'react';
import { useCookies, withCookies } from 'react-cookie';
import { NavLink, Redirect } from "react-router-dom";

const initialState = {
    loading: false,
    profile_image: '/images/user.png',
	errors: {
    }
};

function reducer(state, action) {
	switch (action.type) {
        case 'loading':
			return {
				...state,
				loading: action.payload
            };
        case 'profile_image':
            return {
                ...state,
                profile_image: action.payload
            };
		case 'errors':
			return {
				...state,
				errors: action.payload
			}
		default:
			throw new Error();
	}
}

const Header = props => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const logout = () => {
        document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;";
        window.location = "/web";
    }

    return (
        <div className="header-wrap">
            <header className="secondary-header">
                <nav className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="logo-wrap">
                                <NavLink to="/">React Test</NavLink>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="nav-search-wrap position-relative">
                                <input 
                                    type="search"
                                    placeholder="Search"
                                />
                                <i className="fa fa-search"></i>
                            </div>
                        </div>
                        <div className="col-md-5 secondary-header-menu">
                            <div className="clearfix ">
                                <div className="float-right">
                                    <ul className="clearfix">
                                        <li><NavLink to="/">About</NavLink></li>
                                        <li><NavLink to="/">Contact US</NavLink></li>
                                        <li><NavLink to="/">Blog</NavLink></li>
                                        <li className="secondary-profile-image-wrap position-relative">
                                            <img src={state.profile_image} className="profile-image-btn" alt="" />
                                            <ul className="dropdown-menu dropdown-menu-right header-setting-wrap">
                                                <li><NavLink className="btn-block" to="/individual/dashboard">Dashboard</NavLink></li>
                                                <li><NavLink className="btn-block" to="/">Settings</NavLink></li>
                                                <li className="signout" onClick={logout}>Logout</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default withCookies(Header);