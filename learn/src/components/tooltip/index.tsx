import Tooltip1 from "./1_";
import Tooltip2 from "./2_";
import Tooltip3 from "./3_";
import Tooltip4 from "./4_";
import { cx } from "./cx";

export default function Tooltips() {
  return (
    <div className={cx("Tooltips")}>
      <h1>Tooltip</h1>
      <Tooltip1 />
      <Tooltip2 />
      <Tooltip3 />
      <Tooltip4 />
    </div>
  );
}
