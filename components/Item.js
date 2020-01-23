import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';

function Item(props) {
    const { id, title, description, image, largeImage, price, updatedAt, createdAt } = props.item;

    return (
        <ItemStyles>
            {image && <img src={image} alt={title} />}
            <Title>
                <Link
                    href={{
                        pathname: '/item',
                        query: { id: id },
                    }}
                >
                    <a>{title}</a>
                </Link>
            </Title>
            <PriceTag>{formatMoney(price)}</PriceTag>
            <p>{description}</p>
            <div className='buttonList'>
                <Link
                    href={{
                        pathname: 'update',
                        query: { id: id },
                    }}
                >
                    <a>Edit</a>
                </Link>
                <button>Add to cart</button>
                <button>Delete</button>
            </div>
        </ItemStyles>
    );
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
};

export default Item;
