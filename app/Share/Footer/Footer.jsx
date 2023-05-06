import React from 'react';
import { Link } from "react-router-dom"
function Footer(props) {
    return (
        <footer className="bg-dark text-white">
            <div className="container py-4">
                <div className="row py-5">
                    <div className="col-md-4 mb-2">
                        <h6 className="text-uppercase mb-3">Về Sport Zone</h6>
                        <p style={{ color: "white" }}>Được thành lập từ 2023, Mang sứ mệnh đa dạng các sản phẩm chất lượng đến với môn Thể Thao Vua, <a style={{ color: "white" }} href='/'>SPORT ZONE</a> cam kết uy tín và sự tín nhiệm cao nhất từ Khách hàng</p>
                        <hr className='border-top d-md-none d-block' style={{ borderColor: '#1d1d1d !important' }} />
                    </div>
                    <div className="col-md-4 mb-2 mb-md-0">
                        <h6 className="text-uppercase mb-3">Địa chỉ</h6>
                        <ul className="list-unstyled mb-0">
                            <li>Địa chỉ: 55 Trần Văn Quang, Phường 10, Quận Tân Bình.</li>
                            <li>Số điện thoại: 085 432 2789 - 093 596 8794</li>
                            <li>Email: sportzone@gmail.com</li>
                            <li>Thời gian mở của: 8:30 - 21:30</li>
                        </ul>
                        <hr className="border-top" style={{ borderColor: '#1d1d1d !important' }} />
                        <h6 className="text-uppercase mb-3">Chính sách khách hàng</h6>
                        <ul className="list-unstyled mb-0">
                            <li><Link className="footer-link" to="/gioi-thieu">Giới thiệu</Link></li>
                            <li><Link className="footer-link" to="/chinh-sach-bao-mat">Chính sách bảo mật</Link></li>
                            <li><Link className="footer-link" to="/chinh-sach-doi-tra">Chính sách đổi trả</Link></li>
                            <li><Link className="footer-link" to="/dieu-khoan-dich-vu">Điều khoản dịch vụ</Link></li>
                        </ul>
                        <hr className='border-top d-md-none d-block' style={{ borderColor: '#1d1d1d !important' }} />
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                        <h6 className="text-uppercase mb-3">Thông tin liên hệ</h6>
                        <ul className="list-unstyled mb-0">
                            <li>Gọi mua hàng:  0935 90 3666 (8h30 - 21h30)</li>
                            <li>Gọi khiếu nại: 096 893 89 88 - 079 01 23456 (9h00 - 20h00)</li>
                            <li>Gọi tư vấn:  0935 90 7979 (8h30 - 21h30)</li>
                        </ul>
                    </div>
                </div>
                <hr className='border-top' style={{ borderColor: '#1d1d1d !important' }} />
                <div className="pt-4">
                    <div className="row">
                        <div className="col-lg-6">
                            <p className="small text-muted mb-0">&copy; 2023 All rights reserved.</p>
                        </div>
                        <div className="col-lg-6 text-lg-right">
                            <p className="small text-muted mb-0">Sport Zone</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;