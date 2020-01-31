import { combineReducers } from "redux";
// import signupReducer from '../../shared/signup/actions';

export const makeRootReducer = asyncReducers => {
    return combineReducers({
        signup: {},
        ...asyncReducers
    });
};

export default makeRootReducer;