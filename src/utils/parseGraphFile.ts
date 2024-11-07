import {  BABTreeInterface, GraphData, TreeNode } from "@/types";

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

   
/**
 * Parses a text representation of a tree structure and returns an object containing the tree, the best solution node, and the execution time.
 *
 * @param text - The text representation of the tree structure.
 * @returns An object containing the parsed tree structure, the best solution node, and the execution time.
 *
 * @remarks
 * The function uses regular expressions to extract information about partial solutions, pruned nodes, the best solution found, and the execution time from the input text. It constructs a tree structure by creating nodes and adding them to the tree based on the extracted information.
 *
 * The tree structure is represented by a root node with children nodes. Each node has attributes such as path, upper bound, lower bound, length, and a pruned flag. The function ensures that duplicate nodes are not added to the tree.
 *
 * The best solution node is identified and added to the tree separately. The execution time is also extracted from the input text.
 *
 * The function returns an object containing the root node of the tree, the best solution node, and the execution time.
 *
 * @example
 * ```typescript
 * const text = `
 * Partial Solution: Father: [] Path: [A] Length: 10 Lower Bound: 5 Upper Bound: 15
 * Node prunned: Father: [A] Path: [A -> B] Length: 20 Lower Bound: 10 Upper Bound: 25
 * Best Solution Found: Father: [A] Path: [A -> C] Length: 30
 * Execution Time: 100
 * `;
 * const result = parseTreeStructure(text);
 * console.log(result.tree);
 * console.log(result.best);
 * console.log(result.executionTime);
 * ```
 */
export function parseBABStructure(text: string): BABTreeInterface {
    // Patrones para extraer información de los nodos del árbol
    const partialSolutionPattern = /Partial Solution:\s*Father: \[(.*?)\]\s*Path: \[(.*?)\]\s*Length: ([\d.]+)\s*Lower Bound: ([\d.e+-]+)\s*Upper Bound: ([\d.e+-]+)/g;
    const nodePrunnedPattern = /Node prunned:\s*Father: \[(.*?)\]\s*Path: \[(.*?)\]\s*Length: ([\d.]+)\s*Lower Bound: ([\d.e+-]+)\s*Upper Bound: ([\d.e+-]+)/g;
    const bestSolutionPattern = /Best Solution Found:\s*Father: \[(.*?)\]\s*Path: \[(.*?)\]\s*Length: ([\d.]+)/;
    const executionTimePattern = /Execution Time: ([\d.]+)/;
  
    // Mapa de nodos para evitar duplicados
    const nodeMap: { [key: string]: TreeNode } = {};
    let best: TreeNode | null = null;
    let executionTime = 0;
  
    // Crear el nodo raíz con `name` como el primer valor de `path`
    const rootNode: TreeNode = {
      name: "",
      children: [],
      attributes: {
        path: [],
        upperBound: Infinity,
        lowerBound: 0,
        length: 0,
        prunned: false,
        best: false
      },
    };

    // Agregar el nodo raíz al mapa
    nodeMap[""] = rootNode;
  
    // Función para agregar un nodo
    /**
     * Adds a node to the tree structure.
     *
     * @param father - An array representing the path to the father node.
     * @param path - An array representing the path to the current node.
     * @param length - The length attribute of the node.
     * @param lowerBound - The lower bound attribute of the node.
     * @param upperBound - The upper bound attribute of the node.
     * @param prunned - A boolean indicating if the node is pruned.
     *
     * @remarks
     * - The function constructs a node with the given attributes and adds it to the tree.
     * - If the node already exists in the `nodeMap`, it will not be added again.
     * - If the `father` array is empty, the node is added as a child of the root node.
     * - If the father node does not exist in the `nodeMap`, the function returns without adding the node.
     */
    function addNode(
      father: string[],
      path: string[],
      length: number,
      lowerBound: number,
      upperBound: number,
      prunned: boolean
    ){
        console.log(father, path, length, lowerBound, upperBound, prunned);
        const nodeName = path[path.length - 1];  // Último valor de `path` como nombre del nodo
        const nodePath = path.join(" -> ");
        
        const node: TreeNode = {
          name: nodeName,
          children: [],
          attributes: {
            path: path,
            upperBound,
            lowerBound,
            length,
            prunned,
            best: false,
          },
        };
    
        // Evitar nodos duplicados
        if (nodeMap[nodePath]) return

        // Agregar el nodo al mapa
        nodeMap[nodePath] = node;
    
        // Agregar el nodo como hijo del nodo root
        if (father.length === 0) {
          rootNode.children.push(node);
          return;
        }

        // Agregar el nodo como hijo del nodo padre
        const fatherName = father.join(" -> ");
        // Si el nodo padre no existe, no se agrega el nodo
        if (!nodeMap[fatherName]) return;
        // Agregar el nodo como hijo del nodo padre
        nodeMap[fatherName].children.push(node);
    }
  
    // Extraer información del texto -> Crear nodos y agregarlos al árbol SOLUCIONES PARCIALES
    let match;
    while ((match = partialSolutionPattern.exec(text)) !== null) {
      const father = match[1] ? match[1].split(" -> ") : [];
      const path = match[2].split(" -> ");
      const length = parseFloat(match[3]);
      const lowerBound = parseFloat(match[4]);
      const upperBound = parseFloat(match[5]);
      addNode(father, path, length, lowerBound, upperBound, false);
    }
  
    // Extraer información del texto -> Crear nodos y agregarlos al árbol NODOS PODADOS
    while ((match = nodePrunnedPattern.exec(text)) !== null) {
      const father = match[1] ? match[1].split(" -> ") : [];
      const path = match[2].split(" -> ");
      const length = parseFloat(match[3]);
      const lowerBound = parseFloat(match[4]);
      const upperBound = parseFloat(match[5]);
      addNode(father, path, length, lowerBound, upperBound, true);
    }
  
    // Extraer información del texto -> Crear nodo y agregarlo al árbol MEJOR SOLUCIÓN
    if ((match = bestSolutionPattern.exec(text)) !== null) {
      const father = match[1] ? match[1].split(" -> ") : [];
      const path = match[2].split(" -> ");
      const length = parseFloat(match[3]);
      best = {
          name: path[path.length - 1],
          children: [],
          attributes: {
            path: path,
            upperBound: length,
            lowerBound: length,
            length,
            prunned: false,
            best: true,
          },
      };

      // Agregar la mejor solución como hijo de su nodo padre
      const fatherName = father.join(" -> ");
      if (nodeMap[fatherName]) {
        nodeMap[fatherName].children.push(best); 
      }
    }
    // Extraer información del texto -> Tiempo de ejecución
    if ((match = executionTimePattern.exec(text)) !== null) {
      executionTime = parseFloat(match[1]);
    }
  
    // Asignar el nombre del nodo raíz
    if (rootNode.attributes.path.length === 0 && Object.keys(nodeMap).length > 1) {
      const firstNodePath = Object.keys(nodeMap)[1];
      const firstNode = nodeMap[firstNodePath];
      rootNode.name = firstNode.attributes.path[0];
    }
    
    return {
      tree: rootNode,
      best,
      executionTime,
    };
  }
  
