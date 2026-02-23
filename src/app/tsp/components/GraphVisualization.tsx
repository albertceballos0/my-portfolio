'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGraphState } from '@/store/useGraphStore';
import { Loader2 } from 'lucide-react';
import { useNode } from '../hooks/useNode';
import GraphInfo from './graph-visualization/GraphInfo';
import GraphHeader from './graph-visualization/GraphHeader';

const ForceGraph2D = dynamic(
    () => import('./Graph2DWrapper'),
    {
        ssr: false,
        loading: () => (
            <div className="flex justify-center items-center w-full" style={{ height: 400 }}>
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }
);

export default function GraphVisualization() {
    const [isMounted, setIsMounted] = useState(false);
    const [isVisitMode, setIsVisitMode] = useState(false);

    const { isGraph, graph, setActiveTab } = useGraphState();
    const { handleClickNode, getNodeColor } = useNode(isVisitMode);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null; // Evita cualquier intento de render en server

    return (
        <div className="flex flex-col space-y-4 pb-20 md:pb-18">
            <Card>
                <GraphHeader setIsVisitMode={setIsVisitMode} isVisitMode={isVisitMode} />
                <div className="flex justify-center items-center overflow-hidden border-t border-gray-200 min-h-[400px]">
                    {!isGraph ? (
                        <CardContent className="text-center text-gray-400 py-8 w-full">
                            <p>No graph data available</p>
                            <Button className="mt-4" onClick={() => setActiveTab('input')}>
                                Load Sample Graph
                            </Button>
                        </CardContent>
                    ) : (
                        <div className="w-full">
                            <ForceGraph2D
                                graphData={graph}
                                nodeLabel="id"
                                nodeColor={(node: any) => getNodeColor({ id: String(node.id) })}
                                linkColor={() => '#9ca3af'}
                                onNodeClick={(node: any) => handleClickNode({ id: String(node.id) })}
                                height={400}
                            />
                        </div>
                    )}
                </div>
            </Card>
            <GraphInfo />
        </div>
    );
}