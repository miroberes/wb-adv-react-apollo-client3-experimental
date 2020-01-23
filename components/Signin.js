import React, { useState } from 'react';
import Form from './styles/Form';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import ErrorMessage from './ErrorMessage';
import { CURRENT_USER } from './User';

const EMAIL = 'email';
const PASSWORD = 'password';

const SIGN_IN = gql`
    mutation signIn($userVariableKeyName: UserWhereInput!) {
        signin(input: $userVariableKeyName) {
            id
            email
            password
        }
    }
`;

export default function Signin() {
    const [state, setState] = useState({
        email: '',
        password: '',
    });

    const inputChangeHandler = e => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    const [signInMutationHookFn, newItemLoadingErrorDataObject] = useMutation(SIGN_IN, {
        refetchQueries: [{query: CURRENT_USER}],
    });
 
    const { error, data, loading } = newItemLoadingErrorDataObject;

    return (
        <Form
            method='post'
            onSubmit={async e => {
                e.preventDefault();
                const res = await signInMutationHookFn({
                    variables: { userVariableKeyName: { ...state } },
                });
                setState({ email: '', password: '' });
                console.log('res.data', res.data);
            }}
        >
            <ErrorMessage error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign In</h2>
                <label htmlFor={EMAIL}>
                    Email
                    <input
                        type={EMAIL}
                        name={EMAIL}
                        placeholder={EMAIL}
                        value={state.email}
                        onChange={inputChangeHandler}
                        required
                    />
                </label>
                <label htmlFor={PASSWORD}>
                    Password
                    <input
                        type={PASSWORD}
                        name={PASSWORD}
                        placeholder={PASSWORD}
                        value={state.password}
                        onChange={inputChangeHandler}
                        required
                    />
                </label>
                <button type='submit' name='submit'>
                    Submit
                </button>
            </fieldset>
        </Form>
    );
}
