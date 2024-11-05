/**
 * Generates a random graph with a specified number of nodes and edges.
 *
 * @param nodes - The number of nodes (vertices) to generate.
 * @param edges - The number of edges (links) to generate.
 * @returns An object containing the generated nodes and links.
 * 
 * @remarks
 * - Each node is assigned a unique ID in the format `V0001`, `V0002`, etc.
 * - Each node's position is randomly generated within a range of -15 to 15 for both x and y coordinates.
 * - Each edge is assigned a unique ID in the format `E0001`, `E0002`, etc.
 * - Each edge connects two different nodes and is assigned a random weight between 1000 and 11000.
 * 
 * @example
 * ```typescript
 * const graph = generateRandomGraph(5, 10);
 * console.log(graph.nodes); // { V0001: { x: ..., y: ... }, V0002: { x: ..., y: ... }, ... }
 * console.log(graph.links); // [ { id: 'E0001', weight: ..., source: 'V0001', target: 'V0002' }, ... ]
 * ```
 */
export const generateRandomGraph = (nodes: number, edges: number) => {

    const vertices:  {id : string} []  = []
    const aristas: { id: string, weight: number, source: string, target: string }[] = []

    // Generate vertices
    for (let i = 1; i <= nodes; i++) {
      const id = `V${i.toString().padStart(4, '0')}`
      vertices.push({ id })
    }
    // Generate edges
    for (let i = 1; i <= edges; i++) {
      const id = `E${i.toString().padStart(4, '0')}`
      const source = `V${(Math.floor(Math.random() * nodes) + 1).toString().padStart(4, '0')}`
      let target
      do {
      target = `V${(Math.floor(Math.random() * nodes) + 1).toString().padStart(4, '0')}`
      } while (target === source)

      const weight = parseFloat((Math.random() * 10000 + 1000).toFixed(2))

      aristas.push({
      id,
      weight,
      source,
      target
      })

      // Add the reverse edge
      aristas.push({
      id: `E${(edges + i).toString().padStart(4, '0')}`,
      weight,
      source: target,
      target: source
      })
    }

    return { nodes: vertices, links : aristas }
  }
