import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const BABExplication = () => {
  return (
    <Card className="w-full mx-auto">
      <CardContent className="prose prose-sm max-w-none p-6">
        <h2 className="text-3xl font-bold mb-4">Branch and Bound Algorithm for the Traveling Salesman Problem (TSP)</h2>
        
        {/* Introduction */}
        <p className="mb-4">
          The Branch and Bound (B&B) algorithm is a powerful optimization method to find exact solutions for combinatorial problems like the TSP, where the goal is to find the shortest possible route visiting all cities exactly once and returning to the starting point. It systematically explores the solution space by branching on possible decisions and using bounding techniques to prune suboptimal solutions.
        </p>

        {/* Complexity Analysis */}
        <h3 className="text-2xl font-semibold mt-6 mb-3">Mathematical Complexity</h3>
        <p>
          B&B for the TSP has a worst-case time complexity of <strong>O(n!)</strong> due to the factorial growth of possible routes. However, efficient bounding and pruning strategies can reduce this to manageable levels in practice:
        </p>
        <ul className="list-disc pl-6">
          <li><strong>Exponential Complexity:</strong> Even with optimizations, B&B generally exhibits exponential growth.</li>
          <li><strong>Space Complexity:</strong> Memory usage also grows exponentially as the search tree expands.</li>
          <li><strong>Heuristic Bounds:</strong> Using strong bounds and heuristic functions can drastically reduce the search space.</li>
        </ul>

        {/* Key Concepts */}
        <h3 className="text-2xl font-semibold mt-6 mb-3">Key Concepts and Terminology</h3>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Upper Bound (UB):</strong> Represents the best complete tour found so far, which acts as a threshold for pruning branches that exceed it.</li>
          <li><strong>Lower Bound (LB):</strong> Provides a lower estimate for any partial solution’s completion, helping to identify and eliminate non-promising branches.</li>
          <li><strong>Pruning:</strong> The removal of branches with LB greater than the current UB, ensuring no exploration of suboptimal solutions.</li>
          <li><strong>Branching:</strong> Expands nodes by generating possible next steps (subproblems) from a current node’s state.</li>
        </ul>


        {/* Algorithm Steps */}
        <h3 className="text-2xl font-semibold mt-6 mb-3">Algorithm Steps</h3>
        <ol className="list-decimal pl-6 mb-4">
          <li>Initialize with a root node representing the starting city.</li>
          <li>For each node:
            <ul className="list-disc pl-6 mt-2">
              <li>Calculate the lower bound for the partial solution.</li>
              <li>If LB {'<'} UB, prune the branch.</li>
              <li>If not pruned, generate child nodes representing different possible next cities.</li>
              <li>Update UB if a better complete solution is found.</li>
            </ul>
          </li>
          <li>Continue until all branches are explored or pruned.</li>
          <li>The best solution found is the optimal tour for the TSP.</li>
        </ol>

        {/* Bounds Explanation */}
        <h3 className="text-2xl font-semibold mt-6 mb-3">Bound Calculation Techniques</h3>
        <Tabs defaultValue="lb" className="w-full">
          <TabsList>
            <TabsTrigger value="lb">Lower Bound (LB)</TabsTrigger>
            <TabsTrigger value="ub">Upper Bound (UB)</TabsTrigger>
          </TabsList>
          <TabsContent value="lb">
            <p>The lower bound is calculated as follows:</p>
            <pre className="bg-gray-100 p-2 rounded">
              LB = Current_Length + MST(Remaining_Cities)
            </pre>
            <p>Where MST is the Minimum Spanning Tree cost for remaining cities, offering a quick estimate of the least possible tour length from the current partial route.</p>
          </TabsContent>
          <TabsContent value="ub">
            <p>Heuristic methods to estimate initial UB:</p>
            <ul className="list-disc pl-6">
              <li><strong>Nearest Neighbor:</strong> Selects the closest unvisited city sequentially, forming a quick upper bound.</li>
              <li><strong>Cheapest Insertion:</strong> Gradually constructs a tour by inserting cities at minimum cost points.</li>
              <li><strong>Christofides Algorithm:</strong> Generates a tour with a 1.5 approximation factor, especially useful for metric graphs.</li>
            </ul>
          </TabsContent>
        </Tabs>

        {/* Iteration Example Table */}
        <h3 className="text-2xl font-semibold mt-6 mb-3">Iteration Example</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Node</TableHead>
              <TableHead>Partial Tour</TableHead>
              <TableHead>Lower Bound (LB)</TableHead>
              <TableHead>Upper Bound (UB)</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>A</TableCell>
              <TableCell>100</TableCell>
              <TableCell>∞</TableCell>
              <TableCell>Expand</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>A - B</TableCell>
              <TableCell>150</TableCell>
              <TableCell>200</TableCell>
              <TableCell>Expand</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3</TableCell>
              <TableCell>A - C</TableCell>
              <TableCell>180</TableCell>
              <TableCell>200</TableCell>
              <TableCell>Expand</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>4</TableCell>
              <TableCell>A - B - C</TableCell>
              <TableCell>210</TableCell>
              <TableCell>200</TableCell>
              <TableCell>Prune</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Complexity Alert */}
        <h3 className="text-2xl font-semibold mt-6 mb-3">Complexity Warning</h3>
        <Alert variant="warning">
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            Due to its factorial growth, the B&B algorithm may become intractable for large datasets. Approximation techniques may be required.
          </AlertDescription>
        </Alert>
        <p className="mt-4">
          Efficiency depends on pruning and strong bounds. Robust bounds can substantially reduce explored nodes.
        </p>

        {/* Applications, Pros, and Cons */}
        <h3 className="text-2xl font-semibold mt-6 mb-3">Applications and Practical Use Cases</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Logistics optimization in transportation</li>
          <li>Manufacturing scheduling</li>
          <li>Electronic circuit design</li>
          <li>Bioinformatics for DNA sequencing</li>
        </ul>

        <h3 className="text-2xl font-semibold mt-6 mb-3">Advantages and Disadvantages</h3>
        <div className="flex flex-col gap-4">
          <div className="border border-green-500 p-4 rounded">
            <h4 className="text-lg font-semibold text-green-500">Advantages</h4>
            <ul className="list-disc pl-6">
              <li><strong>Optimal Solutions:</strong> Guarantees the discovery of the optimal solution by exploring all possibilities while intelligently pruning.</li>
              <li><strong>Flexibility:</strong> Can be adapted with various bounding techniques to improve performance based on problem characteristics.</li>
              <li><strong>Applicability:</strong> Effective for a wide range of combinatorial optimization problems beyond TSP.</li>
            </ul>
          </div>
          <div className="border border-red-500 p-4 rounded">
            <h4 className="text-lg font-semibold text-red-500">Disadvantages</h4>
            <ul className="list-disc pl-6">
              <li><strong>Exponential Growth:</strong> The search space expands factorially, making it infeasible for large instances of TSP.</li>
              <li><strong>Computationally Intensive:</strong> Requires significant computational resources, especially for dense graphs with many nodes.</li>
              <li><strong>Implementation Complexity:</strong> Developing an efficient B&B implementation with effective pruning strategies can be complex.</li>
            </ul>
          </div>
        </div>

        {/* Conclusion */}
        <h3 className="text-2xl font-semibold mt-6 mb-3">Conclusion</h3>
        <p>
          The Branch and Bound algorithm is a robust technique for solving the Traveling Salesman Problem, leveraging mathematical rigor and strategic pruning to find optimal solutions efficiently. Although it can struggle with larger datasets, its versatility allows it to be employed across various fields requiring optimization. Understanding its complexity and practical applications is essential for leveraging its full potential.
        </p>
      </CardContent>
    </Card>
  );
};

export default BABExplication;
