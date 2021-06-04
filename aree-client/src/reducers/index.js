import {combineReducers} from 'redux';

import {authentication} from './authentication.reducer';
import {registration} from './registration.reducer';
import {user} from './users.reducer';
import {alert} from './alert.reducer';
import {products} from './products.reducer'

const rootReducer = combineReducers({
    authentication,
    registration,
    user,
    products,
    alert
});

export default rootReducer;