import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  position: fixed;
  font-family:helvetica;
  top: 0;
  width: 100%;
  background: white;
  color: #840c84;
  z-index: 1000;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  padding: 20px 0;
`;

const NavRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const NavItemContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const NavItem = styled.div`
  cursor: pointer;
  color: #840c84;
  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5em;
`;

function Header() {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <HeaderContent>
        <NavRow>
        <Title>STRING MATCHING USING FINITE AUTOMATA</Title>
          <NavItemContainer>
            <NavItem onClick={() => navigate("/quiz/info")}>Read</NavItem>
            <NavItem onClick={() => navigate("/quiz")}>Quiz</NavItem>
            <NavItem onClick={() => navigate("/home")}>Simulator</NavItem>
            <NavItem onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLScUiG86jf1ArzzLIJGIGGeweWhZAmofmZ_VmxajtjhX4xtLDQ/viewform", "_blank")}>Feedback</NavItem>
          </NavItemContainer>
          
        </NavRow>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;
