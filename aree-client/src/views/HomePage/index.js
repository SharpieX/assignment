import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        const { user, auth } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user?.data?.name}!</h1>
                {user.loading && <em>Loading user...</em>}
                {user.error && <span className="text-danger">ERROR: {user.error}</span>}
                <p>
                    <Link to="/login">Logout</Link>
                </p>
                <p>
                    <Link to="/products">Products</Link>
                </p>
            </div>
        );
    }
}

function mapState(state) {
    const { user, authentication } = state;
    const { auth } = authentication;
    return { user, auth };
}

const actionCreators = {
    getUsers: userActions.getAll,
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };