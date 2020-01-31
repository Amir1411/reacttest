import React, { useState, Suspense, lazy, useEffect } from 'react';
import { useCookies, withCookies } from 'react-cookie';
import HeaderComponent from '../../common/Header';
import Loader from '../../common/loader';
import UserListComponent from './userlist';


const Dashboard = (props) => {

	return (
		<div>
			<HeaderComponent {...props} />
			<main>
                <Suspense fallback={<div><Loader /></div>}>
                    <UserListComponent />
                </Suspense>
            </main>
		</div>
	)
};

export default withCookies(Dashboard);
