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
    const best = result?.result?.best;

    const convertPathToGraph = () => {
        if (best?.attributes.path) {
            const pathLinks: Link[] = [];
            const pathNodes : Node[] = [];

            //por cada nodo en el grafo se crea un nodo almazenando las posiciones en las que se tiene que pasar por él en el path
            graph.nodes.forEach((node) => {
                const label : string[] = [];
                best?.attributes.path.forEach((pathNode: string, index: number) => {
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
            for (let i = 0; i < best?.attributes.path.length - 1; i++) {
                pathLinks.push({
                    source: best?.attributes.path[i],
                    target: best?.attributes.path[i + 1],
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