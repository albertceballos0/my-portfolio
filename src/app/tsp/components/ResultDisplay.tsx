"use client"

import { useState } from "react"
import { Card, CardDescription, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import ResultsLayout from "./graph-results/ResultsLayout"
import VisualizeTree from "./graph-results/VisualizeTree"
import TrackTabContent from "./graph-results/TrackTabContent"
import { useGraphState } from "@/store/useGraphStore"
import BABExplication from "./graph-results/BABExplication"
import BackTrackingExplication from "./graph-results/BackTrackingExplication"

export default function ResultDisplay() {
  const { result, setActiveTab, isGraph } = useGraphState()
  const [activeTabResults, setActiveTabResults] = useState('track')

  const renderCardDescription = () => {
    if (!result) return "Generate a track to visualize the solution"
    switch (result.type) {
      case 'branch-and-bound':
        return "Branch and Bound algorithm"
      case 'backtracking':
        return "BackTracking"
      case 'backtracking-greedy':
        return "BackTracking Greedy"
      default:
        return ""
    }
  }

  const renderCardContent = () => {
    if (!result && !isGraph) {
      return (
        <CardContent className="text-center text-gray-400 py-8">
          <p>No graph data available</p>
          <Button className="mt-4" onClick={() => setActiveTab('input')}>
            Load Sample Graph
          </Button>
        </CardContent>
      )
    }

    if (isGraph && !result) {
      return (
        <CardContent className="text-center text-gray-400 py-8">
          <p>Graph is loaded but no track is generated</p>
          <Button className="mt-4" onClick={() => setActiveTab('graph')}>
            Load visits
          </Button>
        </CardContent>
      )
    }

    if (result) {
      return (
        <>
          <ResultsLayout />
          <Tabs value={activeTabResults} onValueChange={setActiveTabResults} className="w-full mt-6">
            <TabsList className={`grid w-full ${result.type === 'branch-and-bound' ? 'grid-cols-3' : 'grid-cols-2'}`}>
              <TabsTrigger value="track">Track Path</TabsTrigger>
              {result.type === 'branch-and-bound' && <TabsTrigger value="visualization">Tree Visualization</TabsTrigger>}
              <TabsTrigger value="explication">{result.type === 'branch-and-bound' ? 'Branch and Bound' : 'Backtracking'}</TabsTrigger>
            </TabsList>
            <TabsContent className='mt-6' value="explication">
              {result.type === 'branch-and-bound' ? <BABExplication /> : <BackTrackingExplication />}
            </TabsContent>
            {result.type === 'branch-and-bound' && (
              <TabsContent className="mt-6" value="visualization">
                <VisualizeTree />
              </TabsContent>
            )}
            <TabsContent className="mt-6" value="track">
              <TrackTabContent />
            </TabsContent>
          </Tabs>
        </>
      )
    }
  }

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader className="border-b border-gray-200">
          <CardTitle>TSP Solution Tree Visualization</CardTitle>
          <CardDescription>{renderCardDescription()}</CardDescription>
        </CardHeader>
        <div className="p-6">
        {renderCardContent()}
        </div>
      </Card>
    </div>
  )
}