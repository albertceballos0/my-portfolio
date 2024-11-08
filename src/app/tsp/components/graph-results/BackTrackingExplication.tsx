import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const TSPBacktrackingExplanation = () => {
  return (
    <Card className="w-full mx-auto">
      <CardContent className="prose prose-sm max-w-none p-6">
        <h2 className="text-3xl font-bold mb-4">Backtracking Algorithm for the Traveling Salesman Problem (TSP)</h2>

        {/* Introduction */}
        <p className="mb-4">
          The Backtracking algorithm is a brute-force approach for solving the Traveling Salesman Problem (TSP) by systematically exploring all possible routes 
          and finding the shortest path that visits each city exactly once and returns to the starting point. Backtracking can be applied in different ways: 
          a standard approach, which exhaustively searches through all paths, or a <strong>greedy-enhanced backtracking</strong> approach, which attempts 
          to reduce computation by making local optimizations at each step.
        </p>

        {/* Standard Backtracking */}
        <h3 className="text-2xl font-semibold mt-6 mb-3">Standard Backtracking</h3>
        <p className="mb-4">
          In standard backtracking, the algorithm explores each potential path fully by recursively expanding each possible route, checking if each partial 
          path meets the criteria for an optimal solution. At each step, it branches out to include each unvisited city in the current route and backtracks 
          when a dead-end or non-promising route is encountered.
        </p>
        <p>
          Standard backtracking is exhaustive and evaluates all combinations without shortcuts, guaranteeing an optimal solution but at the expense of 
          high computational cost, especially for larger instances where the complexity grows factorially (O(n!)).
        </p>

        {/* Greedy Backtracking */}
        <h3 className="text-2xl font-semibold mt-6 mb-3">Greedy Backtracking</h3>
        <p className="mb-4">
          Greedy backtracking aims to incorporate heuristics that can reduce computation by making local "greedy" decisions at each step. At each point in 
          the route, the algorithm selects the nearest unvisited city {'('}or the city with the lowest travel cost{')'} as the next candidate to explore further, 
          attempting to quickly find a solution close to optimal.
        </p>
        <p>
          While this approach can help reduce computation and reach a feasible solution faster, it does not guarantee an optimal solution. The greedy 
          choices made at each step may lead the algorithm down suboptimal paths that require additional backtracking, especially when the locally optimal 
          choice does not contribute to a globally optimal route.
        </p>

        {/* Key Concepts */}
        <h3 className="text-2xl font-semibold mt-6 mb-3">Key Concepts and Terminology</h3>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Current Path:</strong> The partial sequence of cities being evaluated at each stage of the recursion.</li>
          <li><strong>Minimum Cost Path:</strong> Tracks the lowest-cost path found so far, updated whenever a more cost-effective route is identified.</li>
          <li><strong>Pruning:</strong> Eliminates branches where the partial path’s cost exceeds the minimum known cost, helping to narrow down the search.</li>
          <li><strong>Recursive Calls:</strong> Each call expands the current path by adding an unvisited city, exploring all possibilities at each level.</li>
          <li><strong>Backtracking:</strong> If a path reaches a dead-end, it "backs up" to try alternative routes, ensuring exhaustive exploration.</li>
          <li><strong>Greedy Selection {'('}in Greedy Backtracking{')'}:</strong> A heuristic choice of the next city based on the lowest immediate cost, balancing 
              between exploration and efficiency.</li>
        </ul>

        {/* Algorithm Steps */}
        <h3 className="text-2xl font-semibold mt-6 mb-3">Algorithm Steps</h3>
        <Tabs defaultValue="standard" className="w-full">
          <TabsList>
            <TabsTrigger value="standard">Standard Backtracking</TabsTrigger>
            <TabsTrigger value="greedy">Greedy Backtracking</TabsTrigger>
          </TabsList>
          <TabsContent value="standard">
            <ol className="list-decimal pl-6 mb-4">
              <li>Start from an initial city, marking it as visited.</li>
              <li>Initialize variables to store the minimum path cost and best route found so far.</li>
              <li>In each recursive call:
                <ul className="list-disc pl-6 mt-2">
                  <li>Extend the current path by adding each unvisited city as the next step.</li>
                  <li>Calculate the path cost; if it exceeds the known minimum, prune this path.</li>
                  <li>Otherwise, recursively call the algorithm to explore further, updating the minimum cost as needed.</li>
                  <li>Backtrack by unmarking the last city and removing it from the path, allowing other cities to be tested.</li>
                </ul>
              </li>
              <li>Continue until all paths are explored, retaining the lowest-cost solution.</li>
            </ol>
          </TabsContent>
          <TabsContent value="greedy">
            <ol className="list-decimal pl-6 mb-4">
              <li>Start from an initial city, marking it as visited.</li>
              <li>Initialize variables to store the minimum path cost and best route found so far.</li>
              <li>In each recursive call:
                <ul className="list-disc pl-6 mt-2">
                  <li>Select the nearest (or lowest-cost) unvisited city as the next candidate step.</li>
                  <li>Calculate the new path cost and, if it is lower than the best-known minimum, continue exploring.</li>
                  <li>Use recursive calls to extend the current path until a solution is found, updating the minimum cost path if a better one is identified.</li>
                  <li>Backtrack by unmarking the last city and exploring alternate greedy choices if available.</li>
                </ul>
              </li>
              <li>Finish once all paths have been evaluated, prioritizing the minimum cost path found during the process.</li>
            </ol>
          </TabsContent>
        </Tabs>

        {/* Complexity Alert */}
        <h3 className="text-2xl font-semibold mt-6 mb-3">Complexity Warning</h3>
        <Alert variant="warning">
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            Both forms of backtracking have factorial complexity, O(n!), but greedy backtracking can slightly reduce computation in practice. 
            For large datasets, approximation algorithms are recommended.
          </AlertDescription>
        </Alert>

        {/* Applications and Practical Use Cases */}
        <h3 className="text-2xl font-semibold mt-6 mb-3">Applications and Practical Use Cases</h3>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Logistics and Route Optimization:</strong> Optimizes routes for delivery, reducing travel distance and fuel costs.</li>
          <li><strong>Manufacturing:</strong> Minimizes travel time between manufacturing stations, improving production schedules.</li>
          <li><strong>Telecommunications:</strong> Reduces latency in network routing by optimizing signal relay paths.</li>
          <li><strong>Bioinformatics:</strong> Aids in DNA sequencing, improving alignment and reducing mismatches in genome assembly.</li>
        </ul>

        {/* Advantages and Disadvantages */}
        <h3 className="text-2xl font-semibold mt-6 mb-3">Advantages and Disadvantages</h3>
        <div className="flex flex-col gap-4">
          <div className="border border-green-500 p-4 rounded">
            <h4 className="text-lg font-semibold text-green-500">Advantages</h4>
            <ul className="list-disc pl-6">
              <li><strong>Optimal Solutions {'('}Standard{')'}:</strong> Standard backtracking provides the best solution by examining all routes.</li>
              <li><strong>Computational Efficiency {'('}Greedy{')'}:</strong> Greedy backtracking can reduce computation, finding near-optimal solutions quickly.</li>
              <li><strong>Applicability:</strong> Effective for combinatorial problems requiring exact solutions on small datasets.</li>
            </ul>
          </div>
          <div className="border border-red-500 p-4 rounded">
            <h4 className="text-lg font-semibold text-red-500">Disadvantages</h4>
            <ul className="list-disc pl-6">
              <li><strong>Exponential Complexity:</strong> Both backtracking approaches face factorial growth, limiting scalability.</li>
              <li><strong>Memory Intensive:</strong> Large instances demand significant memory, especially in standard backtracking.</li>
              <li><strong>Non-Optimal Greedy Solutions:</strong> Greedy choices may lead to suboptimal solutions due to local decisions.</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TSPBacktrackingExplanation;
