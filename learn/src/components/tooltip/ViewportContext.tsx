import React, { createContext, useContext, useSyncExternalStore } from "react";

type Rect = Pick<DOMRect, "top" | "left" | "width" | "height"> & { scrollHeight: number };

const defaultRect: Rect = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  scrollHeight: 0,
};

const rectKeys: (keyof Rect)[] = ["top", "left", "width", "height", "scrollHeight"];

const isSameRect = (prev: Rect, next: Rect) => {
  return rectKeys.every((item) => prev[item] === next[item]);
};

const getViewportRect = () => {
  let stored: Rect = defaultRect;
  return () => {
    const elem = typeof document !== "undefined" && document.scrollingElement;
    if (!elem) return stored;

    const { top, left, height, width } = elem.getBoundingClientRect();
    const newRect = { left, top, width, height, scrollHeight: elem.scrollHeight };
    if (newRect && !isSameRect(stored, newRect)) stored = newRect;
    return stored;
  };
};

const subscribe = (callback: () => void) => {
  const resizeObserver = new ResizeObserver(callback);
  resizeObserver.observe(document.body);
  window.addEventListener("scroll", callback);
  return () => {
    window.removeEventListener("scroll", callback);
    resizeObserver.disconnect();
  };
};

const viewportContext = createContext<Rect>(defaultRect);

export default function ViewportContextProvider({ children }: { children: React.ReactNode }) {
  const viewport = useSyncExternalStore(subscribe, getViewportRect());
  return <viewportContext.Provider value={viewport}>{children}</viewportContext.Provider>;
}

export const useViewportRect = () => useContext(viewportContext);

// 1. React의 상태 관리 한계

// React는 내부 상태(useState)나 컴포넌트 간의 props로 상태를 전달하고 관리하는 데에 강력한 도구입니다. 하지만, 전역 상태를 여러 컴포넌트에서 공유해야 할 때는 이런 기본 기능으로 해결하기 어려운 상황이 생깁니다.

// 예를 들어, Redux나 Zustand 같은 외부 상태 관리 도구를 사용하면 하나의 전역 상태를 여러 컴포넌트가 구독하게 됩니다. 여기서 중요한 문제는 **“상태가 변경될 때 React가 제대로 알고 컴포넌트를 다시 렌더링할 수 있느냐”**입니다.
// 	•	React는 자체적인 상태 관리는 잘하지만, 외부에서 관리하는 상태에 대해 완벽히 동기화된 반응을 보장하기는 어렵습니다.
// 	•	useEffect를 사용해 상태 변화를 감지하는 방법은 있지만, 이 방식은 비동기적이어서 즉각적인 렌더링 타이밍을 보장하지 못할 수 있습니다.

// 2. 외부 상태와 React 렌더링 간의 일관성 문제

// 외부 상태(예: 전역 상태)를 React 컴포넌트에서 사용하면 렌더링 타이밍이 일관되지 않을 수 있습니다. 예를 들어:
// 	1.	상태가 바뀌었지만 React가 그 변화를 즉시 감지하지 못해서 컴포넌트가 오래된 상태를 보여주거나,
// 	2.	상태가 변하는 동안 여러 컴포넌트가 불필요하게 여러 번 다시 렌더링될 수 있습니다.

// 이런 문제를 해결하려면 React와 외부 상태 관리 시스템 간에 동기적인 동작을 보장해야 하는데, 이를 위해 useSyncExternalStore가 도입되었습니다.

// 3. 상태 구독과 업데이트가 정확해야 하는 이유

// useSyncExternalStore는 상태의 변경을 구독하고, 그 상태가 변했을 때 즉시 컴포넌트를 업데이트해줍니다. 여기서 구독(subscription)이란 컴포넌트가 “저 상태가 바뀌면 나한테 알려줘”라고 하는 과정입니다. 상태가 변경되면 그 변화를 감지해서 컴포넌트가 최신 상태를 반영하도록 해주는 것이 핵심입니다.

// 동작 흐름을 간단히 설명하면:

// 	1.	구독: 컴포넌트가 useSyncExternalStore를 통해 외부 스토어에 구독합니다. 구독한 컴포넌트는 외부 상태가 변할 때마다 이를 감지합니다.
// 	2.	상태 변경: 외부 상태가 변경되면, 구독한 컴포넌트가 즉시 다시 렌더링되어 최신 상태를 반영합니다.
// 	3.	동기적 업데이트: 컴포넌트가 다시 렌더링될 때, 외부 스토어에서 변경된 상태를 즉시 가져옵니다. 이 과정이 동기적으로 처리되어, React 컴포넌트는 항상 최신 상태를 바로 렌더링합니다.

// 예시를 들어서 더 구체적으로 보자면:

// 가령 전역 상태로 사용자 프로필 데이터를 관리한다고 할 때, 사용자가 로그인하면 그에 맞는 사용자 정보가 전역 상태에 저장됩니다. 하지만 이 상태가 변경되었다고 해서 React가 자동으로 알고 컴포넌트를 다시 렌더링해주지는 않습니다. 여기서 useSyncExternalStore를 사용하면, 전역 상태가 바뀌는 즉시 React가 알아차리고 컴포넌트에 최신 상태를 바로 반영할 수 있게 됩니다.

// 4. 서버 사이드 렌더링(SSR)과 클라이언트 상태 동기화

// React 18부터 도입된 서버 사이드 렌더링(SSR)과 클라이언트에서의 상태 일관성을 맞추는 데도 중요한 역할을 합니다.

// 예를 들어:

// 	•	서버에서 렌더링된 페이지가 클라이언트로 전달된 후, 클라이언트에서 다시 상태를 받아와야 할 때, 서버와 클라이언트 상태가 일관되지 않으면 화면이 깜빡이거나 비정상적으로 렌더링될 수 있습니다.
// 	•	useSyncExternalStore는 서버에서의 상태와 클라이언트의 상태가 정확히 동기화되도록 도와서, 이런 문제를 방지합니다.

// 요약

// 	•	왜 필요한가?
// 	•	외부 상태를 React와 동기적으로 연결하기 위해 필요합니다.
// 	•	서버와 클라이언트 간의 상태 일관성을 유지하기 위해 중요합니다.
// 	•	컴포넌트가 항상 최신 상태를 반영하도록 보장합니다.
// 	•	언제 사용하나?
// 	•	Redux, Zustand와 같은 전역 상태 관리 라이브러리에서 사용됩니다.
// 	•	서버 사이드 렌더링(SSR) 환경에서도 상태 동기화를 위해 사용됩니다.

// useSyncExternalStore의 첫 번째 인자와 두 번째 인자는 각각 구독 함수와 스냅샷 함수입니다. 이 두 가지가 핵심적인 역할을 맡고 있으며, 외부 상태의 변경을 감지하고 그 상태를 컴포넌트에서 렌더링하는 데 필수적입니다. 하나씩 설명해 볼게요.

// 1. 첫 번째 인자: subscribe (구독 함수)

// 첫 번째 인자는 상태 변화에 구독하는 함수입니다. 이 함수는 컴포넌트가 외부 상태(스토어)의 변경을 감지할 수 있게 해 줍니다. 구독한다는 것은 상태가 바뀔 때마다 알림을 받겠다는 의미입니다.

// 역할:

// 	•	외부 상태가 변할 때, 구독 함수가 React에게 상태가 변했다고 신호를 보내 다시 렌더링을 트리거합니다.
// 	•	구독 함수는 주로 스토어에서 제공하는 subscribe 기능을 이용해 상태가 변할 때 콜백을 호출하도록 설정합니다.

// 구독 함수의 기본 구조:

// (callback) => {
//   const unsubscribe = store.subscribe(callback);
//   return unsubscribe; // 나중에 구독 해제할 때 호출되는 함수
// }

// 	•	이 함수는 외부 스토어에서 상태가 변경될 때 **callback**을 호출해 React에게 알립니다.
// 	•	또한, 함수가 반환하는 값은 구독을 해제하는 함수입니다. 이 해제 함수는 컴포넌트가 언마운트될 때 호출되어 메모리 누수를 방지합니다.

// 예시:

// const subscribe = (callback) => {
//   const unsubscribe = store.subscribe(callback);
//   return unsubscribe; // 구독 해제 함수 반환
// };

// 	•	store.subscribe(callback)는 상태가 변할 때마다 callback을 실행하게 하고, 나중에 구독을 해제할 때 unsubscribe()를 호출해 구독을 종료합니다.

// 2. 두 번째 인자: getSnapshot (스냅샷 함수)

// 두 번째 인자는 스냅샷 함수로, 외부 스토어의 **현재 상태(스냅샷)**를 즉시 반환합니다. 이 함수는 외부 상태가 바뀔 때마다 최신 상태를 가져와 컴포넌트에서 바로 렌더링하는 데 사용됩니다.

// 역할:

// 	•	외부 스토어의 현재 상태를 반환합니다.
// 	•	컴포넌트가 렌더링될 때마다 React는 이 함수를 호출해 최신 상태를 가져옵니다.
// 	•	상태가 변경될 때 구독 함수로부터 신호를 받으면, React는 이 스냅샷 함수로 상태를 다시 읽고 렌더링을 합니다.

// 스냅샷 함수의 기본 구조:

// () => store.getValue();

// 	•	이 함수는 단순히 스토어에서 현재 상태를 반환합니다. 스토어에 저장된 데이터를 바로 읽어와야 하므로 매우 단순합니다.

// 예시:

// const getSnapshot = () => store.getValue();

// 	•	store.getValue()는 현재 스토어에 저장된 값을 즉시 반환합니다. React가 이 값을 읽어 컴포넌트에서 렌더링하는 데 사용합니다.

// 예시로 설명

// function useStore() {
//   return useSyncExternalStore(
//     // 첫 번째 인자: 상태 변화를 구독하는 함수
//     (callback) => store.subscribe(callback),
//     // 두 번째 인자: 현재 상태(스냅샷)를 반환하는 함수
//     () => store.getValue()
//   );
// }

// 	•	첫 번째 인자 store.subscribe(callback)는 상태가 변경되면 callback을 호출하여 React에게 “다시 렌더링해!“라는 신호를 줍니다.
// 	•	두 번째 인자 store.getValue()는 현재 상태를 반환하여 컴포넌트가 최신 상태를 화면에 렌더링할 수 있도록 합니다.

// 요약

// 	•	첫 번째 인자: 상태 변경을 구독하는 함수. 상태가 변경되면 콜백을 호출해 React가 변경을 감지하도록 합니다.
// 	•	두 번째 인자: 외부 스토어의 현재 상태를 반환하는 함수. React가 이 값을 사용해 최신 상태를 렌더링합니다.

// 이 두 가지 인자를 통해 useSyncExternalStore는 외부 상태의 변화를 감지하고 동기적으로 최신 상태를 렌더링할 수 있게 합니다.
