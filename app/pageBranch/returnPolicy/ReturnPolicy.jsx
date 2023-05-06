import React from "react";

const ReturnPolicy = () => {
  return (
    <div className="main-cart">
      <div className="py-2 bg-light">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href='/'>Trang chủ</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Chính sách đổi trả
            </li>
          </ol>
        </div>
      </div>
      <div className="container header-ReturnPolicy">
        <h3 className="mb-3">Chính sách đổi trả</h3>
        <div className="mb-3">
          <h6 className="mb-3">1. Điều kiện đổi trả</h6>
          <p className="text-base mb-2">
            Quý Khách hàng cần kiểm tra tình trạng hàng hóa và có thể đổi hàng/ trả
            lại hàng ngay tại thời điểm giao/nhận hàng trong những trường hợp sau:
          </p>

          <ul className="list-ReturnPolicy">
            <li> Hàng không đúng chủng loại, mẫu mã trong đơn hàng đã đặt hoặc như trên
              website tại thời điểm đặt hàng.
            </li>
            <li>Không đủ số lượng, không đủ bộ như trong
              đơn hàng.
            </li>
            <li>
              Tình trạng bên ngoài bị ảnh hưởng như rách bao bì, bong tróc,
              bể vỡ… Khách hàng có trách nhiệm trình giấy tờ liên quan chứng minh sự
              thiếu sót trên để hoàn thành việc hoàn trả/đổi trả hàng hóa.
            </li>
          </ul>
        </div>
        <div className="">
          <h6 className="mb-3">2. Quy định về thời gian thông báo và gửi sản phẩm đổi trả</h6>
          <ul className="list-ReturnPolicy">
            <li><b>Thời gian thông báo đổi trả</b>: trong vòng 48h kể từ khi nhận sản phẩm đối với trường hợp sản phẩm thiếu phụ kiện, quà tặng hoặc bể vỡ.</li>
            <li><b>Thời gian gửi chuyển trả sản phẩm</b>: trong vòng 14 ngày kể từ khi nhận sản phẩm.</li>
            <li><b>Địa điểm đổi trả sản phẩm</b>: Khách hàng có thể mang hàng trực tiếp đến văn phòng/ cửa hàng của chúng tôi hoặc chuyển qua đường bưu điện.</li>
          </ul>
          <p className="text-base">
            Trong trường hợp Quý Khách hàng có ý kiến đóng góp/khiếu nại liên quan đến chất lượng sản phẩm, Quý Khách hàng vui lòng liên hệ đường dây chăm sóc khách hàng của chúng tôi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
