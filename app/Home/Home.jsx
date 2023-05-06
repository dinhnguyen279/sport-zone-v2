import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { AiOutlineProfile } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Categories from '../API/Categories';
import ProductAPI from '../API/ProductAPI';
import Image from '../Share/img/Image';
import CardProduct from '../components/CardProduct';
import Carousel from '../components/Carousel';
import mainLayoutFacade from '../utils/mainLayoutFacade';

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const layoutFacade = mainLayoutFacade.useFacade();
  //Fetch Product
  useEffect(() => {
    const fetchData = async () => {
      const response = await ProductAPI.getAPI();

      const data = response.data.splice(0, 8);
      setProducts(data);

      await Categories.getAllCategories()
        .then((res) => setCategories(res.data))
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);
  const [navContent, setNavContent] = useState('nav1');
  // hàm này dành cho button trong popover product
  const addWishlist = (idProduct, size) => {
    // Xử lý size thành array
    const itemSizes = size.split(' ');
    layoutFacade.addWishlist(idProduct, itemSizes[0]);
  };
  // Lọc sản phẩm dựa trên chủ đề
  const featured = products.filter((item) => item.featured && item.featured.trim() !== '');
  const bestseller = products.filter((item) => item.bestseller && item.bestseller.trim() !== '');
  const hotdeals = products.filter((item) => item.hotdeals && item.hotdeals.trim() !== '');

  // Lọc sản phẩm theo category
  const productShoe = categories.filter((item) => item.nameCate === 'Giày Bóng Đá');
  const productClothes = categories.filter((item) => item.nameCate === 'Đồ Bóng Đá');
  const productAccessory = categories.filter((item) => item.nameCate === 'Phụ Kiện Bóng Đá');

  const idProductShoe = productShoe.map((val) => val.nameCate);
  const idProductClothes = productClothes.map((val) => val.nameCate);
  const idProductAccessory = productAccessory.map((val) => val.nameCate);

  return (
    <div className="page-holder m-t-10">
      <header className="header bg-white">
        {/* popover of products */}
        {products &&
          products.map((value) => (
            <div className="modal fade show" id={`product_${value._id}`} key={value._id}>
              <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-body p-0">
                    <div className="row align-items-stretch">
                      <div className="col-lg-6 p-lg-0">
                        <Card.Img className="product-view" src={value.avt} data-lightbox={`product_${value._id}`} />
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
                        <div className="py-5 pr-4 pl-2">
                          <ul className="list-inline mb-2">
                            <li className="list-inline-item m-0">
                              <i className="fas fa-star small text-warning"></i>
                            </li>
                            <li className="list-inline-item m-0">
                              <i className="fas fa-star small text-warning"></i>
                            </li>
                            <li className="list-inline-item m-0">
                              <i className="fas fa-star small text-warning"></i>
                            </li>
                            <li className="list-inline-item m-0">
                              <i className="fas fa-star small text-warning"></i>
                            </li>
                            <li className="list-inline-item m-0">
                              <i className="fas fa-star small text-warning"></i>
                            </li>
                          </ul>
                          <h2 className="h4">{value.name}</h2>
                          {value.promotionPrice === '' ? (
                            <Card.Text>{value.price}₫</Card.Text>
                          ) : (
                            <Card.Text style={{ color: 'red' }}>
                              {value.promotionPrice}₫
                              <span style={{ color: 'grey', paddingLeft: '10px' }}>
                                <del>{value.price}₫</del>
                              </span>
                            </Card.Text>
                          )}
                          <p className="text-small mb-4">{value.description}</p>
                          <div className="row align-items-stretch mb-4">
                            <div className="col-sm-12 pl-sm-0 fix_addwish mb-2">
                              <a href={`/detail/${value._id}`} className="btn-warning btn btn-base btn-block">
                                <AiOutlineProfile /> Thông tin sản phẩm
                              </a>
                            </div>
                            <div className="col-sm-12 pl-sm-0 fix_addwish">
                              <button
                                className="btn btn-dark btn-base btn-block"
                                onClick={() => addWishlist(value._id, value.size)}
                              >
                                <i className="far fa-heart mr-2"></i>Thêm danh sách yêu thích
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
        <div className="container-fluid">
          {/* Banner */}
          <section>
            <Carousel />
          </section>

          {/* dịch vụ */}
          <section className="py-5 bg-light mt-5">
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-sm-12 col-xl-6 col-xs-12 main-banner">
                  <Link to={`/shop/${idProductShoe}`}>
                    <div>
                      <img className="img-banner" src={Image.categorybanner1} alt="" />
                    </div>
                    <div className="content-banner">
                      <p>Cập nhật mẫu mới nhất</p>
                      <h3>Giày Đá Banh Cỏ Nhân Tạo</h3>
                      <p className="action-banner">
                        <span className="button">Xem Ngay</span>
                      </p>
                    </div>
                  </Link>
                </div>

                <div className="col-md-6 col-sm-12 col-xl-3 col-xs-12 main-banner">
                  <Link to={`/shop/${idProductClothes}`}>
                    <div>
                      <img className="img-banner" src={Image.categorybanner2} alt="" />
                    </div>
                    <div className="content-banner">
                      <p>Cập Nhật Mẫu 2023</p>
                      <h3>Quần Áo Bóng Đá</h3>
                      <p className="action-banner">
                        <span className="button">Xem Ngay</span>
                      </p>
                    </div>
                  </Link>
                </div>

                <div className="col-md-6 col-sm-12 col-xl-3 col-xs-12 main-banner">
                  <Link to={`/shop/${idProductAccessory}`}>
                    <div>
                      <img className="img-banner" src={Image.categorybanner3} alt="" />
                    </div>
                    <div className="content-banner">
                      <p>New Arrival 2023</p>
                      <h3 className="banner-item">Phụ Kiện Bóng Đá</h3>
                      <p className="action-banner">
                        <span className="button">Xem Ngay</span>
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Sản phẩm nổi bật */}
          <section className="py-5" id="section_product">
            <header className="text-center">
              <h2 className="h2 text-uppercase mb-4">Top sản phẩm nổi bật</h2>
            </header>
            <div className="row card-product">
              <div className="col-md-12 col-xl-4 col-sm-12">
                <Card.Img src={Image.collection}></Card.Img>
              </div>
              {featured ? (
                featured.map((value, key) => {
                  return (
                    <div className="col-md-4 col-xl-2 col-sm-6" key={key + 1}>
                      <CardProduct handleAddWishlist={layoutFacade.addWishlist} itemProduct={value} />
                    </div>
                  );
                })
              ) : (
                <div>Hiện tại chưa có sản phẩm nổi bật nào!</div>
              )}
            </div>
          </section>

          <section>
            <div className="container m-b-40 m-t-40 zoom-img">
              <Card.Img className="img-banner" src={Image.home_collection_banner} />
            </div>
          </section>

          <section className="bg-light band-select">
            <div className="container p-t-30 p-b-30">
              <Card.Title style={{ marginBottom: '30px' }}>
                <h3> Quần Áo Đá Banh Mới Nhất</h3>
              </Card.Title>
              <div className="images">
                <div className="images-item">
                  <Card.Img src={Image.lookbooks_1} />
                  <div className="p-t-10">
                    <p style={{ fontSize: '18px', paddingBottom: '10px' }}>Buibal Falcon</p>
                    <Link to={'/contact'} className="text-uppercase text-lookbook" style={{ fontFamily: 'sans-serif' }}>
                      In ấn miễn phí
                    </Link>
                  </div>
                </div>
                <div className="images-item">
                  <Card.Img src={Image.lookbooks_2} />
                  <div className="p-t-10">
                    <p style={{ fontSize: '18px', paddingBottom: '10px' }}>Quần Áo Bóng Đá Thái Lan</p>
                    <Link to={'/contact'} className="text-uppercase text-lookbook" style={{ fontFamily: 'sans-serif' }}>
                      In ấn font xịn
                    </Link>
                  </div>
                </div>
                <div className="images-item">
                  <Card.Img src={Image.lookbooks_3} />
                  <div className="p-t-10">
                    <p style={{ fontSize: '18px', paddingBottom: '10px' }}>Quần Áo Đá Banh Trẻ Em</p>
                    <Link to={'/contact'} className="text-uppercase text-lookbook" style={{ fontFamily: 'sans-serif' }}>
                      In ấn miễn phí
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Best Seller */}
          <section className="py-5">
            <header className="text-center">
              <h2 className="h2 text-uppercase mb-4">Best Seller</h2>
            </header>
            <div className="row card-product">
              <div className="col-md-12 col-xl-4 col-sm-12">
                <Card.Img src={Image.product_under_banner}></Card.Img>
              </div>
              {bestseller ? (
                bestseller.map((value, key) => {
                  return (
                    <div className="col-md-4 col-xl-2 col-sm-6" key={key + 1}>
                      <CardProduct handleAddWishlist={layoutFacade.addWishlist} itemProduct={value} />
                    </div>
                  );
                })
              ) : (
                <div>Hiện tại chưa có sản phẩm bestseller nào!</div>
              )}
            </div>
          </section>

          <section className="container">
            <div className="row main-product-hot">
              <div className="col-md-6 col-xs-12 img-product-hot">
                <Card.Img className="img-banner" src={Image.pro_featured} />
              </div>
              <div className="col-md-6 col-xs-12 text-center body-product">
                <p>Giày đá bóng</p>
                <Card.Title>
                  {' '}
                  <h1> KAMITO TA11 </h1>
                </Card.Title>
                <div className="body-title-product">
                  <button
                    className={`${navContent === 'nav1' ? 'text-dark' : 'text-gray'}`}
                    onClick={() => setNavContent('nav1')}
                  >
                    THÔNG TIN TA11
                  </button>
                  <button
                    className={`${navContent === 'nav2' ? 'text-dark' : 'text-gray'}`}
                    onClick={() => setNavContent('nav2')}
                  >
                    TA11 CÓ GÌ MỚI?
                  </button>
                  <button
                    className={`${navContent === 'nav3' ? 'text-dark' : 'text-gray'}`}
                    onClick={() => setNavContent('nav3')}
                  >
                    SIZE
                  </button>
                </div>
                <div className="content-product m-b-10">
                  {navContent === 'nav1' ? (
                    <div>
                      <p>
                        <b> KAMITO TA11 </b> – mẫu giày mang đậm dấu ẩn của tuyển thủ
                        <i>
                          {' '}
                          <b> Nguyễn Tuấn Anh </b>{' '}
                        </i>{' '}
                        sẽ mang đến cho bạn một trải nghiệm hoàn toàn khác biệt.
                      </p>
                      <p>
                        Được áp dụng các công nghệ mới nhất như <b> KA-Spin, KA-Fit, KA-Fiber </b> và đặc biệt là bộ đế
                        giảm chấn <b> KA-Comfort </b>, KAMITO TA11 sẽ giúp bạn thi đấu thăng hoa và làm chủ hoàn toàn
                        cuộc chơi.
                      </p>
                    </div>
                  ) : (
                    ' '
                  )}

                  {navContent === 'nav2' ? (
                    <div>
                      <p>
                        Lớp da KA-FIBER ULTRA siêu mềm, tạo cảm giác như đi chân trần và với lớp da mới này, độ bền cũng
                        đã được nâng cấp lên một tầm cao mới. <br />
                        ✅ Thiết kế đặc biệt với những vân kim cương nổi trên thân giày, vừa tạo tính thẩm mỹ vừa hỗ trợ
                        kiểm soát bóng tối ưu.
                        <br />
                        ✅ Bộ đế giày áp dụng công nghệ KA-SPIN với dàn đinh dăm được sắp xếp khoa học, giúp bám sân
                        hiệu quả ngay cả khi trời mưa sân trơn bóng ướt.
                        <br />✅ Form giày áp dụng chuẩn KA-FIT, ôm sát và phù hợp với bàn chân người Việt.
                      </p>
                    </div>
                  ) : (
                    ' '
                  )}
                  {navContent === 'nav3' ? (
                    <div>
                      <p>Size: 38, 39, 40, 41, 42, 43</p>
                      <img src={Image.sizegiay} alt="Bảng size giày" title="Bảng size giày" className="post-img" />
                    </div>
                  ) : (
                    ' '
                  )}
                </div>
              </div>
            </div>
          </section>
          {/* Hot Deals */}
          <section className="py-5">
            <header className="text-center">
              <h2 className="text-uppercase mb-4">Hot Deals 2023</h2>
            </header>
            <div className="row card-product">
              {hotdeals ? (
                hotdeals.map((value, key) => {
                  return (
                    <div className="col-md-4 col-xl-3 col-sm-6" key={key + 1}>
                      <CardProduct handleAddWishlist={layoutFacade.addWishlist} itemProduct={value} />
                    </div>
                  );
                })
              ) : (
                <div>Hiện tại chưa có sản phẩm Hot Deals nào</div>
              )}
            </div>
          </section>

          <section className="py-5">
            <Card.Title className="text-center">
              <h2> Ảnh đẹp Sports Zone</h2>
            </Card.Title>
            <div className="post-grid">
              <div className="post-item">
                <Card.Img className="post-img" src={Image.Carouselendpage1} />
              </div>
              <div className="post-item">
                <Card.Img className="post-img" src={Image.Carouselendpage2} />
              </div>
              <div className="post-item">
                <Card.Img className="post-img" src={Image.Carouselendpage3} />
              </div>
              <div className="post-item">
                <Card.Img className="post-img" src={Image.Carouselendpage4} />
              </div>
              <div className="post-item">
                <Card.Img className="post-img" src={Image.Carouselendpage5} />
              </div>
              <div className="post-item">
                <Card.Img className="post-img" src={Image.Carouselendpage6} />
              </div>
            </div>
          </section>
        </div>
      </header>
    </div>
  );
}

export default Home;
