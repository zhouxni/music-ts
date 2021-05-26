import React, { memo, useState } from "react";
import { Tabs } from "antd-mobile";
import Recomm from "./component/recomm";
import Transceiver from "./component/transceiver";
import Search from "../home/search";
import { useHistory } from "react-router-dom";
import px2rem from "@/util/px2rem";
function MusicLib() {
  const [tabIndex, setTabIndex] = useState(0);
  const tabs = [{ title: "推荐" }, { title: "电台" }];
  const history = useHistory();
  return (
    <>
      {/* <Tabs
        tabBarBackgroundColor="#ffdf20"
        tabBarUnderlineStyle={{ display:'none' }}
        tabBarTextStyle={{ color: "#76670d" }}
        tabBarActiveTextColor="#000"
        tabs={tabs}
        onChange={(tab, index) => {
          setTabIndex(index);
        }}
      >
        {tabIndex === 0 && <Recomm />}
        {tabIndex === 1 && <Transceiver />}
      </Tabs> */}
      <Search onClick={() => history.push("/search")} />
      <div style={{ height: `calc(100% - ${px2rem(50)})`, overflow: "auto" }}>
        <Recomm />
      </div>
    </>
  );
}
export default memo(MusicLib);
