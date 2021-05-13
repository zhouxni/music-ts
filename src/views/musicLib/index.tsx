import React, { memo, useState } from "react";
import { Tabs } from "antd-mobile";
import Recomm from "./component/recomm";
import Transceiver from "./component/transceiver";
function MusicLib() {
  const [tabIndex, setTabIndex] = useState(0);
  const tabs = [{ title: "推荐" }, { title: "电台" }];
  return (
    <>
      <Tabs
        tabBarBackgroundColor="#ffdf20"
        tabBarUnderlineStyle={{ border: "1px solid #000" }}
        tabBarTextStyle={{ color: "#76670d" }}
        tabBarActiveTextColor="#000"
        tabs={tabs}
        onChange={(tab, index) => {
          setTabIndex(index);
        }}
      >
        {tabIndex === 0 && <Recomm />}
        {tabIndex === 1 && <Transceiver />}
      </Tabs>
    </>
  );
}
export default memo(MusicLib);
