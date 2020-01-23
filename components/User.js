import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

const CURRENT_USER = gql`
    query getCurrentUser {
        currentUser {
            id
            email
            name
            permissions
        }
    }
`;

const User = props => {
    const payload = useQuery(CURRENT_USER);
    const { loading } = payload;
    if (loading) {
        console.log('now loading');
        return <p>loading user</p>;
    }
    console.log('after loading');
    console.log('props', props);
    return <div>{props.children(payload)}</div>;
};

User.propTypes = {};

export default User;
export { CURRENT_USER };
