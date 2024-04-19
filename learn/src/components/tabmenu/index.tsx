import React from "react";
import cx from "./cx";
import TabMenu1 from "./1_";
import TabMenu2 from "./2_";
import Tabmenu3 from "./3_";

export default function TabMenu() {
  return (
    <div className={cx("TabMenus")}>
      <h2>탭 메뉴</h2>
      <TabMenu1 />
      <TabMenu2 />
      <Tabmenu3 />
    </div>
  );
}
