import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useGraphState } from '@/store/useGraphStore'
import { Loader2 } from 'lucide-react'
import { useNode } from '../hooks/useNode'
import GraphInfo from './graph-visualization/GraphInfo'
import GraphHeader from './graph-visualization/GraphHeader'

const ForceGraph2D = dynamic(() => import('react-force-graph').then(mod => mod.ForceGraph2D), { 
  ssr: true,
  loading: () => (
    <div className="flex justify-center items-center" style={{ height: 400 }}>
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
})

export default function GraphVisualization() {
    const [isVisitMode, setIsVisitMode] = useState(false)
    const { isGraph, graph, setActiveTab } = useGraphState()
    const { handleClickNode, getNodeColor } = useNode(isVisitMode)

    return (
        <div className="flex flex-col space-y-4 pb-20 md:pb-18">
            <Card>
                <GraphHeader setIsVisitMode={setIsVisitMode} isVisitMode={isVisitMode} />
                
                <div className="flex justify-center items-center overflow-hidden border-t border-gray-200">
                    {!isGraph ? (
                        <CardContent className="text-center text-gray-400 py-8">
                            <p>No graph data available</p>
                            <Button className="mt-4" onClick={() => setActiveTab('input')}>
                                Load Sample Graph
                            </Button>
                        </CardContent>
                    ) : (
                        <ForceGraph2D
                            graphData={graph}
                            nodeLabel="id"
                            linkLabel="value"
                            nodeColor={(node) => getNodeColor({ id: String(node.id) })}
                            linkColor={() => '#9ca3af'}
                            onNodeClick={(node) => handleClickNode({ id: String(node.id) })}
                            height={400}
                        />
                    )}
                </div>
            </Card>
            <GraphInfo />
        </div>
    )
}