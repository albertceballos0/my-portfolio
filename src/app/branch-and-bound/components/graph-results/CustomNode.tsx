import React from 'react'

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

const CustomNode = ({ nodeDatum, toggleNode }: { nodeDatum: TreeNodeNew ; toggleNode: () => void }) => {

    return (
        <foreignObject width={200} height={80} x={-100} y={-40}>
        <div
            className={`p-2 rounded-md shadow-md text-center text-sm cursor-pointer transition-colors
            ${nodeDatum.attributes?.best ? 'bg-green-100 border-2 border-green-500' : 
                nodeDatum.attributes?.prunned ? 'bg-red-100 border-2 border-red-500' : 'bg-white border-2 border-primary'}
            `}
            onClick={toggleNode}
        >
            <strong className="block mb-1">{nodeDatum.name}</strong>
            {nodeDatum.attributes && (
            <div className="text-xs">
                UB: {nodeDatum.attributes.upperBound}, LB: {nodeDatum.attributes.lowerBound}
            </div>
            )}
        </div>
        </foreignObject>
  )
}
  

export default CustomNode