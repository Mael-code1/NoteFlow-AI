import React, { useRef, useEffect, useState } from "react";

interface Node {
  id: number;
  x: number;
  y: number;
}

interface Edge {
  from: Node;
  to: Node;
}

const GraphCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [isConnecting, setIsConnecting] = useState<Node | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    nodes.forEach(node => {
      context.fillStyle = "blue";
      context.beginPath();
      context.arc(node.x, node.y, 10, 0, 2 * Math.PI);
      context.fill();
      context.fillText(`N${node.id}`, node.x - 15, node.y - 15);
    });

    edges.forEach(edge => {
      context.strokeStyle = "black";
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(edge.from.x, edge.from.y);
      context.lineTo(edge.to.x, edge.to.y);
      context.stroke();
    });
  }, [nodes, edges]);

  const handleCanvasClick = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isConnecting) {
      const targetNode = findNodeAtPosition(x, y);

      if (targetNode && targetNode !== isConnecting) {
        setEdges([...edges, { from: isConnecting, to: targetNode }]);
      }
      setIsConnecting(null);
    } else {
      const clickedNode = findNodeAtPosition(x, y);
      if (clickedNode) {
        setIsConnecting(clickedNode);
      } else {
        const newNode = { id: nodes.length + 1, x, y };
        setNodes([...nodes, newNode]);
      }
    }
  };

  const findNodeAtPosition = (x: number, y: number): Node | null => {
    return nodes.find(node => Math.hypot(node.x - x, node.y - y) < 10) || null;
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        style={{ border: "1px solid white" }}
        onClick={handleCanvasClick}
        className="bg-white"
      />
      {isConnecting && (
        <p>
          Conectando desde el nodo {isConnecting.id}, haz clic en otro nodo para
          conectar.
        </p>
      )}
    </div>
  );
};

export default GraphCanvas;
