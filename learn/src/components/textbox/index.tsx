import Textbox1 from "./1_";
import Textbox2 from "./2_";
import Textbox3 from "./3_";
import Textbox4 from "./4_";
import { cx } from "./cx";

export default function TextBox() {
  return (
    <>
      <h2>텍스트 박스</h2>
      <div className={cx("Textbox")}>
        <Textbox1 />
        <Textbox2 />
        <Textbox3 />
        <Textbox4 />
      </div>
    </>
  );
}
