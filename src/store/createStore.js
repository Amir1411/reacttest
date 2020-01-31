import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import makeRootReducer from "./reducers";

export default (initialState = {}) => {

	const middleware = [thunk];
	const enhancers = [];
	let composeEnhancers = compose;

	if (process.env.NODE_ENV === "development") {
		const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
		if (typeof composeWithDevToolsExtension === "function") {
			composeEnhancers = composeWithDevToolsExtension;
		}
	}

	const store = createStore(
		makeRootReducer({}),
		initialState,
		composeEnhancers(applyMiddleware(...middleware), ...enhancers)
	);
	return store;
};