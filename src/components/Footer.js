import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <div>
      <QrBtnDiv>
        <QrBtn>관리자 문의하기</QrBtn>
      </QrBtnDiv>
      <KikiiInfo>
        <KikiIInfoP>
          Tel. 070-7330-1091 | Fax. 031-445-8304 | contact@kikii.com
        </KikiIInfoP>
        <KikiIInfoP>
          | Addr. Seoul, Korea ㅣ Biz License 452-86-01733{' '}
        </KikiIInfoP>
      </KikiiInfo>
    </div>
  );
};

const QrBtnDiv = styled.div`
  text-align: center;
  margin: 80px;
`;
const QrBtn = styled.button`
  min-width: 100px;
  min-height: 30px;
  border-style: solid;
  border-width: 1.5px;
  border-color: #c0c0c0;
  border-radius: 0.8rem;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  color: black;
  &:hover {
    background-color: rgb(173, 170, 170);
  }
`;

const KikiiInfo = styled.div`
  margin-left: 20px;
`;

const KikiIInfoP = styled.p`
  margin: 5px;
`;

export default Footer;
