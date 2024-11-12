'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Route, ChevronDown, ChevronUp } from 'lucide-react'
import { useGraphState } from '@/store/useGraphStore'
import { useParseResultData } from '../../hooks/useParseResultData'

export default function ResultsLayout() {
  const { visitedNodes } = useGraphState()
  const { parseResult } = useParseResultData()
  const { path, length, executionTime } = parseResult()

  const [openCards, setOpenCards] = useState<{ [key: string]: boolean }>({
    bestSolution: false,
    visits: false,
  })

  const toggleCard = (cardName: string) => {
    setOpenCards(prev => ({ ...prev, [cardName]: !prev[cardName] }))
  }

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-medium">
            <Clock className="h-4 w-4" />
            Execution Time
          </h2>
          <p className="font-mono text-lg font-semibold">{executionTime} ms</p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 cursor-pointer" onClick={() => toggleCard('bestSolution')}>
          <div className="flex justify-between items-center">
        <h2 className="flex items-center gap-2 text-sm font-medium">
          <Route className="h-4 w-4" />
          Best Solution
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Length: {length.toFixed(2)}</span>
          {openCards.bestSolution ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
          </div>
          {openCards.bestSolution && (
        <CardContent className="pt-4 pb-0 px-0">
          <div className="flex flex-wrap gap-1">
            {path.map((node, index) => (
          <Badge key={index} variant="outline" className="text-xs px-1 py-0">
            {node}
          </Badge>
            ))}
          </div>
        </CardContent>
          )}
        </Card>

        <Card className="p-4 cursor-pointer" onClick={() => toggleCard('visits')}>
          <div className="flex justify-between items-center">
        <h2 className="flex items-center gap-2 text-sm font-medium">
          <Route className="h-4 w-4" />
          Visits
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Total: {visitedNodes.length}</span>
          {openCards.visits ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
          </div>
          {openCards.visits && (
        <CardContent className="pt-4 pb-0 px-0">
          <div className="flex flex-wrap gap-1">
            {visitedNodes.map((node, index) => (
          <Badge key={index} variant="outline" className="text-xs px-1 py-0">
            {node}
          </Badge>
            ))}
          </div>
        </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}