import { pickRandom, randomize, waitFor } from "@/service/utils";
import { useState } from "react";
import data from "../data";

export type Data = {
  index: number;
  id: string;
  title: string;
  description: string;
};

export type FetchState<T> = {
  data: T[][];

  state: "idle" | "loading" | "fetched" | "error";
};

const getRandomData = async () => {
  await waitFor(randomize({ min: 300, max: 1500, step: 50 }));
  return pickRandom<Data>({ data: data, length: 20 });
};

export default function useInfiniteFetcher() {
  const [state, setState] = useState<FetchState<Data>>({
    data: [],
    state: "idle",
  });

  const fetchNextPage = async () => {
    setState((prev) => ({
      ...prev,
      state: "loading",
    }));

    const newData = await getRandomData();

    setState((prev) => {
      return {
        data: [...(prev.data || []), newData],
        state: "fetched",
      };
    });
  };
  return {
    ...state,
    fetchNextPage,
  };
}
