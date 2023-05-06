import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

SortProduct.propTypes = {
    handlerChangeSort: PropTypes.func
};

SortProduct.defaultProps = {
    handlerChangeSort: null
}

function SortProduct(props) {

    const { handlerChangeSort } = props

    const onChangeValue = (e) => {
        const value = e.target.value
        handlerChangeSort(value)
    }

    return (
        <Form className=''>
            <Form.Select size='md' onChange={onChangeValue}>
                <option value="default">Sắp xếp giá</option>
                <option value="DownToUp">Giá: Thấp đến cao</option>
                <option value="UpToDown">Giá: Cao đến thấp</option>
            </Form.Select>
        </Form>
    );
}

export default SortProduct;