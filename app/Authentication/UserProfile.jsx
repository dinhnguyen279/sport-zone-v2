import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { AiOutlineEdit } from 'react-icons/ai';
import { HOST } from '../domain/host/host';
import './Auth.css';
import DetailInvoices from './components/DetailInvoices';
import EditProfileUser from './components/EditProfileUser';

import Form from 'react-bootstrap/Form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FaShippingFast, FaStore, FaSyncAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmCancelOrder from './components/ConfirmCancelOrder';
import mainLayoutFacade from '../utils/mainLayoutFacade';

const UserProfile = (props) => {
  const URL_GetDetailUser = `${HOST}/user`;
  const URL_BILLBYIDUSER = `${HOST}/getBillByIdUser`;
  const URL_GetBillById = `${HOST}/getBillById`;
  const URL_CANCELORDER = `${HOST}/cancelOrder`;

  const [active, setActive] = useState('ProfileUser');
  const [modalShowDetailInvoices, setModalShowDetailInvoices] = useState(false);
  const [modalShowFormCancelOrder, setModalShowFormCancelOrder] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [getDataUser, setGetDataUser] = useState({
    avatar: '',
    fullname: '',
    address: '',
    email: '',
    phone: '',
    password: '',
    sex: '',
    birthday: '',
  });
  const [getDataInvoices, setGetDataInvoices] = useState({
    imgProduct: '',
    nameProduct: '',
    price: '',
    quantity: '',
    size: '',
    total: '',
    fullname: '',
    idProduct: '',
  });

  const [idCancelOrder, setIdCancelOrder] = useState('');
  const [history, setHistory] = useState([]);
  // Show/hide password
  const [typePassWord, setTypePassWord] = useState('password');
  const handlerActive = (value) => {
    setActive(value);
  };
  let navigate = useNavigate();

  const layoutFacade = mainLayoutFacade.useFacade();
  const idUser = layoutFacade.idUser;

  useEffect(() => {
    // Hàm này kiểm tra user đăng nhập chưa và hướng tới trang đăng nhập
    if (!idUser) {
      navigate('/signin', { replace: true });
    }
    // hàm này gọi thông tin user
    const fetchData = async () => {
      await axios
        .get(`${URL_GetDetailUser}/${idUser}`)
        .then((response) => setGetDataUser(response.data))
        .catch((error) => console.log(error));
      // hàm này gọi thông tin hóa đơn
      await axios
        .get(`${URL_BILLBYIDUSER}/${idUser}`)
        .then((res) => {
          const response = res.data;
          const sortedBill = response.sort((a, b) => b.created_date.localeCompare(a.created_date));
          setHistory(sortedBill);
        })
        .catch((error) => console.log(error));
    };
    fetchData();
  }, [reloadData]);

  const handleShowDetailInvoices = (id) => {
    axios
      .get(`${URL_GetBillById}/${id}`)
      .then((res) => {
        setGetDataInvoices(res.data[0]);
      })
      .catch((err) => console.log(err));
    setModalShowDetailInvoices(true);
  };

  const handleShowFormCancelOrder = (id) => {
    setIdCancelOrder(id);
    setModalShowFormCancelOrder(true);
  };

  const handleDoneOrder = async (id) => {
    const data = {
      status: 'Hoàn thành',
    };
    try {
      if (data !== null) {
        await axios.put(`${URL_CANCELORDER}/${id}`, data);
        setTimeout(function () {
          setModalShowFormCancelOrder(false);
          setReloadData(!reloadData);
        }, 1000);
        return;
      }
    } catch (error) {
      return error;
    }
  };

  const handleCancelOrder = async (reasonCancel) => {
    const data = {
      reasonCancel: reasonCancel,
      status: 'Đã hủy',
    };
    try {
      if (data.reasonCancel !== null) {
        await axios.put(`${URL_CANCELORDER}/${idCancelOrder}`, data);
        toast('Hủy đơn hàng thành công', { type: 'success' });

        setTimeout(function () {
          setModalShowFormCancelOrder(false);
          setReloadData(!reloadData);
        }, 1000);
        return;
      }
      toast('Hủy đơn hàng thành công', { type: 'warning' });
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="container-fluid main-profile">
      <div className="card-profile">
        <div className="d-block d-md-flex justify-between">
          <div className=" mb-3 main-img-profile d-block d-md-flex align-items-end">
            <img src={getDataUser.avatar} className="img-profile" alt="Profile Picture" />
            <h1>{getDataUser.fullname}</h1>
          </div>
        </div>

        <div className="row p-t-30" style={{ margin: 'auto' }}>
          <div className="list-profile">
            <div
              className="m-r-10 btn-detail"
              style={active === 'ProfileUser' ? { background: '#0d6efd' } : { background: 'none' }}
              onClick={() => handlerActive('ProfileUser')}
            >
              <button
                style={active === 'ProfileUser' ? { color: 'white' } : { color: 'black' }}
                className="link-profile"
              >
                <i className="m-r-10 fa fa-home" style={{ fontSize: '20px' }} aria-hidden="true" />
                Tài khoản
              </button>
            </div>
            <div
              className="btn-detail"
              style={active === 'History' ? { background: '#0d6efd' } : { background: 'none' }}
              onClick={() => handlerActive('History')}
            >
              <button className="link-profile" style={active === 'History' ? { color: 'white' } : { color: 'black' }}>
                <i className="m-r-10 fa fa-history" style={{ fontSize: '20px' }} aria-hidden="true" />
                Đơn hàng
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Thông tin user */}
      {active === 'ProfileUser' ? (
        <div className="card-profile m-t-40">
          <div className="card-title d-flex justify-content-between">
            <h3 className="title-text">Thông tin cá nhân</h3>
            <Button type="button" variant="primary" onClick={() => setModalShow(true)}>
              <AiOutlineEdit /> Chỉnh sửa
            </Button>

            <EditProfileUser
              show={modalShow}
              onHide={() => setModalShow(false)}
              getDataUser={getDataUser}
              setGetDataUser={setGetDataUser}
            />
          </div>

          <div className="row">
            <div className="col-md-6 icon-detail d-flex align-items-center">
              <i className="fa fa-user" aria-hidden="true"></i>
              <div className="title-text">
                {getDataUser.fullname}
                <p>Họ và tên</p>
              </div>
            </div>
            <div className="col-md-6 icon-detail d-flex align-items-center">
              <i className="fa fa-birthday-cake" aria-hidden="true"></i>
              <div>
                {getDataUser.birthday}
                <p>Ngày sinh</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 icon-detail d-flex align-items-center">
              <i className="fa fa-code" aria-hidden="true"></i>
              <div>
                {getDataUser.sex}
                <p>Gới tính</p>
              </div>
            </div>
            <div className="col-md-6 icon-detail d-flex align-items-center">
              <i className="fa fa-lock" aria-hidden="true"></i>
              <div>
                {/* <Form.input type="password" value={getDataUser.address} /> */}
                <Form.Group className="wrap-inputInfo validate-input" controlId="formBasicPassword">
                  <p>Mật khẩu</p>
                  <Form.Control type={typePassWord} value={getDataUser.password} className="inputInfo" disabled />
                  {typePassWord === 'password' ? (
                    <button type="button" className="show-password-profile" onClick={() => setTypePassWord('text')}>
                      <AiFillEye />
                    </button>
                  ) : (
                    <button type="button" className="show-password-profile" onClick={() => setTypePassWord('password')}>
                      <AiFillEyeInvisible />
                    </button>
                  )}
                </Form.Group>
              </div>
            </div>
          </div>

          <hr className="line-page" />
          <div className="row">
            <h3 className="title-text">Thông tin liên hệ</h3>
            <div className="col-md-6 icon-detail d-flex align-items-center">
              <i className="fa fa-envelope" aria-hidden="true"></i>
              <div className="title-text">
                {getDataUser.email}
                <p>Địa chỉ email</p>
              </div>
            </div>
            <div className="col-md-6 icon-detail d-flex align-items-center">
              <i className="fa fa-mobile" aria-hidden="true"></i>
              <div>
                {getDataUser.phone}
                <p>Số điện thoại</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 icon-detail d-flex align-items-center">
              <i className="fa fa-location-arrow" aria-hidden="true"></i>
              <div className="title-text">
                {getDataUser.address}
                <p>Địa chỉ</p>
              </div>
            </div>
            <div className="col-md-6 icon-detail d-flex align-items-center">
              <i className="fa fa-address-book" aria-hidden="true"></i>
              <div className="title-text">
                {getDataUser.created_date}
                <p>Ngày tham gia</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}

      {/* Đơn hàng */}
      {active === 'History' ? (
        <>
          {history.length > 0 ? (
            history.map((val, key) => (
              <div className="history-profile-user m-t-40" key={key + 1}>
                <div className="header-history">
                  <FaStore className="mr-2" />
                  <span>Sports Zone</span>
                </div>
                <div className="content-history">
                  <div className="code-order">
                    <div className="mb-3 mb-md-0">
                      <p>Mã đơn hàng: {val._id}</p>
                    </div>
                    <div style={{ fontSize: '13px' }}>
                      <span className="mr-1">
                        {val.status === 'Chờ xác nhận' ? (
                          <span className="">
                            <FaSyncAlt /> Đang chờ xác nhận
                          </span>
                        ) : (
                          ''
                        )}
                        {val.status === 'Đang vận chuyển' ? (
                          <span className="text-warning">
                            <FaShippingFast /> Đơn hàng đang được vận chuyển
                          </span>
                        ) : (
                          ''
                        )}
                        {val.status === 'Hoàn thành' ? (
                          <span className="text-success">
                            <BsFillCheckCircleFill /> Đơn hàng đã được giao thành công
                          </span>
                        ) : (
                          ''
                        )}
                        {val.status === 'Đã hủy' ? (
                          <span className="text-danger">
                            <FaShippingFast className="icon-struck" /> Đơn hàng đã hủy
                          </span>
                        ) : (
                          ''
                        )}
                      </span>
                      |
                      <span className="text-uppercase ml-1" style={{ color: 'red', fontWeight: 'bolder' }}>
                        {val.status === 'Chờ xác nhận' ? 'Chờ xác nhận' : ''}
                        {val.status === 'Đã hủy' ? 'Đã Hủy' : ''}
                        {val.status === 'Đang vận chuyển' ? 'Đang vận chuyển' : ''}
                        {val.status === 'Hoàn thành' ? 'Hoàn thành' : ''}
                      </span>
                    </div>
                  </div>
                  <div className="content-order">
                    <div>
                      <p>
                        <b>Người nhận: {val.fullname}</b>
                      </p>
                      <p>
                        <b>Tổng sản phẩm: {val.nameProduct.split(',').length}</b>
                      </p>
                      <p>
                        <b>Phương thức thanh toán: {val.payment}</b>
                      </p>
                    </div>
                    <div>
                      <p>
                        <b>Ngày mua: {val.created_date}</b>
                      </p>
                    </div>
                  </div>
                  <div className="footer-order">
                    <p className="text-base">
                      <b>Tổng đơn:</b> {parseInt(val.total).toLocaleString()}₫
                    </p>
                    <div className="">
                      {val.status === 'Đã hủy' ? (
                        <Button onClick={() => handleShowDetailInvoices(val._id)} variant="primary" className="w-100">
                          Chi Tiết Đơn Hủy
                        </Button>
                      ) : (
                        <Button onClick={() => handleShowDetailInvoices(val._id)} variant="primary" className="w-100">
                          Chi Tiết Đơn Hàng
                        </Button>
                      )}

                      {val.status === 'Chờ xác nhận' ? (
                        <Button
                          onClick={() => handleShowFormCancelOrder(val._id)}
                          variant="light"
                          className="btn-outline-dark w-100 mt-3"
                        >
                          Hủy Đơn Hàng
                        </Button>
                      ) : (
                        ''
                      )}

                      {val.status === 'Đang vận chuyển' ? (
                        <Button onClick={() => handleDoneOrder(val._id)} variant="primary" className="mt-3 w-100">
                          Đã Nhận Hàng
                        </Button>
                      ) : (
                        ''
                      )}

                      <Link to={`/contact`} className="btn btn-outline-danger mt-3 w-100">
                        Liên Hệ Shop
                      </Link>
                      {/* Modal cancel đơn hàng */}
                      {modalShowFormCancelOrder && (
                        <ConfirmCancelOrder
                          show={modalShowFormCancelOrder}
                          onHide={() => setModalShowFormCancelOrder(false)}
                          cancelOrder={handleCancelOrder}
                        />
                      )}
                      {/* Modal thông tin hóa đơn */}
                      {modalShowDetailInvoices && getDataInvoices.imgProduct !== '' && (
                        <DetailInvoices
                          show={modalShowDetailInvoices}
                          onHide={() => setModalShowDetailInvoices(false)}
                          datainvoices={getDataInvoices}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <section className="cart-empty history-profile-user m-t-40">
              <p className="text-lg mb-3">Hiện tại bạn chưa có đơn hàng nào</p>
              <Link className="btn-buy btn btn-warning" to="/shop/all">
                Tiếp tục mua hàng
              </Link>
            </section>
          )}
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default UserProfile;
