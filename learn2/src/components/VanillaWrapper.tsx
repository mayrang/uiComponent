import { useEffect, useRef } from "react";

const VanillaWrapper = ({ initiator }: { initiator: (wrapper: HTMLDivElement) => void }) => {
  const wrapper = useRef<HTMLDivElement>(null);
  const isInit = useRef(false);

  // 처음 한번만 실행되도록 useRef 넣어주고 wrapper(div)를 이니시에이터 함수 인자로 넣어서
  // 바닐라 자스 실행
  useEffect(() => {
    if (!isInit.current && !!wrapper.current) {
      isInit.current = true;
      initiator(wrapper.current);
    }
  }, [initiator]);

  return <div ref={wrapper} />;
};

export default VanillaWrapper;
