"use client"

import { Info, ArrowRight, MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useGraphState } from '@/store/useGraphStore'
import VisualizeTrack from './VisualizeTrack'
import { useParseResultData } from '../../hooks/useParseResultData'
import { TabsContent } from '@/types'

export default function TrackTabContent() {
  const { graph } = useGraphState()
  const { parseResult } = useParseResultData()
  const data: TabsContent = parseResult()

  return (
    <Card>
      <CardHeader className="z-10 space-y-2 border-b border-gray-200">
        <div className="flex justify-between items-center">
            <CardTitle>Path Tracking</CardTitle>
        </div>
    </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-8 h-full p-6">
        {/* Contenedor izquierdo - ocupa 1/3 */}
        <div className="flex flex-col w-full md:w-1/3">
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Info className="h-5 w-5 text-gray-500" />
              Path Tracking
            </h4>
            <p className="text-xs text-gray-600">
              Optimal route: {data.length.toFixed(2)}
            </p>
          </div>

          <ScrollArea className='h-60 mt-6'>
            <div className="flex flex-col gap-2">
              {data.path.map((source: string, index: number) => (
                <div key={index} className="flex items-center">
                  <div className="flex items-center px-4 py-2 rounded-lg w-full bg-gray-50 hover:bg-gray-100 transition">
                    <Badge variant="outline" className="h-8 w-8 rounded-full flex items-center justify-center mr-3">
                      {index + 1}
                    </Badge>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700">{source}</span>
                      {index < data.path.length - 1 ? (
                        <span className="text-xs text-gray-500">
                          To {data.path[index + 1]}: {
                            graph.links.find(
                              (link: {source: string | { id: string }, target: string | { id: string }, weight: number}) =>
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
                      <ArrowRight className="ml-auto text-gray-400 hover:text-gray-600 transition-colors" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex items-center gap-1 text-xs text-gray-600 mt-6">
            <MapPin className="h-3 w-3 text-gray-500" />
            <span>Total: {data.path.length ? data.path.length -1 : 0}</span>
          </div>
        </div>

        {/* Contenedor derecho - ocupa 2/3 */}
        <div className="w-full md:w-2/3">
          <VisualizeTrack />
        </div>
      </CardContent>
    </Card>
  )
}
