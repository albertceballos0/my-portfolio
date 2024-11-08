import {   GraphData } from "@/types";

/**
 * Parses the content of a graph file and extracts vertices and edges.
 *
 * @param fileContent - The content of the graph file as a string.
 * @returns An object containing two arrays: `vertices` and `edges`.
 * 
 * The `vertices` array contains objects with the following structure:
 * - `id`: The identifier of the vertex.
 * 
 * The `edges` array contains objects with the following structure:
 * - `id`: The identifier of the edge.
 * - `weight`: The weight of the edge.
 * - `source`: The identifier of the source vertex.
 * - `target`: The identifier of the target vertex.
 * 
 * The graph file should have sections labeled `VERTICES` and `EDGES`:
 * - Lines under the `VERTICES` section should contain vertex identifiers.
 * - Lines under the `EDGES` section should contain edge identifiers, weights, source vertex identifiers, and target vertex identifiers.
 */
export const parseGraphFile = (fileContent: string) => {
    const lines = fileContent.trim().split('\n');
    const nodes: { id: string }[] = [];
    const links: { id: string, weight: number, source: string, target: string }[] = [];
    
    let currentSection = '';

    for (const line of lines) {

      const partes = line.trim().split(' ');
      if (partes[0] === 'VERTICES') {
        currentSection = 'VERTICES';
        continue;
      } else if (partes[0] === 'EDGES') {
        currentSection = 'EDGES';
        continue;
      }
      if (currentSection === 'VERTICES') {
        const id = partes[0];
        nodes.push({ id });
      } else if (currentSection === 'EDGES') {
        const id = partes[0];
        const weight = parseFloat(partes[1]);
        const source = partes[2];
        const target = partes[3];
        links.push({ id, weight, source, target });
      }
    }
    return { nodes, links };
  };


/**
 * Converts a JSON representation of graph data into a specific text format.
 *
 * @param jsonData - The graph data to be converted, containing nodes and links.
 * @param visits - An array of visit strings to be included in the output text.
 * @returns A string representing the graph data in the specified text format.
 *
 * The output format includes:
 * - A header indicating the graph version and type.
 * - A list of vertices with their IDs and default coordinates.
 * - A list of edges with their IDs, weights, source, and target nodes.
 * - A list of visits.
 */
export function convertirGraphATexto(jsonData : GraphData, visits: string[]) {
  let text = '';
    text += 'GRAPH 1.0\n';
    text += 'UNDIRECTED\n';
    text += 'VERTICES\n';
    jsonData.nodes.forEach((node: { id: string; }) => {
        text += `${node.id} 0 0\n`;
    });
  
    // Convertir aristas a texto
    text += 'EDGES\n';
    jsonData.links.forEach((edge) => {
        const sourceId = typeof edge.source === 'string' ? edge.source : edge.source.id;
        const targetId = typeof edge.target === 'string' ? edge.target : edge.target.id;
        text += `${edge.id} ${edge.weight} ${sourceId} ${targetId}\n`;
    });

    text += 'VISITS 1.0\n';
    visits.forEach((visit) => {
        text += `${visit}\n`;
    });
  
    return text;
  }

   

