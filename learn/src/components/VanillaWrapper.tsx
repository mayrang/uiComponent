import React, { useEffect, useRef } from "react";

export default function VanillaWrapper({ initiator }: { initiator: (wrapper: HTMLDivElement) => void }) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const initRef = useRef(false);

  useEffect(() => {
    if (divRef?.current && !initRef?.current) {
      initiator(divRef.current);
      initRef.current = true;
    }
  }, [initiator]);
  return <div ref={divRef} />;
}
