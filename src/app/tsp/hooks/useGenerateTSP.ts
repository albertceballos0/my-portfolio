import { useGraphState } from '@/store/useGraphStore';
import { convertirGraphATexto, parseBABStructure } from '@/utils/parseGraphFile';
import { useMessageStore } from '@/store/useMessageStore';
import axios from 'axios';
import { parse } from 'path';


export const useGenerateTSP = (setIsGenerating : (generating : boolean) => void) => {

    const { graph, visitedNodes, setResult, setActiveTab } = useGraphState();
    const { setMessage } = useMessageStore();

    const handleGenerateTSP =async (type : string) =>{

        try {
            setIsGenerating(true);
            // Convert the graph to text format
            const text = convertirGraphATexto(graph, visitedNodes);

            if (!process.env.NEXT_PUBLIC_GENERATE_TSP_API) {
                console.error("No se ha definido la URL de la API para generar el TSP");
                setMessage('Error al generar track', 'error');
                setIsGenerating(false);
                return;
            }
            // Send the text to the backend to generate the TSP
            const res = await axios.post(process.env.NEXT_PUBLIC_GENERATE_TSP_API, { fileContent: text });
            if (res.status !== 200) {
                setMessage('Error al generar track', 'error');
                return;
            }

            // Save the result to the database
            console.log("Resultado del TSP:", res.data.result);
            if (res.data.result) {
                const result = parseBABStructure(res.data.result);
                setResult({ 
                    type : type,
                    result : result
                });
                setMessage('Track generado correctamente', 'success');

                setActiveTab('result');
                // Save the result to the history if is logged in
                //if (isLoggedIn && user) saveToHistory(res.data.result, user.email, visitedNodes, graph);

            }else{
                setMessage('Error al generar track', 'error');
            }
            setIsGenerating(false);

        } catch (error) {
            console.error("Error en handleGenerateTSP:", error);
            setMessage('Error al generar track', 'error');
            setIsGenerating(false);
        }
    }
    return {
        handleGenerateTSP
    }
}
