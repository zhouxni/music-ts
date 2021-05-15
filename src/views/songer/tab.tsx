import React, { memo } from "react";
import styled from "styled-components";
import px2rem from "@/util/px2rem";
const Wrap = styled.div`
  padding: ${px2rem(15)} ${px2rem(15)} 0;
  white-space: nowrap;
  overflow: auto;
  ::-webkit-scrollbar {
    height: 0;
  }
`;
const ListItem = styled.div`
  padding: ${px2rem(8)} ${px2rem(20)};
  border-radius: ${px2rem(15)};
  display: inline-block;
  &:not(:last-of-type) {
    margin-right: ${px2rem(15)};
  }
`;
function Tab(props: { list: any[]; onSelect?: Function; active: number }) {
  const { list, onSelect, active } = props;
  return (
    <Wrap>
      {list.map((item, index) => {
        return (
          <ListItem
            onClick={() => {
              onSelect ? onSelect(item.id) : (() => {})();
            }}
            key={index}
            style={{
              backgroundColor: active === item.id ? "#ffde27" : "#f7f7f7",
            }}
          >
            {item.name}
          </ListItem>
        );
      })}
    </Wrap>
  );
}
export default memo(Tab);
