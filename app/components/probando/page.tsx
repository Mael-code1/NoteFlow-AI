import { useState } from "react";

export default function GraphCanvas2() {
  const [nodo, serNodo] = useState("");

  return (
    <div>
      <canvas
        width={600}
        height={400}
        className="border px-1 border-white rounded-xl bg-orange-400"
      ></canvas>
    </div>
  );
}
