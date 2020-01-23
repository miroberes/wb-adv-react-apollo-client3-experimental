import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Router from 'next/router';
import gql from 'graphql-tag';

import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const TITLE = 'title';
const PRICE = 'price';
const DESCRIPTION = 'description';
const FILE = 'file';

// const CREATE_ITEM_BASIC = gql`
//     mutation addItem($title: String!, $description: String) {
//         gqlYogaCreateNewThingBasic(title: $title, description: $description) {
//             id
//             title
//             description
//             image
//             largeImage
//             price
//         }
//     }
// `;

const CREATE_ITEM = gql`
    mutation createItem($newItemVariableKeyName: ItemCreateInput!) {
        createNewThingGqlYogaMutationName(inputGqlYoga: $newItemVariableKeyName) {
            id
            title
            description
            image
            price
        }
    }
`;

export default function CreateItem() {
    const [state, setState] = useState({ title: '', description: '', image: '', largeImage: '', price: 0 });
    const inputChangeHandler = e => {
        const { name, type, value } = e.target;
        console.log(e);
        console.log('name', name);
        console.log('type', type);
        console.log('value', value);
        const val = type === 'number' ? parseFloat(value) : value;
        setState(prevState => ({ ...prevState, [name]: val }));
    };
    // const [createItem, newItemLoadingErrorDataObject] = useMutation(CREATE_ITEM_BASIC);
    const [createItemMutationHookFn, newItemLoadingErrorDataObject] = useMutation(CREATE_ITEM);

    console.log('newItemLoadingErrorDataObject', newItemLoadingErrorDataObject);
    const { error, data, loading } = newItemLoadingErrorDataObject;

    const uploadFileHandler = async e => {
        console.log('... uploading');
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'sickfits');

        const res = await fetch('https://api.cloudinary.com/v1_1/advreactwgqlwb/image/upload', {
            method: 'POST',
            body: data,
        });
        const file = await res.json();
        // console.log('file', file);
        if (!file.error) {
            setState(prevState => ({ ...prevState, image: file.secure_url, largeImage: file.eager[0].secure_url }));
        }
    };

    return (
        <Form method="post"
            onSubmit={async e => {
                e.preventDefault();
                console.log('submitted, local state:', state);
                // createItem({ variables: { ...state } }); // useMutation for gqlYogaCreateNewThingBasic
                const res = await createItemMutationHookFn({ variables: { newItemVariableKeyName: { ...state } } }); // useMutation for mutation gqlYogaCreateNewThing
                console.log('res', res);
                if (res.data && res.data.gqlYogaCreateNewThingMutationName) {
                    Router.push({
                        pathname: '/item',
                        query: { id: res.data.createNewThingGqlYogaMutationName.id },
                    });
                }
            }}
        >
            <ErrorMessage error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor={FILE}>
                    {capitalize(FILE)}
                    <input
                        type='file'
                        id={FILE}
                        name={FILE}
                        placeholder='Upload an image'
                        required
                        onChange={uploadFileHandler}
                    />
                    {state.image && (
                        <img
                            src={state.image.replace(
                                'https://res.cloudinary.com/advreactwgqlwb/image/upload/',
                                'https://res.cloudinary.com/advreactwgqlwb/image/upload/t_media_lib_thumb/'
                            )}
                            alt='Uploaded image preview'
                        />
                    )}
                </label>
                <label htmlFor={TITLE}>
                    {capitalize(TITLE)}
                    <input
                        type='text'
                        id={TITLE}
                        name={TITLE}
                        placeholder={capitalize(TITLE)}
                        required
                        value={state.title}
                        onChange={inputChangeHandler}
                    />
                </label>
                <label htmlFor={PRICE}>
                    {capitalize(PRICE)}
                    <input
                        type='number'
                        id={PRICE}
                        name={PRICE}
                        placeholder='0'
                        required
                        value={state.price}
                        onChange={inputChangeHandler}
                    />
                </label>
                <label htmlFor={DESCRIPTION}>
                    {capitalize(DESCRIPTION)}
                    <textarea
                        type='number'
                        id={DESCRIPTION}
                        name={DESCRIPTION}
                        placeholder={capitalize(DESCRIPTION)}
                        required
                        value={state.description}
                        onChange={inputChangeHandler}
                    />
                </label>
                <button type='submit' name='submit'>
                    Submit
                </button>
            </fieldset>
        </Form>
    );
}

const capitalize = s => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};
