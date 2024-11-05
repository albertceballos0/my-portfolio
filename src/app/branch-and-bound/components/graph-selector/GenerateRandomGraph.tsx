'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'
import { useGenerateRandomGraph } from '../../hooks/useGenerateRandomGraph'


export default function RandomGraphGenerator() {
  const [nodes, setNodes] = useState(10)
  const [edges, setEdges] = useState(20)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)


  const { handleGenerateRandomGraph } = useGenerateRandomGraph( setError, setIsLoading)

  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Random Graph</CardTitle>
        <CardDescription>Specify the number of nodes and edges</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center space-x-2">
          <label htmlFor="nodes">Nodes:</label>
          <Input
            id="nodes"
            type="number"
            value={nodes}
            onChange={(e) => setNodes(parseInt(e.target.value))}
            min={2}
            max={100}
          />
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="edges">Edges:</label>
          <Input
            id="edges"
            type="number"
            value={edges}
            onChange={(e) => setEdges(parseInt(e.target.value))}
            min={1}
            max={(nodes * (nodes - 1)) / 2}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </CardContent>
      <CardFooter>
        <Button onClick={() => handleGenerateRandomGraph(nodes,edges)} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate'
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}