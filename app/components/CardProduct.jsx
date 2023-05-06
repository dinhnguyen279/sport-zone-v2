import React from "react";
import { Card } from "react-bootstrap";
import {
  AiOutlineExpand,
  AiOutlineHeart,
} from "react-icons/ai";

const CardProduct = (props) => {
  const itemProduct = props.itemProduct;
  // listSize được lấy từ component Detail
  const listSize = props.listSize
  const addWishlist = (idProduct, size) => {
    // Xử lý size thành array
    const itemSizes = size.split(" ")
    props.handleAddWishlist(
      idProduct,
      itemSizes[0] ? itemSizes[0] : listSize[0]
    )
  }
  return (
    <>
      <div className="product">
        <div className="position-relative mb-3 product-new">
          <a className="d-block" href={`/detail/${itemProduct._id}`}>
            <Card.Img
              className="img-banner"
              src={itemProduct.avt}
              alt="..."
            ></Card.Img>
          </a>
          <div className="product-overlay">
            <ul className="">
              <li className="list-item-overlay">
                {/* Dùng Modal phải có href để nó hiện ra thằng đó và thuộc tính data-toggle="modal" để mở modal */}
                <a
                  className="btn btn-sm btn-outline-dark"
                  href={`#product_${itemProduct._id}`}
                  data-toggle="modal"
                >
                  <AiOutlineExpand />
                </a>
              </li>
              <li className="list-item-overlay">
                <button className="btn btn-sm btn-outline-dark" onClick={() => addWishlist(itemProduct._id, itemProduct.size)}>
                  <AiOutlineHeart />
                </button>
              </li>
            </ul>
          </div>
          <div>
            <a
              type="button"
              className="btn-addtocart"
              href={`/detail/${itemProduct._id}`}
            >
              Thông tin sản phẩm
            </a>
          </div>
        </div>
        <Card.Link
          href={`detail/${itemProduct._id}`}
          className="title-product h6"
        >
          {itemProduct.name}
        </Card.Link>
        {itemProduct.promotionPrice === "" ? (
          <Card.Text>{parseInt(itemProduct.price).toLocaleString()}₫</Card.Text>
        ) : (
          <Card.Text style={{ color: "red" }}>
            {(parseInt(itemProduct.promotionPrice)).toLocaleString()}₫
            <span style={{ color: "grey", paddingLeft: "10px" }}>
              <del>{parseInt(itemProduct.price).toLocaleString()}₫</del>
            </span>
          </Card.Text>
        )}
      </div>
    </>
  );
};

export default CardProduct;
