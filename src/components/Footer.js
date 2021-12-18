import React from 'react';
import '../css/Footer.css';

const Footer = () => {
  return (
    <div>
      <div className="qr-btn">
        <button className="inqury">관리자 문의하기</button>
      </div>
      <div className="kikii-info">
        <p>Tel. 070-7330-1091 | Fax. 031-445-8304 | contact@kikii.com</p>
        <p>| Addr. Seoul, Korea ㅣ Biz License 452-86-01733 </p>
      </div>
    </div>
  );
};

export default Footer;
