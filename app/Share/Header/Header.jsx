import React, { useEffect, useRef, useState } from 'react';

import { Link, useLocation, useRouteLoaderData } from '@remix-run/react';
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShopping, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaAngleDown, FaAngleRight, FaThList } from 'react-icons/fa';
import LogoutLink from '../../Authentication/LogoutLink';
import Name from '../../Authentication/Name';
// React-Bootstrap
import axios from 'axios';
import queryString from 'query-string';
import { Card, Col, Container, Form, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import Categories from '../../API/Categories';
import { HOST } from '../../domain/host/host';
import mainLayoutFacade from '../../utils/mainLayoutFacade';

function Header(props) {
  const data = useRouteLoaderData('routes/_layout');
  // Sử dụng useContext lấy số lượng sản phẩm và yêu thích
  const { countWishlist, countCart } = mainLayoutFacade.useFacade();

  // Api search
  const URL_SEARCH = `${HOST}/searchProducts`;
  const [valueSearch, setValueSearch] = useState('');
  const [searchProducts, setSearchProducts] = useState([]);
  const delaySearchTextTimeOut = useRef(null);
  const [loginUser, setLoginUser] = useState(false);
  const [nameUser, setNameUser] = useState(false);
  const [close, setClose] = useState(false);
  const [closeFocusInput, setCloseFocusInput] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [dataCategories, setDataCategories] = useState([]);

  const [isActive, setIsActive] = useState(false);
  var idUser = data.user_id;
  const onChangeText = (e) => {
    const value = e.target.value;
    setValueSearch(value);
    if (handleSearch) {
      //Nếu người dùng đang nhập thì mình clear cái giây đó
      if (delaySearchTextTimeOut.current) {
        clearTimeout(delaySearchTextTimeOut.current);
      }
      delaySearchTextTimeOut.current = setTimeout(() => {
        handleSearch(value);
      }, 500);
    }
    setClose(false);
  };

  const handleSearch = (value) => {
    const dataSearch = {
      value: value,
      fildter: 'name',
    };
    const query = '?' + queryString.stringify(dataSearch);
    axios
      .get(`${URL_SEARCH}${query}`)
      .then((res) => {
        const data = res.data.splice(0, 6);
        setSearchProducts(data);
      })
      .catch((err) => console.log('err search', err));
  };

  useEffect(() => {
    if (!idUser) {
      setLoginUser(false);
      setNameUser(false);
    } else {
      setLoginUser(true);
      setNameUser(true);
    }
  }, [idUser]);

  const onClickItem = () => {
    setClose(!close);
    setValueSearch('');
  };

  const handleCloseInput = () => {
    setTimeout(() => {
      setCloseFocusInput(false);
    }, 500);
  };

  const handleOpenInput = () => {
    setCloseFocusInput(true);
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };
  useEffect(() => {
    const fecthData = async () => {
      await Categories.getAllCategories()
        .then((res) => setDataCategories(res.data))
        .catch((err) => console.log(err));
    };
    fecthData();
  }, []);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  const location = useLocation();
  const handleSubmitSearch = (e) => {
    window.location.href = `/shop/all?search_query=${valueSearch}`;
    location.search = valueSearch;
  };

  return (
    <>
      <Navbar bg="light" expand={'lg'} className="pt-3 bg-body shadow" style={{ zIndex: 10 }} fixed="top">
        <Container>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <a className="logo-navbar h4" href="/">
            Sports Zone
          </a>

          {/* Navbar.Offcanvas là dữ liệu được đưa vào responsive */}
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-lg`} placement="start">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <a className="logo-navbar h4" href="/">
                  Sports Zone
                </a>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="d-block d-lg-flex justify-content-between align-item-center">
              <Form
                className="mb-2 input-search-type d-flex justify-content-between align-item-center !relative"
                as={Col}
                onBlur={handleCloseInput}
                onClick={handleOpenInput}
              >
                <input
                  type="search"
                  placeholder="Tìm kiếm tên sản phẩm"
                  className="input-search"
                  aria-label="Search"
                  value={valueSearch}
                  onChange={onChangeText}
                  onFocus={() => handleFocus()}
                  onBlur={() => handleBlur()}
                />
                <button
                  className={`search-icon d-none d-lg-block ${isActive ? 'text-light' : 'text-dark'}`}
                  onClick={() => handleSubmitSearch()}
                >
                  Search
                </button>
                <button
                  className={`search-icon search-icon d-block d-lg-none ${isActive ? 'text-light' : 'text-dark'}`}
                  onClick={() => handleSubmitSearch()}
                >
                  <AiOutlineSearch />
                </button>
                {/* Form Search */}
                {
                  // Đóng input khi người dùng click outside
                  closeFocusInput && (
                    <div
                      className={`product-search-main  
                      ${valueSearch.length > 0 ? 'product-search-main-block' : 'product-search-main-none'} 
                      `}
                    >
                      <div className={`product-search-submain`}>
                        {!close &&
                          searchProducts &&
                          searchProducts.map((val, idx) => {
                            return (
                              <a
                                className="product-search bg-light"
                                key={idx + 1}
                                href={`/detail/${val._id}`}
                                onClick={onClickItem}
                              >
                                <div>
                                  <p className="text-uppercase">{val.name}</p>
                                  <p>
                                    {val.promotionPrice
                                      ? parseInt(val.promotionPrice).toLocaleString()
                                      : parseInt(val.price).toLocaleString()}
                                    ₫
                                  </p>
                                </div>
                                <div className="image-search-product">
                                  <Card.Img src={val.avt} />
                                </div>
                              </a>
                            );
                          })}
                        {!close &&
                          (searchProducts.length > 0 ? (
                            <div className="text-search-header">
                              <a onClick={onClickItem} href="/shop/all">
                                Xem Thêm...
                              </a>
                            </div>
                          ) : (
                            <div className="check-no-product">
                              <p>Không có sản phẩm nào!</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )
                }
              </Form>

              {/* Giỏ hàng màn hình desktop */}
              <Nav className="justify-content-end">
                <ul className="nav-list-respon">
                  <li className="nav-item d-none d-lg-block">
                    <Link className="nav-link wishlist-header" to="/wishlist">
                      <AiOutlineHeart className="icon-wishlist" />{' '}
                      <span style={{ color: '#efb93b' }}>{countWishlist.length}</span>
                    </Link>
                  </li>
                  <li className="nav-item position-relative d-none d-lg-block">
                    <a className="nav-link quantity-cart" href="/cart" data-order={countCart}>
                      <AiOutlineShoppingCart className="icon-cart" />
                    </a>
                  </li>
                  {nameUser ? <Name /> : ' '}
                  {loginUser ? ' ' : <LogoutLink />}
                </ul>
              </Nav>
              {/* Giỏ hàng màn hình desktop */}

              {/* Navbar màn hình điện thoại */}
              <div className="under-navbar d-block d-lg-none" style={{ zIndex: 100 }}>
                <div className="navbar-button mr-4 navbar-categories">
                  <button
                    className="btn-open-categories"
                    onClick={handleOpen}
                    onBlur={handleOnBlur}
                    title="All Categories"
                  >
                    <span>
                      {' '}
                      <FaThList /> Bộ Sưu Tập
                    </span>
                    <span>
                      <FaAngleDown />
                    </span>
                  </button>
                  {isOpen ? (
                    <ul className={`navbar-nav nav-link-page`}>
                      {dataCategories.map((val, idx) => {
                        return (
                          <li className="nav-item-list" key={idx + 1}>
                            <a href={`/shop/${val.nameCate}`}>
                              {val.nameCate} <FaAngleRight style={{ border: 'none' }} />
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    ''
                  )}
                </div>
                <ul className="nav-list-respon">
                  <li className="navbar-nav nav-menu">
                    <a className="nav-link" href="/">
                      Trang Chủ
                    </a>
                  </li>

                  <li className="navbar-nav nav-menu">
                    <Link className="nav-link" to="/shop/all">
                      Cửa Hàng
                    </Link>
                  </li>

                  <li className="navbar-nav nav-menu">
                    <a className="nav-link" href="/contact">
                      Liên Hệ
                    </a>
                  </li>
                  <li className="navbar-nav nav-menu">
                    <a className="nav-link" href="/gioi-thieu">
                      Giới Thiệu
                    </a>
                  </li>
                  <li className="navbar-nav nav-menu">
                    <a className="nav-link" href="/chinh-sach-bao-mat">
                      Chính sách bảo mật
                    </a>
                  </li>
                  <li className="navbar-nav nav-menu">
                    <a className="nav-link" href="/chinh-sach-doi-tra">
                      Chính sách đổi trả
                    </a>
                  </li>
                  <li className="navbar-nav nav-menu">
                    <a className="nav-link" href="/dieu-khoan-dich-vu">
                      Điều khoản dịch vụ
                    </a>
                  </li>
                </ul>
              </div>
              {/* Navbar màn hình điện thoại */}
            </Offcanvas.Body>
          </Navbar.Offcanvas>

          {/* Giỏ hàng màn hình điện thoại */}
          <div className="d-block d-lg-none">
            <ul className="d-flex align-items-center justify-content-between pl-0">
              <li className="nav-item">
                <a className="nav-link wishlist-header" href="/wishlist">
                  <AiOutlineHeart className="icon-wishlist" />
                  <span style={{ color: '#efb93b' }}>{countWishlist.length}</span>
                </a>
              </li>
              <li className="nav-item position-relative">
                <a className="nav-link quantity-cart" href="/cart" data-order={countCart}>
                  <AiOutlineShopping className="icon-cart" />
                </a>
              </li>
            </ul>
          </div>
          {/* Giỏ hàng màn hình điện thoại */}
        </Container>
      </Navbar>

      {/* Navbar màn hình desktop */}
      <div className="under-navbar d-none d-lg-block">
        <Container className="d-flex navbar-categories">
          <div className="navbar-button mr-4">
            <button className="btn-open-categories" onClick={handleOpen} onBlur={handleOnBlur}>
              <span>
                <FaThList /> Bộ Sưu Tập
              </span>
              <span>
                <FaAngleDown />
              </span>
            </button>
            {isOpen ? (
              <ul className={`navbar-nav nav-link-page`}>
                {dataCategories.map((val, idx) => {
                  return (
                    <li className="nav-item-list" key={idx + 1}>
                      <a href={`/shop/${val.nameCate}`}>
                        {val.nameCate} <FaAngleRight style={{ border: 'none' }} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              ''
            )}
          </div>
          <div className="">
            <ul className="navbar-nav nav-menu">
              <Link className="nav-link" to="/">
                Trang Chủ
              </Link>
            </ul>
          </div>

          <div className="d-flex">
            <ul className="navbar-nav nav-menu">
              <Link className="nav-link" to="/shop/all">
                Cửa Hàng
              </Link>
            </ul>
          </div>

          <div className="d-flex">
            <ul className="navbar-nav nav-menu">
              <Link className="nav-link" to="/contact">
                Liên Hệ
              </Link>
            </ul>
          </div>
          <div className="d-flex">
            <ul className="navbar-nav nav-menu nav-menu-over">
              <p className="nav-link">
                Về chúng tôi <FaAngleDown />
              </p>
              <div className="nav-menu-item">
                <li className="nav-item-link">
                  <Link className="nav-link" to="/gioi-thieu">
                    Giới Thiệu
                  </Link>
                </li>
                <li className="nav-item-link">
                  <Link className="nav-link" to="/chinh-sach-bao-mat">
                    Chính sách bảo mật
                  </Link>
                </li>
                <li className="nav-item-link">
                  <Link className="nav-link" to="/chinh-sach-doi-tra">
                    Chính sách đổi trả
                  </Link>
                </li>
                <li className="nav-item-link">
                  <Link className="nav-link" to="/dieu-khoan-dich-vu">
                    Điều khoản dịch vụ
                  </Link>
                </li>
              </div>
            </ul>
          </div>
        </Container>
      </div>
      {/* Navbar màn hình desktop */}
    </>
  );
}

export default Header;
