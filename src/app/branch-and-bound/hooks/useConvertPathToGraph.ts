import { useGraphState } from "@/store/useGraphStore";


export type Link = {
    source: string
    target: string
}

export type Node = {
    id: string;
    label: string[];
}

export const useConvertPathToGraph = () => {

    const { graph, result } = useGraphState();
    const convertPathToGraph = () => {
        if (result?.best?.attributes.path) {
            const pathLinks: Link[] = [];
            const pathNodes : Node[] = [];

            //por cada nodo en el grafo se crea un nodo almazenando las posiciones en las que se tiene que pasar por él en el path
            graph.nodes.forEach((node) => {
                const label : string[] = [];
                result.best?.attributes.path.forEach((pathNode, index) => {
                    if (pathNode === node.id) {
                        label.push(String(index + 1));
                    }
                });
                if (label.length > 0) {                
                    pathNodes.push({
                        id: node.id,
                        label: label,
                    });
                }
            });

            //por cada nodo en el path se crea un link entre el nodo actual y el siguiente
            for (let i = 0; i < result.best.attributes.path.length - 1; i++) {
                pathLinks.push({
                    source: result.best.attributes.path[i],
                    target: result.best.attributes.path[i + 1],
                });
            }
            console.log(pathLinks, pathNodes)
            return {links: pathLinks, nodes: pathNodes}

        }
    }
    return {
        convertPathToGraph
    }
}