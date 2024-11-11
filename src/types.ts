// Definition of the types used in the project


// GraphData: Interface for the data of the graph
export interface GraphData {
    nodes: {id : string}[]
    links: {id : string, source: string | {id : string}, weight: number, target: string | { id : string}}[]
}   

// TreeNode: Interface for the nodes of the tree, is used to save the tree
export interface TreeNode {
  name: string;
  children: TreeNode[];
  attributes: {
    upperBound: number;
    lowerBound: number;
    length: number;
    path: string[];
    prunned: boolean;
    best: boolean;
  };
}

export interface ResultTSP {
  type: string;
  result: BABTreeInterface | BackTrackingInterface;
}


export interface BackTrackingInterface {
  path: string[];
  length: number;
  executionTime: number;
  nodes: number;
}

// resultInterface: Interface for the result of the algorithm
export interface BABTreeInterface {
  tree:  TreeNode ;
  best: TreeNode;
  executionTime: number;
}


export type TabsContent = {
  path : string[],
  length : number,
  executionTime : number,
  nodes? : number
}
// RequestBaB: Interface for the request made to the backend
export interface RequestInterface {
    user: userInterface,
    data: unknown,
    timestamp: Date,
    requestType: RequestType
}

// Opciones de filtro de tipo
export const typeOptions = [
  { label: 'All', value: 'all' },
  { label: 'TSP', value: 'tsp' },
  { label: 'Object Detection', value: 'object-detection' },
]

export const navItems = [
  { href: '/', label: 'Home' },  
  { href: '/object-detection', label: 'Detect Objects' },
  { href: '/tsp', label: 'TSP' },
  { href: '/hist', label: 'View History' },
]

// Tipos para nuestros datos
export type RequestType = 'tsp' | 'object-detection' | 'avatar-generation' | 'object-removal' | 'image-generation' | 'style-transfer' | 'all'

export interface HistoryItem {
  id: string
  timestamp: string
  requestType: RequestType
  user: userInterface
}



export interface userInterface {
  email: string;
  avatarUrl: string;
  name: string;
}