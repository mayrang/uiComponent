import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

const SingleOpenContext = createContext<[string | null, Dispatch<SetStateAction<string | null>>]>([null, () => {}]);

export default function SingleOpenContextProvider({ children }: { children: ReactNode }) {
  const value = useState<string | null>(null);

  return <SingleOpenContext.Provider value={value}>{children}</SingleOpenContext.Provider>;
}

export const useSingleOpen = (id: string | null) => {
  const [currentId, setCurrentId] = useContext(SingleOpenContext);

  return [currentId === id, setCurrentId] as const;
};
