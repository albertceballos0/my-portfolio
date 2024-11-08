import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GraphData, ResultTSP } from '@/types';



interface GraphState {
  graph: GraphData;
  isGraph: boolean;
  result: ResultTSP | null;
  activeTab: string;
  isGenerating: boolean;
  setActiveTab: (tab: string) => void;
  setGraph: (data: GraphData) => void;
  setResult : (res: ResultTSP) => void;
  removeResult: () => void;
  removeGraph: () => void;
  addVisitedNode: (node: string) => void;
  isInitialized: boolean;
  visitedNodes: string[];
  setVisitedNodes: (nodes: string[]) => void;
  setIsGenerating: (generating: boolean) => void;
}

export const useGraphState = create<GraphState>()(
  persist(
    (set) => ({
      graph: { nodes: [], links: [] },
      isGraph: false,
      activeTab: 'instructions',
      isInitialized: false,
      visitedNodes: [],
      result: null,
      isGenerating: false,
      setActiveTab: (tab: string) => set(() => ({ activeTab: tab })),
      removeResult: () => set(() => ({ result: null })),
      setResult: (res: ResultTSP) => set(() => ({ 
          result: res
       })),
      setIsGenerating: (generating: boolean) => set(() => ({ isGenerating: generating })),
      setVisitedNodes: (nodes: string[]) => set(() => ({ visitedNodes: nodes })),
      addVisitedNode: (node: string) => set((state) => ({ visitedNodes: [...state.visitedNodes, node] })),
      setGraph: (data: GraphData) => set(() => ({ graph: data, visitedNodes: [], result: null , isGraph: true})),
      removeGraph: () => set(() => ({ graph: { nodes:  [], links: []}, isGraph:false, visitedNodes: [], result: null })),
    }),
    {
      name: 'graph-storage', // Nombre para el local storage

      // Solo guarda 'graph.edges' y los 'id's de cada nodo en 'graph.nodes'
      partialize: (state) => ({
        visitedNodes: state.visitedNodes,
        isInitialized: state.isInitialized,
        result: state.result,
        activeTab: state.activeTab,
        isGraph: state.isGraph,
        isGenerating: state.isGenerating,
        graph: state.graph
          ? {
              links: state.graph.links.map((link) => ({
                id: link.id,
                source: typeof link.source === 'object' && 'id' in link.source ? link.source.id : link.source,
                target: typeof link.target === 'object' && 'id' in link.target ? link.target.id : link.target,
                weight: link.weight
              })), // Guarda 'links' completos
              nodes: state.graph.nodes.map((node) => ({ id: node.id })), // Guarda solo los 'id's de los nodos
            }
          : null,
      }),

      // Actualiza el estado de inicialización cuando se recarguen los datos del localStorage
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isInitialized = true;
        }
      },
    }
  )
);
