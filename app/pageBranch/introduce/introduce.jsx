import React from 'react';
import { Link } from 'react-router-dom';
import { BsPhone } from "react-icons/bs"
import { FaMapMarkerAlt, FaGlobeAsia, FaFacebook, FaGlobe } from "react-icons/fa"
const Introduce = () => {
  return (
    <div className='main-cart'>
      <div className="py-2 bg-light">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href='/'>Trang chủ</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Giới thiệu
            </li>
          </ol>
        </div>
      </div>
      <div className='header-introduce col-md-12'>
        <div className='header-introduce-content'>
          <h3 className='mb-3'>
            TẦM NHÌN THƯƠNG HIỆU
          </h3>
          <div>
            <p>
              Sports Zone ra đời với sứ mệnh đem đến những sản phẩm thể thao mang dấu ấn Nhật Bản tới tận tay người tiêu dùng Việt.
            </p>
            <p>Các công nghệ mới nhất được những người thợ lành nghề dồn vào từng đường kim mũi chỉ với mong muốn người chơi khi
              sử dụng sản phẩm sẽ thi đấu thăng hoa cùng hiệu suất cao nhất.
            </p>
            <p>
              Bền bỉ và mạnh mẽ qua thời gian, Sports Zone xứng đáng chiếm một vị trí trong túi đồ thể thao của bạn.
            </p>
            <br />
            <p>
              Đến với Sports Zone, bạn dễ dàng có thể tìm được sản phẩm thể thao ưng ý nhất bao gồm: trang phục, giày, balo, bóng,...
              hoàn toàn phù hợp với túi tiền. Với những chất liệu cao cấp và sự tỉ mỉ qua từng chi tiết, chúng tôi tự tin đem lại những trải nghiệm tuyệt vời cho người tiêu dùng.
            </p>
          </div>
        </div>
      </div>
      <div className='footer-introduce'>
        <div className='footer-introduce-content'>
          <h3>
            Kết nối với Sports Zone
          </h3>
          <div className='container'>
            <div className='footer-introduce-list row'>
              <div className='col-lg-3 col-md-12 footer-introduce-item'>
                <BsPhone size="50" className='mb-3' />
                <h4 className='mb-3'>Hotline</h4>
                <div>
                  <h5 className='mb-3'>Chi nhánh Hồ Chí Minh</h5>
                  <p>082 9954 124</p>
                </div>
              </div>
              <div className='col-lg-3 col-md-12 footer-introduce-item'>
                <FaMapMarkerAlt size="50" className='mb-3' />
                <h4 className='mb-3'>Địa chỉ</h4>
                <div className='mb-3'>
                  <h5 className='mb-3'>Chi nhánh Hồ Chí Minh</h5>
                  <p>82 Hoàng Trọng Mậu, Tân Hưng, Quận 7, TP.HCM (8h30-18h00 từ T2 đến T7)</p>
                </div>

                <div>
                  <h5 className='mb-3'>Chi nhánh AEON Tân Phú HCM</h5>
                  <p>Tầng 1 - Trung tâm khu thời trang & Thể Thao - Tầng 1- AEON Mall Tân Phú, HCM (10:00 -22:00 từ T2 tới CN)</p>
                </div>
              </div>
              <div className='col-lg-3 col-md-12 footer-introduce-item'>
                <FaGlobeAsia className='mb-3' size="50" />
                <h4 className='mb-3'>Mạng lưới</h4>
                <div className='mb-3 item-footer'>
                  <FaFacebook size="30" />
                  <a target='_blank' href="https://www.facebook.com/profile.php?id=100090752721069">https://www.facebook.com/SportZone.vn</a>
                </div>
                <div className='item-footer'>
                  <FaGlobe size="30" />
                  <a target='_blank' href="https://sports-zone.vercel.app/">https://sports-zone.vercel.app/</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Introduce