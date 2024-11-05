'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ControlButtons from './components/ControlButtons'
import GraphVisualization from './components/GraphVisualization'
import GraphSelector from './components/graph-selector/GraphSelector'
import { useGraphState } from '@/store/useGraphStore'

import ResultDisplay from './components/ResultDisplay'
import BABExplication from './components/graph-results/BABExplication'

export default function BranchAndBoundPage() {

  const { activeTab, setActiveTab } = useGraphState() 

  return (
    <div>
      <div className={`flex-grow 'filter blur-sm' : ''}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Branch and Bound</h1>
            <ControlButtons />
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="algorithm">Algorithm</TabsTrigger>
              <TabsTrigger value="input">Input</TabsTrigger>
              <TabsTrigger value="graph">Graph</TabsTrigger>
              <TabsTrigger value="result">Result</TabsTrigger>
            </TabsList>
            <div>
              <TabsContent value="algorithm">
                <BABExplication />
              </TabsContent>
              <TabsContent value="input">
                <GraphSelector />
              </TabsContent>
              <TabsContent value="graph">
                <GraphVisualization />
              </TabsContent>
              <TabsContent value="result">
               { <ResultDisplay />}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}