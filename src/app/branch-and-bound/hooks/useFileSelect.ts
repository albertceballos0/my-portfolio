import { useGraphState } from "@/store/useGraphStore";
import { parseGraphFile } from "@/utils/parseGraphFile";
import axios from "axios";



export const useFileSelect = ( setIsLoading : (loading : boolean) => void) => {

    const  { setGraph, setActiveTab } = useGraphState();

    const handleFileSelect = async (fileName: string) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/api/graphs/${fileName}`);
            if (!response.data) {
                throw new Error('Failed to fetch graph file');
            }
            
            if (!response.data.content) {
                throw new Error('Failed to fetch graph file content');
            }

            const text = await response.data.content;
            const graphData = parseGraphFile(text);
            setGraph(graphData);
            setActiveTab('graph');
            setIsLoading(false);
        } catch (error) {
            console.error('Error loading graph file:', error);
            setIsLoading(false);
        }
    };

    return {
        handleFileSelect
    }
}