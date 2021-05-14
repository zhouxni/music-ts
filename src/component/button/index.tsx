import styled from "styled-components";
import px2rem from "../../util/px2rem";
const Button = styled.button<{ fontColor?: string; color?: string }>`
  width: 100%;
  height: ${px2rem(40)};
  border-radius: ${px2rem(4)};
  margin-bottom: ${px2rem(15)};
  border: none;
  outline: none;
  font-size: ${px2rem(14)};
  background: ${(props) => props.color || "inherit"};
  color: ${(props) => props.fontColor || "inherit"};
  position: relative;
  overflow: hidden;
  &:active::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
  }
`;
export default Button;
