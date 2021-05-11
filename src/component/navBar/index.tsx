import React from "react";
import styled from "styled-components";
import px2rem from "../../util/px2rem";
import { Icon } from "antd-mobile";
import { useHistory } from "react-router-dom";
const Nav = styled.div`
  width: 100%;
  height: ${px2rem(45)};
  background-color: #fce024;
  font-size: ${px2rem(16)};
  text-align: center;
  line-height: ${px2rem(45)};
  position: relative;
`;
const IconWrap = styled.div`
  position: absolute;
  top: 50%;
  left: ${px2rem(10)};
  transform: translateY(-50%);
  line-height: 0;
`;
function NavBar(props: { title: string; back: boolean }) {
  const { title, back } = props;
  const history = useHistory();
  return (
    <Nav>
      {back === false ? (
        <></>
      ) : (
        <IconWrap onClick={() => history.goBack()}>
          <Icon type="left" />
        </IconWrap>
      )}
      {title}
    </Nav>
  );
}

export default NavBar;
