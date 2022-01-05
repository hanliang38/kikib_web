import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <div>
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

const KikiiInfo = styled.div`
  margin-left: 20px;
`;

const KikiIInfoP = styled.p`
  margin: 5px;
`;

export default Footer;
