import { useGraphState } from '@/store/useGraphStore';



export const useNode = (isVisitMode: boolean ) => {
    const { visitedNodes, addVisitedNode, removeResult } = useGraphState();

    const handleClickNode = (node: {  id: string }) =>{
        console.log("Node clicked:", node, visitedNodes)
        if (isVisitMode && !visitedNodes.includes(node.id)) {
            addVisitedNode(node.id);
            removeResult()
        }
    }
    
    const getNodeColor = (node : {id: string }) => {

        if (visitedNodes.length === 0) {
            return '#808080' // Nodos visitados
        }
        if (visitedNodes === null) return '#808080' // Nodos visitados
        const index = visitedNodes.indexOf(node.id)
        if (index === 0) return 'green' // Primer nodo visitado
        if (index === visitedNodes.length - 1) return 'purple' // Último nodo visitado
        if (index > 0) return 'red' // Nodos intermedios
        return '#808080' // Color por defecto
    }
    return {
        handleClickNode,
        getNodeColor
    };

};
