import React from "react";
import styled from "styled-components";
import px2rem from "../../util/px2rem";
const Nav = styled.div`
  width: 100%;
  height: ${px2rem(45)};
  background-color: #fce024;
  font-size: ${px2rem(16)};
  text-align: center;
  line-height: ${px2rem(45)};
`;
function NavBar(props: { title: string }) {
  const { title } = props;
  return <Nav>{title}</Nav>;
}

export default NavBar;
