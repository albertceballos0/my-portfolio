import { useGraphState } from "@/store/useGraphStore";
import { matrixToGraphData } from "@/utils/matrixToGrahpData";

export const useGenerateMatrix = (setMatrix : (matrix: number[][]) => void, matrix : number[][], setLoading: (loading: boolean) => void) => {

    const { setGraph, setActiveTab } = useGraphState();

    const handleGenerateMatrix = (rowIndex: number, colIndex: number, value: string) => {
        const newMatrix = [...matrix];
        newMatrix[rowIndex][colIndex] = parseInt(value) || 0;
        setMatrix(newMatrix);
    };
        
    const addRow = () => {
        setMatrix([...matrix, Array(matrix[0].length).fill(0)]);
    };
        
    const addColumn = () => {
        setMatrix(matrix.map((row : number[]) => [...row, 0]));
    };
        
    const onHandleMatrixGenerate = async () => {
        setLoading(true); // Activar el estado de carga
        const data = matrixToGraphData(matrix);
        setGraph(data);
        setActiveTab('graph');
        setLoading(false);
    };

    return {
        handleGenerateMatrix,
        addRow,
        addColumn,
        onHandleMatrixGenerate
    }
}