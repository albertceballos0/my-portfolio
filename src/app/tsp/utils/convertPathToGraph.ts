import { GraphData } from "@/types";

export type Link = {
    source: string
    target: string
}

export type Node = {
    id: string;
    label: string[];
}


export const convertPathToGraph = (graph: GraphData, path:string[] ) => {
   
        const pathLinks: Link[] = [];
        const pathNodes : Node[] = [];

        //por cada nodo en el grafo se crea un nodo almazenando las posiciones en las que se tiene que pasar por él en el path
        graph.nodes.forEach((node) => {
            const label : string[] = [];
            path.forEach((pathNode: string, index: number) => {
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
        for (let i = 0; i < path.length - 1; i++) {
            pathLinks.push({
                source: path[i],
                target: path[i + 1],
            });
        }
        console.log(pathLinks, pathNodes)
        return {links: pathLinks, nodes: pathNodes}

}