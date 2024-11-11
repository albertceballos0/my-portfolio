import HistorialHeader from './HistorialHeader'
import HistorialFilters from './HistorialFilters'
import HistorialTable from './HistorialTable'
import Pagination from './Pagination'
import DeleteConfirmationModal from './DeleteConfirmationModal'
import { useState, useEffect } from 'react'
import { useApi } from '../hooks/useApi'
import { useHistStore } from '@/store/useHist'
import { HistoryItem } from '@/types'

interface HistorialProps {
  isLoading: boolean
}

export default function Historial({ isLoading }: HistorialProps) {
  const { removeRequest } = useApi()
  const { hist, removeHistInstance } = useHistStore()
  const [data, setData] = useState<HistoryItem[]>([])
  const [dateFilter, setDateFilter] = useState<Date | undefined>()
  const [typeFilter, setTypeFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 6
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalLoading, setIsModalLoading] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)

  useEffect(() => {
    //Al ser hist [] | null en función de si esta logueado o no, cada vez que se inidica o se cierra sesión se actualiza la lista de historial
    if (!isLoading && data !== hist) setData(hist || [])
  
  }, [isLoading, hist])

  //Filtrado de datos por email, fecha y tipo
  const filteredData = data.filter(item => {
    const dateMatch = !dateFilter || new Date(item.timestamp).toDateString() === dateFilter.toDateString()
    const typeMatch = typeFilter === 'all' || item.requestType === typeFilter
    return dateMatch && typeMatch
  })

  //Paginación
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  //Validación de la página actual, si es 0 se establece en 1, si es mayor al total de páginas se establece en el total de páginas  
  useEffect(() => {
    if (totalPages === 0) {
      setCurrentPage(0)
    } else if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    } else if (totalPages > 0 && currentPage === 0){
      setCurrentPage(1)
    }
  }, [totalPages, currentPage])

  //Datos por página a mostrar
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  //Función para abrir modal de confirmación de eliminación
  const handleDelete = (id: string) => {
    setItemToDelete(id)
    setIsModalOpen(true)
  }

  //Si se confirma la eliminación se elimina el item de la lista de historial y se elimina la instancia de historial
  const confirmDelete = async () => {
    if (itemToDelete) {
      //Loading = true para mostrar el spinner de carga
      setIsModalLoading(true)
      //Se elimina el item de la lista de historial en la BD
      await removeRequest(itemToDelete)
      //Se elimina el item de la lista de historial en el estado
      setData(data.filter(item => item.id !== itemToDelete))
      //Se elimina la instancia de historial en el estado global de zustand
      removeHistInstance(itemToDelete)
      //Se establece el item a eliminar en null
      setItemToDelete(null)
      //Se cierra el modal de confirmación
      setIsModalOpen(false)
      //Se culmina la carga
      setIsModalLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-full">
      <HistorialHeader />
      <HistorialFilters
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />
      <HistorialTable
        isLoading={isLoading}
        paginatedData={paginatedData}
        handleDelete={handleDelete}
      />
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        isLoading={isModalLoading}
        onConfirm={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  )
}
