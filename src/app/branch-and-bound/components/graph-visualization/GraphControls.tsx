import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Trash2Icon } from 'lucide-react';
import { useGraphState } from '@/store/useGraphStore';
import { useGenerateTSP } from '../../hooks/useGenerateTSP';

interface GraphControlsProps {
    setIsVisitMode: (value: boolean) => void;
    isVisitMode: boolean;
}

const GraphControls = ({ setIsVisitMode, isVisitMode} : GraphControlsProps) => {

    const [ isGenerating, setIsGenerating] = useState(false);

    const { visitedNodes, isGraph, removeGraph, removeResult, setVisitedNodes} = useGraphState();

    const { handleGenerateTSP} = useGenerateTSP(setIsGenerating);
    return (
        <div className="flex justify-between items-center">
            <div className="flex space-x-2">
                <Button onClick={() => setIsVisitMode(!isVisitMode)} variant="outline" disabled={!isGraph}>
                    {isVisitMode ? 'Exit Visit Mode' : 'Load Visits'}
                </Button>
                <Button onClick={() =>{setVisitedNodes([]); setIsVisitMode(false); removeResult()}} disabled={!isGraph || visitedNodes.length === 0}>
                    Reset Visits
                </Button>
            </div>
            <div className="flex space-x-2">
                <Button 
                    onClick={handleGenerateTSP} 
                    disabled={isGenerating || visitedNodes.length <= 2 || !isGraph}
                >
                    {isGenerating ? 'Generating...' : 'Generate TSP'}
                </Button>
                <Button
                    onClick={() => removeGraph()}
                    variant="destructive"
                    disabled={!isGraph}
                    className="flex items-center"
                >
                    <Trash2Icon className="w-4 h-4 mr-2" />
                    Remove Graph
                </Button>
            </div>
        </div>
    );
};


export default GraphControls;