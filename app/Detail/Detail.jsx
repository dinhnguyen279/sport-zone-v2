import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Card, Carousel, Form } from 'react-bootstrap';
import {
  AiFillHeart,
  AiOutlineLine,
  AiOutlinePlus,
  AiOutlineShoppingCart,
  AiOutlineStar,
  AiTwotoneStar,
} from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductAPI from '../API/ProductAPI';
import { CountContext } from '../Context/CountContext';
import Image from '../Share/img/Image';
import CardProduct from '../components/CardProduct';
import { HOST } from '../domain/host/host';
import mainLayoutFacade from '../utils/mainLayoutFacade';

export function Detail() {
  const { idUser } = mainLayoutFacade.useFacade();
  const layoutFacade = mainLayoutFacade.useFacade();
  const URL_AddToCart = `${HOST}/addToCart`;
  const URL_GetVoucher = `${HOST}/coupons`;
  const URL_GetCommentByIdProduct = `${HOST}/comment`;
  const URL_CreateComment = `${HOST}/comment/send`;
  const URL_GetByIdUser = `${HOST}/user`;

  const [detail, setDetail] = useState({});

  const [product, setProduct] = useState([]);
  const [list_comment, set_list_comment] = useState([]);
  const [review, setReview] = useState('description');
  const [comment, setComment] = useState('');
  const [star, setStar] = useState(5);
  const [text, setText] = useState(1);
  const [index, setIndex] = useState(0);
  const [sizeProduct, setSizeProduct] = useState(null);
  const [getVoucher, setGetVoucher] = useState('');
  const [user, setUser] = useState({});
  let { id } = useParams();

  // Hàm này dùng useContext để cập nhật số lượng ở header
  const { setReloadCount } = mainLayoutFacade.useFacade();
  // Hàm này dùng để lấy ra thông tin từng sản phẩm
  useEffect(() => {
    const fetchData = async () => {
      const response = await ProductAPI.getDetail(id);
      setDetail(response.data);
    };
    fetchData();
  }, [id]);
  useEffect(() => {
    if (detail.coupons) {
      axios
        .get(URL_GetVoucher)
        .then((response) => {
          let voucher = response.data.filter((val) => detail.coupons === val.nameCoupons)[0];
          setGetVoucher(voucher.voucher);
        })
        .catch((error) => console.log('error', error));
    }
  }, [detail.coupons]);

  const addToCart = async () => {
    const data = {
      idUser,
      idProduct: detail._id,
      quantity: text,
      nameProduct: detail.name,
      price: detail.price,
      promotionPrice: detail.promotionPrice,
      img: detail.avt,
      size: sizeProduct ? sizeProduct : arrSize[0],
    };
    await axios.post(URL_AddToCart, data);
    await setReloadCount(false);
    toast('Bạn Đã Thêm Hàng Thành Công!', { type: 'success' });
  };

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const upText = () => {
    const value = parseInt(text) + 1;
    setText(value);
  };

  const downText = () => {
    const value = parseInt(text) - 1;
    if (value === 0) return;
    setText(value);
  };

  const selectSize = (selectSize) => {
    setSizeProduct(selectSize);
  };

  const handlerReview = (value) => {
    setReview(value);
  };
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  // Hàm thay đổi sao đánh giá
  const onChangeStar = (e) => {
    setStar(e.target.value);
  };

  // Hàm viết comment
  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  // Hàm này dùng để gửi bình luận
  const submitComment = async () => {
    const data = {
      idProduct: id,
      idUser: idUser,
      fullname: user.fullname,
      content: comment,
      star: star,
      avt: user.avatar,
    };
    if (idUser) {
      if (data.content === '') {
        toast('Vui lòng nhập bình luận!', { type: 'warning' });

        return;
      }
      await axios.post(URL_CreateComment, data);
      setReview('review');
      setComment('');
    } else {
      toast('Bình luận thất bại bạn phải đăng nhập!', { type: 'error' });

      return;
    }
  };

  //Hàm này gọi API lấy sản phẩm có liên quan
  useEffect(() => {
    const fetchData = async () => {
      const response = await ProductAPI.getAPI();
      const data = response.data.splice(0, 4);
      setProduct(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataComment = async () => {
      // Hàm này gọi thông tin user

      await axios.get(`${URL_GetByIdUser}/${idUser}`).then((res) => setUser(res.data));
      //Hàm này gọi API lấy comment của sản phẩm dựa theo id sản phẩm
      const responseListComment = await axios.get(`${URL_GetCommentByIdProduct}/${id}`);
      const dataComment = responseListComment.data;
      set_list_comment(dataComment);
    };
    fetchDataComment();
  }, [comment]);

  // hàm này thêm sản phẩm vào wishlist với component SẢN PHẨM LIÊN QUAN
  const addWishlist = (idProduct, size) => {
    // Xử lý size thành array
    const itemSizes = size.split(' ');
    layoutFacade.addWishlist(idProduct, itemSizes[0]);
  };

  // Chuyển đổi type string thành array
  const album = detail.album;
  const size = detail.size;
  const arrAlbum = album ? album.split(' ') : [];
  const arrSize = size ? size.split(' ') : [];

  // Tính trung bình số sao người dùng đánh giá của từng sản phẩm
  const arr = list_comment.map((val) => val.star);
  const intArr = arr.map((str) => parseInt(str));
  let sum = 0;
  for (const a of intArr) {
    sum += a;
  }
  const starMedium = sum / intArr.length;

  return (
    <section className="py-4 main-detail">
      <div className="py-2 bg-light mb-4">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href={'/'}>Trang chủ</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Cửa hàng
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {detail.name}
            </li>
          </ol>
        </div>
      </div>

      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-2 col-3 d-flex flex-row flex-lg-column order-lg-1 order-2">
                <Card.Img className="post-img mb-3 mr-4" src={detail.avt}></Card.Img>
                {arrAlbum.map((val, idx) => {
                  return <Card.Img className="post-img mb-3 mr-4" src={val} key={idx + 1}></Card.Img>;
                })}
              </div>
              <Carousel
                variant="dark"
                className="col-lg-10 order-lg-2 order-1"
                activeIndex={index}
                onSelect={handleSelect}
              >
                <Carousel.Item>
                  <img className="d-block w-100" src={detail.avt} alt="Second Product" />
                </Carousel.Item>
                {arrAlbum.map((val, idx) => {
                  return (
                    <Carousel.Item key={idx + 1}>
                      <img className="d-block w-100" src={val} alt="Second Product" />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </div>
          </div>
          <div className="col-lg-6 ">
            {/* Đánh giá  */}
            <ul className="list-inline mb-2">
              <li className="list-inline-item m-0 existsStar">
                {starMedium >= 1 ? (
                  <AiTwotoneStar className="text-warning text-base" />
                ) : (
                  <AiOutlineStar className="text-warning text-base" />
                )}
              </li>
              <li className="list-inline-item m-0">
                {starMedium >= 2 ? (
                  <AiTwotoneStar className="text-warning text-base" />
                ) : (
                  <AiOutlineStar className="text-warning text-base" />
                )}
              </li>
              <li className="list-inline-item m-0">
                {starMedium >= 3 ? (
                  <AiTwotoneStar className="text-warning text-base" />
                ) : (
                  <AiOutlineStar className="text-warning text-base" />
                )}
              </li>
              <li className="list-inline-item m-0">
                {starMedium >= 4 ? (
                  <AiTwotoneStar className="text-warning text-base" />
                ) : (
                  <AiOutlineStar className="text-warning text-base" />
                )}
              </li>
              <li className="list-inline-item m-0">
                {starMedium >= 5 ? (
                  <AiTwotoneStar className="text-warning text-base" />
                ) : (
                  <AiOutlineStar className="text-warning text-base" />
                )}
              </li>
            </ul>
            {/* end Đánh giá  */}
            <Card.Title className="title-product mb-3">{detail.name}</Card.Title>
            <div className="text-gray pb-2">
              <strong className="text-uppercase">Thương hiệu:</strong>
              <span className="ml-2 text-muted">{detail.brand}</span>
            </div>
            <Card.Text className="text-base d-flex">
              {detail.coupons && <span className="sale-product">{getVoucher}%</span>}
              <span className="text-base" style={{ color: 'red' }}>
                {parseInt(detail.promotionPrice ? detail.promotionPrice : detail.price).toLocaleString()}₫
              </span>
              <span style={{ color: 'grey', paddingLeft: '10px' }}>
                <del>{detail.promotionPrice ? parseInt(detail.price).toLocaleString() + '₫' : ''}</del>
              </span>
            </Card.Text>

            <div className="row align-items-center mb-4">
              <div className="col-md-12">
                <div className="d-flex align-items-center justify-content-between py-3">
                  <div className="quantity">
                    <button className="dec-btn" onClick={downText}>
                      <AiOutlineLine />
                    </button>
                    <input
                      className="form-control border-0 shadow-0 p-0"
                      type="text"
                      value={text}
                      onChange={onChangeText}
                    />
                    <button className="inc-btn" onClick={upText}>
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>
              </div>
              <div className="">
                <ul className="list-unstyled d-inline-block">
                  <li className="py-2 mb-1 bg-white text-muted">
                    <strong className="text-uppercase text-dark">Thể loại:</strong>
                    <a className="ml-2">{detail.category}</a>
                  </li>
                  <li className="py-2 mb-1 size-products">
                    <strong className="text-uppercase text-dark mr-2">Size:</strong>
                    {arrSize.length === 0
                      ? ''
                      : arrSize.map((val, idx) => {
                          return (
                            <div className="size-product-item" key={idx + 1}>
                              <input
                                className="selector-item_radio"
                                id={val}
                                type="radio"
                                name="size"
                                defaultChecked={arrSize[0] === val ? true : false}
                              ></input>
                              <label className="selector-item_label" htmlFor={val} onClick={() => selectSize(val)}>
                                {val}
                              </label>
                            </div>
                          );
                        })}
                  </li>
                </ul>
              </div>
              <div className="col-md-8 d-flex flex-md-row flex-column align-item-center mb-2">
                <button className="btn btn-dark btn-base text-white my-2 btn-addToCart-detail" onClick={addToCart}>
                  <AiOutlineShoppingCart /> Thêm vào giỏ hàng
                </button>
                <button
                  className="btn btn-warning btn-base text-white hover-icon-heart my-2"
                  onClick={() => layoutFacade.addWishlist(detail._id, sizeProduct ? sizeProduct : arrSize[0])}
                >
                  <AiFillHeart /> Thêm vào yêu thích
                </button>
              </div>
            </div>
          </div>
        </div>

        <ul className="nav nav-tabs border-0">
          <li className="nav-item">
            <a
              className="nav-link fix_comment"
              onClick={() => handlerReview('description')}
              style={review === 'description' ? { backgroundColor: '#383838', color: '#ffffff' } : { color: '#383838' }}
            >
              Mô tả
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link fix_comment"
              onClick={() => handlerReview('review')}
              style={review === 'review' ? { backgroundColor: '#383838', color: '#ffffff' } : { color: '#383838' }}
            >
              Đánh giá
            </a>
          </li>
        </ul>
        <div className="tab-content mb-5">
          {review === 'description' ? (
            <div className="tab-pane fade show active">
              <div className="p-4 p-lg-5 bg-white">
                <h6 className="text-uppercase mb-3">Mô tả sản phẩm</h6>
                <p className="text-muted text-small">{detail.description}</p>
              </div>
            </div>
          ) : (
            <div className="tab-pane fade show active">
              <div className="p-4 p-lg-5 bg-white">
                <div className="row">
                  <div className="col-lg-8">
                    {list_comment &&
                      list_comment.map((value, idx) => (
                        <div className="media mb-3" key={idx + 1}>
                          <div className="main-img-detail">
                            <img
                              className="img-detail"
                              src={value.avt ? value.avt : Image.avatarClone}
                              alt="Avatar user"
                            />
                          </div>
                          <div className="media-body ml-3">
                            <div className="d-flex justify-content-between flex-wrap">
                              <div>
                                <h6 className="mb-0 text-uppercase">{value.fullname}</h6>
                                <p className="small text-muted mb-0 text-uppercase">{value.created_date}</p>
                              </div>
                              <div>
                                <ul className="list-inline mb-1 text-xs">
                                  <li className="list-inline-item m-0 existsStar">
                                    {value.star >= 1 ? (
                                      <AiTwotoneStar className="text-warning text-base" />
                                    ) : (
                                      <AiOutlineStar className="text-warning text-base" />
                                    )}
                                  </li>
                                  <li className="list-inline-item m-0">
                                    {value.star >= 2 ? (
                                      <AiTwotoneStar className="text-warning text-base" />
                                    ) : (
                                      <AiOutlineStar className="text-warning text-base" />
                                    )}
                                  </li>
                                  <li className="list-inline-item m-0">
                                    {value.star >= 3 ? (
                                      <AiTwotoneStar className="text-warning text-base" />
                                    ) : (
                                      <AiOutlineStar className="text-warning text-base" />
                                    )}
                                  </li>
                                  <li className="list-inline-item m-0">
                                    {value.star >= 4 ? (
                                      <AiTwotoneStar className="text-warning text-base" />
                                    ) : (
                                      <AiOutlineStar className="text-warning text-base" />
                                    )}
                                  </li>
                                  <li className="list-inline-item m-0">
                                    {value.star >= 5 ? (
                                      <AiTwotoneStar className="text-warning text-base" />
                                    ) : (
                                      <AiOutlineStar className="text-warning text-base" />
                                    )}
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <p className="text-small mb-0 text-muted">{value.content}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Bình Luận:</label>
          <textarea
            className="form-control"
            style={{ maxWidth: '100%' }}
            rows="4"
            onChange={onChangeComment}
            value={comment}
            disabled={idUser === null ? true : false}
          ></textarea>
        </div>
        <div className="d-flex flex-column flex-sm-row justify-content-between py-4">
          <div className="d-flex mb-3">
            <span className="mt-2">Đánh giá: </span>
            &nbsp; &nbsp;
            <Form>
              <Form.Select size="md" value={star} onChange={onChangeStar}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select>
            </Form>
            &nbsp; &nbsp;
            <span className="mt-2">
              Sao <AiTwotoneStar className="text-warning" />
            </span>
          </div>
          <div className="btn-send-comment">
            <a className="btn btn-dark btn-base btn-block text-white" onClick={submitComment}>
              Gửi
            </a>
          </div>
        </div>
        <h2 className="h5 text-uppercase mb-4">Sản phẩm liên quan</h2>
        <div className="row">
          {product &&
            product.map((value, idx) => (
              <div className="col-md-4 col-xl-3 col-sm-6" key={idx + 1}>
                <CardProduct itemProduct={value} listSize={arrSize} handleAddWishlist={layoutFacade.addWishlist} />
              </div>
            ))}
        </div>
        {/* -------------Modal Product----------------- */}
        {product &&
          product.map((value, idx) => (
            <div className="modal fade show" id={`product_${value._id}`} key={idx + 1}>
              <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-body p-0">
                    <div className="row align-items-stretch">
                      <div className="col-lg-6 p-lg-0">
                        <img
                          style={{ width: '100%' }}
                          className="product-view d-block h-100 bg-cover bg-center"
                          src={value.avt}
                          data-lightbox={`product_${value._id}`}
                        />
                      </div>
                      <div className="col-lg-6">
                        {/* Để tắt modal phải có class="close" và data-dissmiss="modal" và aria-label="Close" */}
                        <a
                          className="close p-4"
                          type="button"
                          href="#section_product"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          ×
                        </a>
                        <div className="p-5 my-md-4">
                          <ul className="list-inline mb-2">
                            <li className="list-inline-item m-0 existsStar">
                              {starMedium >= 1 ? (
                                <AiTwotoneStar className="text-warning text-base" />
                              ) : (
                                <AiOutlineStar className="text-warning text-base" />
                              )}
                            </li>
                            <li className="list-inline-item m-0">
                              {starMedium >= 2 ? (
                                <AiTwotoneStar className="text-warning text-base" />
                              ) : (
                                <AiOutlineStar className="text-warning text-base" />
                              )}
                            </li>
                            <li className="list-inline-item m-0">
                              {starMedium >= 3 ? (
                                <AiTwotoneStar className="text-warning text-base" />
                              ) : (
                                <AiOutlineStar className="text-warning text-base" />
                              )}
                            </li>
                            <li className="list-inline-item m-0">
                              {starMedium >= 4 ? (
                                <AiTwotoneStar className="text-warning text-base" />
                              ) : (
                                <AiOutlineStar className="text-warning text-base" />
                              )}
                            </li>
                            <li className="list-inline-item m-0">
                              {starMedium >= 5 ? (
                                <AiTwotoneStar className="text-warning text-base" />
                              ) : (
                                <AiOutlineStar className="text-warning text-base" />
                              )}
                            </li>
                          </ul>
                          <h2 className="h4">{value.name}</h2>
                          <Card.Text style={{ color: 'red' }}>
                            {value.promotionPrice}₫
                            <span style={{ color: 'grey', paddingLeft: '10px' }}>
                              <del>{value.price}₫</del>
                            </span>
                          </Card.Text>
                          <p className="text-small mb-4">{value.description}</p>
                          <div className="row align-items-stretch mb-4">
                            <div className="col-sm-12 pl-sm-0 fix_addwish">
                              <button
                                className="btn btn-warning btn-block btn-sm text-white hover-icon-heart"
                                onClick={() => addWishlist(value._id, value.size)}
                              >
                                <AiFillHeart /> Thêm vào yêu thích
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {/* -------------Modal Product----------------- */}
      </div>
    </section>
  );
}

export default Detail;
