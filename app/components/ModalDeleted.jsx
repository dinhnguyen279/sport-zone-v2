import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const ModalDelete = (props) => {
    const show = props.show;
    const handleClose = props.handleClose
    const handlerDelete = props.handlerDelete

    const deleteProduct = () => {
        handlerDelete()
        setTimeout(() => {
            window.location.reload()
        }, 1200)
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn xóa không!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="danger" onClick={deleteProduct}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>.
        </>
    )
}

export default ModalDelete