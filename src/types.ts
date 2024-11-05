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

// resultInterface: Interface for the result of the algorithm
export interface treeInterface {
  tree:  TreeNode ;
  best: TreeNode | null;
  executionTime: number;
}

// RequestBaB: Interface for the request made to the backend
export interface RequestBaB {
    userRequest: string,
    data: string,
    timestamp: string
}

// Tipos para nuestros datos
export type RequestType = 'branch-and-bound' | 'object-detection' | 'avatar-generation' | 'object-removal' | 'image-generation' | 'style-transfer' | 'all'

export interface HistoryItem {
  id: string
  timestamp: string
  requestType: RequestType
  userEmail: string
}
