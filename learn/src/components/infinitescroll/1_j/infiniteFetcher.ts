import { pickRandom, randomize, waitFor } from "@/service/utils";
import { useState } from "react";
import data from "../data";

export type Data = {
  index: number;
  id: string;
  title: string;
  description: string;
};

export type State = "idle" | "loading" | "fetched" | "error";

export type FetchState<T> = {
  data: T[][];

  state: State;
};

const getRandomData = async () => {
  await waitFor(randomize({ min: 300, max: 1500, step: 50 }));
  return pickRandom<Data>({ data: data, length: 20 });
};

export default async function infiniteFetcher(callback: (state: State, data?: Data[]) => void) {
  callback("loading");
  const nextData = await getRandomData();
  callback("fetched", nextData);
}
