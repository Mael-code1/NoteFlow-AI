"use client";
import React from "react";
import {GraphCanvas} from "../components/canvas/canvas";

export default function page() {
  return (
    <div className=" flex flex-row justify-center items-center">
      {" "}
      <GraphCanvas />{" "}
    </div>
  );
}
