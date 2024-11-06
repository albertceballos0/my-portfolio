import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import {useNode} from '../../hooks/useNode'
import { Card, CardHeader, CardTitle} from '@/components/ui/card'
import { useConvertPathToGraph, Link, Node } from '../../hooks/useConvertPathToGraph'


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


const VisualizeTrack = () => {
  const { getNodeColor } = useNode(false)
  const [links, setlinks] = useState<Link[]>();
  const [nodes, setNodes] = useState<Node[]>();
  const [loading, setLoading] = useState(false);


  const { convertPathToGraph} = useConvertPathToGraph();
 
  useEffect(() => {
        setLoading(true);
        const res = convertPathToGraph();
        if (!res?.links && !res?.nodes) return;
        setNodes(res.nodes);
        setlinks(res.links);

        setTimeout(() => setLoading(false), 1000)

  },[])


  return (
    <Card>
        <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <span className="text-gray-700">Track Visualizations</span>
        </CardTitle>
        </CardHeader>
        <div className="flex justify-center items-center overflow-hidden border-t border-gray-200" style={{height:400}}>
            { loading && <Loader2 className="h-8 w-8 animate-spin text-primary" />} 
            {!loading &&
            <ForceGraph2D
            graphData={{ nodes: nodes || [], links: links || [] }}
            nodeLabel="id"
            linkLabel="value"
            linkDirectionalArrowLength={8}
            linkDirectionalArrowRelPos={1}
            linkCurvature={0.20}
            linkColor={() => 'orange'}
            nodeColor={(node) => getNodeColor({ id: String(node.id) })}
            nodeCanvasObject={(node, ctx, globalScale) => {
            const label = nodes?.find((nodeItem) => nodeItem.id === node.id)?.label.join(', ') || '';
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            if (node.x && node.y) {
                ctx.fillText(label, node.x, node.y + 10);
                ctx.fillText(String(node.id), node.x, node.y + 20);
            }

            // Draw a colored circle around the node
            ctx.beginPath();
            ctx.arc(node.x ?? 0, node.y ?? 0, 5, 0, 2 * Math.PI, false);
            ctx.fillStyle = getNodeColor({ id: String(node.id) });
            ctx.fill();
            }}
            enablePanInteraction={false} // Desactiva la capacidad de trasladar el grafo
            height={400}
            /> }
        </div>
    </Card>
    

  )
}

export default VisualizeTrack
