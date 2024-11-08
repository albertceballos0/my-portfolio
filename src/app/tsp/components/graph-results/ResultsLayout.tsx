import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useGraphState } from '@/store/useGraphStore'
import { Badge } from '@/components/ui/badge'
import { ClockIcon, RouteIcon } from 'lucide-react'
import { TabsContent, useParseResultData } from '../../hooks/useParseResultData'

const ResultsLayout = () => {
  const { visitedNodes } = useGraphState()

  const { parseResult } = useParseResultData()

  const data : TabsContent = parseResult()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
      <Card className="lg:col-span-2 bg-gradient-to-br from-green-200 to-green-50 shadow-md border border-green-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700 font-semibold">
            <RouteIcon className="h-5 w-5" />
            Best Solution Path
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                {data.path.map((node, index) => (
                  <Badge key={index} variant="outline" className="text-green-600 border-green-600">
                    {node}
                  </Badge>
                ))}
              </div>
              <p className="font-mono text-sm text-gray-800">
                Total Length: {data.length.toFixed(2)}
              </p>
              <Badge className="bg-green-600 text-white">Optimal</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card className="bg-gradient-to-br from-blue-200 to-blue-50 shadow-md border border-blue-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700 font-semibold">
              <ClockIcon className="h-5 w-5" />
              Execution Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-2xl font-bold text-center text-blue-800">
              {data.executionTime} ms
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-200 to-purple-50 shadow-md border border-purple-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700 font-semibold">
              <RouteIcon className="h-5 w-5" />
              Visits Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-sm mb-2 text-gray-800">Total Visits: {visitedNodes.length}</p>
            <div className="flex flex-wrap gap-2">
              {visitedNodes.map((node, index) => (
                <Badge key={index} variant="outline" className="text-purple-600 border-purple-600">
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
