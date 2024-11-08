import { BABTreeInterface, BackTrackingInterface, TreeNode } from "@/types";

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
      prunned: boolean,
    ){
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
    if (!best){
      best = {
        name: '',
        children: [],
        attributes: {
          path: [],
          upperBound: 0,
          lowerBound: 0,
          length: 0,
          prunned: false,
          best: true,
        },
    };
    }

    return {
      tree: rootNode,
      best,
      executionTime,
    };
  }
  



  export function parseBacktrackingStructure(text: string): BackTrackingInterface {

    // Patrones para extraer información de los nodos del árbol
    const pathPattern = /Best path:\s*\[(.*?)\]/;
    const executionTimePattern = /Execution Time: ([\d.]+)/;
    const nodesPattern = /Nodes: ([\d.]+)/;
    const lengthPattern = /Length: ([\d.]+)/;
    // Extraer información del texto -> Crear nodos y agregarlos al árbol SOLUCIONES PARCIALES
    let match;
    let path : string[] = [];
    let length : number = 0;
    let executionTime : number = 0;
    let nodes : number = 0;

    if ((match = pathPattern.exec(text)) !== null) {
      path = match[1].split(" -> ").map(node => node.trim());
    }
    // Extraer información del texto -> Tiempo de ejecución
    if ((match = executionTimePattern.exec(text)) !== null) {
      executionTime = parseFloat(match[1]);
    }
    // Extraer información del texto -> Profundidad
    if ((match = nodesPattern.exec(text)) !== null) {
      nodes = parseFloat(match[1]);
    }
    // Extraer información del texto -> Longitud
    if ((match = lengthPattern.exec(text)) !== null) {
      length = parseFloat(match[1]);
    }
    return {
      path,
      length,
      executionTime,
      nodes,
    };
  
  }
  
