import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useGraphState } from '@/store/useGraphStore';

const TSPInstructions = () => {
  const { setActiveTab } = useGraphState();

  return (
    <Card className="w-full mx-auto">
      <CardContent className="prose prose-sm max-w-none p-6">
        <h2 className="text-3xl font-bold mb-4">Instructions for Solving the Traveling Salesman Problem (TSP)</h2>
        
        {/* Introduction */}
        <p className="mb-4">
          The <strong>Traveling Salesman Problem (TSP)</strong> is an optimization problem where, given a set of cities and the distances between them, the goal is to find the shortest route that visits each city once and returns to the starting point. This problem is crucial in fields such as logistics, route planning, and optimization.
        </p>

        {/* Instructions */}
        <h3 className="text-2xl font-semibold mt-6 mb-3">Instructions</h3>
        <ol className="list-decimal pl-6 mb-4">
          <li>
            Go to the <button onClick={() => setActiveTab('input')}><strong>Input</strong></button> section to either load an existing graph or generate a new one, defining connections between cities.
          </li>
          <li>
            Select the nodes to visit by clicking on each node in the screen.
          </li>
          <li>
            Navigate to <strong>Generate TSP</strong> and choose the solution method: <strong>Backtracking</strong> or <strong>Branch and Bound</strong>.
          </li>
          <li>
            Check the <strong>Results</strong> section to view the optimal route and minimum distance.
          </li>
        </ol>

        {/* Solution Methods Explanation */}
        <h3 className="text-2xl font-semibold mt-6 mb-3">Solution Methods</h3>
        <Tabs defaultValue="backtracking" className="w-full">
          <TabsList>
            <TabsTrigger value="backtracking">Backtracking</TabsTrigger>
            <TabsTrigger value="branchBound">Branch and Bound</TabsTrigger>
          </TabsList>
          <TabsContent value="backtracking">
            <p>The <strong>Backtracking</strong> method explores all possible routes to find the optimal solution. Due to its high complexity, it is more suitable for small graphs.</p>
          </TabsContent>
          <TabsContent value="branchBound">
            <p>The <strong>Branch and Bound</strong> method uses pruning to reduce the number of evaluated routes, making it more efficient for larger graphs.</p>
          </TabsContent>
        </Tabs>

        {/* Complexity and Warnings */}
        <h3 className="text-2xl font-semibold mt-6 mb-3">Complexity and Warnings</h3>
        <Alert variant="warning">
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            The complexity of these algorithms is factorial, making them inefficient for large graphs. Approximation techniques may be considered for such cases.
          </AlertDescription>
        </Alert>

      </CardContent>
    </Card>
  );
};

export default TSPInstructions;
