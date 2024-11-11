import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useGraphState } from '@/store/useGraphStore'
import { Badge } from '@/components/ui/badge'
import { ClockIcon, RouteIcon } from 'lucide-react'
import { useParseResultData } from '../../hooks/useParseResultData'
import { TabsContent } from '@/types'

const ResultsLayout = () => {
  const { visitedNodes } = useGraphState()
  const { parseResult } = useParseResultData()
  const data: TabsContent = parseResult()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RouteIcon className="h-5 w-5" />
            Best Solution Path
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                {data.path.map((node, index) => (
                  <Badge key={index} variant="outline">
                    {node}
                  </Badge>
                ))}
              </div>
              <p className="font-mono text-sm">
                Total Length: {data.length.toFixed(2)}
              </p>
              <Badge variant="secondary">Optimal</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5" />
              Execution Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-2xl font-bold text-center">
              {data.executionTime} ms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RouteIcon className="h-5 w-5" />
              Visits Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-sm mb-2">Total Visits: {visitedNodes.length}</p>
            <div className="flex flex-wrap gap-2">
              {visitedNodes.map((node, index) => (
                <Badge key={index} variant="outline">
                  {node}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ResultsLayout