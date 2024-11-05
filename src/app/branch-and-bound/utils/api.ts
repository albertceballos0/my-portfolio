import axios from 'axios';
import { GraphData, treeInterface } from '@/types';


export const saveToHistory = async (result:treeInterface, userEmail: string, visitedNodes: string[], graphData: GraphData ) => {
    if (!process.env.CLOUD_FUNCTION_ADD_TO_HIST) {
        throw new Error("CLOUD_FUNCTION_ADD_TO_HIST is not defined");
    }
    await axios.post(process.env.CLOUD_FUNCTION_ADD_TO_HIST, { 
        data: {
            graph: {
                links: graphData.links.map((link) => ({
                    id: link.id,
                    source: typeof link.source === 'string' ? link.source : link.source.id,
                    target: typeof link.target === 'string' ? link.target : link.target.id,
                    weight: link.weight
                  })), // Guarda 'links' completos
                  nodes: graphData.nodes.map((node: { id: string }) => ({ id: node.id })), // Guarda solo los 'id's de los nodos
            },
            visitedNodes: visitedNodes,
            result,
        },
        userEmail: userEmail,
        requestType: 'branch-and-bound',
    })
}