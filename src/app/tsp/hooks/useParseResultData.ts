import { useGraphState } from '@/store/useGraphStore';
import { TabsContent } from '@/types';

export const useParseResultData = () => {

    const { result } = useGraphState()

    const parseResult = () => {
        let data : TabsContent = {
            path : [],
            length : 0,
            executionTime : 0,
        };
        if (result?.type === 'branch-and-bound' && 'best' in result.result) {
            data = {
            path : result.result.best.attributes.path || [],
            length : result.result.best.attributes.length || 0,
            executionTime : result.result.executionTime || 0
            }
        }
        else if ((result?.type === 'backtracking' || result?.type === 'backtracking-greedy') && 'path' in result.result) {
            data = {
            path : result.result.path || [],
            length : result.result.length || 0,
            executionTime : result.result.executionTime || 0,
            nodes : result.result.nodes || 0
            }
        }

        return data
    }


    return {
        parseResult
    };
};

