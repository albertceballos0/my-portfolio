'use client'

import { useEffect, useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'    
import { CalendarIcon, Eye, Trash2, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { format } from 'date-fns'
import { Skeleton } from '@/components/ui/skeleton'
import { userInterface } from '@/types'
import { fetchHistoryData, removeRequest } from '../utils/api'

const typeOptions = [
  { label: 'All', value: 'all' },
  { label: 'TSP', value: 'tsp' },
  { label: 'Object Detection', value: 'object-detection' },
  { label: 'Avatar Generation', value: 'avatar-generation' },
  { label: 'Object Removal', value: 'object-removal' },
  { label: 'Image Generation', value: 'image-generation' },
  { label: 'Style Transfer', value: 'style-transfer' },
]

interface HistorialItem {
  id: number
  user: userInterface
  timestamp: string
  type: string
}

interface HistorialProps {
  initialData: HistorialItem[];
  isLoading: boolean;
}

export default function Historial({ initialData, isLoading }: HistorialProps) {
  const [emailFilter, setEmailFilter] = useState('')
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
  const [typeFilter, setTypeFilter] = useState('all')
  const [isLoadingRefresh, setIsLoadingRefresh] = useState(false)
  const [data, setData] = useState(initialData)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const [IsModalLoading, setIsModalLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<number | null>(null)

  const filteredData = data.filter(item => {
    const emailMatch = item.user.email.toLowerCase().includes(emailFilter.toLowerCase())
    const dateMatch = !dateFilter || new Date(item.timestamp).toDateString() === dateFilter.toDateString()
    const typeMatch = typeFilter === 'all' || item.type === typeFilter
    return emailMatch && dateMatch && typeMatch
  })

  useEffect(() => {
    if (!isLoading) {
      setData(initialData)
    }
  }, [initialData, isLoading])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleRefresh = async () => {
    setIsLoadingRefresh(true)
    const response = await fetchHistoryData()
    setData(response)
    setIsLoadingRefresh(false)
    setCurrentPage(1)
  }

  const handleDelete = (id: number) => {
    setItemToDelete(id)
    setIsModalOpen(true)
  }

  const confirmDelete = async () => {
    console.log('itemToDelete', itemToDelete)
    if (itemToDelete) {
      setIsModalLoading(true)
      await removeRequest(itemToDelete)  // Llama a la función de eliminación
      setData(data.filter(item => item.id !== itemToDelete))  // Actualiza el estado después de eliminar
      setIsModalOpen(false)
      setItemToDelete(null)
      setIsModalLoading(false)
    }
  }

  const cancelDelete = () => {
    setIsModalOpen(false)
    setItemToDelete(null)
  }

  return (
    <div className="container mx-auto p-4 max-w-full">
      <h1 className="text-2xl font-bold mb-4">Historial</h1>

      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-1 min-w-[200px]">
          <Input
            placeholder="Filtrar por email"
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
            className="w-full"
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full sm:w-[240px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateFilter ? format(dateFilter, 'PPP') : <span>Seleccionar fecha</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateFilter}
              onSelect={setDateFilter}
            />
          </PopoverContent>
        </Popover>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Seleccionar tipo" />
          </SelectTrigger>
          <SelectContent>
            {typeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={handleRefresh} disabled={isLoadingRefresh || isLoading} className="w-full sm:w-auto">
          {isLoadingRefresh ? 'Actualizando...' : 'Actualizar datos'}
        </Button> 
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Avatar</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || isLoadingRefresh ? (
              Array.from({ length: itemsPerPage }).map((_, index) => (
                <TableRow key={index} className="h-16">
                  <TableCell colSpan={5}>
                    <Skeleton className="h-8 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <TableRow key={item.id} className="h-16">
                  <TableCell>
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={item.user.avatarUrl || '/public/avatar.svg'}
                        alt={item.user.name || 'Usuario'}
                      />
                      <AvatarFallback>{item.user.name ? item.user.name.charAt(0) : 'U'}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{item.user.email}</TableCell>
                  <TableCell>{format(new Date(item.timestamp), 'dd/MM/yyyy HH:mm')}</TableCell>
                  <TableCell>{typeOptions.find(option => option.value === item.type)?.label}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" aria-label="Ver detalles">
                        <Eye className="h-4 w-4" />
                      </Button>
                        <Button variant="ghost" size="icon" aria-label="Eliminar" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>                      
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="h-16">
                <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                  No se encontraron resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>
          <div className="text-sm font-medium">
            Página {currentPage} de {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Siguiente
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}

      {/* Modal de confirmación */}
      {isModalOpen && itemToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">¿Estás seguro de que quieres eliminar este item?</h3>
            <div className="flex justify-between">

            {
                IsModalLoading ? (
                    <Loader2 className="h-6 w-6" />
                ) : (
                    <>
                        <Button onClick={confirmDelete} variant="destructive">Eliminar</Button>
                        <Button onClick={cancelDelete} variant="outline">Cancelar</Button>
                    </>
                )
            }
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
