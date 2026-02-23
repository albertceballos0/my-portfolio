'use client';

import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import React, { useMemo, useState, useEffect } from 'react'
import { useNode } from '../../hooks/useNode'
import { convertPathToGraph } from '../../utils/convertPathToGraph'
import { useGraphState } from '@/store/useGraphStore'
import { useParseResultData } from '../../hooks/useParseResultData'

const ForceGraph2D = dynamic(
  () => import('../Graph2DWrapper'),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center" style={{ height: 550 }}>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }
)

interface VisualizeTrackInterface {
  path: string[];
  edge: number | null;
}

const VisualizeTrack = ({ path, edge }: VisualizeTrackInterface) => {
  const { getNodeColor } = useNode(false)
  const [isMounted, setIsMounted] = useState(false);

  const { graph, result } = useGraphState();
  const { parseResult } = useParseResultData();

  // Garantizamos que solo se ejecute en el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // CALCULAMOS LOS DATOS AQUÍ (Sin useEffect + setState)
  // Esto evita el bucle infinito porque useMemo devuelve el mismo resultado
  // a menos que graph o result cambien realmente.
  const graphData = useMemo(() => {
    if (!graph || !result || !isMounted) return { nodes: [], links: [] };

    try {
      // Obtenemos el path parseado
      const data = parseResult();
      // Convertimos a formato de grafo
      const res = convertPathToGraph(graph, data.path);

      return {
        nodes: res?.nodes || [],
        links: res?.links || []
      };
    } catch (error) {
      console.error("Error parsing graph data:", error);
      return { nodes: [], links: [] };
    }
  }, [graph, result, isMounted, parseResult]); // parseResult debería estar envuelto en useCallback en su hook

  if (!isMounted) {
    return (
      <div className="flex justify-center items-center w-full" style={{ height: 550 }}>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full border rounded-lg bg-white overflow-hidden">
      <ForceGraph2D
        graphData={graphData}
        nodeLabel="id"
        linkLabel="value"
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        linkColor={(link: any) => {
          const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
          const targetId = typeof link.target === 'object' ? link.target.id : link.target;

          const index = path.findIndex((nodeId) => nodeId === sourceId);
          // Resaltar en rojo el tramo actual del backtracking
          if (index === edge && path[index + 1] === targetId) {
            return '#ef4444'; // Rojo fuerte
          }
          return '#9ca3af'; // Gris
        }}
        nodeColor={(node: any) => getNodeColor({ id: String(node.id) })}
        nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
          const nodeItem = graphData.nodes.find((n: any) => n.id === node.id);
          const label = nodeItem?.label ? nodeItem.label.join(', ') : '';
          const fontSize = 12 / globalScale;

          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = '#374151';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          if (node.x !== undefined && node.y !== undefined) {
            ctx.fillText(label, node.x, node.y + 12);

            ctx.beginPath();
            ctx.arc(node.x, node.y, 5 / globalScale + 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = getNodeColor({ id: String(node.id) });
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1 / globalScale;
            ctx.stroke();
          }
        }}
        height={550}
      />
    </div>
  )
}

export default VisualizeTrack;