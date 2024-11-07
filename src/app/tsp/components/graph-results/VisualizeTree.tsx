'use client'

import { Info, ZoomIn, ZoomOut } from 'lucide-react'
import React, { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useGraphState } from '@/store/useGraphStore'
import Tree from 'react-d3-tree'
import { TreeNode } from '@/types'
import CustomNode from './CustomNode'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type TreeNodeNew = {
  name: string
  attributes: {
    upperBound: number
    lowerBound: number
    length: number
    path: string
    prunned: boolean
    best: boolean
  }
  children: TreeNodeNew[]
}

const VisualizeTree = () => {
  const [zoom, setZoom] = React.useState(1)
  const { result } = useGraphState()
  const [tree, setTree] = useState<TreeNodeNew>()
  const [selectedNode, setSelectedNode] = useState<TreeNodeNew | null>(null)

  // Crear referencia para el contenedor de información del nodo
  const nodeInfoRef = useRef<HTMLDivElement>(null)

  const handleZoom = (factor: number) => {
    setZoom((prevZoom) => Math.max(0.1, Math.min(2, prevZoom + factor)))
  }

  useEffect(() => {
    if (result?.type === 'branch-and-bound') {
      const traverseTree: (node: TreeNode) => TreeNodeNew = (node: TreeNode): TreeNodeNew => {
        return {
          ...node,
          attributes: {
            ...node.attributes,
            path: node.attributes.path.join(' -> '),
          },
          children: node.children ? node.children.map(traverseTree) : [],
        }
      }
      const updatedTree = traverseTree(result.result.tree)
      setTree(updatedTree)
    }
  }, [result])

  const handleNodeClick = (nodeData: TreeNodeNew) => {
    setSelectedNode(nodeData)
    // Verificar si el contenedor de información del nodo está visible
    if (nodeInfoRef.current) {
      const rect = nodeInfoRef.current.getBoundingClientRect()
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight
      // Si no está visible, desplazarse hacia él
      if (!isVisible) {
        nodeInfoRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Tree Visualization</CardTitle>
          </CardHeader>
          <div className="flex justify-center items-center overflow-hidden border-t border-gray-200" style={{ height: 400 }}>
            <div className="absolute top-4 right-4 z-10 flex space-x-3">
              <Button
                onClick={() => handleZoom(0.1)}
                size="sm"
                variant="outline"
                className="p-2 hover:bg-gray-200 transition-colors duration-300"
              >
                <ZoomIn className="h-5 w-5 text-primary" />
              </Button>
              <Button
                onClick={() => handleZoom(-0.1)}
                size="sm"
                variant="outline"
                className="p-2 hover:bg-gray-200 transition-colors duration-300"
              >
                <ZoomOut className="h-5 w-5 text-primary" />
              </Button>
            </div>
            {tree && (
              <Tree
                data={tree}
                orientation="vertical"
                translate={{ x: 400, y: 50 }}
                zoom={zoom}
                pathFunc="step"
                renderCustomNodeElement={(rd3tProps) => (
                  <CustomNode
                    nodeDatum={rd3tProps.nodeDatum as unknown as TreeNodeNew}
                    onClick={() => handleNodeClick(rd3tProps.nodeDatum as unknown as TreeNodeNew)}
                  />
                )}
                separation={{ siblings: 1.5, nonSiblings: 2 }}
                nodeSize={{ x: 220, y: 80 }}
                zoomable={true}
                draggable={true}
                collapsible={false}
              />
            )}
          </div>
        </Card>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="mb-3 flex items-center gap-2 text-lg">
              <Info className="h-5 w-5 text-gray-500" />
              Legend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full border-2 border-primary bg-white mr-2"></div>
                <span className="text-sm text-gray-700">Active Node</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-red-100 border-2 border-red-500 mr-2"></div>
                <span className="text-sm text-gray-700">Pruned Node</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-green-100 border-2 border-green-500 mr-2"></div>
                <span className="text-sm text-gray-700">Best Solution Node</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex-none w-full md:w-1/3" ref={nodeInfoRef}>
        <Card>
          <CardHeader>
            <CardTitle>Node Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            {selectedNode ? (
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>Name:</strong> {selectedNode.name}</p>
                <p><strong>Upper Bound:</strong> {selectedNode.attributes.upperBound}</p>
                <p><strong>Lower Bound:</strong> {selectedNode.attributes.lowerBound}</p>
                <p><strong>Length:</strong> {selectedNode.attributes.length}</p>
                <p><strong>Path:</strong> <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{selectedNode.attributes.path}</span></p>
                <p><strong>Pruned:</strong> {selectedNode.attributes.prunned ? 'Yes' : 'No'}</p>
                <p><strong>Best:</strong> {selectedNode.attributes.best ? 'Yes' : 'No'}</p>
              </div>
            ) : (
              <p className="text-gray-600">Click on a node to view its information.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default VisualizeTree
