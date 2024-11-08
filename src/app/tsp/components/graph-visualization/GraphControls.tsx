import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Trash2Icon, Settings2, Play, RotateCcw, X } from 'lucide-react';
import { useGraphState } from '@/store/useGraphStore';
import { useGenerateTSP } from '../../hooks/useGenerateTSP';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface GraphControlsProps {
    setIsVisitMode: (value: boolean) => void;
    isVisitMode: boolean;
}

const GraphControls = ({ setIsVisitMode, isVisitMode }: GraphControlsProps) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const { visitedNodes, isGraph, removeGraph, removeResult, setVisitedNodes } = useGraphState();
    const { handleGenerateTSP } = useGenerateTSP(setIsGenerating);

    const handleResetVisits = () => {
        setVisitedNodes([]);
        setIsVisitMode(false);
        removeResult();
    };

    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <div className="fixed bottom-4 left-4 right-4 z-10">
            <div className={cn(
                "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out",
                isExpanded ? "h-auto" : "h-16"
            )}>
                <div className="flex justify-between items-center mb-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleExpand}
                        className="md:hidden"
                    >
                        {isExpanded ? <X className="h-4 w-4" /> : <Settings2 className="h-4 w-4" />}
                        <span className="sr-only">{isExpanded ? 'Collapse controls' : 'Expand controls'}</span>
                    </Button>
                    <div className="hidden md:flex space-x-2">
                        <Button
                            onClick={() => setIsVisitMode(!isVisitMode)}
                            variant="outline"
                            disabled={!isGraph || isGenerating}
                            className="whitespace-nowrap"
                        >
                            {isVisitMode ? 'Exit Visit Mode' : 'Load Visits'}
                        </Button>
                        <Button
                            onClick={handleResetVisits}
                            disabled={!isGraph || visitedNodes.length === 0 || isGenerating}
                            className="whitespace-nowrap"
                        >
                            Reset Visits
                        </Button>
                    </div>
                    <div className="flex space-x-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button 
                            onClick={() => handleGenerateTSP('branch-and-bound')} 
                            disabled={isGenerating || visitedNodes.length <= 2 || !isGraph}
                            className="whitespace-nowrap"
                        >
                            {isGenerating ? 'Generating...' : 'Generate TSP'}
                        </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleGenerateTSP('branch-and-bound')}>
                                    Branch And Bound
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleGenerateTSP('backtracking')}>
                                    Backtracking Pure
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleGenerateTSP('backtracking-greedy')}>
                                    Backtracking Greedy
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="destructive" disabled={!isGraph || isGenerating}>
                                    <Trash2Icon className="w-4 h-4 md:mr-2" />
                                    <span className="hidden md:inline">Remove Graph</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={removeGraph}>
                                    Confirm Remove Graph
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className={cn(
                    "grid grid-cols-2 gap-2 md:hidden",
                    isExpanded ? "opacity-100 visible" : "opacity-0 invisible h-0"
                )}>
                    <Button
                        onClick={() => setIsVisitMode(!isVisitMode)}
                        variant="outline"
                        disabled={!isGraph ||isGenerating}
                        className="whitespace-nowrap"
                    >
                        <Play className="w-4 h-4 mr-2" />
                        {isVisitMode ? 'Exit Visit Mode' : 'Load Visits'}
                    </Button>
                    <Button
                        onClick={handleResetVisits}
                        disabled={!isGraph || visitedNodes.length === 0 || isGenerating}
                        className="whitespace-nowrap"
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset Visits
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default GraphControls;