"use client";
import React, { useState } from "react";

export default function react() {
  const [show, toggle] = useState(false);
  return (
    <div>
      테스트 2 - react
      <button onClick={() => toggle((p) => !p)}>토글</button>
      <p>{show ? "켜짐" : "꺼짐"}</p>
    </div>
  );
}
