import { useGraphState } from '@/store/useGraphStore';
import { convertirGraphATexto } from '@/utils/parseGraphFile';
import { parseBABStructure, parseBacktrackingStructure } from '../utils/parseTSPStructure';
import { useMessageStore } from '@/store/useMessageStore';
import axios from 'axios';


export const useGenerateTSP = () => {

    const { graph, visitedNodes, setResult, setActiveTab, setIsGenerating } = useGraphState();
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
            console.log(type)
            // Send the text to the backend to generate the TSP
            const res = await axios.post(process.env.NEXT_PUBLIC_GENERATE_TSP_API, { fileContent: text, type: type }, { timeout: 15000 }).catch((error) => {
                setMessage('Error al generar track: tiempo de espera agotado', 'error');            
                setIsGenerating(false);
                throw error;
            });
            
            if (res.status !== 200) {
                setMessage('Error al generar track', 'error');
                setIsGenerating(false);
                return;
            }

            if (res.data.result) {
                if (type === 'branch-and-bound') {
                    setResult({ 
                        type : type,
                        result : parseBABStructure(res.data.result)
                    });

                }else {
                    setResult({ 
                        type : type,
                        result : parseBacktrackingStructure(res.data.result)
                    });
                } 
                
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
