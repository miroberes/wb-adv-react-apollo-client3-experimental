import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { useQuery, useMutation } from '@apollo/client';
import Router from 'next/router';
import gql from 'graphql-tag';

import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import { formatMoney } from '../lib/formatMoney';

const TITLE = 'title';
const PRICE = 'price';
const DESCRIPTION = 'description';

const GET_ITEM = gql`
    query getItemUpdateItem($id: ItemWhereUniqueInput!) {
        itemGqlYoga(inputGqlYoga: $id) {
            id
            title
            description
            price
        }
    }
`;

//  updateItem(data: ItemUpdateInput!, where: ItemWhereUniqueInput!): Item
const UPDATE_ITEM = gql`
    mutation updateItem(
        $inputWhatever: ItemUpdateInput!
        $idWhatever: ItemWhereUniqueInput!
    ) {
        updateThing(input: $inputWhatever, id: $idWhatever) {
            id
            title
            description
            price
        }
    }
`;

export default function UpdateItem({ query }) {
    console.log('UpdateItem props.query', query);
    const [state, setState] = useState({});
    // console.log('GET_ITEM', GET_ITEM.definitions[0]);
    const { loading, error, data } = useQuery(GET_ITEM, { variables: { id: query } });
    console.log('loading', loading);
    console.log('error', error);
    console.log('data', data);
    const [updateThatThing, updatedThingLoadingErrorDataObject] = useMutation(UPDATE_ITEM);

    if (loading) {
        return <p>Loading ...</p>;
    }

    if (error) {
        return <ErrorMessage error={error} />;
    }

    if (!data.itemGqlYoga) {
        return <p className=''>Empty result returned from db for item id: {query.id}.</p>;
    }

    const {
        itemGqlYoga: { title, description, price },
    } = data;

    // console.log('title', title);
    const inputChangeHandler = e => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        setState(prevState => ({ ...prevState, [name]: val }));
    };
    // console.log('updatedThingLoadingErrorDataObject', updatedThingLoadingErrorDataObject);
    // const { error, data, loading } = updatedThingLoadingErrorDataObject;
    return (
        <Form
            onSubmit={async e => {
                e.preventDefault();
                console.log('submitted, local state:', state);
                if (state !== {}) {
                    const res = await updateThatThing({
                        variables: { inputWhatever: { ...state }, idWhatever: query },
                    }); // useMutation for mutation updateThing
                    if (res.data && res.data.updateThing) {
                        console.log('res.data.updateThing.id', res.data.updateThing.id);
                        Router.push({
                            pathname: '/item',
                            query: { id: res.data.updateThing.id },
                        });
                    }
                    console.log('e', e);
                }
            }}
        >
            {console.log('state', state)}
            <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor={TITLE}>
                    {capitalize(TITLE)}
                    <input
                        type='text'
                        id={TITLE}
                        name={TITLE}
                        placeholder={capitalize(TITLE)}
                        required
                        defaultValue={title}
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
                        defaultValue={price}
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
                        defaultValue={description}
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
