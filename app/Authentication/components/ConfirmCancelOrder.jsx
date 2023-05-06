import axios from 'axios'
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { FaRegBell } from 'react-icons/fa'
import { HOST } from '../../domain/host/host'

const ConfirmCancelBill = (props) => {
    const handleCancelOrder = props.cancelOrder
    const [checked, setChecked] = useState(false)
    const [contentChecked, setContentChecked] = useState(null)
    const handleChecked = (content) => {
        setContentChecked(content)
        setChecked(true)
    }
    const dataReasonCancel = [
        { id: 1, content: "Tôi muốn cập nhật địa chỉ/sđt nhận hàng" },
        { id: 2, content: "Người bán không trả lời thắc mắc / yêu cầu của tôi" },
        { id: 3, content: "Thay đổi đơn hàng (màu sắc, kích thước, thêm mã giảm giá,...)" },
        { id: 4, content: "Tôi không có nhu cầu mua nữa" }
    ]

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Lý Do Hủy
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className=''>
                    <div className='content-cancel mb-3' tabIndex="0">
                        <FaRegBell className='mr-2 text-warning' />
                        <span>
                            Bạn có biết? Bạn có thể cập nhật thông tin nhận hàng cho đơn hàng (1 lần duy nhất).
                            Nếu bạn xác nhận hủy, toàn bộ đơn hàng sẽ được hủy.
                        </span>
                    </div>
                    <div className='list-radio'>
                        {dataReasonCancel && dataReasonCancel.map((val, idx) => {
                            return (
                                <div role='radio' aria-checked={checked} onClick={() => handleChecked(val.content)} className='list-radio-main mb-3' tabIndex="0" key={idx + 1}>
                                    <div className='list-radio-item'>
                                        <div className={`list-radio-item__circle ${contentChecked === val.content ? "item-checked" : "item-unchecked"}`} >
                                            <div className={`list-radio-item__dot ${contentChecked === val.content ? "bg-danger" : "bg-none"}`}>
                                            </div>
                                        </div>
                                        <p>{val.content}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={props.onHide}>Không phải bây giờ</Button>
                <Button className='' variant='danger' onClick={() => handleCancelOrder(contentChecked)}>Hủy đơn hàng</Button>
            </Modal.Footer>
        </Modal >
    )
}

export default ConfirmCancelBill