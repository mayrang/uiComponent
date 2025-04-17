// routes가 원 뎁스가 아니라 중첩될 수 있음 이럴 때 먼저 배열을 생각해 볼 수 있음
// key와 link가 들어오고 하위 뎁스가 있다면 children이 들어오고, 아니면 component
// 근데 이렇게 했을 때 문제점은 렌더링은 문제가 없는데 이 페이지에 접근할 때 배열에서 찾고
// 그 안에 배열에서 찾고 해야함 배열은 결국 찾는데에서 비용이 너무 많이 듬
// const routes = [
//   {
//     key: "accordion",
//     link: "/accordion",
//     children: [
//       {
//         key: "accordion/react",
//         link: "/accordion/react",
//         Component: null,
//       },
//     ],
//   },
// ];

// 그래서 객체 방식 사용

// as const : const assertion 원래 상수가 아닌 것을 상수인 것으로 선언해주는 기능
/// 할당된 값 자체를 type으로 추론하는 (Literal Type) 좀 더 타입을 구체화 하고 싶을 때 약간 enum 처럼 사용하고 싶을 때
//  readonly ["/", "/test1`", "/test2", "/test2/vanilla", "/test2/react"]
const routePaths = [
  "/",
  "/test1",
  "/test2",
  "/test2/vanilla",
  "/test2/react",
] as const;
// readonly ["/", "/test1`", "/test2", "/test2/vanilla", "/test2/react"] 이것 중 하나의 타입으로 온다
// '/' | '/test1' ...
export type ROUTE_PATH = (typeof routePaths)[number];
type BaseRoute = {
  key: ROUTE_PATH;
  link: ROUTE_PATH;
  name: string;
};

export type ParentRoute = BaseRoute & {
  children: ROUTE_PATH[];
};
export type ChildRoute = BaseRoute & {
  children: ((props: unknown) => JSX.Element) | null;
};
export type ROUTE = ParentRoute | ChildRoute;

// Record<Key, value> 키가 key타입이고 값이 value타입인 객체 타입
// 처음에 바로 루트에 접근한다음에 children가지고 배열로 돌림
// 그 배열을 가지고 다시 접근
// 부모 배열에 접근했을 땐? link를 자식의 첫번째로 정함
// 이랬을 때 currentPath로 부모에 children 돌려서 open인지 체크하고, 자식은 바로 link 체크
export const routes: Record<ROUTE_PATH, ROUTE> = {
  "/": {
    key: "/",
    link: "/",
    name: "root",
    children: ["/test1", "/test2"],
  },
  "/test1": {
    key: "/test1",
    link: "/test1",
    name: "테스트1",
    children: null,
  },
  "/test2": {
    key: "/test2",
    link: "/test2/vanilla",
    name: "테스트1",
    children: ["/test2/vanilla", "/test2/react"],
  },
  "/test2/vanilla": {
    key: "/test2/vanilla",
    link: "/test2/vanilla",
    name: "Vanilla",
    children: null,
  },
  "/test2/react": {
    key: "/test2/react",
    link: "/test2/react",
    name: "react",
    children: null,
  },
};

// gnd 라우트에서 이게 자식라우트인지 부모라우트인지 판단할 수 있는 함수
// is -> 해당 함수의 return 값이 true이면 이 함수를 호출한 범위 내에서 결과 타입을 좁힘
// 여기서는 해당 반환 함수가 참이면 호출한 곳에서 route를 ParentRoute 타입으로 좁히게 됨 (이건 컴파일 단계에서만 사용됨)
// as -> 컴파일 단계에서 타입 검사를 할 때 타입스크립트가 감지하지 못하는 애매한 타입 요소들을 직접 명시
export const isParentRoute = (route: ROUTE): route is ParentRoute =>
  Array.isArray(route.children);

export const gnbRootList = (routes["/"] as ParentRoute).children.map(
  (r) => routes[r]
);
