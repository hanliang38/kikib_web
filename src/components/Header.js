import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
// import kikiBLogo from '../assets/Drawables/logo_kikibsplash.png';
// import { GiHamburgerMenu } from 'react-icons/gi';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

// let currentPage = document.location.href.split('/').reverse()[0];
// let pages = { main: '메인페이지', schedule: '일정표', manage: '일정관리' };
// let pageTitle = () => {
//   currentPage.map((pagetitle) => {});
// };

function Header() {
  const navigate = useNavigate();

  return (
    <>
      <nav>
        <GlobalStyle />
        <NavbarContainer>
          <BiArrowBack fontSize="35px" onClick={() => navigate(-1)} />
          {/* <GiHamburgerMenu fontSize="100px" /> */}
        </NavbarContainer>
      </nav>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
body{
  margin: 0;
  padding: 0;
}
`;

const NavbarContainer = styled.ul`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: white;
  list-style-type: none;
  position: fixed;
  top: 0;
  border: 3px
  border-color: grey;
`;
// const Logo = styled.div`
//   src: url(${kikiBLogo});
// `;
// const Title = styled.h1`
//   font-size: 50px;
//   text-aline: center;
//   text-decoration: none;
//   color: black;
//   font-style: bold;
// `;

export default Header;
