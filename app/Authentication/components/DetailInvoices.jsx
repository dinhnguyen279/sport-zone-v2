import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { HOST } from '../../domain/host/host';

function DetailInvoices(props) {
    const dataDetail = props.datainvoices
    const URL_GetProduct = `${HOST}/product`
    const [listImage, setListImage] = useState([])
    // hàm này tách sản phẩm trong bill ra
    const listFullName = dataDetail.fullname;
    const listReasonCancel = dataDetail.reasonCancel
    const total = dataDetail.total;
    const listNameProduct = dataDetail.nameProduct.split(",");
    const listPrice = dataDetail.price.split(",");
    const listQuantity = dataDetail.quantity.split(",");
    const listSize = dataDetail.size.split(",");
    const listIdProduct = dataDetail.idProduct.split(",");
    const listProduct = [];
    for (let i = 0; i < listNameProduct.length; i++) {
        const oBill = {}
        oBill.name = listNameProduct[i];
        oBill.price = listPrice[i];
        oBill.quantity = listQuantity[i];
        oBill.size = listSize[i];
        oBill.avt = listImage[i] ?? undefined;
        oBill.fullname = listFullName;
        oBill.total = total;
        oBill.reasonCancel = listReasonCancel
        listProduct.push(oBill);
    }
    // Lấy ra hình ảnh của sản phẩm
    useEffect(() => {
        if (listProduct.length > 0 && listProduct && listIdProduct) {
            const requests = listIdProduct.map(id => axios.get(`${URL_GetProduct}/${id}`))
            Promise.all(requests)
                .then(res => {
                    const urls = res.map(res => res.data.avt)
                    setListImage(urls);
                })
        }
    }, [listProduct, listIdProduct])
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Thông tin hóa đơn
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='detail-invoices'>
                    <p>Người nhận:<b> {dataDetail.fullname}</b></p>
                    <p>Số điện thoại:<b> {dataDetail.phone}</b></p>
                    <p>Số điện thoại:<b> {dataDetail.address}</b></p>
                    {dataDetail.reasonCancel !== "" ?
                        (
                            <p>Lý do hủy:<b> {dataDetail.reasonCancel}</b></p>
                        )
                        : ""}
                </div>
                {listProduct && listProduct.map((val, idx) => {
                    return (
                        <div className="content-order" key={idx + 1}>
                            <div className='content-detail-invoices'>
                                <img src={val.avt} alt={val.name} className='img-invoices' />
                                <div className='ml-3'>
                                    <p><b>{val.name}</b></p>
                                    <p><b>x{val.quantity}</b></p>
                                    <p><b>Size: {val.size}</b></p>
                                </div>
                            </div>
                            <div>
                                <p><b>₫{parseInt(val.price).toLocaleString()}</b></p>
                            </div>
                        </div>
                    )
                })}
                <div className='total-detail-invoice pt-3'>
                    <p>Thành Tiền: {parseInt(dataDetail.total).toLocaleString()}₫</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Đóng</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default DetailInvoices;