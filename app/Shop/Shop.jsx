import axios from 'axios';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { AiOutlineProfile } from 'react-icons/ai';
import { useLocation, useParams } from 'react-router-dom';
import ProductAPI from '../API/ProductAPI';
import CardProduct from '../components/CardProduct';
import { HOST } from '../domain/host/host';
import Pagination from './Component/Pagination';
import Search from './Component/Search';
import SortProduct from './Component/SortProduct';
import mainLayoutFacade from '../utils/mainLayoutFacade';
function Shop() {
  const layoutFacade = mainLayoutFacade.useFacade();
  const URL_PRODUCT = `${HOST}/products`;
  const URL_SEARCH = `${HOST}/searchProducts`;
  const URL_getProductByCate = `${HOST}/getProductByCate`;
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search_query');
  const valueSearch = searchQuery;
  const [products, setProducts] = useState([]);
  //state dùng để sắp xếp sản phẩm
  const [sort, setSort] = useState('');
  //Tổng số trang
  const [totalPage, setTotalPage] = useState();
  //Từng trang hiện tại
  const [pagination, setPagination] = useState({
    page: '1',
    count: '12',
    category: 'all',
  });

  //Hàm này dùng để thay đổi state pagination.page
  //Nó sẽ truyền xuống Component con và nhận dữ liệu từ Component con truyền lên
  const handlerChangePage = (value) => {
    //Sau đó set lại cái pagination để gọi chạy làm useEffect gọi lại API pagination
    setPagination({
      page: value,
      count: pagination.count,
      category: pagination.category,
    });
  };

  const handlerChangeSort = (value) => {
    setSort(value);
  };

  //Hàm này dùng để thay đổi state pagination.search
  //Hàm này sẽ truyền xuống Component con và nhận dữ liệu từ Component con truyền lên
  const handleSearch = (e) => {
    const dataSearch = {
      fildter: e.fildter ? e.fildter : 'name',
      value: e.value,
    };
    const query = '?' + queryString.stringify(dataSearch);
    axios
      .get(`${URL_SEARCH}${query}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log('err search', err));
  };

  //Hàm Sort sản phẩm theo giá
  const sortPrice = (a, b, sort) => {
    const priceA = parseInt(a.promotionPrice) ? parseInt(a.promotionPrice) : a.price;
    const priceB = parseInt(b.promotionPrice) ? parseInt(b.promotionPrice) : b.price;

    if (sort === 'DownToUp') {
      if (priceA < priceB) {
        return -1;
      }
    }
    if (sort === 'UpToDown') {
      if (priceA > priceB) {
        return -1;
      }
    }
    return 0;
  };
  useEffect(() => {
    // sort price products
    const handleSortPrice = [...products].sort((a, b) => sortPrice(a, b, sort));
    setProducts(handleSortPrice);
  }, [sort]);

  const addWishlist = (idProduct, size) => {
    if (size.length > 0) {
      const itemSizes = size.split(' ');
      layoutFacade.addWishlist(idProduct, itemSizes[0]);
    }
  };

  //Gọi hàm useEffect tìm tổng số sản phẩm để tính tổng số trang
  //Và nó phụ thuộc và state pagination
  useEffect(() => {
    const fetchAllData = async () => {
      const products = await ProductAPI.getAPI();
      const response = products.data;

      // Tính tổng số trang = tổng số sản phẩm / số lượng sản phẩm 1 trang
      const totalPage = Math.ceil(parseInt(response.length) / parseInt(pagination.count));
      setTotalPage(totalPage);
    };
    fetchAllData();
  }, []);

  // pagination
  //Gọi hàm Pagination
  useEffect(() => {
    const params = {
      page: pagination.page,
      count: pagination.count,
      category: pagination.category,
      search: valueSearch,
    };
    const query = '?' + queryString.stringify(params);
    if (id === 'all') {
      axios
        .get(`${URL_PRODUCT}/pagination${query}`)
        .then((response) => setProducts(response.data))
        .catch((err) => console.log(err));
      return;
    }
    axios
      .get(`${URL_getProductByCate}/${id}`)
      .then((response) => setProducts(response.data))
      .catch((err) => console.log(err));
  }, [pagination, valueSearch]);

  return (
    <div className="container main-shop">
      <section className="py-3 bg-light mb-3">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href={'/'}>Trang chủ</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Cửa hàng
            </li>
          </ol>
        </div>
      </section>
      {/* -------------Modal Product----------------- */}
      {products &&
        products.map((value) => (
          <div className="modal fade show" id={`product_${value._id}`} key={value._id}>
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
                        <Card.Text style={{ color: 'red' }}>
                          {value.promotionPrice}₫
                          <span style={{ color: 'grey', paddingLeft: '10px' }}>
                            <del>{value.price}₫</del>
                          </span>
                        </Card.Text>
                        <p className="text-small mb-4">{value.description}</p>
                        <div className="row align-items-stretch mb-4">
                          <div className="col-sm-12 pl-sm-0 fix_addwish mb-2">
                            <a href={`/detail/${value._id}`} className="btn-warning btn btn-sm btn-block">
                              <AiOutlineProfile /> Thông tin sản phẩm
                            </a>
                          </div>
                          <div className="col-sm-12 pl-sm-0 fix_addwish">
                            <button
                              className="btn btn-dark btn-sm btn-block"
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
      {/* -------------Modal Product----------------- */}

      <section className="py-5">
        <div className="container p-0">
          <div className="row">
            <div className="col-lg-12 mb-5 mb-lg-0">
              <div className="row mb-3">
                {/* ------------------Search----------------- */}
                <Search handleSearch={handleSearch} />
                {/* ------------------Search----------------- */}
                <div className="col-lg-4 mb-3">
                  <ul className="list-inline d-flex justify-content-lg-end">
                    <li className="list-inline-item">
                      <SortProduct handlerChangeSort={handlerChangeSort} />
                    </li>
                  </ul>
                </div>
              </div>

              <div className="row">
                {products.map((val, key) => (
                  <div className="col-md-4 col-xl-3 col-sm-6" key={key + 1}>
                    <CardProduct itemProduct={val} handleAddWishlist={layoutFacade.addWishlist} />
                  </div>
                ))}
              </div>

              <Pagination pagination={pagination} handlerChangePage={handlerChangePage} totalPage={totalPage} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Shop;
