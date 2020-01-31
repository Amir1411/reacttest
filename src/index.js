import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'

import createStore from './store/createStore'
import App from './App'
import * as serviceWorker from './serviceWorker'

// eslint-disable-next-line no-underscore-dangle
const preloadedState = window.__PRELOADED_STATE__
// eslint-disable-next-line no-underscore-dangle
delete window.__PRELOADED_STATE__

const store = createStore(preloadedState)

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
serviceWorker.unregister()
