import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useGenerateMatrix } from "../../hooks/useGenerateMatrix";


export default function MatrixInput() {
  const [matrix, setMatrix] = useState<number[][]>([[0, 0], [0, 0], [0, 0]]);
  const [loading, setLoading] = useState(false); // Estado de carga

  const {handleGenerateMatrix, addRow, addColumn, onHandleMatrixGenerate } = useGenerateMatrix(setMatrix, matrix, setLoading);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Input Matrix</CardTitle>
        <CardDescription>Enter the cost matrix for the Branch and Bound algorithm</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto p-1 rounded">
          <div className="inline-block min-w-full px-2">
            <div className="grid gap-4">
              {matrix.map((row, rowIndex) => (
                <div key={rowIndex} className="flex space-x-2">
                  {row.map((cell, colIndex) => (
                    <Input
                      key={colIndex}
                      type="number"
                      value={cell}
                      onChange={(e) => handleGenerateMatrix(rowIndex, colIndex, e.target.value)}
                      className="w-16"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <Button onClick={(addRow)} className="mr-2">Add Row</Button>
          <Button onClick={addColumn}>Add Column</Button>
        </div>
        <Button onClick={onHandleMatrixGenerate} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Graph"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
