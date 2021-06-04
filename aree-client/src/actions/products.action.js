import { productsConstants } from '../constants';
import {productService} from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const productsAction = {
    getAll,
};

// function login(username, password) {
//     return dispatch => {
//         dispatch(request({ username }));
//
//         userService.login(username, password)
//             .then(
//                 user => {
//                     dispatch(success(user));
//                     history.push('/');
//                 },
//                 error => {
//                     dispatch(failure(error.toString()));
//                     dispatch(alertActions.error(error.toString()));
//                 }
//             );
//     };
//
//     function request(user) { return { type: productsConstants.LOGIN_REQUEST, user } }
//     function success(user) { return { type: productsConstants.LOGIN_SUCCESS, user } }
//     function failure(error) { return { type: productsConstants.LOGIN_FAILURE, error } }
// }
//
// function logout() {
//     userService.logout();
//     return { type: userConstants.LOGOUT };
// }
//
// function register(user) {
//     return dispatch => {
//         dispatch(request(user));
//
//         userService.register(user)
//             .then(
//                 user => {
//                     dispatch(success());
//                     history.push('/login');
//                     dispatch(alertActions.success('Registration successful'));
//                 },
//                 error => {
//                     dispatch(failure(error.toString()));
//                     dispatch(alertActions.error(error.toString()));
//                 }
//             );
//     };
//
//     function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
//     function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
// }

function getAll(page) {
    return dispatch => {
        dispatch(request());

        productService.getAll(page)
            .then(
                products => dispatch(success(products)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: productsConstants.GET_ALL_PRODUCTS_REQUEST } }
    function success(data) { return { type: productsConstants.GET_ALL_PRODUCTS_SUCCESS, data } }
    function failure(error) { return { type: productsConstants.GET_ALL_PRODUCTS_ERROR, error } }
}
