'use client';

import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { useNode } from '../../hooks/useNode'
import { convertPathToGraph, Link, Node } from '../../utils/convertPathToGraph'
import { useGraphState } from '@/store/useGraphStore'
import { useParseResultData } from '../../hooks/useParseResultData'

// IMPORTANTE: Usamos el mismo Wrapper que creamos para el otro componente
// Si no creaste el archivo Graph2DWrapper.tsx, hazlo importando 'react-force-graph-2d'
const ForceGraph2D = dynamic(
  () => import('../Graph2DWrapper'),
  {
    ssr: false, // DEBE ser false
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
  const [links, setlinks] = useState<Link[]>();
  const [nodes, setNodes] = useState<Node[]>();
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Flag de montaje

  const { graph, result } = useGraphState();
  const { parseResult } = useParseResultData();

  useEffect(() => {
    setIsMounted(true); // Confirmamos que estamos en el cliente
    setLoading(true);

    if (!graph || !result) {
      setLoading(false);
      return;
    }

    const parsedPath = parseResult().path;
    const res = convertPathToGraph(graph, parsedPath);

    if (res?.links || res?.nodes) {
      setNodes(res.nodes);
      setlinks(res.links);
    }
    setLoading(false);
  }, [graph, result, parseResult]); // Añadidas dependencias necesarias

  // Si no estamos montados o está cargando, mostramos el loader
  if (!isMounted || loading) {
    return (
      <div className="flex justify-center items-center w-full" style={{ height: 550 }}>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <ForceGraph2D
        graphData={{ nodes: nodes || [], links: links || [] }}
        nodeLabel="id"
        linkLabel="value"
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        linkColor={(link: any) => {
          const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
          const targetId = typeof link.target === 'object' ? link.target.id : link.target;

          const index = path.findIndex((nodeId) => nodeId === sourceId);
          if (index === edge && path[index + 1] === targetId) {
            return 'red';
          }
          return 'gray';
        }}
        nodeColor={(node: any) => getNodeColor({ id: String(node.id) })}
        nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
          const nodeItem = nodes?.find((n) => n.id === node.id);
          const label = nodeItem?.label ? nodeItem.label.join(', ') : '';
          const fontSize = 12 / globalScale;

          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = 'black';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          if (node.x !== undefined && node.y !== undefined) {
            ctx.fillText(label, node.x, node.y + 12);

            // Dibujar el círculo del nodo
            ctx.beginPath();
            ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
            ctx.fillStyle = getNodeColor({ id: String(node.id) });
            ctx.fill();
          }
        }}
        height={550}
      />
    </div>
  )
}

export default VisualizeTrack;