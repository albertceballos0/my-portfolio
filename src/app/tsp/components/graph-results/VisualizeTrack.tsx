import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import {useNode} from '../../hooks/useNode'
import { convertPathToGraph, Link, Node } from '../../utils/convertPathToGraph'
import { useGraphState } from '@/store/useGraphStore'
import { useParseResultData } from '../../hooks/useParseResultData'


const ForceGraph2D = dynamic(
  () => import('react-force-graph').then((mod) => mod.ForceGraph2D),
  { 
    ssr: true,
    loading: () => (
      <div className="flex justify-center items-center " style={{height: 400}}>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }
)

interface VisualizeTrackInterface {
  path: string[];
  edge: number | null;
}


const VisualizeTrack = ({path, edge} : VisualizeTrackInterface) => {
  const { getNodeColor } = useNode(false)
  const [links, setlinks] = useState<Link[]>();
  const [nodes, setNodes] = useState<Node[]>();
  const [loading, setLoading] = useState(false);
  const { graph, result } = useGraphState();
 
  const { parseResult} = useParseResultData();

  useEffect(() => {

        setLoading(true);

        if (!graph || !result) return;
        
        const path = parseResult().path;
        const res = convertPathToGraph(graph, path);

        if (!res?.links && !res?.nodes) return;

        setNodes(res.nodes);
        setlinks(res.links);
        setLoading(false);

  },[])


  return (
    <>
      { loading && <Loader2 className="h-8 w-8 animate-spin text-primary" />} 
      {!loading &&
      <ForceGraph2D
      graphData={{ nodes: nodes || [], links: links || [] }}
      nodeLabel="id"
      linkLabel="value"
      linkDirectionalArrowLength={6}
      linkDirectionalArrowRelPos={1}
      linkColor={(link) => {
        const index = path.findIndex((nodeId) => nodeId === (typeof link.source === 'object' && 'id' in link.source ? link.source.id : link.source));
        if (index === edge && path[index + 1] === (typeof link.target === 'object' && 'id' in link.target ? link.target.id : link.target)) {
          return 'red'; // Highlight the link with red color
        }
        return 'gray'; // Default color
      }}
      nodeColor={(node) => getNodeColor({ id: String(node.id) })}
      nodeCanvasObject={(node, ctx, globalScale) => {
      const label = nodes?.find((nodeItem) => nodeItem.id === node.id)?.label.join(', ') || '';
      const fontSize = 10 / globalScale;
      ctx.font = `${fontSize}px Sans-Serif`;
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      if (node.x && node.y) {
      ctx.fillText(label, node.x, node.y + 10);
      }

      // Draw a colored circle around the node
      ctx.beginPath();
      ctx.arc(node.x ?? 0, node.y ?? 0, 5, 0, 2 * Math.PI, false);
      ctx.fillStyle = getNodeColor({ id: String(node.id) });
      ctx.fill();
      }}
      height={550}
      /> }
      </>
  )
}

export default VisualizeTrack
