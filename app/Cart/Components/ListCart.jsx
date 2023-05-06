import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Modal } from "react-bootstrap";
import Image from "../../Share/img/Image";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import axios from "axios";
import { HOST } from "../../domain/host/host";
import ModalDelete from "./ModalDelete";

function ListCart(props) {

  const listProduct = props.getCart;
  const onDeleteCart = props.onDeleteCart;
  const onUpdateCount = props.onUpdateCount;

  const [show, setShow] = useState(false);
  const [dataDelete, setDataDelete] = useState({
    idUser: "",
    idProduct: "",
    size: ""
  })

  const handleClose = () => setShow(false);

  const handleShow = (idUser, idProduct, size) => {
    const data = { idUser: idUser, idProduct: idProduct, size: size }
    setDataDelete(data);
    setShow(true);
  }

  const handlerDelete = () => {
    if (!onDeleteCart) {
      return;
    }
    const getUser = dataDelete.idUser;
    const getProduct = dataDelete.idProduct;
    const getSize = dataDelete.size;

    onDeleteCart(getUser, getProduct, getSize);
  };

  const handlerDown = (getIdUser, getIdProduct, getCount, getSize) => {
    if (!onUpdateCount) {
      return;
    }

    if (getCount === 1) {
      return;
    }

    //Trước khi trả dữ liệu về component cha thì phải thay đổi biến count
    const updateCount = parseInt(getCount) - 1;
    onUpdateCount(getIdUser, getIdProduct, updateCount, getSize);
  };

  const handlerUp = (getIdUser, getIdProduct, getCount, getSize) => {
    if (!onUpdateCount) {
      return;
    }
    //   Trước khi trả dữ liệu về component cha thì phải thay đổi biến count
    const updateCount = parseInt(getCount) + 1;
    onUpdateCount(getIdUser, getIdProduct, updateCount, getSize);
  };

  return (
    <>
      {listProduct.map((val, key) => (
        <div className="mb-4" key={key + 1}>
          <div className="row listcart-product position-relative">
            <div className="col-md-3 mb-3">
              <Link to={`/detail/${val.idProduct}`} className="reset-anchor d-block animsition-link">
                <Card.Img src={val.img} />
              </Link>
            </div>
            <div className="col-md-6">
              <Card.Title className="mb-3">{val.nameProduct}</Card.Title>
              <Card.Subtitle className="mb-3">Size {val.size}</Card.Subtitle>
              <div className="quantity">
                <Button
                  variant="dark"
                  className="dec-btn p-0"
                  style={{ cursor: "pointer" }}
                  onClick={() => handlerDown(val.idUser, val.idProduct, val.quantity, val.size)}
                >
                  <AiFillCaretLeft />
                </Button>
                <input
                  className="form-control form-control-sm border-0 shadow-0 p-0"
                  type="text"
                  value={val.quantity}
                  readOnly
                />
                <Button
                  variant="dark"
                  className="inc-btn p-0"
                  style={{ cursor: "pointer" }}
                  onClick={() => handlerUp(val.idUser, val.idProduct, val.quantity, val.size)}
                >
                  <AiFillCaretRight />
                </Button>
              </div>
              <div className="align-middle border-0">
                <p className="mb-0 small">
                  {(parseInt(val.promotionPrice ? val.promotionPrice : val.price) * parseInt(val.quantity)).toLocaleString()}₫
                </p>
              </div>
            </div>
            <div className="col-md-3 text-end">
              <button
                href="/cart"
                className="reset-anchor remove_cart"
                style={{ cursor: "pointer" }}
                onClick={() => handleShow(val.idUser, val.idProduct, val.size)}
              >
                <i className="fas fa-trash-alt text-muted"></i>
              </button>
              {/* Modal hiện popup xác nhận xóa sản phẩm */}
              {show &&
                <ModalDelete show={show} handleClose={handleClose} handlerDelete={handlerDelete} />
              }
            </div>
            <div className="col-md-12 d-flex justify-content-between">
              <p style={{ fontWeight: "700" }}>Thành tiền:</p>
              <p
                className="mb-0 small"
                style={{ color: "red", fontWeight: "700" }}
              >
                {(parseInt(val.promotionPrice ? val.promotionPrice : val.price) * parseInt(val.quantity)).toLocaleString()}₫
              </p>
            </div>

            <div className="mt-1 col-md-12">
              <hr className="border-bottom" style={{ borderColor: '#1d1d1d' }} />
            </div>
          </div>
        </div>
      ))
      }
    </>
  );
}

export default ListCart;
