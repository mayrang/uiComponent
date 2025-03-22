import Markdown from "react-markdown";
import README from "/README.md";

const MainPage = () => (
  <div className="markdown">
    <div  ></div>
    <Markdown>{README}</Markdown> 
  </div>
);

export default MainPage;
