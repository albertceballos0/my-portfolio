import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { InfoIcon } from 'lucide-react';
import { useGraphState } from "@/store/useGraphStore";



const GraphInfo = () => {
    const {graph, isGraph } = useGraphState();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <InfoIcon className="h-5 w-5" />
                    Graph Information
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <p><strong>Nodes:</strong> Represent points of interest or locations in the graph. Each node has a unique identifier.</p>
                    <p><strong>Edges:</strong> Connections between nodes, representing paths or relationships. They can have weights to indicate distance or cost.</p>
                    <p><strong>Visit Mode:</strong> Click on nodes to mark them as visited. The color changes to green to indicate visited status.</p>
                    <p><strong>TSP (Traveling Salesman Problem):</strong> Finds the shortest possible route that visits each node exactly once and returns to the starting point.</p>
                
                    {isGraph && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-md">
                        <h3 className="font-semibold mb-2">Current Graph Statistics:</h3>
                        <ul className="list-disc list-inside">
                            <li>Number of Nodes: {graph.nodes.length}</li>
                            <li>Number of Edges: {graph.links.length}</li>
                            <li>Relation Edges vs Nodes: {graph.links.length / graph.nodes.length}</li>
                        </ul>
                    </div>
                    )}
                </div>
            </CardContent>
        </Card>
        
    );
};

export default GraphInfo;