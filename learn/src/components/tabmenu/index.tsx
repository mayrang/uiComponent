import React from "react";
import cx from "./cx";
import TabMenu1 from "./1_";
import TabMenu2 from "./2_";

export default function TabMenu() {
  return (
    <div className={cx("TabMenus")}>
      <h2>탭 메뉴</h2>
      <TabMenu1 />
      <TabMenu2 />
    </div>
  );
}
