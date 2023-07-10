/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import ListCart from './Components/ListCart';

import axios from 'axios';
import queryString from 'query-string';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link, Navigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { HOST } from '../domain/host/host';
import mainLayoutFacade from '../utils/mainLayoutFacade';

function Cart(props) {
  const { idUser } = mainLayoutFacade.useFacade();
  const URL_CART = `${HOST}/getCartById`;
  // Hàm này dùng useContext để cập nhật số lượng ở header
  const { setReloadCount } = mainLayoutFacade.useFacade();

  const [total, setTotal] = useState();

  const [fetched, setFetched] = useState(false);
  // const [loadAPI, setLoadAPI] = useState(false);
  const [getCartById, setCartById] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [unCheckout, setUnCheckout] = useState(false);
  // Kiểm tra id nếu idUser không có thì lấy id Khách

  // Lấy dữ liệu từ Cart ra
  useEffect(() => {
    if (!fetched) {
      const fetchData = async () => {
        await axios
          .get(`${URL_CART}/${idUser}`)
          .then((response) => {
            setCartById(response.data);
            getTotal(response.data);
          })
          .catch((error) => console.log(error));
      };
      fetchData();
    }
  }, [getCartById, fetched]);

  //Hàm này dùng để truyền xuống cho component con xử và trả ngược dữ liệu lại component cha

  const onDeleteCart = (getUser, getProduct, getSize) => {
    if (idUser) {
      //Sau khi nhận được dữ liệu ở component con truyền lên thì sẽ gọi API xử lý dữ liệu
      const fetchDelete = async () => {
        const params = {
          idUser: getUser,
          idProduct: getProduct,
          size: getSize,
        };
        const query = '?' + queryString.stringify(params);

        await axios.delete(`${HOST}/deleteCart${query}`);

        toast('Bạn Đã Xóa Hàng Thành Công!', { type: 'success' });
      };

      fetchDelete();
    }
  };

  //Hàm này dùng để truyền xuống cho component con xử và trả ngược dữ liệu lại component cha
  const onUpdateCount = (getUser, getProduct, updateCount, getSize) => {
    if (idUser) {
      // user đã đăng nhập
      //Sau khi nhận được dữ liệu ở component con truyền lên thì sẽ gọi API xử lý dữ liệu
      const fetchPut = async () => {
        const params = {
          idUser: getUser,
          idProduct: getProduct,
          count: updateCount,
          size: getSize,
        };

        const query = '?' + queryString.stringify(params);

        await axios.put(`${HOST}/updateCart${query}`);
        await setReloadCount(false);
        setFetched(false);
      };

      fetchPut();
      toast('Bạn Đã Sửa Hàng Thành Công!', { type: 'success' });
    }
  };

  // Hàm này dùng để kiểm tra trong giỏ hàng có sản phẩm hết hạn
  const validateCheckout = () => {
    const listError = getCartById.some((val) => val.error !== undefined);
    return listError;
  };

  //Hàm này dùng để redirect đến page checkout

  const onCheckout = () => {
    if (getCartById === undefined && getCartById.length === 0) {
      toast('Vui Lòng Kiểm Tra Lại Giỏ Hàng!', { type: 'warning' });
      return;
    }

    if (validateCheckout()) {
      setUnCheckout(true);
      toast('Vui Lòng Kiểm Tra Lại Giỏ Hàng!', { type: 'warning' });
      return;
    }

    setRedirect(true);
  };

  //Hàm này dùng để tính tổng tiền carts
  const getTotal = (getCartById) => {
    let total = getCartById;
    let sub_total = 0;
    total.map((value) => {
      return (sub_total +=
        parseInt(value.promotionPrice ? value.promotionPrice : value.price) * parseInt(value.quantity));
    });
    setTotal(sub_total);
  };

  return (
    <div className="main-cart">
      <section className="py-2 bg-light">
        <div className="container">
          <ol className="breadcrumb justify-content-start">
            <li className="breadcrumb-item">
              <Link to={'/'}>Trang chủ</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Giỏ hàng
            </li>
          </ol>
        </div>
      </section>
      {getCartById !== undefined && getCartById.length !== 0 ? (
        <section className="py-5 container">
          <h4 className="text-uppercase mb-5 text-center">Giỏ hàng của bạn</h4>
          <div className="row">
            <div className="col-lg-8 mb-4 mb-lg-0">
              <ListCart getCart={getCartById} onDeleteCart={onDeleteCart} onUpdateCount={onUpdateCount} />
              <div className="bg-light px-4 py-3 continue-shopping">
                <div className="row align-items-center text-center">
                  <div className="col-lg-6 col-md-12 mb-3 mb-md-0 text-md-left">
                    <Link className="btn btn-link text-dark btn-sm" to={`/shop`}>
                      <AiOutlineArrowLeft className="mr-2 text-lg" />
                      Tiếp mua mua sắm
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card border-0 rounded-0 p-lg-4 bg-light">
                <div className="card-body">
                  <h5 className="text-uppercase mb-4">Thông tin đơn hàng</h5>
                  <ul className="list-unstyled mb-0">
                    <li className="d-flex align-items-center justify-content-between">
                      <strong className="small font-weight-bold">Thành tiền</strong>
                      <span className="text-muted small">{total.toLocaleString()}₫</span>
                    </li>
                    <li className="border-bottom my-2"></li>
                    <li className="d-flex align-items-center justify-content-between mb-4">
                      <strong className="font-weight-bold">Tổng tiền</strong>
                      <span>{total.toLocaleString()}₫</span>
                    </li>
                  </ul>
                  <div>
                    {redirect && <Navigate replace to="/checkout" />}
                    <button
                      type="button"
                      className="btn btn-dark btn-sm text-uppercase w-100"
                      onClick={onCheckout}
                      disabled={unCheckout}
                    >
                      Tiến hành thanh toán
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="cart-empty">
          <p className="text-lg mb-3">Giỏ hàng rỗng</p>
          <a className="btn-buy btn btn-dark" href="/">
            Tiếp tục mua hàng
          </a>
        </section>
      )}
    </div>
  );
}

export default Cart;
