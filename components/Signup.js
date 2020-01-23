import React, { useState } from 'react';
import Form from './styles/Form';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import ErrorMessage from './ErrorMessage';
import { CURRENT_USER } from './User';


const NAME = 'name';
const EMAIL = 'email';
const PASSWORD = 'password';

const SIGN_UP = gql`
    mutation signUp($newUserVariableKeyName: UserCreateInput!) {
        signup(input: $newUserVariableKeyName) {
            id
            name
            email
            password
            permissions

        }
    }
`;


export default function Signup() {
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
    });
    const inputChangeHandler = e => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };
    const [signUpMutationHookFn, newItemLoadingErrorDataObject] = useMutation(SIGN_UP, {
        refetchQueries: [{ query: CURRENT_USER }],
    });
    const { error, data, loading } = newItemLoadingErrorDataObject;

    return (
        <Form method='post'
            onSubmit={async e => {
                e.preventDefault();
                const res = await signUpMutationHookFn({
                    variables: { newUserVariableKeyName: { ...state } },
                });
                setState({ name: '', email: '', password: '' });
                console.log('res.data', res.data);
            }}
        >
            <ErrorMessage error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign Up for an account</h2>
                <label htmlFor=''>
                    Name
                    <input
                        type='text'
                        name={NAME}
                        placeholder={NAME}
                        value={state.name}
                        onChange={inputChangeHandler}
                        required
                    />
                </label>
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
