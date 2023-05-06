import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const ModalDeleteAll = (props) => {
    const showAll = props.showAll;
    const handleCloseAll = props.handleCloseAll
    const handlerDeleteAll = props.handlerDeleteAll

    const deleteProduct = () => {
        handlerDeleteAll()
        setTimeout(() => {
            window.location.reload()
        }, 1200)
    }
    return (
        <>
            <Modal show={showAll} onHide={handleCloseAll}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn xóa không!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAll}>
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

export default ModalDeleteAll