import { useGraphState } from "@/store/useGraphStore";
import { generateRandomGraph } from "@/utils/generateRandomGraph";


export const useGenerateRandomGraph = ( setError: (error : string | null) => void, setIsLoading : (loading : boolean) => void ) => {

    const { setGraph, setActiveTab } = useGraphState();

    const validateInputs = (nodes : number,edges: number) => {
        if (nodes < 2) {
          return "El número mínimo de nodos es 2.";
        }
        if (edges < 1) {
          return "El número mínimo de aristas es 1.";
        }
        const maxEdges = (nodes * (nodes - 1)) / 2;
        if (edges > maxEdges) {
          return `Con ${nodes} nodos, el número máximo de aristas es ${maxEdges}.`;
        }
        if (nodes > 200) {
            return "El número máximo de nodos es 500.";
        }
        if (edges > 1000) {
            return "El número máximo de aristas es 1000.";
        }
        return null;
    }
    const handleGenerateRandomGraph = async (nodes : number,edges: number) => {
        const validationError = validateInputs(nodes, edges);
        if (validationError) {
          setError(validationError);
          return;
        }
        setIsLoading(true);
        setError(null);

        try {

          await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second timeout
          const graph = generateRandomGraph(nodes, edges);

          setGraph(graph);
          setActiveTab('graph');
          setIsLoading(false);

        } catch (error) {
          console.error('Error generating random graph:', error);
          setError('An error occurred while generating the graph.');
        } finally {
        }
    }

    return {
        handleGenerateRandomGraph
    }
}




