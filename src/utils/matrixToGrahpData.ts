/**
 * Converts a matrix of numbers into graph data consisting of nodes and links.
 *
 * @param newMatrix - A 2D array of numbers representing the adjacency matrix of the graph.
 *                    Each element in the matrix represents the weight of the edge between nodes.
 *                    A value of 0 indicates no edge between the nodes.
 * @returns An object containing:
 *          - `nodes`: An array of node objects, each with an `id` property.
 *          - `links`: An array of link objects, each with `source`, `target`, and `value` properties.
 *
 * Example:
 * ```typescript
 * const matrix = [
 *   [0, 1, 0],
 *   [1, 0, 1],
 *   [0, 1, 0]
 * ];
 * const graphData = updateGraphData(matrix);
 * // graphData will be:
 * // {
 * //   nodes: [{ id: 'Node 1' }, { id: 'Node 2' }, { id: 'Node 3' }],
 * //   links: [
 * //     { source: 'Node 1', target: 'Node 2', value: 1 },
 * //     { source: 'Node 2', target: 'Node 1', value: 1 },
 * //     { source: 'Node 2', target: 'Node 3', value: 1 },
 * //     { source: 'Node 3', target: 'Node 2', value: 1 }
 * //   ]
 * // }
 * ```
 */
export const matrixToGraphData = (newMatrix: number[][]) => {
    const nodes = newMatrix.map((_, index) => ({ id: `Node ${index + 1}` }))
    const links = []
    for (let i = 0; i < newMatrix.length; i++) {
      for (let j = 0; j < newMatrix[i].length; j++) {
        if (newMatrix[i][j] !== 0) {
          links.push({
            id: `Link ${i + 1}-${j + 1}`,
            source: `Node ${i + 1}`,
            target: `Node ${j + 1}`,
            weight: newMatrix[i][j]
          })
        }
      }
    }
    return { nodes, links }
}