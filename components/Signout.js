import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER } from './User';

const SIGN_OUT = gql`
    mutation signOut {
        signout {
            successMessage
        }
    }
`;

export default function Signout() {
    const [signoutMutation, loadingErrorData] = useMutation(SIGN_OUT, {
        refetchQueries: [{ query: CURRENT_USER }],
    });
    const signOutHandler = async () => {
        const message = await signoutMutation();
        console.log('message', message);
    };

    return <button onClick={signOutHandler}>Sign out</button>;
}
