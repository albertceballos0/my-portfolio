"use client"

import { Info, ArrowRight, MapPin } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useGraphState } from '@/store/useGraphStore'
import VisualizeTrack from './VisualizeTrack'
import { TabsContent, useParseResultData } from '../../hooks/useParseResultData'


export default function TrackTabContent() {
  const { graph } = useGraphState()

  const { parseResult } = useParseResultData()

  const data : TabsContent = parseResult()
  
  return (
    <div className="flex flex-col space-y-6">
      <Card>
        <CardContent className="flex flex-col md:flex-row items-start gap-8 p-6">
          <div className="flex flex-col w-full md:w-1/4 space-y-6">
            <div>
              <h4 className="font-semibold text-lg text-gray-700 mb-2 flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500" />
                Path Tracking
              </h4>
              <p className="text-xs text-gray-600 mb-2">
                Optimal route: {data.length.toFixed(2)}
              </p>
            </div>
            
            <ScrollArea className="h-[300px]">
              <div className="flex flex-col gap-2">
                {data.path.map((source: string, index: number) => (
                  <div key={index} className="flex items-center group">
                    <div className="flex items-center bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg w-full transition-colors">
                      <Badge variant="outline" className="bg-white h-8 w-8 rounded-full flex items-center justify-center p-2 mr-3">
                        {index + 1}
                      </Badge>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-700">{source}</span>
                        {index < data.path.length - 1 ? (
                          <span className="text-xs text-gray-500">
                            To {data.path[index + 1]}: {
                              graph.links.find(
                                (link: {source : string | { id: string }, target: string | { id: string }, weight: number}) =>
                                  ((typeof link.source === 'string' ? link.source : link.source.id) === source && 
                                  (typeof link.target === 'string' ? link.target : link.target.id) === data.path[index + 1]) ||
                                  ((typeof link.target === 'string' ? link.target : link.target.id) === data.path[index + 1])
                              )?.weight.toFixed(2) || 'N/A'
                            } 
                          </span>
                        ) : (
                          <span className="text-xs text-gray-500">Finish</span>
                        )}
                      </div>
                      {index < (data.path.length ?? 0) - 1 && (
                        <ArrowRight className="ml-auto text-gray-400 group-hover:text-gray-600 transition-colors" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <MapPin className="h-3 w-3 text-blue-500" />
                <span>Total: {data.path.length ?? 0}</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/4 bg-gray-50 rounded-lg border border-gray-200">
            <VisualizeTrack />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}