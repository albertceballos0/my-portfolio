import React from 'react'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import GraphControls from './GraphControls'
import { useGraphState } from '@/store/useGraphStore'

type CardHeaderProps = {
    setIsVisitMode: (value: boolean) => void;
    isVisitMode: boolean;
}


const GraphHeader = ({setIsVisitMode, isVisitMode} : CardHeaderProps) => {

    const { visitedNodes } = useGraphState()
  return (
    <CardHeader className="z-10 space-y-2">
        <div className="flex justify-between items-center">
            <CardTitle>Graph Visualization</CardTitle>
            <Badge variant="secondary">Visits: {visitedNodes.length}</Badge>
        </div>
        <CardDescription>Load visits to generate a track</CardDescription>

        <GraphControls setIsVisitMode={setIsVisitMode} isVisitMode={isVisitMode} />
    </CardHeader>
  )
}

export default GraphHeader