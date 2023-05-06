import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

Search.propTypes = {
    handleSearch: PropTypes.func
};

Search.defaultProps = {
    handleSearch: null
}

function Search(props) {

    const { handleSearch } = props

    const [search, setSearch] = useState('')
    const delaySearchTextTimeOut = useRef(null)

    const [selectValue, setSelectValue] = useState('')

    const handleSelectValue = (e) => {
        setSelectValue(e.target.value)
    }

    const onChangeText = (e) => {
        const value = e.target.value
        const dataSearch = {
            value: value,
            fildter: selectValue
        }
        setSearch(value)
        if (handleSearch) {

            //Nếu người dùng đang nhập thì mình clear cái giây đó
            if (delaySearchTextTimeOut.current) {
                clearTimeout(delaySearchTextTimeOut.current)
            }

            delaySearchTextTimeOut.current = setTimeout(() => {
                handleSearch(dataSearch)
            }, 500)

        }
    }
    return (
        <>
            <div className='col-lg-2 mb-3'>
                <Form>
                    <Form.Select size='md' value={selectValue} onChange={handleSelectValue} >
                        <option value="name">Danh sách tìm kiếm</option>
                        <option value="name">Tên sản phẩm</option>
                        <option value="category">Thể loại sản phẩm</option>
                        <option value="brand">Thương hiệu</option>
                    </Form.Select>
                </Form>
            </div>
            <div className="col-lg-6 mb-3">
                <input
                    className="form-control form-control-md mw-100"
                    type="text"
                    placeholder="Nhập thứ bạn cần tìm..."
                    onChange={onChangeText}
                    value={search} />
            </div>
        </>
    );
}

export default Search;