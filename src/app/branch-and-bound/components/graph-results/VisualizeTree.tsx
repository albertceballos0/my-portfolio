import { Info, ZoomIn, ZoomOut } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useGraphState } from '@/store/useGraphStore'
import Tree from 'react-d3-tree'
import { TreeNode } from '@/types'

type TreeNodeNew = {
    name: string;
    attributes: {
        upperBound: number;
        lowerBound: number;
        length: number;
        path : string;
        prunned: boolean;
        best: boolean;
    };
    children: TreeNodeNew[];
}

const VisualizeTree = () => {

    const [zoom, setZoom] = React.useState(1)
    const { result} = useGraphState();
    const [tree, setTree] = useState<TreeNodeNew>()

    const handleZoom = (factor: number) => {
        setZoom(prevZoom => Math.max(0.1, Math.min(2, prevZoom + factor)))
    }
    useEffect(() => {
        if(result){
            const traverseTree = (node: TreeNode): TreeNodeNew => {
                return {
                    ...node,
                    attributes: {
                        ...node.attributes,
                        path: node.attributes.path.join(' -> ')
                    },
                    children: node.children ? node.children.map(traverseTree) : []
                }
            }
            const updatedTree = traverseTree(result.tree)
            setTree(updatedTree)
        }
    },[result]);
  return (
    <div>
        <div className="relative" style={{ height: '800px', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
            <div className="absolute top-2 right-2 z-10 space-x-2">
                <Button onClick={() => handleZoom(0.1)} size="sm" variant="outline">
                <ZoomIn className="h-4 w-4" />
                </Button>
                <Button onClick={() => handleZoom(-0.1)} size="sm" variant="outline">
                <ZoomOut className="h-4 w-4" />
                </Button>
            </div>
            {tree && (
                <Tree
                    data={tree}
                    orientation="vertical"
                    translate={{ x: 400, y: 50 }}
                    zoom={zoom}
                    pathFunc="step"
                    separation={{ siblings: 1.5, nonSiblings: 2 }}
                    nodeSize={{ x: 220, y: 80 }}
                    zoomable={true}
                    draggable={true}
                    collapsible={false}
                />
            )}
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Legend
            </h4>
            <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full border-2 border-primary bg-white mr-2"></div>
                    <span className="text-sm">Active Node</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-red-100 border-2 border-red-500 mr-2"></div>
                    <span className="text-sm">Pruned Node</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-green-100 border-2 border-green-500 mr-2"></div>
                    <span className="text-sm">Best Solution Node</span>
                </div>
            </div>
        </div>
    </div>
  )
}


export default VisualizeTree