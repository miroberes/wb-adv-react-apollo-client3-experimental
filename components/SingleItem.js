import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Head from 'next/head';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import ErrorMessage from './ErrorMessage';

import formatMoney from '../lib/formatMoney';
import styled from 'styled-components';

const SingleItemStyles = styled.div`
    * {
        outline: 1px solid black;
    }
    max-width: 1200px;
    margin: 2rem;
    box-shadow: ${props => props.theme.bs};
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    min-height: 800px;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .details {
        margin: 3rem;
        font-size: 2rem;
    }
`;

const GET_ITEM = gql`
    query getItemSingleItem($id: ItemWhereUniqueInput!) {
        itemGqlYoga(inputGqlYoga: $id) {
            id
            title
            description
            image
            largeImage
            price
        }
    }
`;

function Item(props) {
    const { query } = props;
    const { loading, error, data } = useQuery(GET_ITEM, { variables: { id: query } });
    
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <ErrorMessage error={error} />;
    }
    if (!data.itemGqlYoga) {
        return <p>No item with id {query.id}</p>;
    }
    const { id, title, description, image, largeImage, price, updatedAt, createdAt } = data.itemGqlYoga;

    return (
        <SingleItemStyles>
            <Head>
                <title>{title}</title>
            </Head>
            <img src={largeImage} alt={title} />
            <div className='details'>
                <h2>{title}</h2>
                <p>{description}</p>
                <p>{formatMoney(price)}</p>
            </div>
        </SingleItemStyles>
        // <ItemStyles>
        //     {image && <img src={image} alt={title} />}
        //     <Title>
        //         <Link
        //             href={{
        //                 pathname: '/item',
        //                 query: { id: id },
        //             }}
        //         >
        //             <a>{title}</a>
        //         </Link>
        //     </Title>
        //     <PriceTag>{formatMoney(price)}</PriceTag>
        //     <div className='buttonList'>
        //         <Link
        //             href={{
        //                 pathname: 'update',
        //                 query: { id: id },
        //             }}
        //         >
        //             <a>Edit</a>
        //         </Link>
        //         <button>Add to cart</button>
        //         <button>Delete</button>
        //     </div>
        // </ItemStyles>
    );
}

Item.propTypes = {
    itemGqlYoga: PropTypes.object.isRequired,
};

export default Item;
